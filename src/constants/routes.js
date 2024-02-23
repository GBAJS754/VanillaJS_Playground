import { EditorPage, HomePage } from "../pages";

export const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const ROUTES = [
  { path: /^\/$/, page: HomePage },
  { path: /^\/documents\/[\d]+$/, page: EditorPage },
];
