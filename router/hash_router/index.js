import createRouter from "./router.js";

const main = document.querySelector("main");

const pages = {
  home: () => (main.innerHTML = "<h1>Home Page</h1>"),
  melon: () => (main.innerHTML = "<h1>Melon Page</h1>"),
  board: (params) =>
    (main.innerHTML = `<h1>${params.name} ${params.song}</h1>`),
};

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/melon", pages.melon)
  .addRoute("#/melon/:name/:song", pages.board)
  .start();

window.addEventListener("click", (event) => {
  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});
