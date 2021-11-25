<template>
  <div class="background">
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<style lang="scss" scoped>
  @use "sass:math";

  .background {
    z-index: -1;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(0,0,0);
    // background: linear-gradient(0deg, #945ae6 0%, #3E1E68 100%);
    background: linear-gradient(0deg, #7851ad 0%, #681e1e 80%);
    //background: #3E1E68;
    opacity: 0.75;
  }

  $particleSize: 20vmin;
  $animationDuration: 140s;
  $amount: 10;
  .background span {
    width: $particleSize;
    height: $particleSize;
    border-radius: $particleSize;
    backface-visibility: hidden;
    position: absolute;
    animation-name: move;
    animation-duration: $animationDuration;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    $colors: (
      #583C87,
      #E45A84,
      #FFACAC
    );
    @for $i from 1 through $amount {
      &:nth-child(#{$i}) {
        color: nth($colors, random(length($colors)));
        top: random(100) * 1%;
        left: random(100) * 1%;
        animation-duration: math.div(random($animationDuration * 10), 10) * 1s + 10s;
        animation-delay: math.div(random(($animationDuration + 10s) * 10), 10) * -1s;
        transform-origin: (random(50) - 25) * 0.5 * 1vw (random(50) - 25) * 0.5 * 1vh;
        $blurRadius: (random() * 2 + 0.25) * $particleSize * 0.5;
        $x: if(random() > 0.5, -1, 1);
        box-shadow: ($particleSize * 2 * $x) 0 $blurRadius currentColor;
      }
    }
  }

  @keyframes move {
    100% {
      transform: translate3d(0, 0, 1px) rotate(360deg);
    }
  }
</style>
