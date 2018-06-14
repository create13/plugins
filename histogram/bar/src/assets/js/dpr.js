(function (doc, win) {
  let docEl = doc.documentElement;
  let dpr = 1;
  let tid;
  let scale = 1 / dpr;
  var metaEl = doc.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
  docEl.firstElementChild.appendChild(metaEl);
  var recalc = function () {
    var deviceWidth = docEl.clientWidth;
    if (deviceWidth > 3260) deviceWidth = 3260;
    docEl.style.fontSize = deviceWidth / 32.6 + 'px';
  };
  recalc();

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(recalc, 300);
  }, false);
})(document, window);
