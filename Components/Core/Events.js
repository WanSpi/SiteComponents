Core.Events = (function(){
  var events = {};
  var eventTypes = {};

  /* Logic */

  var getEventArray = function(type) {
    if (!(type in events)) {
      events[type] = [];
    }

    return events[type];
  };

  var getEventTypeArray = function(type) {
    if (!(type in eventTypes)) {
      eventTypes[type] = [];
    }

    return eventTypes[type];
  };

  var addListener = function(type, callback) {
    getEventArray(type).push(callback);

    var eventTypeArray = getEventTypeArray(type);
    for (var i = 0; i !== eventTypeArray.length; i++) {
      if ('AddCallBack' in eventTypeArray[i]) {
        eventTypeArray[i].AddCallBack(callback);
      }
    }
  };

  var removeListener = function(type, callback) {
    var eventArray = getEventArray(type);

    var index = eventArray.indexOf(callback);
    if (index === -1) {
      return;
    }

    eventArray.removeIndex(index);
  };

  var callEvent = function(type, eventObject) {
    var eventArray = getEventArray(type);

    for (var i = 0; i !== eventArray.length; i++) {
      eventArray[i].call(window, eventObject);
    }
  };

  var getCount = function(type) {
    return getEventArray(type).length;
  };

  Core.AddListener = addListener;
  Core.RemoveListener = removeListener;

  return {
    AddListener: addListener,
    RemoveListener: removeListener,
    AddEventType: function(type, config){ // config -> AddCallBack : function
      if (typeof settings !== 'object') {
        settings = {};
      }

      var eventTypeArray = getEventTypeArray(type);
      eventTypeArray.push(settings);

      return {
        CallEvent: callEvent.bind(window, type),
        GetCount: getCount.bind(window, type)
      };
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
    AddCallBack: function(callback){
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
    AddCallBack: function(callback){
      if (startIsCall) {
        callback();
      }
    }
  });

  var callStartEvents = function() {
    startIsCall = true;
    startEventObject.CallEvent();
  };

  window.addEventListener('load', function(){
    awakeIsCall = true;
    awakeEventCount = awakeEventObject.GetCount();

    if (awakeEventCount) {
      awakeEventObject.CallEvent({
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
    AddCallBack: function(callback){
      if (changeIsCall) {
        callback({
          Target: document.body
        });
      }
    }
  });

  Core.AddListener('Start', function(){
    changeIsCall = true;

    changeEventObject.CallEvent({
      Target: document.body
    });
  });

  Core.ParseDOM = function(element) {
    if (!(element instanceof Element)) {
      return console.error('[ParseDOM] Not element');
    }

    changeEventObject.CallEvent({
      Target: element
    });
  };
})();