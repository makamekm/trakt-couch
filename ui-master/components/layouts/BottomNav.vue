<template>
  <div v-if="user" class="fixed flex bottom-2 inset-x-0 mx-2 px-4 bg-white shadow-lg rounded-md justify-center items-center border-gray-200 h-19 lg:hidden bottom-panel">
    <div class="flex-1 group">
      <UserSettingsDropdown position-x="left" position-y="top">
        <template slot-scope="{ events: { toggle, blur, keyDown } }">
          <a
            href="#"
            class="flex flex-col items-center justify-end text-center mx-auto px-4 pt-3 pb-1 w-full text-gray-400 group-hover:text-indigo-500"
            @click="toggle"
            @blur="blur"
            @keydown="keyDown"
          >
            <SettingsIcon />
            <span class="text-xs pb-1.5 pt-1 overflow-ellipsis overflow-hidden whitespace-nowrap">Settings</span>
            <span class="w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full" />
          </a>
        </template>
      </UserSettingsDropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  SettingsIcon
} from 'vue-feather-icons'
import UserSettingsDropdown from '../UserSettingsDropdown.vue'

export default {
  components: {
    SettingsIcon,
    UserSettingsDropdown
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  }
}
</script>

<style scoped>
.bottom-panel {
  min-width: 300px;
}
</style>
