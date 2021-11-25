<template>
  <div class="root flex flex-col items-top justify-center min-h-screen max-h-screen sm:items-center sm:pt-0 pb-20 lg:pb-0">
    <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.4/dist/tailwind.min.css" rel="stylesheet"> -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"> -->
    <Background />
    <Header />
    <div class="flex flex-1 items-stretch justify-start w-screen max-w-screen min-w-1px min-h-1px">
      <LeftMenu v-if="session" />
      <div class="flex flex-col flex-1 items-center justify-start items-center min-w-1px min-h-1px">
        <slot />
      </div>
    </div>
    <!-- <Footer /> -->
    <!-- <BottomNav /> -->
    <PortalTarget name="modal" multiple />
    <PortalTarget name="popup" multiple />
    <Loading :hide="hasInitialized" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
// import BottomNav from './BottomNav.vue'
import Background from './Background.vue'
import Header from './Header.vue'
import Loading from './Loading.vue'
import LeftMenu from './LeftMenu.vue'

export default {
  components: {
    // BottomNav,
    Background,
    Header,
    Loading,
    LeftMenu
  },
  computed: {
    ...mapState('trakt', {
      session: 'session'
    }),
    ...mapGetters({
      hasInitialized: 'trakt/hasInitialized'
    })
  },
  mounted () {
    this.loadSession()
  },
  methods: {
    ...mapActions({
      loadSession: 'trakt/loadSession'
    })
  }
}
</script>

<style lang="scss">
  .root {
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
  }

  .min-h-1px {
    min-height: 1px;
  }

  .min-w-1px {
    min-width: 1px;
  }

  .max-w-screen {
    max-width: 100vw;
  }

  .w-screen {
    width: 100vw;
  }
</style>
