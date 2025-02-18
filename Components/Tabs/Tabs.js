(function(){
  var tabs = [];
  var activeClass = 'active';

  /* Logic */

  var changeActive = function(tabsObject, tabsElement) {
    for (var i = 0; i !== tabsObject.Childs.length; i++) {
      if (tabsObject.Childs[i] === tabsElement) {
        tabsObject.Childs[i].Button.addClass(activeClass);
        tabsObject.Childs[i].Box.addClass(activeClass);
      } else {
        tabsObject.Childs[i].Button.removeClass(activeClass);
        tabsObject.Childs[i].Box.removeClass(activeClass);
      }
    }
  };

  var changeHeight = function(tabsObject, height) {
    clearTimeout(tabsObject.LastTimeOutID);

    if (tabsObject.Container.offsetHeight === height) {
      return;
    }

    tabsObject.Container.style.height = tabsObject.Container.offsetHeight + 'px';

    tabsObject.LastTimeOutID = setTimeout(function(){
      tabsObject.Container.style.height = height + 'px';
    }, 16);
  };

  var checkTransitionEnd = function(ev) {
    if (ev.target !== this || ev.propertyName !== 'height') {
      return;
    }

    if (this.offsetHeight !== 0) {
      this.style.height = 'auto';
    }
  };

  /* TabsElement */

  var TabsElement = function(button, box, parent) {
    this.Button = button;
    this.Box    = box;

    this.Button.addEventListener('click', this.Toggle.bind(this));

    this.Parent = parent;
  };

  TabsElement.prototype.Button = null;
  TabsElement.prototype.Box    = null;

  TabsElement.prototype.Parent = null;

  TabsElement.prototype.Toggle = function() {
    this.Parent.SetActive(this);
  };

  /* TabsObject */

  var TabsObject = function(el) {
    this.Element = el;
    this.Childs  = [];

    this.Container = this.Element.querySelector('[tabs-container]');
    this.Container.addEventListener('transitionend', checkTransitionEnd);

    var buttonElements = this.Element.querySelectorAll('[tabs-button]');
    var boxElements    = this.Container.querySelectorAll('[tabs-box]');

    var nameBuf = undefined;
    var boxBuf  = {};
    for (var i = 0; i !== boxElements.length; i++) {
      nameBuf = boxElements[i].getAttribute('tabs-box').toString();
      boxBuf[nameBuf] = boxElements[i];

      boxElements[i].removeAttribute('tabs-box');
    }

    for (var i = 0; i !== buttonElements.length; i++) {
      nameBuf = buttonElements[i].getAttribute('tabs-button').toString();

      if (nameBuf in boxBuf) {
        this.Childs.push(
          new TabsElement(buttonElements[i], boxBuf[nameBuf], this)
        );
      }

      buttonElements[i].removeAttribute('tabs-button');
    }

    this.Element.removeAttribute('tabs');
    this.Container.removeAttribute('tabs-container');
  };

  TabsObject.prototype.Element = null;
  TabsObject.prototype.Childs  = null;

  TabsObject.prototype.Container = null;
  TabsObject.prototype.LastTimeOutID = undefined;

  TabsObject.prototype.SetActive = function(tabsElement) {
    changeHeight(this, tabsElement.Box.offsetHeight);
    changeActive(this, tabsElement);
  };

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[tabs]');

    for (var i = 0; i !== elements.length; i++) {
      tabs.push(
        new TabsObject(elements[i])
      );
    }
  });
})();