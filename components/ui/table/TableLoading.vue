<script setup lang="ts">
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'

defineProps<{ cells: number }>()
</script>

<template>
  <TableRow v-for="(_, index) in 8" :key="index">
    <TableCell v-for="(_, i) in cells" :key="i">
      <Skeleton class=" h-3 w-full" />
    </TableCell>
  </TableRow>
</template>
