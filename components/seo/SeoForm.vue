<script setup>

</script>

<template>
  <FormField v-slot="{ componentField }" name="seo.title">
    <FormItem>
      <FormLabel>Введите заголовок</FormLabel>
      <FormControl>
        <Input v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="seo.keywords">
    <FormItem>
      <FormLabel>Введите ключевые слова</FormLabel>
      <FormControl>
        <Input v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="seo.description">
    <FormItem>
      <FormLabel>Введите описание</FormLabel>
      <FormControl>
        <Textarea v-bind="componentField" class="h-52" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
