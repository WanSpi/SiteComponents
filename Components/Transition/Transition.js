(function(){

  /* Logic */

  var tick = function(transitionObject) {
    if (typeof transitionObject.TickEvent === 'function') {
      transitionObject.TickEvent(
        transitionObject.Value
      );
    }
  };

  var start = function(transitionObject) {
    var timeStart = Date.now();

    return setInterval(function(){
      var timeNow = Date.now();
      var deltaTime = timeNow - timeStart;

      timeStart = timeNow;
      transitionObject.Time += deltaTime;

      if (transitionObject.Time >= transitionObject.Duration) {
        transitionObject.Time = transitionObject.Duration;
        transitionObject.Value = 1;

        tick(transitionObject);
        transitionObject.Stop();
      } else {
        transitionObject.Value = transitionObject.CubicBezier.GetProgression(transitionObject.Time / transitionObject.Duration);

        tick(transitionObject);
      }
    }, 16);
  };

  /* TransitionObject */

  var TransitionObject = function() {
  };

  TransitionObject.prototype.CubicBezier = Core.CubicBezier.EaseInOut;
  TransitionObject.prototype.Duration    = 1000;

  TransitionObject.prototype.Time  = 0;
  TransitionObject.prototype.Value = 0;

  TransitionObject.prototype.TickEvent  = undefined;
  TransitionObject.prototype.EndEvent   = undefined;
  TransitionObject.prototype.IntervalID = undefined;

  TransitionObject.prototype.SetCubicBezier = function(cubicBezier) {
    if (cubicBezier instanceof Core.CubicBezier.CubicBezierObject) {
      this.CubicBezier = cubicBezier;
    }
  };

  TransitionObject.prototype.SetDuration = function(duration) {
    if (typeof duration !== 'number') {
      duration = Number.parseInt(duration);

      if (duration.isNaN() || duration <= 0) {
        return;
      }
    }

    this.Duration = duration;
  };

  TransitionObject.prototype.SetTickEvent = function(tickEvent) {
    if (typeof tickEvent === 'function') {
      this.TickEvent = tickEvent.bind(this);
    }
  };

  TransitionObject.prototype.SetEndEvent = function(endEvent) {
    if (typeof endEvent === 'function') {
      this.EndEvent = endEvent.bind(this);
    }
  };

  TransitionObject.prototype.Start = function() {
    this.IntervalID = start(this);
  };

  TransitionObject.prototype.Pause = function() {
    if (this.IntervalID) {
      clearInterval(this.IntervalID);
      this.IntervalID = undefined;
    }
  };

  TransitionObject.prototype.Stop = function() {
    if (this.IntervalID) {
      clearInterval(this.IntervalID);
      this.IntervalID = undefined;
    }

    if (typeof this.EndEvent === 'function') {
      this.EndEvent();
    }

    this.Time  = 0;
    this.Value = 0;
  };

  /* Component */

  Core.AddComponent('Transition', {
    TransitionObject: TransitionObject,
    /*
      Duration: number
      TickEvent: function
      EndEvent: function
      CubicBezier: CubicBezierObject
    */
    Create: function(config){
      var transitionObject = new TransitionObject();

      if ('Duration' in config) {
        transitionObject.SetDuration(config.Duration);
      }

      if ('CubicBezier' in config) {
        transitionObject.SetCubicBezier(config.CubicBezier);
      }

      if ('TickEvent' in config) {
        transitionObject.SetTickEvent(config.TickEvent);
      }

      if ('EndEvent' in config) {
        transitionObject.SetEndEvent(config.EndEvent);
      }

      return transitionObject;
    }
  });
})();