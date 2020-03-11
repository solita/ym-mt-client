export const countDistance = (fromLat, fromLong, toLat, toLong) => {
  if (isNaN(fromLat) || isNaN(fromLong) || isNaN(toLat) || isNaN(toLong)) {
    return NaN;
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(toLat - fromLat); // deg2rad below
  var dLon = deg2rad(toLong - fromLong);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(fromLat)) * Math.cos(deg2rad(toLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = Math.round(R * c); // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
