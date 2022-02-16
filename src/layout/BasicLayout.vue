<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
</script>

<template>
  <MastHeader title="B👀 Ming✨" />
  <router-view v-slot="{ Component }">
    <transition>
      <div>
        <keep-alive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive"
            :key="$route.fullPath"
          />
        </keep-alive>
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
          :key="$route.fullPath"
        />
      </div>
    </transition>
  </router-view>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
  padding-bottom 60px
</style>
