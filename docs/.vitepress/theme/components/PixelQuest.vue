<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  locale: {
    type: String,
    default: "en"
  },
  mode: {
    type: String,
    default: "page"
  }
});

const text = computed(() =>
  props.locale === "vi"
    ? {
        kicker: "Retro BA Learning Game",
        title: "AI for BA: Pixel Quest",
        subtitle: "Điều khiển nhân vật pixel qua bản đồ, mở khóa từng quest AI và biến course thành một hành trình học có tiến độ.",
        progress: "Tiến độ",
        completed: "đã hoàn thành",
        xpLabel: "XP",
        levelLabel: "Level",
        nextQuest: "Quest kế tiếp",
        start: "Vào bài học",
        mark: "Đánh dấu hoàn thành",
        unmark: "Bỏ hoàn thành",
        locked: "Cổng đang khóa. Hoàn thành quest trước để mở.",
        unlocked: "Quest đã sẵn sàng.",
        reset: "Reset tiến độ",
        briefing: "Mission briefing",
        reward: "Phần thưởng BA nhận được",
        zone: "Vùng",
        controls: "Điều khiển",
        keyboard: "WASD hoặc phím mũi tên để di chuyển. Click hoặc tap vào map để đi nhanh. Chọn quest, vào bài học, rồi đánh dấu hoàn thành.",
        mentor: "Mentor BA",
        mentorLine: "Mỗi cổng là một quality gate. Bạn chỉ mở được vùng mới khi artifact ở vùng trước đã đủ rõ để team delivery dùng được.",
        fullGame: "Mở trang game đầy đủ",
        classicView: "Xem course truyền thống",
        source: "Sprite nhân vật: Pixel Agents, MIT, từ GitHub repo pixel-agents-hq/pixel-agents."
      }
    : {
        kicker: "Retro BA Learning Game",
        title: "AI for BA: Pixel Quest",
        subtitle: "Move a pixel character through the map, unlock AI quests, and turn the course into a progress-driven learning journey.",
        progress: "Progress",
        completed: "completed",
        xpLabel: "XP",
        levelLabel: "Level",
        nextQuest: "Next quest",
        start: "Enter lesson",
        mark: "Mark complete",
        unmark: "Unmark",
        locked: "Gate is locked. Complete the previous quest to open it.",
        unlocked: "Quest is ready.",
        reset: "Reset progress",
        briefing: "Mission briefing",
        reward: "BA reward",
        zone: "Zone",
        controls: "Controls",
        keyboard: "Use WASD or arrow keys to move. Click or tap the map to travel quickly. Select a quest, enter the lesson, then mark it complete.",
        mentor: "BA Mentor",
        mentorLine: "Each gate is a quality gate. You only open the next area when the previous BA artifact is clear enough for delivery teams to use.",
        fullGame: "Open full game page",
        classicView: "Classic course view",
        source: "Hero sprite: Pixel Agents, MIT, from the pixel-agents-hq/pixel-agents GitHub repository."
      }
);

const zoneMeta = {
  village: {
    name: { en: "AI Village", vi: "Làng AI" },
    className: "zone-village"
  },
  forest: {
    name: { en: "Prompt Forest", vi: "Rừng Prompt" },
    className: "zone-forest"
  },
  castle: {
    name: { en: "Requirement Castle", vi: "Lâu đài Requirement" },
    className: "zone-castle"
  },
  dungeon: {
    name: { en: "Diagram Dungeon", vi: "Hầm Diagram" },
    className: "zone-dungeon"
  },
  lab: {
    name: { en: "AI Product Lab", vi: "Phòng lab AI Product" },
    className: "zone-lab"
  },
  tower: {
    name: { en: "Governance Tower", vi: "Tháp Governance" },
    className: "zone-tower"
  }
};

