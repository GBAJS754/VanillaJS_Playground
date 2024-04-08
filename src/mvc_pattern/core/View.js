import { emit, on } from "../utils/helpers.js";

class View {
  constructor(element) {
    if (!element) throw "no element";
    // 돔 엘리먼트 저장
    this.element = element;
    // 초기값 저장
    this.originalDisplay = this.element.style.display || "";
  }
  hide() {
    this.element.style.display = "none";
  }
  show() {
    this.element.style.display = this.originalDisplay;
  }
  on(eventName, handler) {
    // addEventListener 랩핑
    on(this.element, eventName, handler);
  }
  emit(eventName, data) {
    // dispatchEvent 랩핑
    emit(this.element, eventName, data);
  }
}

export default View;
