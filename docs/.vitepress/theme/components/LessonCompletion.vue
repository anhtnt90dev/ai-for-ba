<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, withBase } from "vitepress";

const route = useRoute();
const completed = ref([]);
const pulse = ref(false);

const locale = computed(() => (/\/en\/lessons\//.test(route.path) ? "en" : "vi"));
const slug = computed(() => route.path.match(/\/(?:en|vi)\/lessons\/([^/]+)\/?$/)?.[1] || "");
const showPanel = computed(() => Boolean(slug.value));
const storageKey = computed(() => `ai-for-ba-pixel-quest-${locale.value}`);
const isComplete = computed(() => completed.value.includes(slug.value));
const xp = computed(() => completed.value.length * 120);
const rootMapHref = computed(() => withBase("/"));
const mapHref = computed(() => (slug.value ? `${rootMapHref.value}?quest=${encodeURIComponent(slug.value)}` : rootMapHref.value));

const copy = computed(() =>
  locale.value === "vi"
    ? {
        kicker: "Tiến độ học",
        title: "Đã đọc xong bài này?",
        doneTitle: "Bài này đã được ghi nhận",
        body: "Ghi nhận hoàn thành để cộng XP trên Pixel Quest và mở tiến độ tiếp theo trên map.",
        saved: "Tiến độ đã được lưu. Quay lại map để xem XP và quest tiếp theo.",
        reward: "Phần thưởng",
        complete: "Ghi nhận hoàn thành +120 XP",
        completed: "Đã ghi nhận +120 XP",
        map: "Về map trang chủ"
      }
    : {
        kicker: "Learning progress",
        title: "Finished this lesson?",
        doneTitle: "This lesson is recorded",
        body: "Record completion to add XP in Pixel Quest and unlock the next map progress.",
        saved: "Progress saved. Return to the map to see XP and the next quest.",
        reward: "Reward",
        complete: "Record completion +120 XP",
        completed: "Recorded +120 XP",
        map: "Back to home map"
      }
);

function readCompleted() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey.value) || "[]");
    completed.value = Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    completed.value = [];
  }
}

function markComplete() {
  if (!slug.value || isComplete.value || typeof window === "undefined") {
    return;
  }

  const nextCompleted = [...completed.value, slug.value];
  completed.value = nextCompleted;
  window.localStorage.setItem(storageKey.value, JSON.stringify(nextCompleted));
  pulse.value = true;
  window.setTimeout(() => {
    pulse.value = false;
  }, 1800);
}

onMounted(() => {
  readCompleted();
  window.addEventListener("storage", readCompleted);
});

watch(
  () => route.path,
  () => {
    readCompleted();
  }
);

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("storage", readCompleted);
  }
});
</script>

<template>
  <section v-if="showPanel" class="lesson-completion-panel" :class="{ saved: isComplete || pulse }" aria-label="Lesson completion progress">
    <div class="lesson-completion-copy">
      <span>{{ copy.kicker }}</span>
      <h2>{{ isComplete ? copy.doneTitle : copy.title }}</h2>
      <p>{{ isComplete ? copy.saved : copy.body }}</p>
    </div>
    <div class="lesson-completion-stats">
      <span>XP <strong>{{ xp }}</strong></span>
      <span>{{ copy.reward }} <strong>+120 XP</strong></span>
    </div>
    <div class="lesson-completion-actions">
      <button class="lesson-completion-button primary" type="button" :disabled="isComplete" @click="markComplete">
        {{ isComplete ? copy.completed : copy.complete }}
      </button>
      <a class="lesson-completion-button" :href="mapHref">{{ copy.map }}</a>
    </div>
  </section>
</template>