const quests = [
  {
    slug: "ai-landscape-for-ba",
    zone: "village",
    x: 8,
    y: 60,
    en: {
      title: "AI Landscape for BAs",
      mission: "Learn how to classify AI opportunities before naming a tool or solution.",
      reward: "You can separate useful AI work from hype-driven requests."
    },
    vi: {
      title: "Bức tranh AI cho BA",
      mission: "Học cách phân loại cơ hội AI trước khi gọi tên tool hoặc solution.",
      reward: "Bạn tách được AI có giá trị khỏi request chạy theo hype."
    }
  },
  {
    slug: "llm-mental-model",
    zone: "village",
    x: 18,
    y: 45,
    en: {
      title: "LLM Mental Model",
      mission: "Understand what language models are good at and where they need review.",
      reward: "You can use AI output as a candidate artifact, not final truth."
    },
    vi: {
      title: "Mô hình tư duy về LLM",
      mission: "Hiểu model ngôn ngữ giỏi việc gì và cần review ở đâu.",
      reward: "Bạn dùng output AI như candidate artifact, không xem là final truth."
    }
  },
  {
    slug: "tokens-context-and-memory",
    zone: "village",
    x: 30,
    y: 58,
    en: {
      title: "Tokens, Context, and Memory",
      mission: "Control what context the model can actually see and use.",
      reward: "You can build source packs that reduce shallow summaries and missed constraints."
    },
    vi: {
      title: "Token, context và trí nhớ",
      mission: "Kiểm soát context mà model thật sự nhìn thấy và sử dụng.",
      reward: "Bạn tạo source pack giảm summary nông và miss constraint."
    }
  },
  {
    slug: "hallucination-and-source-grounding",
    zone: "village",
    x: 38,
    y: 40,
    en: {
      title: "Hallucination and Grounding",
      mission: "Learn to separate sourced facts, assumptions, and unsupported claims.",
      reward: "You can keep AI drafts evidence-backed and reviewable."
    },
    vi: {
      title: "Hallucination và grounding",
      mission: "Tách fact có source, assumption và claim không có evidence.",
      reward: "Bạn giữ AI draft có evidence và review được."
    }
  },
  {
    slug: "embeddings-rag-and-knowledge",
    zone: "village",
    x: 48,
    y: 56,
    en: {
      title: "Embeddings, RAG, and Knowledge",
      mission: "Explore how retrieval and source authority shape knowledge assistants.",
      reward: "You can specify RAG behavior without treating search as magic."
    },
    vi: {
      title: "Embeddings, RAG và tri thức",
      mission: "Khám phá retrieval và source authority trong knowledge assistant.",
      reward: "Bạn đặc tả RAG mà không xem search là magic."
    }
  },
  {
    slug: "discovery-with-ai",
    zone: "forest",
    x: 12,
    y: 25,
    en: {
      title: "Discovery With AI",
      mission: "Use AI to expand discovery questions while keeping evidence discipline.",
      reward: "You can turn messy early input into testable hypotheses."
    },
    vi: {
      title: "Discovery với AI",
      mission: "Dùng AI mở rộng câu hỏi discovery nhưng vẫn giữ evidence discipline.",
      reward: "Bạn biến input đầu dự án thành hypothesis test được."
    }
  },
  {
    slug: "stakeholder-interviews-and-synthesis",
    zone: "forest",
    x: 22,
    y: 18,
    en: {
      title: "Stakeholder Interviews",
      mission: "Synthesize interviews without losing conflicts, decisions, and open questions.",
      reward: "You can brief stakeholders with clarity instead of raw notes."
    },
    vi: {
      title: "Phỏng vấn stakeholder",
      mission: "Synthesize interview mà không mất conflict, decision và open question.",
      reward: "Bạn brief stakeholder rõ ràng thay vì share raw notes."
    }
  },
  {
    slug: "user-stories-and-acceptance-criteria",
    zone: "castle",
    x: 38,
    y: 22,
    en: {
      title: "User Stories and Acceptance Criteria",
      mission: "Make stories testable by exposing actor, behavior, rule, data, and edge cases.",
      reward: "You can give developers and QA backlog items they can estimate and test."
    },
    vi: {
      title: "User story và acceptance criteria",
      mission: "Làm story test được bằng actor, behavior, rule, data và edge case.",
      reward: "Bạn đưa backlog item mà developer và QA estimate/test được."
    }
  },
  {
    slug: "process-modeling-with-ai",
    zone: "dungeon",
    x: 54,
    y: 28,
    en: {
      title: "Process Modeling With AI",
      mission: "Use diagrams to expose workflow decisions, exceptions, and ownership.",
      reward: "You can turn process discussion into a validated model."
    },
    vi: {
      title: "Mô hình hóa quy trình với AI",
      mission: "Dùng diagram để làm lộ decision, exception và ownership của workflow.",
      reward: "Bạn biến thảo luận process thành model đã validate."
    }
  },
  {
    slug: "context-engineering-patterns",
    zone: "forest",
    x: 62,
    y: 18,
    en: {
      title: "Context Engineering Patterns",
      mission: "Package goals, sources, constraints, and output format before prompting.",
      reward: "You can get more reliable AI output from repeatable context patterns."
    },
    vi: {
      title: "Mẫu context engineering",
      mission: "Đóng gói goal, source, constraint và output format trước khi prompt.",
      reward: "Bạn tạo output AI ổn định hơn bằng context pattern tái sử dụng."
    }
  },
  {
    slug: "review-loops-and-critique",
    zone: "forest",
    x: 72,
    y: 30,
    en: {
      title: "Review Loops and Critique",
      mission: "Use AI as a critic while keeping human accountability.",
      reward: "You can improve artifacts before stakeholder review."
    },
    vi: {
      title: "Vòng review và critique",
      mission: "Dùng AI như critic nhưng vẫn giữ accountability của con người.",
      reward: "Bạn cải thiện artifact trước khi stakeholder review."
    }
  },
  {
    slug: "structured-outputs-and-reusable-prompts",
    zone: "forest",
    x: 82,
    y: 18,
    en: {
      title: "Structured Outputs and Prompts",
      mission: "Design prompts that return matrices, rubrics, and reviewable structures.",
      reward: "You can reuse prompts across BA workflows with less rework."
    },
    vi: {
      title: "Structured output và prompt tái sử dụng",
      mission: "Thiết kế prompt trả về matrix, rubric và structure review được.",
      reward: "Bạn tái sử dụng prompt trong BA workflow với ít rework hơn."
    }
  },
  {
    slug: "ambiguity-conflict-and-gap-analysis",
    zone: "castle",
    x: 30,
    y: 76,
    en: {
      title: "Ambiguity, Conflict, and Gaps",
      mission: "Find unclear wording, conflicting rules, and missing decisions.",
      reward: "You can convert uncertainty into named questions and owners."
    },
    vi: {
      title: "Mơ hồ, xung đột và khoảng trống",
      mission: "Tìm wording mơ hồ, rule conflict và decision bị thiếu.",
      reward: "Bạn chuyển uncertainty thành câu hỏi và owner rõ."
    }
  },
  {
    slug: "non-functional-requirements-and-risk",
    zone: "castle",
    x: 42,
    y: 78,
    en: {
      title: "NFRs and Risk",
      mission: "Turn quality concerns into measurable requirements and trade-off decisions.",
      reward: "You can discuss performance, reliability, security, and privacy with rigor."
    },
    vi: {
      title: "NFR và rủi ro",
      mission: "Biến quality concern thành requirement đo được và trade-off decision.",
      reward: "Bạn trao đổi performance, reliability, security và privacy có cơ sở."
    }
  },
  {
    slug: "traceability-and-testability",
    zone: "castle",
    x: 54,
    y: 76,
    en: {
      title: "Traceability and Testability",
      mission: "Connect goals, requirements, tests, evidence, and release readiness.",
      reward: "You can prove whether a release is covered or risky."
    },
    vi: {
      title: "Traceability và testability",
      mission: "Nối goal, requirement, test, evidence và release readiness.",
      reward: "Bạn chứng minh release đã cover hay còn risky."
    }
  },
  {
    slug: "brd-srs-and-decision-artifacts",
    zone: "castle",
    x: 66,
    y: 78,
    en: {
      title: "BRD, SRS, and Decision Artifacts",
      mission: "Create formal artifacts without hiding assumptions or approval gaps.",
      reward: "You can produce documents that support delivery and governance."
    },
    vi: {
      title: "BRD, SRS và artifact quyết định",
      mission: "Tạo formal artifact mà không che assumption hoặc approval gap.",
      reward: "Bạn tạo document support delivery và governance."
    }
  },
  {
    slug: "diagramming-for-ba",
    zone: "dungeon",
    x: 78,
    y: 64,
    en: {
      title: "Diagramming for BA",
      mission: "Choose the right diagram for process, sequence, state, or rule questions.",
      reward: "You can make diagrams that drive decisions, not decoration."
    },
    vi: {
      title: "Diagramming cho BA",
      mission: "Chọn diagram đúng cho câu hỏi process, sequence, state hoặc rule.",
      reward: "Bạn tạo diagram giúp ra decision, không chỉ trang trí."
    }
  },
  {
    slug: "specifying-ai-enabled-features",
    zone: "lab",
    x: 48,
    y: 88,
    en: {
      title: "Specifying AI-Enabled Features",
      mission: "Specify AI tasks, outputs, uncertainty, review, fallback, and evaluation.",
      reward: "You can write requirements for AI features that teams can build safely."
    },
    vi: {
      title: "Đặc tả tính năng có AI",
      mission: "Đặc tả AI task, output, uncertainty, review, fallback và evaluation.",
      reward: "Bạn viết requirement cho AI feature mà team build an toàn được."
    }
  },
  {
    slug: "human-in-the-loop-monitoring-and-fallback",
    zone: "lab",
    x: 62,
    y: 90,
    en: {
      title: "Human Review, Monitoring, and Fallback",
      mission: "Design controls for AI confidence, correction, escalation, and operations.",
      reward: "You can prevent AI features from becoming black-box production risks."
    },
    vi: {
      title: "Human review, monitoring và fallback",
      mission: "Thiết kế control cho confidence, correction, escalation và operations.",
      reward: "Bạn ngăn AI feature thành rủi ro black-box ở production."
    }
  },
  {
    slug: "ai-strategy-governance-and-adoption",
    zone: "tower",
    x: 84,
    y: 82,
    en: {
      title: "AI Strategy, Governance, and Adoption",
      mission: "Scale AI use with policy, metrics, quality gates, and team rituals.",
      reward: "You can lead responsible AI adoption for a BA practice."
    },
    vi: {
      title: "AI strategy, governance và adoption",
      mission: "Scale AI use bằng policy, metric, quality gate và team ritual.",
      reward: "Bạn dẫn dắt AI adoption có trách nhiệm cho BA practice."
    }
  }
];

