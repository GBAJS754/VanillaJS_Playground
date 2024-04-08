import View from "../core/View.js";
import { on, qs } from "../utils/helpers.js";

class FormView extends View {
  constructor() {
    // View 클래스의 생성자 함수를 호출해 돔을 내부 변수로 저장한다.
    super(qs("#search-form-view"));
    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);
    this.showResetButton(false);

    this.bindEvent();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvent() {
    on(this.inputElement, "keyup", (event) => this.handleKeyup(event));
    this.on("submit", (event) => this.handleSubmit(event));
  }

  handleKeyup(event) {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
}

export default FormView;
