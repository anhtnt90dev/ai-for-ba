import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./custom.css";
import GameLessonChrome from "./components/GameLessonChrome.vue";
import PixelQuest from "./components/PixelQuest.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(GameLessonChrome, { position: "top" }),
      "doc-after": () => h(GameLessonChrome, { position: "bottom" })
    });
  },
  enhanceApp({ app }) {
    app.component("GameLessonChrome", GameLessonChrome);
    app.component("PixelQuest", PixelQuest);
  }
};
