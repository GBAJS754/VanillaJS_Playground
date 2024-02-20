import { ROUTES, ROUTE_CHANGE_EVENT_NAME } from "../constants";
import { NotFoundPage } from "../pages";

export default class Router {
  constructor($container) {
    this.$container = $container;
    this.route();
  }

  route() {
    const currentPage =
      ROUTES.find((route) => route.path.test(location.pathname)).page ||
      NotFoundPage;
    new currentPage(this.$container);
  }

  init() {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
      const { nextUrl } = e.detail;

      if (nextUrl) {
        //새로운 url을 history에 추가한다.
        history.pushState(null, null, nextUrl);
        this.route();
      }

      window.addEventListener("popstate", () => {
        // 뒤로가기 눌렀을때
        this.route();
      });
    });
  }
}
