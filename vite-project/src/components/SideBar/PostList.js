import { Component } from "../../core";
import { PostStore } from "../../store/PostStore";
import { OPENED_DOCUMENTS, getItem, updateStorage } from "../../utils";

class PostList extends Component {
  setup() {
    PostStore.subscribe(this.render.bind(this));
  }

  template() {
    const postList = PostStore.getState()?.postList;
    const openedDoc = getItem(OPENED_DOCUMENTS, []);

    const createPostList = (currentPost) => {
      return currentPost
        ?.map(({ title, documents, id }) => {
          const isOpen = openedDoc.includes(String(id));
          return `
            <ul data-id="${id}">
            <img class="toggleBtn" src="/images/toggle_close.svg"></img>
            <img src="/images/doc.svg"></img>
            <span>${title}</span>
            <img class="addBtn" src="/images/add.svg"></img>
            <img class="deleteBtn" src="/images/delete.svg"></img>
            <div class="${isOpen ? "" : "hide"}">
            ${
              documents.length > 0
                ? `<li>${createPostList(documents)}</li>`
                : ""
            }
            </div>
            </ul>
          `;
        })
        .join("");
    };

    return createPostList(postList);
  }

  setEvent() {
    this.addEvent("click", "ul", (e) => {
      const $ul = e.target.closest("ul");
      const id = $ul.dataset.id;
      switch (e.target.className) {
        case "addBtn":
          PostStore.dispatch({ actionType: "POST_POST", data: id });
          updateStorage("add", id);
          break;
        case "deleteBtn":
          PostStore.dispatch({ actionType: "DELETE_POST", data: id });
          break;
        case "toggleBtn":
          updateStorage("toggle", id);
          this.render();
          break;
      }
    });
  }
}

export default PostList;
