import { request } from "./request.js";

export const fetchPostList = async () => {
  const lists = await request("documents");
  return lists;
};

export const fetchPost = async (documentId) => {
  const document = await request(`documents/${documentId}`);
  return document;
};

export const postPost = async (id) => {
  return Boolean(id)
    ? await request("documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: `${id}`,
        }),
      })
    : await request("documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: "",
        }),
      });
};

export const deletePost = async (id) => {
  await request(`documents/${id}`, {
    method: "DELETE",
  });
};

export const putPost = async (document) => {
  return await request(`documents/${document.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: document.title,
      content: !document.content ? "" : document.content,
    }),
  });
};
