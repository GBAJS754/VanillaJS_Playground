export const OPENED_DOCUMENTS = "openedDocuments";
const storage = window.localStorage;

export const getItem = (key, defaultValue = []) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const updateStorage = (action, id) => {
  const openedDoc = getItem(OPENED_DOCUMENTS, []);
  const index = openedDoc.indexOf(id);

  if (index === -1) setItem(OPENED_DOCUMENTS, [...openedDoc, id]);
  else {
    if (action === "toggle") {
      openedDoc.splice(index, 1);
      setItem(OPENED_DOCUMENTS, [...openedDoc]);
    }
  }
};
