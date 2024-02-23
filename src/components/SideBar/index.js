import { Component } from "../../core";
import { PostListStore } from "../../store/PostListStore";
import { push } from "../../utils";
import { $ } from "../../utils/dom";
import PostList from "./PostList";

class SideBar extends Component {
  template() {
    return `
      <div class="header">
      <img class="logo" src="/notion.svg"></img>
      <h3>다은의 Notion</h3>
      </div> 
       <article id="posts"></article>
       <div class="footer">
       <span>페이지 추가하기</span>
       <button>
       <img class="addBtn" src="/images/add.svg"></img>
       </button>
       </div>
      `;
  }

  mounted() {
    new PostList($("#posts"));
  }

  setEvent() {
    this.addEvent("click", ".footer", () => {
      PostListStore.dispatch({ actionType: "POST_POST" });
    });

    this.addEvent("click", ".header", () => {
      push("/");
    });
  }
}

export default SideBar;
