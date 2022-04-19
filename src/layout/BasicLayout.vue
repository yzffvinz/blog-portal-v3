<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
</script>

<template>
  <div
    class="basic__container min-h-screen flex flex-col items-center justify-between"
  >
    <div class="content__center w-full">
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
  </div>
</template>

<style lang="stylus">
.content__center
  max-width 1280px
  margin 0 auto
</style>
