<template>
  <div class="TemplateComponent" v-show="chatOpen">
    <iframe src="https://zzz.megahex.fm:9443/?channels=megahex.fm&uio=Nz1mYWxzZSY5PXRydWUmMTE9MzY510" width="647" height="400"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemplateComponent',
  computed: {
    ...mapState('ui', ['chatOpen'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'TemplateComponent';

  .#{$c} {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: z('chat');

    iframe {
      width: 100%;
    }
  }
</style>
