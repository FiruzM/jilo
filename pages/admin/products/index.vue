<script setup lang="ts">
definePageMeta({
  layout: 'admin-dashboard',
  title: 'Товары',
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          №
        </TableHead>
        <TableHead>Название</TableHead>
        <TableHead>Количество</TableHead>
        <TableHead class="text-right">
          Стоимость
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(_, index) in 5" :key="index">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
        <TableCell>Краситель</TableCell>
        <TableCell>100 шт</TableCell>
        <TableCell class="text-right">
          25 см
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
