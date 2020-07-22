export const updatedStateWithResponse = (state, update) => {
  return state.map(item => {
    if (item.id === update.id) {
      return update;
    } else {
      return item;
    }
  });
};

export const updatedStateRemoveResponse = (state, id) => {
  return state.filter(item => {
    return item.id !== id;
  });
};