const gates = [
  { afterIndex: 4, x: 52, y: 50, label: { en: "Knowledge Gate", vi: "Cổng tri thức" } },
  { afterIndex: 7, x: 33, y: 36, label: { en: "Discovery Gate", vi: "Cổng discovery" } },
  { afterIndex: 12, x: 74, y: 43, label: { en: "Prompt Gate", vi: "Cổng prompt" } },
  { afterIndex: 16, x: 72, y: 76, label: { en: "Artifact Gate", vi: "Cổng artifact" } }
];

const npcs = [
  { x: 14, y: 64, name: { en: "Product Owner", vi: "Product Owner" } },
  { x: 56, y: 34, name: { en: "Tech Lead", vi: "Tech Lead" } },
  { x: 80, y: 78, name: { en: "AI Reviewer", vi: "AI Reviewer" } }
];

const completed = ref([]);
const selectedSlug = ref(quests[0].slug);
const playerPosition = ref({ x: quests[0].x, y: quests[0].y });
const playerDirection = ref("right");
const isMoving = ref(false);
const stepFrame = ref(0);
const mapRef = ref(null);
let moveTimer;

const storageKey = computed(() => `ai-for-ba-pixel-quest-${props.locale}`);
const completedCount = computed(() => completed.value.length);
const percent = computed(() => Math.round((completedCount.value / quests.length) * 100));
const xp = computed(() => completedCount.value * 120);
const level = computed(() => Math.min(6, Math.floor(completedCount.value / 4) + 1));
const unlockedCount = computed(() => quests.filter((quest, index) => isUnlocked(index)).length);
const selectedQuest = computed(() => quests.find((quest) => quest.slug === selectedSlug.value) || quests[0]);
const selectedIndex = computed(() => quests.findIndex((quest) => quest.slug === selectedQuest.value.slug));
const selectedCopy = computed(() => selectedQuest.value[props.locale] || selectedQuest.value.en);
const selectedZone = computed(() => zoneMeta[selectedQuest.value.zone]);
const nextQuest = computed(() => quests.find((quest, index) => !isComplete(quest.slug) && isUnlocked(index)) || quests[quests.length - 1]);
const nextQuestCopy = computed(() => nextQuest.value[props.locale] || nextQuest.value.en);
const homeMode = computed(() => props.mode === "home");
const landingMode = computed(() => props.mode === "landing");
const agentSheet = computed(() => withBase(`/assets/pixel-agents/char_${Math.min(5, level.value - 1)}.png`));
const agentSpriteStyle = computed(() => {
  const frame = isMoving.value ? (stepFrame.value % 6) + 1 : 0;
  return {
    "--agent-sheet": `url("${agentSheet.value}")`,
    "--agent-x": `-${frame * 48}px`,
    "--agent-y": "0px"
  };
});
const avatarClass = computed(() => ({
  "is-moving": isMoving.value,
  "face-left": playerDirection.value === "left",
  "face-right": playerDirection.value !== "left"
}));

