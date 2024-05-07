<script setup lang="ts">

</script>

<template>
  <div class="flex">
    <AsidebarAdminAsidebar />
    <div class="grow">
      <Header />
      <div class="-mt-36 px-12 pb-20">
        <div class="rounded-3xl border bg-white p-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
