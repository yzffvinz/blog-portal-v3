<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
</script>

<template>
  <div class="content__center">
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
  </div>
  <BasicFooter />
</template>

<style lang="stylus">
.content__center
  max-width 1280px
  margin 0 auto
</style>
