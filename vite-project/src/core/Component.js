class Component {
  $target;
  state = {};
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}
  template() {
    return "";
  }
  setEvent() {}
  mounted() {}
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
export default Component;
