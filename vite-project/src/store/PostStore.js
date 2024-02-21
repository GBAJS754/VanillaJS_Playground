import createStore from "../core/Store";
import { fetchPostList } from "../services/api";

async function reducer({ state, actionType, data }) {
  switch (actionType) {
    case "FETCH_POST_LIST":
      const postList = await fetchPostList();
      return { ...state, postList };
  }
}

export const PostStore = new createStore(reducer);
