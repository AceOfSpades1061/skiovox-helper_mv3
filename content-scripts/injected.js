(function fixWindowOpen() {
    const nativeOpen = window.open;
    window.open = (a, b) => nativeOpen(a, b);
})();
