(function () {
  if (!Element.prototype.animate ||
      !window.matchMedia ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('entrance-pending');
  window.__smarterGrowthEntranceFallback = window.setTimeout(function () {
    document.documentElement.classList.remove('entrance-pending');
  }, 3500);
})();
