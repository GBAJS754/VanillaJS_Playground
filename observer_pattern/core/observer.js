let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  //observer가 관찰을 종료한 것을 명시적으로 표현한것같음, 없어도 작동함
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        //state가 바뀔때마다 render함수를 실행
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
