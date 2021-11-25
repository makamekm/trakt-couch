<template>
  <DefaultLayout>
    <Nuxt />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  components: {
    DefaultLayout
  },
  layout: 'default'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  body,
  html {
    min-width: 300px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.25em;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(15, 19, 26);
    // background-image: url("/black-construction-paper-texture.jpg");
    // background-repeat: repeat;
    // background-size: contain;
    color: rgb(237, 242, 247);
    overflow-x: hidden;
    max-width: 100vw;
    user-select: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  div,
  * {
    box-sizing: border-box;
  }

  a {
    transition: opacity 0.1s;
  }

  a:not(.button):hover,
  a:not(.button):focus {
    opacity: 0.6;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.4);
    transition: opacoty 0.2s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.9);
  }

</style>
