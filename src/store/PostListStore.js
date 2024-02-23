import createStore from "../core/Store";
import { deletePost, fetchPostList, postPost } from "../services/api";

async function reducer({ state, actionType, data }) {
  switch (actionType) {
    case "FETCH_POST_LIST":
      const postList = await fetchPostList();
      return { ...state, postList };
    case "POST_POST":
      // 생성
      await postPost(data);
      const postedPostList = await fetchPostList();
      return { ...state, postList: postedPostList };
    case "DELETE_POST":
      // 삭제
      await deletePost(data);
      const deletedPostList = await fetchPostList();
      return { ...state, postList: deletedPostList };
  }
}

export const PostListStore = new createStore(reducer);
