import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // 登录鉴权
import "viewerjs/dist/viewer.css";
import "video.js/dist/video-js.css";

import Viewer from "v-viewer";
import VideoPlayer from "vue-video-player";
import Aplayer from "vue-aplayer";
import api from "./http/index";


Vue.use(api);
Vue.use(Viewer);
Vue.use(VideoPlayer);
Vue.use(ElementUI);
Vue.component("Aplayer", Aplayer);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
