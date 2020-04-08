<template>
  <span class="Logo">
    <h1>megahex.fm</h1>
    <img src="@/assets/logo.jpg" alt="megahex.fm Logo" />
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

    h1 {
      text-indent: -9999px;
      line-height: 0;
    }

    img {
      width: 25rem;
      margin-bottom: 1rem;
    }
  }
</style>
