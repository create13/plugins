(function (doc, win) {
        var docEl = doc.documentElement,
                dpr = 1,
                tid,
                scale = 1 / dpr;
        var metaEl = doc.createElement('meta');
        metaEl.name = "viewport";
        metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
        docEl.firstElementChild.appendChild(metaEl);
        var recalc = function () {
            var deviceWidth = docEl.clientWidth;
            if (deviceWidth > 750) deviceWidth = 750;
            docEl.style.fontSize = deviceWidth / 7.5 + 'px';
        };
        recalc();

        win.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(recalc, 300);
        }, false);

    })(document, window);
