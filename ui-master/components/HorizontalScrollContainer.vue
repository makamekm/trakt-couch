<template>
  <div v-focus-section="{ enterTo:'last-focused' }" class="flex flex-row items-center justify-start overflow-x-auto min-w-1px">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .max-w-screen {
    max-width: 100vw;
  }

  .min-w-1px {
    min-width: 1px;
  }
</style>
