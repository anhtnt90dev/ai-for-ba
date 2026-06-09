<script setup>
import { computed, onMounted, ref } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  locale: {
    type: String,
    default: "en"
  }
});

const text = computed(() =>
  props.locale === "vi"
    ? {
        title: "AI for BA: Pixel Quest",
        subtitle: "Đi qua bản đồ pixel, mở từng quest và học AI như một hành trình phiêu lưu.",
        progress: "Tiến độ",
        completed: "đã hoàn thành",
        start: "Vào bài học",
        mark: "Đánh dấu hoàn thành",
        unmark: "Bỏ hoàn thành",
        locked: "Hoàn thành quest trước để mở khóa.",
        unlocked: "Quest đã sẵn sàng.",
        reset: "Reset tiến độ",
        briefing: "Mission briefing",
        reward: "Phần thưởng BA nhận được",
        zone: "Vùng",
        keyboard: "Chọn node trên bản đồ để xem nhiệm vụ, sau đó vào bài học và đánh dấu hoàn thành khi xong."
      }
    : {
        title: "AI for BA: Pixel Quest",
        subtitle: "Move through a retro pixel map, unlock quests, and learn AI as an adventure path.",
        progress: "Progress",
        completed: "completed",
        start: "Enter lesson",
        mark: "Mark complete",
        unmark: "Unmark",
        locked: "Complete the previous quest to unlock this one.",
        unlocked: "Quest is ready.",
        reset: "Reset progress",
        briefing: "Mission briefing",
        reward: "BA reward",
        zone: "Zone",
        keyboard: "Select a node on the map, read the mission, enter the lesson, then mark it complete when done."
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

const completed = ref([]);
const selectedSlug = ref(quests[0].slug);
const storageKey = computed(() => `ai-for-ba-pixel-quest-${props.locale}`);

const completedCount = computed(() => completed.value.length);
const percent = computed(() => Math.round((completedCount.value / quests.length) * 100));
const selectedQuest = computed(() => quests.find((quest) => quest.slug === selectedSlug.value) || quests[0]);
const selectedIndex = computed(() => quests.findIndex((quest) => quest.slug === selectedQuest.value.slug));
const selectedCopy = computed(() => selectedQuest.value[props.locale] || selectedQuest.value.en);
const selectedZone = computed(() => zoneMeta[selectedQuest.value.zone]);

function questCopy(quest) {
  return quest[props.locale] || quest.en;
}

function lessonHref(slug) {
  return withBase(`/${props.locale}/lessons/${slug}/`);
}

function isComplete(slug) {
  return completed.value.includes(slug);
}

function isUnlocked(index) {
  return index === 0 || isComplete(quests[index - 1].slug) || isComplete(quests[index].slug);
}

function selectQuest(quest) {
  selectedSlug.value = quest.slug;
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
}

function resetProgress() {
  saveProgress([]);
  selectedSlug.value = quests[0].slug;
}

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(storageKey.value);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      completed.value = parsed.filter((slug) => quests.some((quest) => quest.slug === slug));
    }
    const nextQuest = quests.find((quest, index) => !isComplete(quest.slug) && isUnlocked(index));
    selectedSlug.value = nextQuest?.slug || quests[quests.length - 1].slug;
  } catch {
    completed.value = [];
  }
});
</script>

