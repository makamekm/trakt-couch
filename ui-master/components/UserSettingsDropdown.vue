<template>
  <Dropdown
    :position-x="positionX"
    :position-y="positionY"
    focus-trap
    @select="log($event)"
  >
    <template slot="input" slot-scope="{ events }">
      <slot name="default" :events="events" />
    </template>
    <template slot="content" slot-scope="{ events: { keyDown, close } }">
      <div class="flex w-full">
        <div class="flex flex-col p-2 w-full space-x-2">
          <button
            aria-label="Logout"
            type="button"
            class="text-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-60 select-none transition duration-300"
            tabindex="0"
            @click="close(); logout()"
            @keydown="keyDown"
          >
            Logout
          </button>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from './Dropdown.vue'

export default {
  components: {
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
    logout () {
      window.location.href = '/api/user/logout'
    }
  }
}
</script>
