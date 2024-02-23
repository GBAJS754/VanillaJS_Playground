import SideBar from "./components/SideBar/index.js";
import Component from "./core/Component.js";
import Router from "./core/Router.js";
import { PostListStore } from "./store/PostListStore.js";
import { $ } from "./utils/dom.js";

class App extends Component {
  async setup() {
    await PostListStore.dispatch({ actionType: "FETCH_POST_LIST" });
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
