import SideBar from "./components/SideBar/index.js";
import { Component, Router } from "./core.js";
import { $ } from "./utils/dom.js";

class App extends Component {
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