<template>
  <section class="pixel-quest">
    <div class="pixel-hero">
      <div>
        <p class="pixel-kicker">Retro BA Learning Mode</p>
        <h2>{{ text.title }}</h2>
        <p>{{ text.subtitle }}</p>
      </div>
      <div class="pixel-progress" aria-live="polite">
        <strong>{{ percent }}%</strong>
        <span>{{ completedCount }}/{{ quests.length }} {{ text.completed }}</span>
        <div class="pixel-progress-track">
          <div class="pixel-progress-fill" :style="{ width: `${percent}%` }"></div>
        </div>
      </div>
    </div>

    <div class="pixel-layout">
      <div class="pixel-map" aria-label="Pixel Quest lesson map">
        <div class="pixel-region region-village"></div>
        <div class="pixel-region region-forest"></div>
        <div class="pixel-region region-castle"></div>
        <div class="pixel-region region-dungeon"></div>
        <div class="pixel-region region-lab"></div>
        <div class="pixel-region region-tower"></div>
        <div class="pixel-path path-a"></div>
        <div class="pixel-path path-b"></div>
        <div class="pixel-path path-c"></div>
        <button
          v-for="(quest, index) in quests"
          :key="quest.slug"
          class="quest-node"
          :class="[
            zoneMeta[quest.zone].className,
            {
              complete: isComplete(quest.slug),
              locked: !isUnlocked(index),
              active: selectedQuest.slug === quest.slug
            }
          ]"
          :style="{ left: `${quest.x}%`, top: `${quest.y}%` }"
          type="button"
          :aria-label="`${index + 1}. ${questCopy(quest).title}`"
          @click="selectQuest(quest)"
        >
          <span>{{ index + 1 }}</span>
        </button>
        <div class="pixel-avatar" :style="{ left: `${selectedQuest.x}%`, top: `${selectedQuest.y}%` }">
          <span></span>
        </div>
      </div>

      <aside class="quest-panel">
        <div class="quest-zone">{{ text.zone }}: {{ selectedZone.name[props.locale] || selectedZone.name.en }}</div>
        <h3>{{ selectedCopy.title }}</h3>
        <p class="quest-status">{{ isUnlocked(selectedIndex) ? text.unlocked : text.locked }}</p>
        <h4>{{ text.briefing }}</h4>
        <p>{{ selectedCopy.mission }}</p>
        <h4>{{ text.reward }}</h4>
        <p>{{ selectedCopy.reward }}</p>
        <div class="quest-actions">
          <a class="pixel-button primary" :class="{ disabled: !isUnlocked(selectedIndex) }" :href="isUnlocked(selectedIndex) ? lessonHref(selectedQuest.slug) : undefined">
            {{ text.start }}
          </a>
          <button class="pixel-button" type="button" :disabled="!isUnlocked(selectedIndex)" @click="toggleComplete(selectedQuest.slug)">
            {{ isComplete(selectedQuest.slug) ? text.unmark : text.mark }}
          </button>
          <button class="pixel-button subtle" type="button" @click="resetProgress">{{ text.reset }}</button>
        </div>
        <p class="quest-help">{{ text.keyboard }}</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.pixel-quest {
  --pixel-ink: #172033;
  --pixel-border: #2f3652;
  --pixel-cream: #f7f0d6;
  --pixel-green: #4f9d55;
  --pixel-blue: #4c8ed9;
  --pixel-gold: #d8a73f;
  --pixel-red: #c75f54;
  --pixel-purple: #7e67c9;
  --pixel-cyan: #4bb9c7;
  margin: 24px 0 40px;
  color: var(--pixel-ink);
  font-family: ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

.pixel-hero,
.pixel-layout,
.quest-panel {
  border: 4px solid var(--pixel-border);
  border-radius: 0;
  box-shadow: 8px 8px 0 rgba(47, 54, 82, 0.22);
}

.pixel-hero {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background:
    linear-gradient(135deg, rgba(76, 142, 217, 0.12), rgba(216, 167, 63, 0.18)),
    var(--pixel-cream);
}

.pixel-hero h2 {
  margin: 0 0 8px;
  color: var(--pixel-ink);
  font-size: 28px;
  line-height: 1.15;
}

.pixel-hero p {
  margin: 0;
  color: #35415f;
}

.pixel-kicker {
  margin-bottom: 8px !important;
  color: #8b4a2b !important;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.pixel-progress {
  min-width: 190px;
  padding: 12px;
  border: 3px solid var(--pixel-border);
  background: #fffaf0;
}

.pixel-progress strong {
  display: block;
  color: var(--pixel-ink);
  font-size: 28px;
}

.pixel-progress span {
  display: block;
  margin: 3px 0 10px;
  color: #4d5874;
  font-size: 12px;
}

.pixel-progress-track {
  height: 16px;
  border: 2px solid var(--pixel-border);
  background: #d8dfca;
}

.pixel-progress-fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, var(--pixel-green), var(--pixel-green) 10px, #73bd6f 10px, #73bd6f 20px);
}

