(function(){
  var executedTime = 1000;

  /* Logic */

  var createWatcher = function(counterObject) {
    Core.ViewportWatcher
      .SingleTrigger(counterObject.Element, function(){
        counterObject.Execute();
      });
  };

  var transitionTick = function(valuePercent) {
    this.Element.innerText = Math.round(this.Value * valuePercent);
  };

  /* CounterObject */

  var CounterObject = function(el) {
    this.Element = el;
    this.Value   = parseInt(this.Element.getAttribute('counter').toString());

    if (this.Value.isNaN()) {
      this.Value = 0;
    }

    createWatcher(this);

    this.Element.removeAttribute('counter');
  };

  CounterObject.prototype.Element = null;
  CounterObject.prototype.Value   = 0;

  CounterObject.prototype.Executed = false;

  CounterObject.prototype.Execute = function() {
    if (this.Executed) {
      return;
    }

    Core.Transition.Create({
      Duration:  executedTime,
      TickEvent: transitionTick.bind(this)
    }).Start();

    this.Executed = true;
  };

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[counter]');

    for (var i = 0; i !== elements.length; i++) {
      new CounterObject(elements[i])
    }
  });
})();