<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
const isOpen = ref(false);
const title = ref("");
const diagramWidth = ref(720);
const diagramHeight = ref(420);
const zoom = ref(1);
const stageRef = ref(null);
const contentRef = ref(null);
const isDragging = ref(false);

let observer = null;
let debounceTimer = null;
let retryTimers = [];
let pendingSvg = null;
let panStartX = 0;
let panStartY = 0;
let panScrollLeft = 0;
let panScrollTop = 0;

const copy = computed(() =>
  route.path.startsWith("/vi/")
    ? {
        open: "Phong to diagram",
        close: "Dong",
        zoomIn: "Phong to",
        zoomOut: "Thu nho",
        reset: "Ve kich thuoc goc",
        title: "Diagram phong to"
      }
    : {
        open: "Zoom diagram",
        close: "Close",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        reset: "Reset zoom",
        title: "Zoomed diagram"
      }
);

const canvasStyle = computed(() => ({
  width: `${Math.max(1, diagramWidth.value * zoom.value)}px`,
  height: `${Math.max(1, diagramHeight.value * zoom.value)}px`
}));

const contentStyle = computed(() => ({
  width: `${diagramWidth.value}px`,
  height: `${diagramHeight.value}px`,
  transform: `scale(${zoom.value})`
}));

function scheduleEnhance() {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(enhanceDiagrams, 120);
}

function scheduleEnhanceRetries() {
  retryTimers.forEach((timer) => window.clearTimeout(timer));
  retryTimers = [0, 250, 800, 1600, 2600].map((delay) => window.setTimeout(enhanceDiagrams, delay));
}

function findDiagramTitle(diagram) {
  let current = diagram.previousElementSibling;
  while (current) {
    if (/^H[2-4]$/.test(current.tagName)) {
      const found = current.textContent?.trim();
      if (found) {
        return found;
      }
    }
    current = current.previousElementSibling;
  }

  return copy.value.title;
}

function getSvgSize(svg) {
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.getAttribute("viewBox");
  const parts = viewBox ? viewBox.split(/\s+/).map(Number) : [];
  const viewBoxWidth = Number.isFinite(parts[2]) ? parts[2] : 0;
  const viewBoxHeight = Number.isFinite(parts[3]) ? parts[3] : 0;
  const width = Math.min(Math.max(rect.width, viewBoxWidth, 320), 1800);
  const ratio = viewBoxWidth > 0 && viewBoxHeight > 0 ? viewBoxHeight / viewBoxWidth : rect.height / Math.max(rect.width, 1);
  const height = Math.min(Math.max(width * ratio, rect.height, 220), 1600);

  return { width: Math.round(width), height: Math.round(height) };
}

function openDiagram(diagram) {
  const svg = diagram.querySelector("svg");
  if (!svg) {
    return;
  }

  const clone = svg.cloneNode(true);
  const size = getSvgSize(svg);
  clone.removeAttribute("style");
  clone.setAttribute("width", String(size.width));
  clone.setAttribute("height", String(size.height));
  clone.setAttribute("preserveAspectRatio", "xMidYMid meet");

  title.value = findDiagramTitle(diagram);
  diagramWidth.value = size.width;
  diagramHeight.value = size.height;
  pendingSvg = clone;
  zoom.value = size.width < 760 ? 1.35 : 1.1;
  isOpen.value = true;
  document.documentElement.classList.add("diagram-zoom-open");

  nextTick(() => {
    const content = contentRef.value;
    const stage = stageRef.value;
    if (!stage || !content || !pendingSvg) {
      return;
    }

    content.replaceChildren(pendingSvg);
    stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
    stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2);
    stage.focus();
  });
}

function enhanceDiagrams() {
  if (typeof document === "undefined") {
    return;
  }

  document.querySelectorAll(".vp-doc .mermaid").forEach((diagram) => {
    const svg = diagram.querySelector("svg");
    const existingTrigger = diagram.querySelector(":scope > .diagram-zoom-trigger");
    if (!svg || existingTrigger) {
      return;
    }

    diagram.dataset.zoomReady = "true";
    diagram.classList.add("diagram-zoomable");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "diagram-zoom-trigger";
    trigger.textContent = "+";
    trigger.setAttribute("aria-label", copy.value.open);
    trigger.setAttribute("title", copy.value.open);
    trigger.addEventListener("click", () => openDiagram(diagram));

    diagram.prepend(trigger);
  });
}