function questCopy(quest) {
  return quest[props.locale] || quest.en;
}

function lessonHref(slug) {
  return withBase(`/${props.locale}/lessons/${slug}/`);
}

function gameHref() {
  return withBase(`/${props.locale}/game/`);
}

function languageHref(locale) {
  return withBase(`/${locale}/`);
}

function isComplete(slug) {
  return completed.value.includes(slug);
}

function isUnlocked(index) {
  return index === 0 || isComplete(quests[index - 1].slug) || isComplete(quests[index].slug);
}

function isQuestAccessible(index) {
  return landingMode.value || isUnlocked(index);
}

function questHref(quest, index) {
  return isQuestAccessible(index) ? lessonHref(quest.slug) : undefined;
}

function isGateOpen(gate) {
  return landingMode.value || isComplete(quests[gate.afterIndex].slug);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distanceToQuest(quest) {
  return Math.hypot(playerPosition.value.x - quest.x, playerPosition.value.y - quest.y);
}

function nearestUnlockedQuest() {
  return quests
    .map((quest, index) => ({ quest, index, distance: distanceToQuest(quest) }))
    .filter((item) => isUnlocked(item.index))
    .sort((a, b) => a.distance - b.distance)[0];
}

function selectNearbyQuest() {
  const nearest = nearestUnlockedQuest();
  if (nearest && nearest.distance <= 8.5) {
    selectedSlug.value = nearest.quest.slug;
  }
}

function setPlayerPosition(x, y) {
  playerPosition.value = {
    x: clamp(x, 4, 94),
    y: clamp(y, 10, 92)
  };
}

function setMoveFeedback() {
  isMoving.value = true;
  stepFrame.value += 1;
  if (moveTimer) {
    window.clearTimeout(moveTimer);
  }
  moveTimer = window.setTimeout(() => {
    isMoving.value = false;
  }, 180);
}

function movePlayer(dx, dy) {
  if (dx < 0) {
    playerDirection.value = "left";
  } else if (dx > 0) {
    playerDirection.value = "right";
  }
  setPlayerPosition(playerPosition.value.x + dx, playerPosition.value.y + dy);
  setMoveFeedback();
  selectNearbyQuest();
}

function travelToQuest(quest) {
  if (quest.x < playerPosition.value.x) {
    playerDirection.value = "left";
  } else {
    playerDirection.value = "right";
  }
  setPlayerPosition(quest.x, quest.y);
  setMoveFeedback();
}

function selectQuest(quest, options = {}) {
  selectedSlug.value = quest.slug;
  if (options.jumpToNode) {
    travelToQuest(quest);
  }
}

function handleQuestNodeClick(quest, index, event) {
  selectQuest(quest, { jumpToNode: true });
  if (!landingMode.value || !isQuestAccessible(index)) {
    event.preventDefault();
  }
}

function handleMapClick(event) {
  if (!mapRef.value) {
    return;
  }
  const rect = mapRef.value.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  if (x < playerPosition.value.x) {
    playerDirection.value = "left";
  } else {
    playerDirection.value = "right";
  }
  setPlayerPosition(x, y);
  setMoveFeedback();
  selectNearbyQuest();
}

function saveProgress(nextCompleted) {
  completed.value = nextCompleted;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey.value, JSON.stringify(nextCompleted));
  }
}

function toggleComplete(slug) {
  if (isComplete(slug)) {
    saveProgress(completed.value.filter((item) => item !== slug));
    return;
  }

  saveProgress([...completed.value, slug]);
  const currentIndex = quests.findIndex((quest) => quest.slug === slug);
  const next = quests[currentIndex + 1];
  if (next) {
    selectQuest(next, { jumpToNode: true });
  }
}

function resetProgress() {
  saveProgress([]);
  selectedSlug.value = quests[0].slug;
  setPlayerPosition(quests[0].x, quests[0].y);
}

function handleKeyDown(event) {
  const tag = event.target?.tagName?.toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) {
    return;
  }

  const key = event.key.toLowerCase();
  const step = landingMode.value ? 5 : homeMode.value ? 3.4 : 4;
  const moves = {
    arrowleft: [-step, 0],
    a: [-step, 0],
    arrowright: [step, 0],
    d: [step, 0],
    arrowup: [0, -step],
    w: [0, -step],
    arrowdown: [0, step],
    s: [0, step]
  };

  const move = moves[key];
  if (!move) {
    return;
  }

  event.preventDefault();
  movePlayer(move[0], move[1]);
}

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(storageKey.value);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      completed.value = parsed.filter((slug) => quests.some((quest) => quest.slug === slug));
    }
    const unlockedNextQuest = quests.find((quest, index) => !isComplete(quest.slug) && isUnlocked(index));
    const initialQuest = unlockedNextQuest || quests[quests.length - 1];
    selectedSlug.value = initialQuest.slug;
    setPlayerPosition(initialQuest.x, initialQuest.y);
  } catch {
    completed.value = [];
  }
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  if (moveTimer) {
    window.clearTimeout(moveTimer);
  }
});
</script>

