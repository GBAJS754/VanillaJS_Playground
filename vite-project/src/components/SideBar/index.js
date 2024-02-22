import { Component } from "../../core";
import { PostListStore } from "../../store/PostListStore";
import { $ } from "../../utils/dom";
import PostList from "./PostList";

class SideBar extends Component {
  template() {
    return `
       <h3>다은의 Notion</h3>
       <article id="posts"></article>
       <div class="footer">푸터입니다.</div>
      `;
  }

  mounted() {
    new PostList($("#posts"));
  }

  setEvent() {
    this.addEvent("click", ".footer", (e) => {
      PostListStore.dispatch({ actionType: "POST_POST" });
    });
  }
}

export default SideBar;
