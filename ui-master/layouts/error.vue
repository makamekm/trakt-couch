<template>
  <div>
    <h2 class="text-2xl leading-7 font-semibold text-center">
      <div v-if="error.statusCode === 404">
        Page not found
      </div>
      <div v-else>
        An error occurred
      </div>
    </h2>
    <p class="mt-3 text-gray-600">
      We recommend you go to <NuxtLink to="/" class="text-indigo-500 hover:underline">
        Home page
      </NuxtLink>, or go to the previous page.<br>
    </p>
    <p class="mt-4 pt-4 text-gray-800 border-t border-dashed text-right">
      Sorry for that and have fun!
    </p>
  </div>
</template>

<script>
export default {
  layout: 'card',
  props: {
    error: { type: Object, default: null }
  }
}
</script>
