<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getMenus } from '@/api/tag'
import CountButton from '@/components/CountButton.vue'
import MenuIcon from './MenuIcon.vue'

const router = useRouter()
const navVisible = ref(false)

const menus = ref([
  {
    name: '',
    displayName: '',
    children: [
      {
        name: '',
        displayName: '',
      },
    ],
  },
])

function toggleUnfold() {
  navVisible.value = !navVisible.value
}

function processLogin() {
  router.push('/login')
}

function addEmo() {
  router.push('/emoadder')
}

getMenus().then((data) => {
  menus.value = data.menus
})

defineProps<{ title: string }>()
</script>

<template>
  <div
    class="masthead-container fixed w-full z-50"
    :class="navVisible && 'nav-visible'"
  >
    <header
      class="masthead px-5 relative z-50 flex items-center justify-center max-w-screen-xl h-12 transition bg-white border-solid border-0 border-b border-divide sm:h-16"
    >
      <div class="masthead__content">
        <RouterLink
          class="masthead__logo-container relative cursor-pointer text-xl sm:text-3xl"
          to="/"
          @click.stop="navVisible = false"
        >
          <span class="masthead__logo"> {{ title }} </span>
        </RouterLink>
      </div>
      <div class="absolute left-5">
        <CountButton @twice-click="processLogin" @triple-click="addEmo">
          <div class="w-5 h-5 border-solid border-black border-y-2 bold">-</div>
        </CountButton>
      </div>
      <MenuIcon :unfold="navVisible" @menu-click="toggleUnfold"></MenuIcon>
    </header>
    <div
      class="nav visible fixed z-45 inset-0 w-0 h-0 opacity-0 bg-menu-bg transition-all text-white overflow-auto"
    >
      <div
        class="nav__content mx-auto my-0 max-w-screen-xl px-5 pt-20 pb-16 sm:pt-28"
      >
        <ul class="nav__sections grid grid-cols-2 md:grid-cols-4">
          <li
            v-for="(menu, index) in menus"
            :key="'nav_' + index"
            class="nav__section pb-8 sm:pd-12"
          >
            <h2 class="nav__section-title text-menu-title">
              <a class="nav__section-title-link text-lg sm:text-2xl">{{
                menu.displayName
              }}</a>
            </h2>
            <ul class="nav__subna pr-2.5 sm:pr-0">
              <li
                v-for="(child, subIndex) in menu.children"
                :key="menu.name + '_' + child.name + '_' + subIndex"
                class="nav__subnav-item"
              >
                <RouterLink
                  class="nav__subnav-link text-white text-lg sm:text-2xl cursor-pointer"
                  :to="`/list/${child.name}`"
                  @click.stop="navVisible = false"
                >
                  {{ child.displayName }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
ul, ol, li
  list-style none
.nav-visible
  .masthead
    background #222223
    color #fff
  .nav
    visibility visible
    opacity 1
    transition-delay 0s
    width auto
    height auto
</style>
