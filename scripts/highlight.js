/* global AFRAME */
AFRAME.registerComponent('highlight', {
  init: function () {
    var buttonEls = this.buttonEls = this.el.querySelectorAll('.a-entity');
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.reset = this.reset.bind(this);
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
      buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
      buttonEls[i].addEventListener('click', this.onClick);
    }
  },

  onClick: function (evt) {
    console.log('Mouse clicked');
    evt.target.pause();
    evt.target.setAttribute('material', 'color', '#046de7');
    this.el.addState('clicked');
    evt.target.object3D.scale.set(1.2, 1.2, 1.2);
  },

  onMouseEnter: function (evt) {
    console.log('Mouse enters');
    var buttonEls = this.buttonEls;
    evt.target.setAttribute('material', 'color', '#046de7');
    for (var i = 0; i < buttonEls.length; ++i) {
      if (evt.target === buttonEls[i]) { continue; }
      buttonEls[i].setAttribute('material', 'color', 'white');
    }
  },

  onMouseLeave: function (evt) {
    console.log('Mouse leaves');
   
    if (this.el.is('clicked')) { return; }
    evt.target.setAttribute('material', 'color', 'white');
  },

  reset: function () {
    var buttonEls = this.buttonEls;
    for (var i = 0; i < buttonEls.length; ++i) {
      this.el.removeState('clicked');
      buttonEls[i].play();
      buttonEls[i].emit('mouseleave');
    }
  }
});
