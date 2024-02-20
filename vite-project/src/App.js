import SideBar from "./components/SideBar";
import { Component, Router } from "./core";

class App extends Component {
  template() {
    return `
        <aside id="sidebar"></aside>
        <section id="page"></section>
        `;
  }

  mounted() {
    const $sidebar = document.querySelector("#sidebar");
    const $page = document.querySelector("#page");

    new SideBar($sidebar);
    new Router($page);
  }
}

export default App;
