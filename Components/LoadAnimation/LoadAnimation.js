(function(){
  var watchObjects = [];
  var groupObjects = [];

  var transformTranslate = 20;

  var waitInterval = 100;
  var transitionDuration = 1000;

  /* Logic */

  var getGroup = function(el) {
    for (var i = 0; i !== groupObjects.length; i++) {
      if (groupObjects[i].Element === el) {
        return groupObjects[i];
      }
    }

    return null;
  };

  var getParent = function(el) {
    var parent = null;

    while ((el = el.parentNode) !== document) {
      if (parent = getGroup(el)) {
        break;
      }
    }

    return parent;
  };

  var appendParent = function(elObject) {
    if (elObject instanceof LoadAnimationGroup) {
      groupObjects.push(elObject);
    }

    elObject.Parent = getParent(elObject.Element);

    if (elObject.Parent) {
      elObject.Parent.Childs.push(elObject);

      if (elObject.Parent.Executed) {
        elObject.Execute();
      }
    } else {
      watchObjects.push(elObject);
    }
  };

  /* LoadAnimationElement */

  var LoadAnimationElement = function(el) {
    this.Element = el;
    this.Type = this.Element.getAttribute('lanim').toString();

    switch (this.Type) {
      case 'up':     this.Element.style.transform = 'translate(' + transformTranslate + 'px, 0)';  break;
      case 'right':  this.Element.style.transform = 'translate(0, ' + transformTranslate + 'px)';  break;
      case 'bottom': this.Element.style.transform = 'translate(-' + transformTranslate + 'px, 0)'; break;
      case 'left':   this.Element.style.transform = 'translate(0, -' + transformTranslate + 'px)'; break;
    }

    this.Element.style.opacity = '0';
    this.Element.removeAttribute('lanim');
  };

  LoadAnimationElement.prototype.Type = 'none';
  LoadAnimationElement.prototype.Element = null;
  LoadAnimationElement.prototype.Executed = false;

  LoadAnimationElement.prototype.Parent = null

  LoadAnimationElement.prototype.Execute = function() {
    if (this.Executed) {
      return;
    }

    this.Element.style.transition = (transitionDuration / 1000) + 's all ease-in-out';
    this.Element.style.opacity = '1';
    this.Element.style.transform = 'translate(0, 0)';

    setTimeout((function(){
      this.Element.style.transition = '';
      this.Element.style.opacity = '';
      this.Element.style.transform = '';
    }).bind(this), transitionDuration);

    this.Executed = true;
  };

  LoadAnimationElement.prototype.GetRect = function() {
    return this.Element.getBoundingClientRect();
  };

  /* LoadAnimationGroup */

  var LoadAnimationGroup = function(el) {
    this.Element = el;
    this.Childs = [];

    this.Element.removeAttribute('lanim-group');
  };

  LoadAnimationGroup.prototype.Element = null;
  LoadAnimationGroup.prototype.Executed = false;

  LoadAnimationGroup.prototype.Childs = null;
  LoadAnimationGroup.prototype.Parent = null;

  LoadAnimationGroup.prototype.Execute = function() {
    if (this.Executed) {
      return;
    }

    for (var i = 0; i !== this.Childs.length; i++) {
      setTimeout((function(index){
        this.Childs[index].Execute();
      }).bind(this, i), waitInterval * i);
    }

    this.Executed = true;
  };

  LoadAnimationGroup.prototype.GetRect = function() {
    return this.Element.getBoundingClientRect();
  };

  /* Watcher */

  var watcherID = undefined;
  var watcherFun = function() {
    for (var i = 0; i !== watchObjects.length; i++) {
      var rect = watchObjects[i].GetRect();

      if ((rect.top + 50 < Core.WindowHeight && rect.bottom > 0) || (rect.bottom > 50 && rect.top < 0)) {
        watchObjects[i].Execute();
        watchObjects.removeIndex(i);

        stopWatch();

        if (watchObjects.length !== 0) {
          setTimeout(startWatch, waitInterval);
        }

        return;
      }
    }
  };

  var startWatch = function() {
    if (watcherID !== undefined || watchObjects.length === 0) {
      return false;
    }

    watcherID = setInterval(watcherFun, 16);

    return true;
  };
  var stopWatch = function() {
    if (watcherID === undefined) {
      return false;
    }

    clearInterval(watcherID);
    watcherID = undefined;

    return true;
  };

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[lanim]');
    var groups = e.Target.querySelectorAll('[lanim-group]');

    for (var i = 0; i !== groups.length; i++) {
      appendParent(
        new LoadAnimationGroup(groups[i])
      );
    }

    for (var i = 0; i !== elements.length; i++) {
      appendParent(
        new LoadAnimationElement(elements[i])
      );
    }

    startWatch();
  });
})();