<template>
  <section class="pixel-quest" :class="{ 'pixel-quest-home': homeMode, 'pixel-quest-landing': landingMode }">
    <div class="pixel-hero">
      <div class="pixel-title-copy">
        <p class="pixel-kicker">{{ text.kicker }}</p>
        <h2>{{ text.title }}</h2>
        <p>{{ text.subtitle }}</p>
        <div class="pixel-hero-actions">
          <a v-if="landingMode" class="pixel-button primary" :href="languageHref('vi')">Tiếng Việt</a>
          <a v-if="landingMode" class="pixel-button subtle" :href="languageHref('en')">English</a>
          <a v-if="homeMode" class="pixel-button primary" :href="gameHref()">{{ text.fullGame }}</a>
          <a v-if="homeMode" class="pixel-button subtle" href="#classic-course-view">{{ text.classicView }}</a>
        </div>
      </div>
      <div class="pixel-stats" aria-live="polite">
        <div>
          <strong>{{ percent }}%</strong>
          <span>{{ completedCount }}/{{ quests.length }} {{ text.completed }}</span>
        </div>
        <div>
          <strong>{{ xp }}</strong>
          <span>{{ text.xpLabel }}</span>
        </div>
        <div>
          <strong>{{ level }}</strong>
          <span>{{ text.levelLabel }}</span>
        </div>
      </div>
    </div>

    <div class="pixel-progress-track" :aria-label="`${text.progress}: ${percent}%`">
      <div class="pixel-progress-fill" :style="{ width: `${percent}%` }"></div>
    </div>

    <div class="pixel-layout">
      <div class="pixel-stage">
        <div class="pixel-map-toolbar">
          <div>
            <span>{{ text.nextQuest }}</span>
            <strong>{{ nextQuestCopy.title }}</strong>
          </div>
          <div class="pixel-control-copy">{{ text.controls }}: WASD</div>
        </div>

        <div ref="mapRef" class="pixel-map" tabindex="0" aria-label="Pixel Quest lesson map" @click="handleMapClick">
          <div class="terrain terrain-water"></div>
          <div class="terrain terrain-road road-a"></div>
          <div class="terrain terrain-road road-b"></div>
          <div class="terrain terrain-road road-c"></div>
          <div class="terrain region-village"></div>
          <div class="terrain region-forest"></div>
          <div class="terrain region-castle"></div>
          <div class="terrain region-dungeon"></div>
          <div class="terrain region-lab"></div>
          <div class="terrain region-tower"></div>
          <div class="terrain pixel-tree tree-a"></div>
          <div class="terrain pixel-tree tree-b"></div>
          <div class="terrain pixel-tree tree-c"></div>
          <div class="terrain pixel-house house-a"></div>
          <div class="terrain pixel-house house-b"></div>

          <div
            v-for="gate in gates"
            :key="gate.label.en"
            class="pixel-gate"
            :class="{ open: isGateOpen(gate) }"
            :style="{ left: `${gate.x}%`, top: `${gate.y}%` }"
          >
            <span>{{ isGateOpen(gate) ? "OPEN" : "LOCK" }}</span>
          </div>

          <div
            v-for="npc in npcs"
            :key="npc.name.en"
            class="pixel-npc"
            :style="{ left: `${npc.x}%`, top: `${npc.y}%` }"
          >
            <span></span>
            <small>{{ npc.name[props.locale] || npc.name.en }}</small>
          </div>

          <a
            v-for="(quest, index) in quests"
            :key="quest.slug"
            class="quest-node"
            :class="[
              zoneMeta[quest.zone].className,
              {
                complete: isComplete(quest.slug),
                locked: !isQuestAccessible(index),
                active: selectedQuest.slug === quest.slug
              }
            ]"
            :style="{ left: `${quest.x}%`, top: `${quest.y}%` }"
            :href="questHref(quest, index)"
            :aria-label="`${index + 1}. ${questCopy(quest).title}`"
            @click.stop="handleQuestNodeClick(quest, index, $event)"
          >
            <span>{{ index + 1 }}</span>
          </a>

          <div class="pixel-avatar" :class="avatarClass" :style="{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }">
            <div class="pixel-agent-hero" :style="agentSpriteStyle" aria-hidden="true"></div>
          </div>
        </div>

        <div class="pixel-dpad" aria-label="Pixel Quest movement controls">
          <button type="button" @click="movePlayer(0, -4)">W</button>
          <button type="button" @click="movePlayer(-4, 0)">A</button>
          <button type="button" @click="movePlayer(0, 4)">S</button>
          <button type="button" @click="movePlayer(4, 0)">D</button>
        </div>
      </div>

      <aside class="quest-panel">
        <div class="mentor-card">
          <div class="mentor-avatar"></div>
          <div>
            <strong>{{ text.mentor }}</strong>
            <p>{{ text.mentorLine }}</p>
          </div>
        </div>

        <div class="quest-zone">{{ text.zone }}: {{ selectedZone.name[props.locale] || selectedZone.name.en }}</div>
        <h3>{{ selectedCopy.title }}</h3>
        <p class="quest-status">{{ isQuestAccessible(selectedIndex) ? text.unlocked : text.locked }}</p>

        <h4>{{ text.briefing }}</h4>
        <p>{{ selectedCopy.mission }}</p>

        <h4>{{ text.reward }}</h4>
        <p>{{ selectedCopy.reward }}</p>

        <div class="quest-actions">
          <a class="pixel-button primary" :class="{ disabled: !isQuestAccessible(selectedIndex) }" :href="isQuestAccessible(selectedIndex) ? lessonHref(selectedQuest.slug) : undefined">
            {{ text.start }}
          </a>
          <button v-if="!landingMode" class="pixel-button" type="button" :disabled="!isQuestAccessible(selectedIndex)" @click="toggleComplete(selectedQuest.slug)">
            {{ isComplete(selectedQuest.slug) ? text.unmark : text.mark }}
          </button>
          <button v-if="!landingMode" class="pixel-button subtle" type="button" @click="resetProgress">{{ text.reset }}</button>
        </div>

        <p class="quest-help">{{ text.keyboard }}</p>
        <p class="asset-source">{{ text.source }}</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.pixel-quest {
  --pixel-ink: #172033;
  --pixel-border: #27314f;
  --pixel-paper: #fff8df;
  --pixel-cream: #f7f0d6;
  --pixel-green: #4f9d55;
  --pixel-mint: #8bcf72;
  --pixel-blue: #2867c9;
  --pixel-gold: #d8a73f;
  --pixel-red: #c75f54;
  --pixel-purple: #7e67c9;
  --pixel-cyan: #4bb9c7;
  --pixel-road: #c4914a;
  margin: 24px 0 44px;
  color: var(--pixel-ink);
  font-family: ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

.pixel-quest-home {
  margin-top: 30px;
  margin-bottom: 52px;
}

.pixel-quest-landing {
  width: 100vw;
  min-height: calc(100vh - 64px);
  margin: 0 0 36px;
  margin-left: calc(50% - 50vw);
  padding: 16px clamp(12px, 2vw, 28px) 28px;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06) 2px, transparent 2px, transparent 16px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 2px, transparent 2px, transparent 16px),
    #202642;
}

