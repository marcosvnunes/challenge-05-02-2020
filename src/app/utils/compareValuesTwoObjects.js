export default function compareValuesTwoObjets(object1, object2) {
  const object1Values = Object.values(object1);
  const object2Values = Object.values(object2);

  const compare = object1Values.every((item, index) => {
    return item === object2Values[index];
  });
  return compare;
}
