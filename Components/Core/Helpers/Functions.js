var Random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var IsObject = function(key, ob) {
  var v = key;

  if (ob !== undefined) {
    if (typeof ob !== 'object' || ob === null) {
      return false;
    }

    if (!(key in ob)) {
      return false;
    }

    v = ob[key];
  }

  if (typeof v === 'object' && v !== null) {
    return true;
  } else {
    return false;
  }
};