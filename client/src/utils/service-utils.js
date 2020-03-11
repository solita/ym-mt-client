export const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const flattenServices = services => {
  const flatServices = [];
  let subServices = [];
  services.forEach(service => {
    flatServices.push(service);
    subServices = subServices.concat(service.subServices);
  });
  subServices = removeDuplicates(subServices, 'id');
  return [flatServices, subServices];
};
