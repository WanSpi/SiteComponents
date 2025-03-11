(function(){

  /* Variables */

  var bodyNode = undefined;
  var htmlNode = undefined;

  /* Logic */

  var runTransition = function(config) {
    config.scrollObject.Transition.Stop();
    config.scrollObject.Transition.SetTickEvent(function(value){
      config.tickEvent(config.begin + (config.end - config.begin) * value);
    });

    var stopEvent = function() {
      config.scrollObject.Transition.Stop();
    };

    config.scrollObject.Element.addEventListener('wheel', stopEvent);
    config.scrollObject.Element.addEventListener('touchstart', stopEvent);

    config.scrollObject.Transition.SetEndEvent(function(){
      config.scrollObject.Element.removeEventListener('wheel', stopEvent);
      config.scrollObject.Element.removeEventListener('touchstart', stopEvent);
    });

    config.scrollObject.Transition.Start();
  };

  Core.AddListener('Awake', function(e){
    bodyNode = document.body;
    htmlNode = document.documentElement;

    Core.Scroll.Create(window);

    e.CallBackEnd();
  });

  /* ScrollObject */

  var ScrollObject = function(element) {
    this.Element = element;
    this.Transition = Core.Transition.Create({});
  };

  ScrollObject.prototype.Element    = undefined;
  ScrollObject.prototype.Transition = undefined;

  ScrollObject.prototype.Enable = function() {
    if (this.Element === window) {
      htmlNode.style.overflow = 'visible';
    } else {
      this.Element.style.overflow = 'auto';
    }
  };

  ScrollObject.prototype.Disable = function() {
    if (this.Element === window) {
      htmlNode.style.overflow = 'hidden';
    } else {
      this.Element.style.overflow = 'visible';
    }
  };

  ScrollObject.prototype.GetWidth = function() {
    var scrollWidth = undefined;

    if (this.Element === window) {
      scrollWidth = Math.max(htmlNode.scrollWidth, bodyNode.scrollWidth) - Core.WindowWidth;
    } else {
      scrollWidth = this.Element.scrollWidth - this.Element.offsetWidth;
    }

    return Math.max(scrollWidth, 0);
  };

  ScrollObject.prototype.GetHeight = function() {
    var scrollHeight = undefined;

    if (this.Element === window) {
      scrollHeight = Math.max(htmlNode.scrollHeight, bodyNode.scrollHeight) - Core.WindowHeight;
    } else {
      scrollHeight = this.Element.scrollHeight - this.Element.offsetHeight;
    }

    return Math.max(scrollHeight, 0);
  };

  ScrollObject.prototype.GetScrollLeft = function() {
    if (this.Element === window) {
      return htmlNode.scrollLeft || bodyNode.scrollLeft;
    } else {
      return this.Element.scrollLeft;
    }
  };

  ScrollObject.prototype.SetScrollLeft = function(value) {
    if (this.Element === window) {
      htmlNode.scrollLeft = bodyNode.scrollLeft = value;
    } else {
      this.Element.scrollLeft = value;
    }
  };

  ScrollObject.prototype.TransitionLeft = function(value) {
    var self = this;

    runTransition({
      begin: self.GetScrollLeft(),
      end:   value,
      scrollObject: self,
      tickEvent: function(value){
        self.SetScrollLeft(value);
      }
    });
  };

  ScrollObject.prototype.GetScrollTop = function() {
    if (this.Element === window) {
      return htmlNode.scrollTop || bodyNode.scrollTop;
    } else {
      return this.Element.scrollTop;
    }
  };

  ScrollObject.prototype.SetScrollTop = function(value) {
    if (this.Element === window) {
      htmlNode.scrollTop = bodyNode.scrollTop = value;
    } else {
      this.Element.scrollTop = value;
    }
  };

  ScrollObject.prototype.TransitionTop = function(value) {
    var self = this;

    runTransition({
      begin: self.GetScrollTop(),
      end:   value,
      scrollObject: self,
      tickEvent: function(value){
        self.SetScrollTop(value);
      }
    });
  };

  /* Component */

  Core.AddComponent('Scroll', {
    ScrollObject: ScrollObject,
    Create: function(element){
      return element.Scroll = new ScrollObject(element);
    }
  });
})();