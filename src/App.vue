<script setup lang="ts">
import { syncUserStatus } from '@/api/user'

syncUserStatus()
</script>

<template>
  <router-view></router-view>
</template>
