const save = (key, value) => {
  const storValue = JSON.stringify(value);
  try {
    localStorage.setItem(key, storValue);
  } catch (error) {
    console.error('Error by setting local storage value:', error);
  }
};

const load = key => {
  try {
    const storValue = localStorage.getItem(key);
    return storValue === null ? undefined : JSON.parse(storValue);
  } catch (error) {
    console.error('Error by getting local storage value:', error);
  }
};

export { save, load };