function closeModal() {
  isOpen.value = false;
  isDragging.value = false;
  pendingSvg = null;
  contentRef.value?.replaceChildren();
  document.documentElement.classList.remove("diagram-zoom-open");
}

function setZoom(nextZoom) {
  const stage = stageRef.value;
  const previousZoom = zoom.value;
  const boundedZoom = Math.min(3, Math.max(0.6, Number(nextZoom.toFixed(2))));
  if (boundedZoom === previousZoom) {
    return;
  }

  const centerX = stage ? stage.scrollLeft + stage.clientWidth / 2 : 0;
  const centerY = stage ? stage.scrollTop + stage.clientHeight / 2 : 0;
  zoom.value = boundedZoom;

  nextTick(() => {
    if (!stage) {
      return;
    }

    const ratio = boundedZoom / previousZoom;
    stage.scrollLeft = centerX * ratio - stage.clientWidth / 2;
    stage.scrollTop = centerY * ratio - stage.clientHeight / 2;
  });
}

function startPan(event) {
  const stage = stageRef.value;
  if (!stage) {
    return;
  }

  isDragging.value = true;
  panStartX = event.clientX;
  panStartY = event.clientY;
  panScrollLeft = stage.scrollLeft;
  panScrollTop = stage.scrollTop;
  stage.setPointerCapture?.(event.pointerId);
}

function movePan(event) {
  const stage = stageRef.value;
  if (!stage || !isDragging.value) {
    return;
  }

  stage.scrollLeft = panScrollLeft - (event.clientX - panStartX);
  stage.scrollTop = panScrollTop - (event.clientY - panStartY);
}

function endPan(event) {
  stageRef.value?.releasePointerCapture?.(event.pointerId);
  isDragging.value = false;
}

function handleKeydown(event) {
  if (!isOpen.value) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
  } else if (event.key === "+" || event.key === "=") {
    setZoom(zoom.value + 0.2);
  } else if (event.key === "-") {
    setZoom(zoom.value - 0.2);
  } else if (event.key === "0") {
    setZoom(1);
  }
}

onMounted(() => {
  scheduleEnhanceRetries();
  observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("keydown", handleKeydown);
});

watch(
  () => route.path,
  () => {
    closeModal();
    nextTick(scheduleEnhanceRetries);
  }
);

onBeforeUnmount(() => {
  observer?.disconnect();
  window.clearTimeout(debounceTimer);
  retryTimers.forEach((timer) => window.clearTimeout(timer));
  window.removeEventListener("keydown", handleKeydown);
  document.documentElement.classList.remove("diagram-zoom-open");
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="diagram-zoom-modal" role="dialog" aria-modal="true" :aria-label="copy.title" @click.self="closeModal">
      <div class="diagram-zoom-toolbar">
        <div class="diagram-zoom-title">
          <span>{{ copy.title }}</span>
          <strong>{{ title }}</strong>
        </div>
        <div class="diagram-zoom-actions">
          <button type="button" :aria-label="copy.zoomOut" :title="copy.zoomOut" @click="setZoom(zoom - 0.2)">-</button>
          <button type="button" :aria-label="copy.reset" :title="copy.reset" @click="setZoom(1)">1:1</button>
          <button type="button" :aria-label="copy.zoomIn" :title="copy.zoomIn" @click="setZoom(zoom + 0.2)">+</button>
          <button type="button" :aria-label="copy.close" :title="copy.close" @click="closeModal">x</button>
        </div>
      </div>
      <div
        ref="stageRef"
        class="diagram-zoom-stage"
        :class="{ dragging: isDragging }"
        tabindex="0"
        @pointerdown="startPan"
        @pointermove="movePan"
        @pointerup="endPan"
        @pointercancel="endPan"
        @pointerleave="endPan"
      >
        <div class="diagram-zoom-canvas" :style="canvasStyle">
          <div ref="contentRef" class="diagram-zoom-content" :style="contentStyle"></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