.pixel-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 18px;
  margin-top: 22px;
  padding: 18px;
  background: #e8d7a8;
}

.pixel-map {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  border: 4px solid var(--pixel-border);
  background:
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
    #8fcf86;
  background-size: 32px 32px;
  image-rendering: pixelated;
}

.pixel-region {
  position: absolute;
  border: 3px solid rgba(47, 54, 82, 0.35);
}

.region-village {
  left: 3%;
  top: 36%;
  width: 50%;
  height: 30%;
  background: rgba(247, 240, 214, 0.7);
}

.region-forest {
  left: 6%;
  top: 8%;
  width: 86%;
  height: 28%;
  background: rgba(47, 123, 71, 0.42);
}

.region-castle {
  left: 24%;
  top: 68%;
  width: 46%;
  height: 20%;
  background: rgba(178, 177, 188, 0.65);
}

.region-dungeon {
  left: 51%;
  top: 42%;
  width: 33%;
  height: 30%;
  background: rgba(83, 73, 103, 0.45);
}

.region-lab {
  left: 42%;
  top: 84%;
  width: 27%;
  height: 12%;
  background: rgba(75, 185, 199, 0.45);
}

.region-tower {
  left: 76%;
  top: 72%;
  width: 16%;
  height: 20%;
  background: rgba(126, 103, 201, 0.45);
}

.pixel-path {
  position: absolute;
  height: 12px;
  background: repeating-linear-gradient(90deg, #c4914a, #c4914a 14px, #deb866 14px, #deb866 28px);
  transform-origin: left center;
}

.path-a {
  left: 15%;
  top: 55%;
  width: 58%;
  transform: rotate(-25deg);
}

.path-b {
  left: 31%;
  top: 70%;
  width: 42%;
  transform: rotate(12deg);
}

.path-c {
  left: 62%;
  top: 80%;
  width: 22%;
  transform: rotate(-7deg);
}

.quest-node {
  position: absolute;
  z-index: 3;
  width: 42px;
  height: 42px;
  margin: -21px 0 0 -21px;
  border: 4px solid var(--pixel-border);
  border-radius: 0;
  color: #101727;
  background: #f7f0d6;
  box-shadow: 4px 4px 0 rgba(47, 54, 82, 0.3);
  cursor: pointer;
  font: inherit;
  font-weight: 900;
}

.quest-node:hover,
.quest-node.active {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(47, 54, 82, 0.28);
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
  background: var(--pixel-purple);
  color: #fff;
}

.pixel-avatar {
  position: absolute;
  z-index: 5;
  width: 28px;
  height: 34px;
  margin: -58px 0 0 -14px;
  transition: left 0.18s ease, top 0.18s ease;
}

.pixel-avatar span,
.pixel-avatar::before,
.pixel-avatar::after {
  position: absolute;
  display: block;
  content: "";
}

.pixel-avatar span {
  left: 7px;
  top: 0;
  width: 14px;
  height: 14px;
  background: #f2c39b;
  border: 3px solid var(--pixel-border);
}

.pixel-avatar::before {
  left: 4px;
  top: 14px;
  width: 20px;
  height: 16px;
  background: #2562eb;
  border: 3px solid var(--pixel-border);
}

.pixel-avatar::after {
  left: 8px;
  top: 30px;
  width: 16px;
  height: 6px;
  background: var(--pixel-border);
}

.quest-panel {
  padding: 18px;
  background: #fffaf0;
}

.quest-panel h3 {
  margin: 6px 0 8px;
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
  box-shadow: 4px 4px 0 rgba(47, 54, 82, 0.24);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  text-decoration: none;
}

.pixel-button.primary {
  color: #fff;
  background: #2562eb;
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

@media (max-width: 920px) {
  .pixel-hero,
  .pixel-layout {
    display: block;
  }

  .pixel-progress {
    margin-top: 16px;
  }

  .quest-panel {
    margin-top: 18px;
  }

  .pixel-map {
    min-height: 480px;
  }
}

@media (max-width: 560px) {
  .pixel-layout {
    padding: 10px;
  }

  .pixel-map {
    min-height: 420px;
  }

  .quest-node {
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border-width: 3px;
    font-size: 12px;
  }
}
</style>
