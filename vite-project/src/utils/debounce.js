function debounce(callback, limit = 1000) {
  let timeout;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(...arguments);
    }, limit);
  };
}

export default debounce;