.pixel-hero,
.pixel-layout,
.quest-panel,
.pixel-progress-track {
  border: 4px solid var(--pixel-border);
  border-radius: 0;
  box-shadow: 8px 8px 0 rgba(39, 49, 79, 0.2);
}

.pixel-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background:
    linear-gradient(135deg, rgba(75, 185, 199, 0.16), rgba(216, 167, 63, 0.22)),
    var(--pixel-paper);
}

.pixel-quest-landing .pixel-hero {
  grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
  padding: 16px 18px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.28);
}

.pixel-title-copy h2 {
  margin: 0 0 8px;
  color: var(--pixel-ink);
  font-size: 30px;
  line-height: 1.1;
}

.pixel-title-copy p {
  max-width: 760px;
  margin: 0;
  color: #34405f;
}

.pixel-kicker {
  margin-bottom: 8px !important;
  color: #8b4a2b !important;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.pixel-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.pixel-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(86px, 1fr));
  gap: 8px;
  min-width: 300px;
}

.pixel-stats div {
  border: 3px solid var(--pixel-border);
  padding: 10px;
  background: #fffaf0;
}

.pixel-stats strong {
  display: block;
  color: var(--pixel-ink);
  font-size: 26px;
  line-height: 1;
}

.pixel-stats span {
  display: block;
  margin-top: 6px;
  color: #4d5874;
  font-size: 12px;
  font-weight: 800;
}

.pixel-progress-track {
  height: 18px;
  margin: 16px 0 0;
  background: #d8dfca;
  box-shadow: 6px 6px 0 rgba(39, 49, 79, 0.14);
}

.pixel-progress-fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, var(--pixel-green), var(--pixel-green) 10px, #73bd6f 10px, #73bd6f 20px);
}

.pixel-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
  margin-top: 22px;
  padding: 18px;
  background: #e5cf91;
}

.pixel-quest-landing .pixel-layout {
  grid-template-columns: minmax(0, 1fr) minmax(300px, 360px);
  min-height: calc(100vh - 232px);
  margin-top: 16px;
  padding: 14px;
  background: #d9b86d;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.25);
}

.pixel-stage {
  min-width: 0;
}

.pixel-map-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  border: 4px solid var(--pixel-border);
  padding: 10px 12px;
  background: #fffaf0;
  box-shadow: 5px 5px 0 rgba(39, 49, 79, 0.14);
}

.pixel-map-toolbar span,
.pixel-control-copy {
  color: #5b6580;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.pixel-map-toolbar strong {
  display: block;
  margin-top: 3px;
  color: var(--pixel-ink);
  font-size: 14px;
}

.pixel-map {
  position: relative;
  min-height: 590px;
  overflow: hidden;
  border: 4px solid var(--pixel-border);
  outline: none;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.11) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.11) 1px, transparent 1px),
    #8fcf86;
  background-size: 32px 32px;
  cursor: crosshair;
  image-rendering: pixelated;
}

.pixel-quest-landing .pixel-map {
  height: calc(100vh - 316px);
  min-height: 520px;
}

.pixel-map:focus {
  box-shadow: inset 0 0 0 4px rgba(40, 103, 201, 0.42);
}

.terrain {
  position: absolute;
  pointer-events: none;
}

.terrain-water {
  right: -10%;
  top: 3%;
  width: 34%;
  height: 26%;
  border: 4px solid #226c8a;
  background:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.18) 6px, transparent 6px, transparent 16px),
    #5fb8d3;
}

