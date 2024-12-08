(function(){
  var watchObjects = [];

  /* BackgroundParallax */

  var BackgroundParallax = function(element) {
    this.Element = element;

    if (this.Element.getAttribute('bparallax').toString() === 'reverse') {
      this.Reverse = true;
    }

    this.Element.removeAttribute('bparallax');
    this.ChangePosition();
  };

  BackgroundParallax.prototype.Element = null;
  BackgroundParallax.prototype.Reverse = false;

  BackgroundParallax.prototype.ChangePosition = function() {
    var rect = this.Element.getBoundingClientRect();

    var top = rect.top + rect.height;
    var maxTop = Core.WindowHeight + 2 * rect.height;

    var percent = Math.max(Math.min(top / maxTop, 1), 0);
    if (this.Reverse) {
      percent = 1 - percent;
    }

    this.Element.style.backgroundPosition = 'center ' + (100 * percent) + '%';
  };

  /* Watcher */

  var watcherEvent = function() {
    for (var i = 0; i !== watchObjects.length; i++) {
      watchObjects[i].ChangePosition();
    }
  };

  window.addEventListener('scroll', watcherEvent);
  window.addEventListener('resize', watcherEvent);

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var els = e.Target.querySelectorAll('[bparallax]');

    for (var i = 0; i !== els.length; i++) {
      watchObjects.push(
        new BackgroundParallax(els[i])
      );
    }
  });
})();