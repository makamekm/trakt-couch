<template>
  <ModalBase
    :label="label"
    @close="$router.back()"
  >
    <slot slot="backdrop" name="backdrop" />
    <slot />
  </ModalBase>
</template>

<script>
import ModalBase from './ModalBase.vue'

export default {
  components: {
    ModalBase
  },
  props: {
    label: {
      required: true,
      type: String
    }
  }
}
</script>
