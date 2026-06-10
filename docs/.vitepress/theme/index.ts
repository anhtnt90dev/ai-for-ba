import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./custom.css";
import LessonCompletion from "./components/LessonCompletion.vue";
import PixelQuest from "./components/PixelQuest.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(LessonCompletion)
    });
  },
  enhanceApp({ app }) {
    app.component("LessonCompletion", LessonCompletion);
    app.component("PixelQuest", PixelQuest);
  }
};
