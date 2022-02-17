<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getMenus } from '@/api/tag'

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

function toHome() {
  router.push({
    path: '/',
  })
  navVisible.value = false
}

function toList(category: string, tag: string) {
  router.push({
    path: `/list/${tag}`,
  })
  navVisible.value = false
}

getMenus().then((data) => {
  menus.value = data.menus
})

defineProps<{ title: string }>()
</script>

<template>
  <div
    class="masthead-container fixed w-screen z-50"
    :class="navVisible && 'nav-visible'"
  >
    <header
      class="masthead px-5 relative z-50 flex items-center justify-center max-w-screen-xl h-12 transition bg-white border-solid border-0 border-b border-divide sm:h-16"
    >
      <div class="masthead__content">
        <div
          class="masthead__logo-container relative cursor-pointer text-xl sm:text-3xl"
          @click.stop="toHome"
        >
          <span class="masthead__logo"> {{ title }} </span>
        </div>
      </div>
      <div
        class="masthead__nav-icon absolute right-5 inline-block overflow-hidden w-6 h-5 cursor-pointer"
        @click.stop="navVisible = !navVisible"
      >
        <span
          v-for="(s, i) in new Array(3)"
          :key="'icon-span_' + i"
          class="absolute block transition-transform right-0 bg-black"
        >
        </span>
      </div>
    </header>
    <div
      class="nav fixed z-45 inset-0 w-0 h-0 opacity-0 bg-menu-bg transition-all text-white overflow-auto"
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
                <div
                  class="nav__subnav-link text-white text-lg sm:text-2xl cursor-pointer"
                  @click.stop="toList(menu.name, child.name)"
                >
                  {{ child.displayName }}
                </div>
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
.masthead-container
  .masthead
    .masthead__nav-icon
      span
        width 18px
        height 3px
        &:nth-child(1)
          top 3px
        &:nth-child(2)
          top 10px
        &:nth-child(3)
          top 17px
  .nav
    visibility hidden
.nav-visible
  .masthead
    background #222223
    color #fff
    .masthead__nav-icon
      span
        background #fff
        &:nth-child(1)
          transform translateY(7px) rotate(45deg)
        &:nth-child(2)
          transform rotate(45deg)
        &:nth-child(3)
          transform translateY(-7px) rotate(-45deg)
  .nav
    visibility visible
    opacity 1
    transition-delay 0s
    width auto
    height auto
</style>
