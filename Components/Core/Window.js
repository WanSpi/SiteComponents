(function(){
  Core.WindowWidth = 0;
  Core.WindowHeight = 0;

  var resizeWindowSize = function() {
    Core.WindowWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    Core.WindowHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  };

  Core.AddListener('Awake', function(e){
    resizeWindowSize();
    e.CallBackEnd();
  });

  window.addEventListener('resize', resizeWindowSize);
})();