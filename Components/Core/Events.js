Core.Events = (function(){
  var eventObjects = {};

  /* Logic */

  var addListener = function(type, callback) {
    if (!(type in eventObjects)) {
      eventObjects[type] = [];
    }

    if (eventObjects[type] instanceof EventObject) {
      eventObjects[type].AddListener(callback);
    } else {
      eventObjects[type].push(callback);
    }
  };

  var removeListener = function(type, callback) {
    if (!(type in eventObjects)) {
      eventObjects[type] = [];
    }

    if (eventObjects[type] instanceof EventObject) {
      eventObjects[type].RemoveListener(callback);
    } else {
      eventObjects[type].remove(callback);
    }
  };

  Core.AddListener = addListener;
  Core.RemoveListener = removeListener;

  /* EventObject */

  var EventObject = function() {
    this.Events = [];
  };

  EventObject.prototype.Events = null;

  EventObject.prototype.AddCallback    = null;
  EventObject.prototype.RemoveCallback = null;

  EventObject.prototype.SetAddCallback = function(callback) {
    if (callback === null || typeof callback === 'function') {
      this.AddCallback = callback;
    }
  };
  EventObject.prototype.SetRemoveCallback = function(callback) {
    if (callback === null || typeof callback === 'function') {
      this.RemoveCallback = callback;
    }
  };

  EventObject.prototype.Trigger = function(eventObject) {
    for (var i = 0; i !== this.Events.length; i++) {
      this.Events[i].call(window, eventObject);
    }
  };

  EventObject.prototype.GetCount = function() {
    return this.Events.length;
  };

  EventObject.prototype.AddListener = function(callback) {
    if (typeof callback === 'function' && !this.Events.contains(callback)) {
      this.Events.push(callback);

      if (this.AddCallback) {
        this.AddCallback(callback);
      }
    }
  };
  EventObject.prototype.RemoveListener = function(callback) {
    if (this.Events.remove(callback) && this.RemoveCallback) {
      this.RemoveCallback(callback);
    }
  };

  /* Global methods */

  return {
    AddListener: addListener,
    RemoveListener: removeListener,
    AddEventType: function(type, config){
      var eventObject = this.CreateEventObject(config);

      if (type in eventObjects) {
        if (eventObjects[type] instanceof EventObject) {
          console.error('[Events][AddEventType] Type \'' + type + '\' already exists');
        } else {
          for (var i = 0; i !== eventObjects[type].length; i++) {
            eventObject.AddListener(
              eventObjects[type][i]
            );
          }

          eventObjects[type] = eventObject;
        }
      } else {
        eventObjects[type] = eventObject;
      }

      return eventObject;
    },
    CreateEventObject: function(config){
      if (typeof config !== 'object') {
        config = {};
      }

      var eventObject = new EventObject();

      if ('AddCallback' in config) {
        eventObject.SetAddCallback(config.AddCallback);
      }

      if ('RemoveCallback' in config) {
        eventObject.SetRemoveCallback(config.RemoveCallback);
      }

      return eventObject;
    }
  };
})();

(function(){
  /*
    Awake
    Start
  */

  var awakeIsCall = false;
  var awakeEventCount = 0;
  var awakeCallBackEnd = function() {
    awakeEventCount--;

    if (awakeEventCount === 0) {
      callStartEvents();
    }
  };

  var awakeEventObject = Core.Events.AddEventType('Awake', {
    AddCallback: function(callback){
      if (awakeIsCall) {
        awakeEventCount++;

        callback({
          CallBackEnd: awakeCallBackEnd
        });
      }
    }
  });

  var startIsCall = false;
  var startEventObject = Core.Events.AddEventType('Start', {
    AddCallback: function(callback){
      if (startIsCall) {
        callback();
      }
    }
  });

  var callStartEvents = function() {
    startIsCall = true;
    startEventObject.Trigger();
  };

  window.addEventListener('load', function(){
    awakeIsCall = true;
    awakeEventCount = awakeEventObject.GetCount();

    if (awakeEventCount) {
      awakeEventObject.Trigger({
        CallBackEnd: awakeCallBackEnd
      });
    } else {
      callStartEvents();
    }
  });
})();

(function(){
  /*
    ChangeDOM
  */

  var changeIsCall = false;
  var changeEventObject = Core.Events.AddEventType('ChangeDOM', {
    AddCallback: function(callback){
      if (changeIsCall) {
        callback({
          Target: document.body
        });
      }
    }
  });

  Core.AddListener('Start', function(){
    changeIsCall = true;

    changeEventObject.Trigger({
      Target: document.body
    });
  });

  Core.ParseDOM = function(element) {
    if (!(element instanceof Element)) {
      return console.error('[ParseDOM] Not element');
    }

    changeEventObject.Trigger({
      Target: element
    });
  };
})();