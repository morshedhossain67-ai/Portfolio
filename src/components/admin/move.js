// Small immutable array helpers for the list editors.
export const moveItem = (list, from, to) => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const replaceAt = (list, i, item) => list.map((x, j) => (j === i ? item : x));
export const removeAt = (list, i) => list.filter((_, j) => j !== i);
