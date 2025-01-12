(function(){
  var anchorElements = {};

  /* Logic */

  var goToAnchor = function(anchorName) {
    if (!(anchorName in anchorElements)) {
      return;
    }

    var element = anchorElements[anchorName];
    var rect = element.getBoundingClientRect();

    var transitionTop = Scroll.GetScrollTop() + rect.top;

    if (rect.height < Core.WindowHeight) {
      transitionTop -= (Core.WindowHeight - rect.height) / 2;
    }

    location.hash = '#' + anchorName;
    Scroll.TransitionTop(transitionTop);
  };

  var createAnchorLink = function(link, anchorName) {
    link.linkAnchor = true;

    link.addEventListener('click', function(e){
      e.preventDefault();

      goToAnchor(anchorName);

      return false;
    });
  };

  /* ChangeDOM */

  Core.AddListener('Start', function(e){
    var match = location.hash.match(/^\#([\d\D]+)$/);

    if (match && match[1].trim()) {
      goToAnchor(match[1].trim());
    }
  });

  Core.AddListener('ChangeDOM', function(e){
    var elements = e.Target.querySelectorAll('[lanchor]');

    for (var i = 0; i !== elements.length; i++) {
      var anchorName = elements[i].getAttribute('lanchor').toString();

      if (!(anchorName in anchorElements)) {
        anchorElements[anchorName] = elements[i];
      }

      elements[i].removeAttribute('lanchor');
    }

    var links = document.links || document.querySelectorAll('a');
    for (var i = 0; i !== links.length; i++) {
      if ('linkAnchor' in links[i] && links[i].linkAnchor) {
        continue;
      }

      var href = links[i].href.replace(location.origin, '').replace(location.pathname, '');

      if (href[0] === '#') {
        createAnchorLink(links[i], href.substr(1));
      }
    }
  });
})();