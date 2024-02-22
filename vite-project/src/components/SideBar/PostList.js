import { Component } from "../../core";
import { PostListStore } from "../../store/PostListStore";
import { PostStore } from "../../store/PostStore";
import { OPENED_DOCUMENTS, getItem, push, updateStorage } from "../../utils";

class PostList extends Component {
  setup() {
    PostListStore.subscribe(this.render.bind(this));
  }

  template() {
    const postList = PostListStore.getState()?.postList;
    const openedDoc = getItem(OPENED_DOCUMENTS, []);
    if (!postList) return `로딩중`;
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
      console.log(e.target.className);
      switch (e.target.className) {
        case "addBtn":
          PostListStore.dispatch({ actionType: "POST_POST", data: id });
          updateStorage("add", id);
          break;
        case "deleteBtn":
          PostListStore.dispatch({ actionType: "DELETE_POST", data: id });
          break;
        case "toggleBtn":
          updateStorage("toggle", id);
          this.render();
          break;
        default:
          push(`/documents/${id}`);
      }
    });
  }
}

export default PostList;
