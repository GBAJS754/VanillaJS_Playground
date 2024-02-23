const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const USER_NAME = "kimdaeun";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": USER_NAME,
        ...options.headers,
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("HTTP-Error: " + res.status);
  } catch (e) {
    console.log("API 호출 오류", e);
  }
};
