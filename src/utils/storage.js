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
  const addOpenedDoc = () => {
    setItem(OPENED_DOCUMENTS, [...openedDoc, id]);
  };
  const deleteOpenedDoc = () => {
    openedDoc.splice(index, 1);
    setItem(OPENED_DOCUMENTS, [...openedDoc]);
  };

  switch (action) {
    case "add":
      if (index === -1) addOpenedDoc();
      break;
    case "toggle":
      index === -1 ? addOpenedDoc() : deleteOpenedDoc();
      break;
    case "delete":
      deleteOpenedDoc();
      break;
  }
};
