(function(){
  var setPrototype = function(ob, name, fun) {
    if (!ob) {
      return;
    }

    if (name in ob.prototype) {
      return;
    }

    Object.defineProperty(ob.prototype, name, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: fun
    });
  };

  /* Class methods */

  setPrototype(Element, 'addClass', function(className){
    if (typeof this.classList === 'object' && 'add' in this.classList) {
      return this.classList.add(className);
    }

    if (!this.containsClass(className)) {
      var classNames = ' ' + this.className + ' ';
      this.className = (classNames + className).trim();
    }
  });

  setPrototype(Element, 'removeClass', function(className){
    if (typeof this.classList === 'object' && 'remove' in this.classList) {
      return this.classList.remove(className);
    }

    var cl = ' ' + this.className + ' ';
    this.className = cl.replace(' ' + className + ' ', ' ').trim();

    if (this.containsClass(className)) {
      this.removeClass(className);
    }
  });

  setPrototype(Element, 'containsClass', function(className){
    if (typeof this.classList === 'object' && 'contains' in this.classList) {
      return this.classList.contains(className);
    }

    var cl = ' ' + this.className + ' ';
    return cl.search(' ' + className + ' ') !== -1;
  });

  setPrototype(Element, 'includesClass', function(className){
    return this.containsClass(className);
  });

  /* Array */

  setPrototype(Array, 'insert', function(index, el){
    for (var i = this.length; i !== index; i--) {
      this[i] = this[i - 1];
    }

    this[index] = el;
  });

  setPrototype(Array, 'insertArray', function(index, arr){
    for (var i = this.length; i !== index; i--) {
      this[i + arr.length - 1] = this[i - 1];
    }

    for (var i = 0; i !== arr.length; i++) {
      this[index + i] = arr[i];
    }
  });

  setPrototype(Array, 'unshiftArray', function(arr){
    for (var i = arr.length - 1; i !== -1; i--) {
      this.unshift(arr[i]);
    }
  });

  setPrototype(Array, 'pushArray', function(arr){
    for (var i = 0; i !== arr.length; i++) {
      this.push(arr[i]);
    }
  });

  setPrototype(Array, 'shiftArray', function(len){
    var arr = [];

    for (var i = 0; i < len && this.length; i++) {
      arr.push(this.shift());
    }

    return arr;
  });

  setPrototype(Array, 'popArray', function(len){
    var arr = [];

    for (var i = 0; i < len && this.length; i++) {
      arr.unshift(this.pop());
    }

    return arr;
  });

  setPrototype(Array, 'contains', function(value){
    return this.includes(value);
  });

  setPrototype(Array, 'removeIndex', function(index){
    this.splice(index, 1);
  });

  setPrototype(Array, 'remove', function(value){
    var index = this.indexOf(value);

    if (index === -1) {
      return false;
    }

    this.removeIndex(index);
    return true;
  });

  /* Search in array */

  var nodeForEach = function(callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i !== this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };

  setPrototype(NodeList, 'forEach', nodeForEach);
  setPrototype(HTMLCollection, 'forEach', nodeForEach);

  var nodeIndexOf = function(item) {
    for (var i = 0; i !== this.length; i++) {
      if (this[i] === item) {
        return i;
      }
    }

    return -1;
  };

  setPrototype(NodeList, 'indexOf', nodeIndexOf);
  setPrototype(HTMLCollection, 'indexOf', nodeIndexOf);

  setPrototype(Element, 'getIndex', function(){
    return this.parentNode.children.indexOf(this);
  });

  /* Object */

  var objectClone = function(obj) {
    if (obj instanceof Date) {
      return new Date(obj);
    } else if (obj instanceof Array) {
      var newArr = [];

      for (var i = 0; i !== obj.length; i++) {
        newArr.push(objectClone(obj[i]));
      }

      return newArr;
    } else if (obj instanceof Object) {
      var newObj = {};

      for (var prop in obj) {
        newObj[prop] = objectClone(obj[prop]);
      }

      return newObj;
    } else {
      return obj;
    }
  };

  setPrototype(Object, 'clone', function(){
    return objectClone(this);
  });

  /* Nodes management */

  setPrototype(Node, 'isVisible', function(){
    var target = this;

    while (true) {
      if (!target) {
        return false;
      }

      if (target === document) {
        return true;
      }

      if (window.getComputedStyle(target).display === 'none') {
        return false;
      }

      target = target.parentNode;
    }
  });

  setPrototype(Node, 'insertAfter', function(newElement, referenceElement){
    var index = referenceElement.getIndex();

    if (index === this.children.length - 1) {
      this.appendChild(newElement);
    } else {
      this.insertBefore(newElement, this.children[index + 1]);
    }

    return newElement;
  });

  setPrototype(Node, 'removeElement', function(){
    if (this.parentNode) {
      return this.parentNode.removeChild(this);
    } else {
      return null;
    }
  });

  setPrototype(Node, 'removeChilds', function(){
    while (this.childNodes.length) {
      this.childNodes[0].removeElement();
    }
  });

  var nodeListRemoveElements = function() {
    for (var i = 0; i !== this.length; i++) {
      this[i].removeElement();
    }
  };

  setPrototype(NodeList, 'removeElements', nodeListRemoveElements);
  setPrototype(HTMLCollection, 'removeElements', nodeListRemoveElements);

  var addEventListener = function(type, listener) {
    for (var i = 0; i !== this.length; i++) {
      this[i].addEventListener(type, listener);
    }
  };

  setPrototype(NodeList, 'addEventListener', addEventListener);
  setPrototype(HTMLCollection, 'addEventListener', addEventListener);

  var removeEventListener = function(type, listener) {
    for (var i = 0; i !== this.length; i++) {
      this[i].removeEventListener(type, listener);
    }
  };

  setPrototype(NodeList, 'removeEventListener', removeEventListener);
  setPrototype(HTMLCollection, 'removeEventListener', removeEventListener);

  /* Form data */

  setPrototype(HTMLFormElement, 'getData', function(){
    var data = {};

    var item = undefined;
    var match = undefined;
    for (var i = 0; i !== this.elements.length; i++) {
      item = this.elements.item(i);

      if (typeof item.name === 'string' && item.name.length > 0) {
        if ((item.type === 'checkbox' || item.type === 'radio') && !item.checked) {
          continue;
        }

        if (match = item.name.match(/^([\s\S]+)\[\]$/)) {
          if (!(match[1] in data) || !Array.isArray(data[match[1]])) {
            data[match[1]] = [];
          }

          data[match[1]].push(item.value);
        } else {
          data[item.name] = item.value;
        }
      }
    }

    return data;
  });

  /* Number methods */

  var isNaNNumber = function(value) {
    if (typeof value === 'object' && value.toString() === 'NaN') {
      return true;
    }

    if ('isNaN' in Number) {
      return Number.isNaN(value);
    }

    if (typeof value === 'number' && isNaN(value)) {
      return true;
    }

    return false;
  };

  setPrototype(Number, 'isNaN', function(){
    return isNaNNumber(this);
  });

  setPrototype(Number, 'getFormat', function(len){
    var num = this;
    if (isNaNNumber(num)) {
      num = 0;
    }

    num = num.toString();
    while (num.length < len) {
      num = '0' + num;
    }

    return num;
  });

  setPrototype(Number, 'getPrice', function(){
    var num = this;
    if (isNaNNumber(num)) {
      num = 0;
    }

    var isMinus = num < 0;
    var price = Math.abs(num).toString();

    var match = price.match(/^([0-9]+)\.?([0-9]+)?$/);

    if (!match[2]) {
      match[2] = '00';
    } else if (match[2].length === 1) {
      match[2] += '0';
    } else if (match[2].length !== 2) {
      match[2] = match[2].substr(0, 2);
    }

    return (isMinus ? '-' : '') + match[1] + '.' + match[2];
  });

  /* String methods */

  setPrototype(String, 'toCamelCase', function(){
    return this
      .toString()
      .toLowerCase()
      .split(/[^a-z]+/)
      .map(function(str){
        return str[0].toUpperCase() + str.substr(1);
      })
      .join('');
  });
})();
