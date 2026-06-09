<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, withBase } from "vitepress";

const props = defineProps({
  position: {
    type: String,
    default: "top"
  }
});

const route = useRoute();
const isGameMode = ref(false);
const completed = ref([]);
const completionPulse = ref(false);

const locale = computed(() => (route.path.startsWith("/en/") ? "en" : "vi"));
const slug = computed(() => route.path.match(/\/(?:en|vi)\/lessons\/([^/]+)\/?$/)?.[1] || "");
const isLesson = computed(() => Boolean(slug.value));
const showChrome = computed(() => isGameMode.value && isLesson.value);
const storageKey = computed(() => `ai-for-ba-pixel-quest-${locale.value}`);
const completedCount = computed(() => completed.value.length);
const xp = computed(() => completedCount.value * 120);
const level = computed(() => Math.min(6, Math.floor(completedCount.value / 4) + 1));
const isComplete = computed(() => completed.value.includes(slug.value));
const gameHref = computed(() => withBase("/"));
const normalHref = computed(() => {
  const basePath = withBase("/");
  return route.path.startsWith(basePath) ? route.path : withBase(route.path);
});

const copy = computed(() =>
  locale.value === "vi"
    ? {
        mode: "Game lesson mode",
        quest: "Quest đang đọc",
        xp: "XP",
        level: "Level",
        complete: "Hoàn thành quest +120 XP",
        completed: "Quest đã ghi nhận +120 XP",
        map: "Về trang chủ game",
        normal: "Đọc dạng tài liệu thường",
        bottom: "Đọc xong bài này thì ghi nhận hoàn thành để XP trên Pixel Quest tăng.",
        saved: "Đã lưu tiến độ. Về trang chủ game để thấy XP và quest tiếp theo."
      }
    : {
        mode: "Game lesson mode",
        quest: "Current quest",
        xp: "XP",
        level: "Level",
        complete: "Complete quest +120 XP",
        completed: "Quest recorded +120 XP",
        map: "Back to game home",
        normal: "Read normal docs",
        bottom: "When you finish this lesson, record completion so Pixel Quest XP increases.",
        saved: "Progress saved. Return to the game home to see XP and the next quest."
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

function syncMode() {
  if (typeof window === "undefined") {
    return;
  }
  isGameMode.value = new URLSearchParams(window.location.search).get("mode") === "game";
  document.documentElement.classList.toggle("game-lesson-mode", showChrome.value);
  readCompleted();
}

function markComplete() {
  if (!slug.value || isComplete.value || typeof window === "undefined") {
    return;
  }
  const nextCompleted = [...completed.value, slug.value];
  completed.value = nextCompleted;
  window.localStorage.setItem(storageKey.value, JSON.stringify(nextCompleted));
  completionPulse.value = true;
  window.setTimeout(() => {
    completionPulse.value = false;
  }, 2200);
}

function leaveGameMode() {
  isGameMode.value = false;
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("game-lesson-mode");
  }
}

onMounted(() => {
  syncMode();
  window.addEventListener("popstate", syncMode);
});

watch(
  () => route.path,
  () => {
    syncMode();
  }
);

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("popstate", syncMode);
    document.documentElement.classList.remove("game-lesson-mode");
  }
});
</script>

<template>
  <section v-if="showChrome && props.position === 'top'" class="game-lesson-hud" aria-label="Pixel Quest lesson progress">
    <div>
      <span>{{ copy.mode }}</span>
      <strong>{{ copy.quest }}</strong>
    </div>
    <div class="game-lesson-stats">
      <span>{{ copy.xp }} <strong>{{ xp }}</strong></span>
      <span>{{ copy.level }} <strong>{{ level }}</strong></span>
    </div>
    <div class="game-lesson-actions">
      <a class="game-lesson-button" :href="gameHref">{{ copy.map }}</a>
      <a class="game-lesson-button subtle" :href="normalHref" @click="leaveGameMode">{{ copy.normal }}</a>
    </div>
  </section>

  <section v-if="showChrome && props.position === 'bottom'" class="game-lesson-complete" :class="{ saved: isComplete || completionPulse }">
    <p>{{ isComplete ? copy.saved : copy.bottom }}</p>
    <button class="game-lesson-button primary" type="button" :disabled="isComplete" @click="markComplete">
      {{ isComplete ? copy.completed : copy.complete }}
    </button>
    <a class="game-lesson-button" :href="gameHref">{{ copy.map }}</a>
  </section>
</template>
