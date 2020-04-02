<template>
  <span class="Logo">
    APPNAME
  </span>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Logo';
  
  .#{$c} {
    @include font-style-heading-base;
  }
</style>
