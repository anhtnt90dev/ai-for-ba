import DefaultTheme from "vitepress/theme";
import { Fragment, h } from "vue";
import "./custom.css";
import DiagramZoom from "./components/DiagramZoom.vue";
import LessonCompletion from "./components/LessonCompletion.vue";
import PixelQuest from "./components/PixelQuest.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(Fragment, [h(DiagramZoom), h(LessonCompletion)])
    });
  },
  enhanceApp({ app }) {
    app.component("DiagramZoom", DiagramZoom);
    app.component("LessonCompletion", LessonCompletion);
    app.component("PixelQuest", PixelQuest);
  }
};
