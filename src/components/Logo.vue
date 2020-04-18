<template>
  <router-link class="Logo" to="/">
    <h1>megahex.fm</h1>
    <img src="@/assets/logo.jpg" alt="megahex.fm Logo" />
  </router-link>
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
    font-size: 0;
    line-height: 0;

    h1 {
      text-indent: -9999px;
      line-height: 0;
    }

    img {
      width: 25rem;
      margin-bottom: $s-box-distance;
      border: 1px solid $s-color-black;
      padding: 0.2rem;
      display: block;
    }
  }
</style>
