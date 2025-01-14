(function(){
  var accordions = [];
  var openClass = 'open';

  /* Logic */

  var hideAllChilds = function(accordionObject) {
    for (var i = 0; i !== accordionObject.Childs.length; i++) {
      if (accordionObject.Childs[i].IsShown) {
        accordionObject.Childs[i].Hide();
      }
    }
  };

  var showElementBox = function(accordionElement) {
    clearTimeout(accordionElement.LastTimeOutID);

    var heightNow = accordionElement.ElementBox.offsetHeight;

    accordionElement.ElementBox.style.maxHeight = 'none';
    var height = accordionElement.ElementBox.offsetHeight;
    accordionElement.ElementBox.style.maxHeight = heightNow + 'px';

    accordionElement.LastTimeOutID = setTimeout(function(){
      accordionElement.ElementBox.style.maxHeight = height + 'px';
    }, 16);
  };

  var hideElementBox = function(accordionElement) {
    clearTimeout(accordionElement.LastTimeOutID);

    accordionElement.ElementBox.style.maxHeight = accordionElement.ElementBox.offsetHeight + 'px';

    accordionElement.LastTimeOutID = setTimeout(function(){
      accordionElement.ElementBox.style.maxHeight = '0';
    }, 16);
  };

  var checkTransitionEnd = function(ev) {
    if (ev.target !== this || ev.propertyName !== 'max-height') {
      return;
    }

    if (this.offsetHeight !== 0) {
      this.style.maxHeight = 'none';
    }
  };

  /* AccordionElement */

  var AccordionElement = function(el, parent) {
    this.Element = el;
    this.Parent  = parent;

    this.ElementToggle = this.Element.querySelector('[accordion-toggle]');
    this.ElementBox    = this.Element.querySelector('[accordion-box]');

    this.ElementToggle.addEventListener('click', this.Toggle.bind(this));
    this.ElementBox.addEventListener('transitionend', checkTransitionEnd);

    this.Element.removeAttribute('accordion-element');
    this.ElementToggle.removeAttribute('accordion-toggle');
    this.ElementBox.removeAttribute('accordion-box');
  };

  AccordionElement.prototype.Element = null;
  AccordionElement.prototype.Parent  = null;

  AccordionElement.prototype.IsShown = false;
  AccordionElement.prototype.LastTimeOutID = undefined;

  AccordionElement.prototype.ElementToggle = null;
  AccordionElement.prototype.ElementBox    = null;

  AccordionElement.prototype.Toggle = function() {
    if (this.IsShown) {
      this.Hide();
    } else {
      this.Show();
    }
  };

  AccordionElement.prototype.Show = function() {
    if (this.IsShown) {
      return;
    }

    hideAllChilds(this.Parent);
    showElementBox(this);

    this.Element.addClass(openClass);
    this.IsShown = true;
  };

  AccordionElement.prototype.Hide = function() {
    if (!this.IsShown) {
      return;
    }

    hideElementBox(this);

    this.Element.removeClass(openClass);
    this.IsShown = false;
  };

  /* AccordionObject */

  var AccordionObject = function(el) {
    this.Element = el;
    this.Childs  = [];

    var domElements = el.querySelectorAll('[accordion-element]');
    for (var i = 0; i !== domElements.length; i++) {
      this.Childs.push(
        new AccordionElement(domElements[i], this)
      );
    }

    this.Element.removeAttribute('accordion');
  };

  AccordionObject.prototype.Element = null;
  AccordionObject.prototype.Childs  = null;

  /* ChangeDOM */

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[accordion]');

    for (var i = 0; i !== elements.length; i++) {
      accordions.push(
        new AccordionObject(elements[i])
      );
    }
  });
})();