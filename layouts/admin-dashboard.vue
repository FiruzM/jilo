<script setup lang="ts">

</script>

<template>
  <div class="flex">
    <AsidebarAdminAsidebar class="hidden lg:block" />
    <div class="grow">
      <Header />
      <div class="-mt-36 px-5 pb-20 lg:px-12">
        <div class="rounded-3xl border bg-white p-5 lg:p-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
