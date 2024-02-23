import Editor from "../components/Editor";
import { Component } from "../core";
import { PostStore } from "../store/PostStore";
import { $ } from "../utils";

class EditorPage extends Component {
  async setup() {
    const [, , id] = location.pathname.split("/");
    await PostStore.dispatch({ actionType: "FETCH_POST", data: id });
  }

  template() {
    return `
    <div id="editor"></div>`;
  }

  mounted() {
    const $editor = $("#editor");
    new Editor($editor);
  }
}

export default EditorPage;
