const createRouter = () => {
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
  const URL_REGEXP = "([^\\/]+)";

  const routes = [];

  const router = {
    addRoute(fragment, component) {
      const params = [];
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          // ROUTE_PARAMETER_REGEXP에 해당하는 정규표현식 :name과 같은 파라미터를 찾아서 URL_REGEXP로 대체함
          params.push(paramName);
          return URL_REGEXP;
        })
        .replace(/\//g, "\\/"); // 슬래시를 찾아서 역슬래시와 슬래시로 대체

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });
      return this;
    },

    start() {
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);
        matches.shift(); // 배열의 첫번째 값에는 url 전체가 담겨있으므로 제거해준다.
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });
        // params = {name: 'IU', song: 'raindrop'}
        return params;
      };

      const checkRoutes = () => {
        const currentRoute = routes.find((route) =>
          route.fragmentRegExp.test(window.location.hash)
        );

        if (currentRoute.params.length) {
          // path parameters가 있는 url인 경우
          const urlParams = getUrlParams(currentRoute, window.location.hash);
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }
      };

      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },

    navigate(fragment) {
      window.location.hash = fragment;
    },
  };
  return router;
};

export default createRouter;