.region-village {
  left: 3%;
  top: 36%;
  width: 50%;
  height: 30%;
  border: 3px solid rgba(39, 49, 79, 0.38);
  background: rgba(247, 240, 214, 0.72);
}

.region-forest {
  left: 6%;
  top: 8%;
  width: 86%;
  height: 28%;
  border: 3px solid rgba(39, 49, 79, 0.32);
  background:
    repeating-linear-gradient(90deg, rgba(38, 115, 70, 0.38), rgba(38, 115, 70, 0.38) 10px, transparent 10px, transparent 22px),
    repeating-linear-gradient(0deg, rgba(38, 115, 70, 0.18), rgba(38, 115, 70, 0.18) 8px, transparent 8px, transparent 20px),
    rgba(47, 123, 71, 0.42);
}

.region-castle {
  left: 24%;
  top: 68%;
  width: 46%;
  height: 20%;
  border: 3px solid rgba(39, 49, 79, 0.4);
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22) 14px, transparent 14px, transparent 28px),
    rgba(178, 177, 188, 0.68);
}

.region-dungeon {
  left: 51%;
  top: 42%;
  width: 33%;
  height: 30%;
  border: 3px solid rgba(39, 49, 79, 0.46);
  background:
    repeating-linear-gradient(45deg, rgba(39, 49, 79, 0.22), rgba(39, 49, 79, 0.22) 8px, transparent 8px, transparent 18px),
    rgba(83, 73, 103, 0.48);
}

.region-lab {
  left: 42%;
  top: 84%;
  width: 27%;
  height: 12%;
  border: 3px solid rgba(39, 49, 79, 0.42);
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22) 10px, transparent 10px, transparent 20px),
    rgba(75, 185, 199, 0.5);
}

.region-tower {
  left: 76%;
  top: 72%;
  width: 16%;
  height: 20%;
  border: 3px solid rgba(39, 49, 79, 0.44);
  background: rgba(126, 103, 201, 0.48);
}

