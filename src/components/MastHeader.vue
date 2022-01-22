<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import fetchApi from '@/libs/fetchApi'

const router = useRouter()
const navVisible = ref(false)

const menus = ref([
  {
    name: '',
    path: '',
    subjects: [
      {
        path: '',
        name: '',
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

function toList(category: string, type: string) {
  router.push({
    path: `/list/${category}/${type}`,
  })
  navVisible.value = false
}

fetchApi.get(`/api/menu/list`).then((data) => {
  menus.value = data
})

defineProps<{ title: string }>()
</script>

<template>
  <div class="masthead-container" :class="navVisible && 'nav-visible'">
    <header class="masthead">
      <div class="masthead__content">
        <div class="masthead__logo-container" @click.stop="toHome">
          <span class="masthead__logo">
            {{ title.toUpperCase() }}
          </span>
        </div>
      </div>
      <div class="masthead__nav-icon" @click.stop="navVisible = !navVisible">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <div class="nav">
      <div class="nav__content">
        <ul class="nav__sections">
          <li
            v-for="(menu, index) in menus"
            :key="'nav_' + index"
            class="nav__section"
          >
            <h2 class="nav__section-title">
              <a class="nav__section-title-link">{{ menu.name }}</a>
            </h2>
            <ul class="nav__subnav">
              <li
                v-for="(subject, subIndex) in menu.subjects"
                :key="menu.path + '_' + subject.path + '_' + subIndex"
                class="nav__subnav-item"
              >
                <div
                  class="nav__subnav-link"
                  @click.stop="toList(menu.path, subject.path)"
                >
                  {{ subject.name }}
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
.masthead-container
  position fixed
  width 100vw
  .masthead
    padding 0 20px
    position relative
    z-index 1000
    display flex
    align-items center
    justify-content center
    max-width 1280px
    background #fff
    transition background 0.2s ease-in-out
    height 50px
    border-bottom 1px #cdcdcd solid
    @media (min-width 600px)
      height 70px
    .masthead__logo-container
      position relative
      font-size 20px
      @media (min-width 600px)
        font-size 30px
    .masthead__nav-icon
      position absolute
      right 20px
      overflow hidden
      display inline-block
      width 24px
      height 20px
      span
        display block
        position absolute
        width 18px
        height 3px
        background #000
        text-indent -1000em
        right 0
        transition transform 0.2s ease-in-out
        &:nth-child(1)
          top 3px
        &:nth-child(2)
          top 10px
        &:nth-child(3)
          top 17px
  .nav
    z-index 999
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    width 0
    height 0
    visibility hidden
    opacity 0
    transition visibility 0s linear 0.2s, opacity 0.2s ease-in-out
    background #222223
    overflow auto
    color #fff
    .nav__content
      max-width 1280px
      margin 0 auto
      padding 80px 20px 64px
      @media (min-width 600px)
        padding 110px 20px 64px
      .nav__sections
        display flex
        flex-wrap wrap
        .nav__section
          padding-bottom 32px
          order 0
          flex-basis 100%
          @media (min-width 600px)
            padding-bottom 48px
            color #a1a1a3
            flex-basis 50%
          @media (min-width 800px)
            flex-basis 25%
          .nav__section-title
            .nav__section-title-link
              color #a1a1a3
              font-size 18px
              line-height 27px
              @media (min-width 600px)
                font-size 22px
                line-height 33px
          .nav__subnav-item
            padding-right 10px
            @media (min-width 600px)
              padding-right 0
            .nav__subnav-link
              color #fff
              font-size 18px
              line-height 1.6
              @media (min-width 600px)
                font-size 22px
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
