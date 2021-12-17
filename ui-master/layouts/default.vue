<template>
  <DefaultLayout :class="{'iframe': iFrame}">
    <Nuxt />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  components: {
    DefaultLayout
  },
  layout: 'default',
  data () {
    return {
      iFrame: false
    }
  },
  mounted () {
    this.iFrame = window.self !== window.top
    // TVXInteractionPlugin?.init()
    if (TVXInteractionPlugin) {
      function MyHandler () {
        this.init = function () {
          // Init handler
        }
        this.ready = function () {
          // Handler is ready
          // TVXInteractionPlugin?.executeAction('invalidate:content')
          // TVXInteractionPlugin?.executeAction('invalidate:panel')
          // TVXInteractionPlugin?.executeAction('invalidate:menu')

          // TVXInteractionPlugin?.executeAction('release:menu')
          // TVXInteractionPlugin?.executeAction('release:panel')
          // TVXInteractionPlugin?.executeAction('release:content')
        }
        this.handleEvent = function (data) {
          if (data.event === 'app:result') {
            // Note: The property data.id contains the request ID
            // Note: The property data.code contains the result code
            // -3: Internal Error
            // -2: Launch Error
            // -1: OK
            //  0: Canceled
            //  1: ---
            //  2: Connection Failed (VLC)
            //  3: Playback Error (VLC)
            //  4: Hardware Acceleration Error (VLC)
            //  5: Video Track Lost (VLC)
            // Note: The properties inside the data.extra property are application-specific
            // alert(TVXTools.serialize(data))
            TVXInteractionPlugin.info('Result: ' + TVXTools.serialize(data), true, false)// Log, but do not show
          }
          // Handle event
        }
        this.handleData = function (data) {
          // Handle data
        }
        this.handleRequest = function (dataId, data, res) {
          res({
            type: 'list',
            important: false,
            wrap: true,
            transparent: 1,
            template: {
              type: 'separate',
              layout: '0,0,2,4',
              transparent: 1
            },
            pages: [
              {
                items: [
                  {
                    type: 'control',
                    layout: '0,0,5,1',
                    label: '',
                    offset: '-10.0,-10.0,0.0,0.0'
                  }
                ]
              }
            ]
          })
        }
      }
      window.onload = function () {
        TVXInteractionPlugin.setupHandler(new MyHandler())
        TVXInteractionPlugin.init()
      }
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  html {
    font-size: 1.25vw;
  }

  body,
  html {
    min-width: 300px;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    // font-size: 1.25em;

    //font-size: clamp(0.5rem, 0.2000rem + 0.6667vw, 1rem);
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

  body {
    min-height: 100vh;
    /* mobile viewport bug fix */
    // min-height: -webkit-fill-available !important;
  }

  html {
    height: -webkit-fill-available !important;
  }

  .iframe .min-h-screen {
    min-height: -webkit-fill-available !important;
  }

  .iframe .max-h-screen {
    max-height: -webkit-fill-available !important;
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
