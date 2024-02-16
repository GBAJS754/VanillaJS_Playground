import { observable, observe } from "./observer.js";

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    // setState를 사용하는 방식과 비슷 => 컴포넌트의 상태에 사용하기보단 store에서 관리
    // this.state = observable(this.initState());
    this.state = this.initState();
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {}
  template() {}
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
