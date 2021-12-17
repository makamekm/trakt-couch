import Vue from 'vue'
import vjsn from 'vue-js-spatial-navigation'
import scrollIntoView from 'scroll-into-view'

HTMLElement.prototype.scrollIntoView = function () {
  return scrollIntoView(this, {
    maxSynchronousAlignments: 1,
    cancellable: true,
    time: 100
  })
}

const config = {
  defaultElement: '.first-focus',
  // straightOnly: false,
  // straightOverlapThreshold: 0.5,
  rememberSource: true,
  // disabled: false,
  // enterTo: "",
  // leaveFor: null,
  // restrict: "self-first",
  // tabIndexIgnoreList: "a, input, select, textarea, button, iframe, [contentEditable=true]",
  // navigableFilter: null,
  // scrollOptions: { behavior: "smooth", block: "center" }
  scrollOptions: { behavior: 'smooth', block: 'center' }
}

Vue.use(vjsn, config)
