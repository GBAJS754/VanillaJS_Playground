import { Component } from "../../core";
import { PostListStore } from "../../store/PostListStore";
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
            <ul data-id="${id}" class="post">
            <div class="post_container">
            <button>
            ${
              isOpen
                ? `<img class="toggleBtn" src="/images/toggle_open.svg"></img>`
                : `<img class="toggleBtn" src="/images/toggle_close.svg"></img>`
            }
            
            </button>
            <img src="/images/doc.svg"></img>
            <span>${title}</span>
            <button>
            <img class="addBtn" src="/images/add.svg"></img>
            </button>
            <button>
            <img class="deleteBtn" src="/images/delete.svg"></img>
            </button>
            </div>
            <div class="${isOpen ? "" : "hide"}">
            ${
              documents.length > 0
                ? `<li>${createPostList(documents)}</li>`
                : `<li>하위 페이지 없음</li>`
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
          PostListStore.dispatch({ actionType: "POST_POST", data: id });
          updateStorage("add", id);
          break;
        case "deleteBtn":
          PostListStore.dispatch({ actionType: "DELETE_POST", data: id });
          updateStorage("delete", id);
          push("/");
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
