<script setup lang="ts">
import { doShowLog } from '@/api/stat'

doShowLog('site')
</script>

<template>
  <router-view></router-view>
</template>