.terrain-road {
  height: 12px;
  background: repeating-linear-gradient(90deg, var(--pixel-road), var(--pixel-road) 14px, #deb866 14px, #deb866 28px);
  transform-origin: left center;
}

.road-a {
  left: 12%;
  top: 56%;
  width: 61%;
  transform: rotate(-23deg);
}

.road-b {
  left: 30%;
  top: 69%;
  width: 45%;
  transform: rotate(12deg);
}

.road-c {
  left: 62%;
  top: 80%;
  width: 23%;
  transform: rotate(-7deg);
}

.pixel-tree {
  width: 28px;
  height: 34px;
  background: var(--pixel-border);
  box-shadow:
    0 -16px 0 4px #246d42,
    16px -10px 0 2px #2d8a4f,
    -16px -8px 0 2px #2d8a4f;
}

.tree-a {
  left: 9%;
  top: 12%;
}

.tree-b {
  left: 69%;
  top: 13%;
}

.tree-c {
  left: 86%;
  top: 28%;
}

.pixel-house {
  width: 42px;
  height: 34px;
  border: 4px solid var(--pixel-border);
  background: #ffe7a0;
}

.pixel-house::before {
  position: absolute;
  left: -6px;
  top: -20px;
  width: 50px;
  height: 18px;
  background: #b94f48;
  content: "";
}

.house-a {
  left: 12%;
  top: 49%;
}

.house-b {
  left: 33%;
  top: 54%;
}

.pixel-gate {
  position: absolute;
  z-index: 4;
  width: 58px;
  height: 34px;
  margin: -17px 0 0 -29px;
  border: 4px solid var(--pixel-border);
  background: #a85d42;
  box-shadow: 4px 4px 0 rgba(39, 49, 79, 0.24);
  pointer-events: none;
}

.pixel-gate.open {
  background: #62b56e;
}

.pixel-gate span {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 10px;
  font-weight: 900;
}

.pixel-npc {
  position: absolute;
  z-index: 5;
  width: 34px;
  height: 42px;
  margin: -30px 0 0 -17px;
  pointer-events: none;
}

.pixel-npc span {
  display: block;
  width: 22px;
  height: 28px;
  margin: 0 auto;
  border: 3px solid var(--pixel-border);
  background:
    linear-gradient(#f2c39b 0 36%, #7e67c9 36% 100%);
}

.pixel-npc small {
  position: absolute;
  left: 50%;
  top: 34px;
  width: 112px;
  transform: translateX(-50%);
  color: var(--pixel-ink);
  font-size: 9px;
  font-weight: 900;
  text-align: center;
  text-shadow: 1px 1px 0 #fff8df;
}

.quest-node {
  position: absolute;
  z-index: 8;
  width: 42px;
  height: 42px;
  margin: -21px 0 0 -21px;
  border: 4px solid var(--pixel-border);
  border-radius: 0;
  color: #101727;
  background: #f7f0d6;
  box-shadow: 4px 4px 0 rgba(39, 49, 79, 0.3);
  cursor: pointer;
  font: inherit;
  font-weight: 900;
  text-decoration: none;
}

.quest-node:hover,
.quest-node.active {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(39, 49, 79, 0.28);
}

.quest-node.locked {
  filter: grayscale(1);
  opacity: 0.55;
}

.quest-node.complete {
  background: #f5cf62;
}

.quest-node span {
  display: grid;
  place-items: center;
}

.zone-village {
  background: var(--pixel-gold);
}

.zone-forest {
  background: var(--pixel-green);
}

.zone-castle {
  background: #b7bccb;
}

.zone-dungeon {
  background: var(--pixel-red);
}

.zone-lab {
  background: var(--pixel-cyan);
}

.zone-tower {
  color: #fff;
  background: var(--pixel-purple);
}

.pixel-avatar {
  position: absolute;
  z-index: 10;
  width: 48px;
  height: 58px;
  margin: -50px 0 0 -24px;
  transition: left 0.12s linear, top 0.12s linear;
  pointer-events: none;
}

.pixel-avatar::after {
  position: absolute;
  left: 9px;
  bottom: 0;
  width: 31px;
  height: 8px;
  background: rgba(23, 32, 51, 0.22);
  content: "";
}

.pixel-agent-hero {
  position: relative;
  z-index: 2;
  display: block;
  width: 48px;
  height: 48px;
  background-image: var(--agent-sheet);
  background-position: var(--agent-x) var(--agent-y);
  background-repeat: no-repeat;
  background-size: 336px 288px;
  image-rendering: pixelated;
  filter: drop-shadow(3px 3px 0 rgba(39, 49, 79, 0.24));
}

.face-left .pixel-agent-hero {
  transform: scaleX(-1);
}

.is-moving .pixel-agent-hero {
  animation: pixel-hop 0.18s steps(2, end) infinite;
}

@keyframes pixel-hop {
  0% {
    margin-top: 0;
  }
  50% {
    margin-top: -4px;
  }
  100% {
    margin-top: 0;
  }
}

.pixel-dpad {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.pixel-dpad button {
  min-width: 46px;
  height: 42px;
  border: 3px solid var(--pixel-border);
  border-radius: 0;
  color: var(--pixel-ink);
  background: #fffaf0;
  box-shadow: 4px 4px 0 rgba(39, 49, 79, 0.18);
  cursor: pointer;
  font: inherit;
  font-weight: 900;
}

.quest-panel {
  padding: 18px;
  background: #fffaf0;
}

.pixel-quest-landing .quest-panel {
  max-height: calc(100vh - 280px);
  overflow: auto;
}

.mentor-card {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 12px;
  align-items: start;
  margin-bottom: 16px;
  border: 3px solid var(--pixel-border);
  padding: 10px;
  background: #f7f0d6;
}

.mentor-avatar {
  width: 36px;
  height: 36px;
  border: 3px solid var(--pixel-border);
  background:
    linear-gradient(#f2c39b 0 44%, #2867c9 44% 100%);
}

.mentor-card strong {
  color: var(--pixel-ink);
  font-size: 13px;
}

.mentor-card p {
  margin: 4px 0 0;
  color: #3d4867;
  font-size: 12px;
  line-height: 1.45;
}

.quest-panel h3 {
  margin: 8px 0 8px;
  color: var(--pixel-ink);
  font-size: 20px;
  line-height: 1.25;
}

.quest-panel h4 {
  margin: 18px 0 6px;
  color: #27314f;
  font-size: 13px;
  text-transform: uppercase;
}

.quest-panel p {
  color: #3d4867;
  font-size: 14px;
  line-height: 1.55;
}

.quest-zone {
  display: inline-block;
  padding: 4px 8px;
  border: 2px solid var(--pixel-border);
  background: #f5cf62;
  color: var(--pixel-ink);
  font-size: 12px;
  font-weight: 900;
}

.quest-status {
  margin: 0;
  font-weight: 700;
}

.quest-actions {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.pixel-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border: 3px solid var(--pixel-border);
  border-radius: 0;
  padding: 8px 12px;
  color: var(--pixel-ink);
  background: #f7f0d6;
  box-shadow: 4px 4px 0 rgba(39, 49, 79, 0.24);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  text-decoration: none;
}

.pixel-button:hover {
  text-decoration: none;
}

.pixel-button.primary {
  color: #fff;
  background: #2867c9;
}

.pixel-button.subtle {
  background: #e5e8ef;
}

.pixel-button.disabled,
.pixel-button:disabled {
  cursor: not-allowed;
  filter: grayscale(1);
  opacity: 0.55;
}

.quest-help {
  margin-top: 16px;
  border-top: 2px solid #d3c9a4;
  padding-top: 12px;
  font-size: 12px !important;
}

.asset-source {
  margin-top: 12px;
  color: #647089 !important;
  font-size: 11px !important;
}

@media (max-width: 1080px) {
  .pixel-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .pixel-quest-landing .pixel-layout {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
  }

  .quest-panel {
    max-width: none;
  }

  .pixel-quest-landing .quest-panel {
    max-height: none;
  }
}

@media (max-width: 760px) {
  .pixel-hero {
    grid-template-columns: 1fr;
  }

  .pixel-stats {
    min-width: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  .pixel-layout {
    padding: 10px;
  }

  .pixel-map-toolbar {
    display: block;
  }

  .pixel-control-copy {
    margin-top: 8px;
  }

  .pixel-map {
    min-height: 500px;
  }

  .pixel-quest-landing {
    min-height: auto;
    padding: 10px 10px 24px;
  }

  .pixel-quest-landing .pixel-map {
    height: auto;
    min-height: 500px;
  }
}

@media (max-width: 560px) {
  .pixel-title-copy h2 {
    font-size: 24px;
  }

  .pixel-stats {
    grid-template-columns: 1fr;
  }

  .pixel-map {
    min-height: 440px;
  }

  .quest-node {
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border-width: 3px;
    font-size: 12px;
  }

  .pixel-avatar {
    width: 44px;
    margin-left: -22px;
  }

  .pixel-npc small {
    display: none;
  }
}
</style>
