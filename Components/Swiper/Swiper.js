(function(){

  /* Logic */

  var getPosition = function(e, type) {
    if (type === 'Touch') {
      return getPosition(e.touches[0], 'Mouse');
    } else {
      return {
        ClientX: e.clientX,
        ClientY: e.clientY,
        PageX:   e.pageX,
        PageY:   e.pageY,
        ScreenX: e.screenX,
        ScreenY: e.screenX,
      };
    }
  };

  var startEvent = function(e) {
    var self = this;

    if (e.type === 'touchstart') {
      if (!self.Touch) {
        return;
      }

      var type = 'Touch';
    } else {
      if (!self.Mouse) {
        return;
      }

      var type = 'Mouse';
    }

    var isStarted = false;
    var beginPosition = getPosition(e, type);
    var lastPosition  = beginPosition;

    var moveEvent = function(e) {
      if (!isStarted) {
        self.EventGroup.Trigger('start', {
          Target:   self.Element,
          Type:     type,
          Position: beginPosition,
          X: beginPosition.ClientX,
          Y: beginPosition.ClientY,
        });

        isStarted = true;
      }

      var position = getPosition(e, type);

      self.EventGroup.Trigger('move', {
        Target:   self.Element,
        Type:     type,
        Position: position,
        X:        position.ClientX,
        Y:        position.ClientY,
        OffsetX:  position.ClientX - lastPosition.ClientX,
        OffsetY:  position.ClientY - lastPosition.ClientY,
      });

      lastPosition = position;
    };

    var endEvent  = function(e) {
      if (isStarted) {
        self.EventGroup.Trigger('end', {
          Target:        self.Element,
          Type:          type,
          BeginPosition: beginPosition,
          EndPosition:   lastPosition,
          Position:      lastPosition,
          X:        lastPosition.ClientX,
          Y:        lastPosition.ClientY,
          OffsetX:  lastPosition.ClientX - beginPosition.ClientX,
          OffsetY:  lastPosition.ClientY - beginPosition.ClientY,
        });
      }

      document.body.style.userSelect = '';

      if (type === 'Touch') {
        document.removeEventListener('touchmove', moveEvent);
        document.removeEventListener('touchend',  endEvent);
      } else {
        document.removeEventListener('mousemove', moveEvent);
        document.removeEventListener('mouseup',  endEvent);
      }
    };

    document.body.style.userSelect = 'none';

    if (type === 'Touch') {
      document.addEventListener('touchmove', moveEvent);
      document.addEventListener('touchend',  endEvent);
    } else {
      document.addEventListener('mousemove', moveEvent);
      document.addEventListener('mouseup',  endEvent);
    }
  };

  /* SwiperObject */

  var SwiperObject = function(element) {
    this.Element = element;

    this.EventGroup = Core.Events.CreateEventGroup({
      Self: this,
      EventObjects: {
        start: Core.Events.CreateEventObject(),
        move:  Core.Events.CreateEventObject(),
        end:   Core.Events.CreateEventObject()
      }
    });

    this.Element.addEventListener('mousedown', startEvent.bind(this));
    this.Element.addEventListener('touchstart', startEvent.bind(this));
  };

  SwiperObject.prototype.Element    = null;
  SwiperObject.prototype.EventGroup = null;

  SwiperObject.prototype.Touch = true;
  SwiperObject.prototype.Mouse = true;

  /* Component */

  Core.AddComponent('Swiper', {
    SwiperObject: SwiperObject,
    /*
      Target:     Element

      StartEvent: function
      MoveEvent:  function
      EndEvent:   function

      Touch:      bool | true
      Mouse:      bool | true
    */
    Create: function(config){
      if (!IsObject(config)) {
        config = {};
      }

      if (!('Target' in config) || !(config.Target instanceof Element)) {
        console.error('[Swiper][Create] Target is required');
        return null;
      }

      var swiperObject = new SwiperObject(config.Target);

      if ('StartEvent' in config) {
        swiperObject.AddListener('start', config.StartEvent);
      }

      if ('MoveEvent' in config) {
        swiperObject.AddListener('move', config.MoveEvent);
      }

      if ('EndEvent' in config) {
        swiperObject.AddListener('end', config.EndEvent);
      }

      if ('Touch' in config) {
        swiperObject.Touch = !!config.Touch;
      }

      if ('Mouse' in config) {
        swiperObject.Mouse = !!config.Mouse;
      }

      return swiperObject;
    }
  });
})();