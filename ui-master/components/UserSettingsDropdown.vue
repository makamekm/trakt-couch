<template>
  <Dropdown
    :position-x="positionX"
    :position-y="positionY"
    :offset-top="8"
    focus-trap
    @select="log($event)"
  >
    <template slot="input" slot-scope="{ events }">
      <slot name="default" :events="events" />
    </template>
    <template slot="content" slot-scope="{ events: { keyDown, close } }">
      <button
        aria-label="Logout"
        type="button"
        class="min-w-max group flex space-x-4 items-center justify-between py-2 px-8 border border-transparent text-md font-medium rounded text-white bg-black bg-opacity-40 focus:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-red-700 transition duration-300"
        tabindex="0"
        @click="close(); logout()"
        @keydown="keyDown"
      >
        <span class="items-center transition duration-300">
          <LogOutIcon />
        </span>
        <span class="w-auto">Logout</span>
      </button>
    </template>
  </Dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import {
  LogOutIcon
} from 'vue-feather-icons'
import Dropdown from './Dropdown.vue'

export default {
  components: {
    LogOutIcon,
    Dropdown
  },
  props: {
    positionX: {
      default: 'left',
      type: String
    },
    positionY: {
      default: 'bottom',
      type: String
    }
  },
  methods: {
    ...mapActions('trakt', {
      resetSession: 'resetSession'
    }),
    async logout () {
      await this.resetSession()
      window.location.href = '/'
    }
  }
}
</script>
