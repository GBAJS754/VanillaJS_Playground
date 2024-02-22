import { Component } from "../core";
import { PostStore } from "../store/PostStore";

class Editor extends Component {
  setup() {
    PostStore.subscribe(this.render.bind(this));
  }

  template() {
    const { title, content } = PostStore.getState()?.post ?? {
      title: "",
      content: "",
    };

    return `
    <div id="editor">
    <input class="title" placeholder="제목을 입력해주세요" style="width:800px;height:70px;" value="${title}"></input>
    <textarea class="content" style="width:800px;height:500px;">${
      !content ? "" : content
    }</textarea>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("keyup", "#editor", async (e) => {
      const { target } = e;
      const name = target.className;
      const newData = {
        ...PostStore.getState()?.post,
        [name]: e.target.value,
      };

      await PostStore.dispatch({
        actionType: "PUT_POST",
        data: { ...newData },
      });
    });
  }
}

export default Editor;
