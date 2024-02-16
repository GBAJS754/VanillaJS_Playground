import { Component } from "./core/Component.js";
import { store } from "./store.js";

const InputA = () => `
  <input id="stateA" value="${store.state.a}" size="5" />
`;

const InputB = () => `
  <input id="stateB" value="${store.state.b}" size="5" />
`;

const Calculator = () => `
  <p>a + b = ${store.state.a + store.state.b}</p>
`;

export class App extends Component {
  initState() {
    return {
      a: 10,
      b: 10,
    };
  }

  template() {
    // 세개의 컴포넌트가 store를 참조하고있고 store가 변경되었을때 컴포넌트가 자동으로 렌더링
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    const { $el } = this;
    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      store.setState({ a: Number(target.value) });
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      store.setState({ b: Number(target.value) });
    });
  }
}
