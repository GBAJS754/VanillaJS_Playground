import createStore from "../core/Store";
import {
  deletePost,
  fetchPost,
  fetchPostList,
  postPost,
  putPost,
} from "../services/api";

async function reducer({ state, actionType, data }) {
  switch (actionType) {
    case "FETCH_POST_LIST":
      const postList = await fetchPostList();
      return { ...state, postList };
    case "FETCH_POST":
      // 가져오기
      await fetchPost(data);
      return;
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
    case "PUT_POST":
      // 업데이트
      await putPost(data);
      return;
  }
}

export const PostStore = new createStore(reducer);
