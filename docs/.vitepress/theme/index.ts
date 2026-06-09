import DefaultTheme from "vitepress/theme";
import "./custom.css";
import PixelQuest from "./components/PixelQuest.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PixelQuest", PixelQuest);
  }
};
