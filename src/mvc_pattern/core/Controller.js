class Controller {
  constructor(store, { formView }) {
    this.store = store;
    this.formView = formView;
    this.subscribeViewEvents();
  }
  subscribeViewEvents() {
    console.log(this.formView);
    this.formView.on("@submit", (event) => this.search(event.detail.value)); // 2
  }
  search(keyword) {
    console.log(keyword); // 3
  }
}

export default Controller;
