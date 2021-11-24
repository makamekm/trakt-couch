<template>
  <div v-focus-section class="justify-center items-center border-gray-200 hidden lg:flex bottom-panel z-10">
    <div class="flex-1 group">
      <UserSettingsDropdown v-if="user" position-x="right" position-y="bottom">
        <template slot-scope="{ events: { toggle, blur, keyDown } }">
          <button
            v-focus
            class="min-w-max group flex space-x-4 items-center justify-between py-2 px-8 border border-transparent text-md font-medium rounded-md text-white bg-purple-600 focus:bg-purple-700 focus:outline-none focus:ring-8 focus:ring-offset-8 focus:ring-purple-700 transition duration-300"
            @click="toggle"
            @blur="blur"
            @keydown="keyDown"
          >
            <span class="items-center text-purple-400 group-hover:text-purple-300 transition duration-300">
              <div v-if="user.picture" class="flex w-6 h-6 bg-orange-500 justify-center items-center rounded-full mr-1">
                <img class="rounded-full" alt="A" :src="user.picture">
              </div>
              <SettingsIcon v-else />
            </span>
            <span class="w-auto">Settings</span>
          </button>
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
import UserSettingsDropdown from './UserSettingsDropdown.vue'

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
