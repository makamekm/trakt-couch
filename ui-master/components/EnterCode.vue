<template>
  <div class="flex flex-col space-y-4 items-center justify-center py-20">
    <div
      class="max-w-full flex flex-col items-center justify-center"
    >
      <template v-if="error">
        <div class="font-medium text-2xl text-red-500 px-24 mb-8">
          {{ error }}
        </div>
        <div class="font-medium text-xl px-24 mb-8 opacity-40">
          Trakt.tv is offline now
        </div>
      </template>
      <template v-else>
        <div class="font-medium text-2xl px-24 mb-8">
          Откройте <a class="text-red-200" :href="url" target="_blank">{{ url }}</a> и введите код
        </div>
        <div class="flex select-text items-center justify-center text-center py-4 px-10 border border-transparent text-2xl tracking-wider font-medium rounded-md text-white bg-black bg-opacity-40 ring-8 ring-offset-8 ring-red-500 transition duration-300">
          {{ code }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('trakt', {
      code: 'code',
      url: 'url',
      error: 'error'
    })
  }
}
</script>
