<template>
  <div class="Loader">
    <span class="Loader__animation" />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Loader';

  $c-loader-size: 3rem;
  $c-loader-border-size: 0.5rem;
  $c-loader-min-height: 10rem;

  .#{$c} {
    height: 100%;
    width: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    min-height: $c-loader-min-height;

    &__animation {
      border: $c-loader-border-size solid $s-color-primary;
      display: block;
      border-radius: $c-loader-size;
      height: $c-loader-size;
      width: $c-loader-size;
      top: 50%;
      left: 50%;
      margin: - ($c-loader-size / 2);
      opacity: 0;
      position: absolute;
      animation: pulsate 1s ease-out;
      animation-iteration-count: infinite;

      @keyframes pulsate {
        0% {
          transform: scale(0.1);
          opacity: 0;
        }

        50% {
          opacity: 1;
        }

        100% {
          transform: scale(1.2);
          opacity: 0;
        }
      }
    }
  }
</style>
