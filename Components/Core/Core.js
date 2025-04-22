var Core = (function(){
  var components = {};

  /* Components */

  var getElementConfig = function(name, el) {
    var value = '';
    var config = {};

    for (var i = 0; i !== el.attributes.length; i++) {
      if (el.attributes[i].nodeName === name) {
        value = el.attributes[i].nodeValue;
      } else {
        var match = el.attributes[i].nodeName.match('^' + name + '\\-([\\s\\S]+)$');

        if (match) {
          config[match[1]] = el.attributes[i].nodeValue;
        } else {
          continue;
        }
      }

      el.removeAttribute(
        el.attributes[i].nodeName
      );

      i--;
    }

    return {
      Value: value,
      Config: config
    };
  };

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

    if (!(name in Core)) {
      Core[name] = component;
    }

    return true;
  };

  /* Methods */

  return {
    GetComponent: getComponent,
    AddComponent: addComponent,
    GetElementConfig: getElementConfig,
  };
})();