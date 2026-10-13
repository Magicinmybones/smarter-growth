(function () {
  var root = document.documentElement;
  if (!root.classList.contains('entrance-pending')) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var animations = [];
  var completed = false;
  var ease = 'cubic-bezier(.16, 1, .3, 1)';

  function finish() {
    if (completed) return;
    completed = true;
    root.classList.remove('entrance-pending');
    animations.forEach(function (animation) { animation.cancel(); });
    window.clearTimeout(window.__smarterGrowthEntranceFallback);
    reduceMotion.removeEventListener('change', onMotionChange);
  }

  function onMotionChange() {
    if (reduceMotion.matches) finish();
  }

  function cue(selector, keyframes, delay, duration) {
    var element = document.querySelector(selector);
    if (!element || getComputedStyle(element).display === 'none') return;
    animations.push(element.animate(keyframes, {
      delay: delay,
      duration: duration,
      easing: ease,
      fill: 'both'
    }));
  }

  var quietRise = [
    { opacity: 0, transform: 'translateY(6px)' },
    { opacity: 1, transform: 'none' }
  ];
  var softRise = [
    { opacity: 0, transform: 'translateY(8px)' },
    { opacity: 1, transform: 'none' }
  ];
  var cardReveal = [
    { opacity: 0, transform: 'translateY(10px) scale(.985)' },
    { opacity: 1, transform: 'none' }
  ];
  var railReveal = [
    { opacity: 0, transform: 'translateY(8px)' },
    { opacity: 1, transform: 'none' }
  ];

  try {
    // The header sets the frame without competing with the hero.
    cue('.logo', quietRise, 40, 480);
    cue('.nav', [{ opacity: 0 }, { opacity: 1 }], 110, 520);
    cue('.btn-contact', quietRise, 150, 500);
    cue('.menu-toggle', [{ opacity: 0 }, { opacity: 1 }], 160, 450);

    // Type leads, then the explanation and the action.
    cue('.hero h1', [
      { opacity: 0, clipPath: 'inset(0 0 100% 0)', transform: 'translateY(14px)' },
      { opacity: 1, clipPath: 'inset(0 0 0% 0)', transform: 'none' }
    ], 210, 900);
    cue('.hero p', softRise, 550, 570);
    cue('.hero .cta', [
      { opacity: 0, transform: 'translateY(7px) scale(.985)' },
      { opacity: 1, transform: 'none' }
    ], 750, 600);

    // Three cards read left to right on the canvas. A swipeable rail is one
    // composition on smaller screens, including its offscreen cards.
    if (window.matchMedia('(min-width:768px) and (min-height:560px)').matches) {
      cue('.card:nth-child(1)', cardReveal, 920, 860);
      cue('.card:nth-child(2)', cardReveal, 1050, 860);
      cue('.card:nth-child(3)', cardReveal, 1180, 860);
    } else {
      cue('.cards', railReveal, 950, 870);
      cue('.dots', softRise, 1410, 430);
    }
    reduceMotion.addEventListener('change', onMotionChange);
    Promise.all(animations.map(function (animation) {
      return animation.finished.catch(function () {});
    })).then(finish);
  } catch (error) {
    finish();
  }
})();
