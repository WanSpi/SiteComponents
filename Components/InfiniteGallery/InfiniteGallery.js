(function(){
  var scrollSpeed = .1;

  var addChild = function() {
    var childIndex = ++this.LastChildIndex;

    if (childIndex === this.Childs.length) {
      childIndex = this.LastChildIndex = 0;
    }

    this.Element.appendChild(
      this.Childs[childIndex].clone()
    );
  };

  var checkChilds = function(scrollLeft) {
    while (
      this.Element.children.length &&
      scrollLeft > this.Element.children[0].offsetWidth
    ) {
      scrollLeft -= this.Element.children[0].offsetWidth;
      this.Element.children[0].removeElement();
    }

    while (scrollLeft > this.Element.scrollWidth - this.Element.offsetWidth) {
      addChild.call(this);
    }

    return scrollLeft;
  };

  var scrollTransition = function() {
    var nowTime = Date.now();
    var deltaTime = nowTime - this.LastTime;

    var scrollLeft = this.Element.scrollLeft + deltaTime * scrollSpeed;

    this.Element.scrollLeft = checkChilds.call(this, scrollLeft);
    this.LastTime = nowTime;
  };

  /* InfiniteGallery */

  var InfiniteGallery = function(el) {
    this.Element = el;
    this.Childs  = [];

    for (var i = 0; i !== this.Element.children.length; i++) {
      this.Childs.push(
        this.Element.children[i].clone()
      );
    }

    this.StartScroll();

    this.Element.removeAttribute('infinite-gallery');
  };

  InfiniteGallery.prototype.Element = null;
  InfiniteGallery.prototype.Childs  = null;

  InfiniteGallery.prototype.LastChildIndex = -1;

  InfiniteGallery.prototype.LastTime   = undefined;
  InfiniteGallery.prototype.IntervalID = undefined;

  InfiniteGallery.prototype.StartScroll = function() {
    if (this.Childs.length === 0) {
      return;
    }

    this.LastTime = Date.now();
    this.IntervalID = setInterval(
      scrollTransition.bind(this)
    , 16);
  };
  InfiniteGallery.prototype.StopScroll = function() {
    clearInterval(this.IntervalID);
  };

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[infinite-gallery]');

    for (var i = 0; i !== elements.length; i++) {
      new InfiniteGallery(elements[i]);
    }
  });
})();