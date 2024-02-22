import createStore from "../core/Store";
import { fetchPost, putPost } from "../services/api";

async function reducer({ state, actionType, data }) {
  switch (actionType) {
    case "FETCH_POST":
      // 가져오기
      const post = await fetchPost(data);
      return { ...state, post };
    case "PUT_POST":
      // 업데이트
      const updatePost = await putPost(data);
      return { ...state, post: updatePost };
  }
}

export const PostStore = new createStore(reducer);
