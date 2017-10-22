var vm = (function() {
  var renderer = MAG.mag8.CanvasRenderer(
    document.getElementById('screen'),
    64,
    32,
    12,
    12
  );
  return MAG.mag8.VM(renderer);
})();
