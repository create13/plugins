(function () {
    function getClientWidth() {
        var cw = document.documentElement.clientWidth;
        if (cw > 640) {
            cw = 640
        }
        document.documentElement.style.setProperty("font-size", cw / 6.4 + "px")
    }

    var Timer = null;
    window.addEventListener("resize", function () {
        clearTimeout(Timer), Timer = setTimeout(getClientWidth, 300)
    }, false);
    getClientWidth()
})(window);



