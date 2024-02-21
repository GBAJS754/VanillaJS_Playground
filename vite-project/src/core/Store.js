class createStore {
  state;
  handler = [];

  constructor(reducer) {
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  async dispatch({ actionType, data }) {
    this.state = await this.reducer({
      state: this.state,
      actionType,
      data,
    });
    this.handler.forEach((f) => f());
  }

  subscribe(listener) {
    handler.push(listener);
  }
}

export default createStore;
