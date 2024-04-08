import Controller from "./core/Controller.js";
import Store from "./core/Store.js";
import storage from "./utils/storage.js";
import FormView from "./views/FormView.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
  const store = new Store(storage);

  const views = {
    formView: new FormView(),
  };

  new Controller(store, views);
}
