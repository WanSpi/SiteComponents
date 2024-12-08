var Core = (function(){
  var components = {};

  /* Components */

  var getComponent = function(name) {
    if (name in components) {
      return components[name];
    } else {
      console.error('Component "' + name + '" not found');
      return null;
    }
  };

  var addComponent = function(name, component) {
    if (name in components) {
      console.error('Component "' + name + '" already exists');
      return false;
    }

    components[name] = component;

    return true;
  };

  /* Methods */

  return {
    GetComponent: getComponent,
    AddComponent: addComponent
  };
})();