<template>
  <div v-if="session" class="flex flex-col">
    <CollectedMovies />
  </div>
  <EnterCode v-else />
</template>

<script>
import { mapState } from 'vuex'
import CollectedMovies from './CollectedMovies.vue'
import EnterCode from './EnterCode.vue'

export default {
  components: {
    EnterCode,
    CollectedMovies
  },
  computed: {
    ...mapState('trakt', {
      session: 'session'
    })
  }
}
</script>
