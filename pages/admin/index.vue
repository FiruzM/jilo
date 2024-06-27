<script setup lang="ts">
definePageMeta({
  layout: 'admin-dashboard',
  title: 'Админка',
  middleware: ['admin-only'],
})
</script>

<template>
  <div>
    <h1>hello</h1>
  </div>
</template>
