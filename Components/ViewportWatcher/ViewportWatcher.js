(function(){
  var watcherObjects = [];
  var watcherID = undefined;

  /* Logic */

  var checkRect = function(rect) {
    if (
      (rect.top + 50 < Core.WindowHeight && rect.bottom > 0) ||
      (rect.bottom > 50 && rect.top < 0)
    ) {
      return true;
    } else {
      return false;
    }
  };

  var watcherObjectsClone = function() {
    var arr = [];

    for (var i = 0; i !== watcherObjects.length; i++) {
      arr.push(watcherObjects[i]);
    }

    return arr;
  };

  var watcherFun = function() {
    var cloneWatcherObjects = watcherObjectsClone();

    for (var i = 0; i !== cloneWatcherObjects.length; i++) {
      var rect = cloneWatcherObjects[i].GetRect();

      if (checkRect(rect)) {
        if (!cloneWatcherObjects[i].IsVisible) {
          cloneWatcherObjects[i].IsVisible = true;
          cloneWatcherObjects[i].EventGroup.Trigger('show');
        }
      } else {
        if (cloneWatcherObjects[i].IsVisible) {
          cloneWatcherObjects[i].IsVisible = false;
          cloneWatcherObjects[i].EventGroup.Trigger('hide');
        }
      }
    }
  };

  var startWatch = function() {
    if (watcherID !== undefined || watcherObjects.length === 0) {
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

  var appendWatcher = function(watcherObject) {
    watcherObjects.push(watcherObject);

    if (watcherObjects.length === 1) {
      startWatch();
    }
  };

  /* ViewportWatcherObject */

  var ViewportWatcherObject = function(element) {
    this.Element = element;

    this.EventGroup = Core.Events.CreateEventGroup({
      Self: this,
      EventObjects: {
        show: Core.Events.CreateEventObject(),
        hide: Core.Events.CreateEventObject()
      }
    });

    appendWatcher(this);
  };

  ViewportWatcherObject.prototype.Element   = null;
  ViewportWatcherObject.prototype.IsVisible = false;

  ViewportWatcherObject.prototype.EventGroup = null;
  ViewportWatcherObject.prototype.AddListener = null;
  ViewportWatcherObject.prototype.RemoveListener = null;

  ViewportWatcherObject.prototype.GetRect = function() {
    return this.Element.getBoundingClientRect();
  };

  ViewportWatcherObject.prototype.Destroy = function() {
    watcherObjects.remove(this);

    if (watcherObjects.length === 0) {
      stopWatch();
    }
  };

  /* Component */

  Core.AddComponent('ViewportWatcher', {
    ViewportWatcherObject: ViewportWatcherObject,
    Create: function(element){
      return new ViewportWatcherObject(element);
    },
    SingleTrigger: function(element, callback){
      var watcherObject = new ViewportWatcherObject(element);

      watcherObject.AddListener('show', function(){
        watcherObject.Destroy();

        callback();
      });
    }
  });
})();