import SideBar from "./components/SideBar/index.js";
import Component from "./core/Component.js";
import Router from "./core/Router.js";
import { PostStore } from "./store/PostStore.js";
import { $ } from "./utils/dom.js";

class App extends Component {
  setup() {
    PostStore.dispatch({ actionType: "FETCH_POST_LIST" });
  }

  template() {
    return `
        <aside id="sidebar"></aside>
        <section id="page"></section>
        `;
  }

  mounted() {
    const $sidebar = $("#sidebar");
    const $page = $("#page");

    new SideBar($sidebar);
    new Router($page);
  }
}

export default App;
