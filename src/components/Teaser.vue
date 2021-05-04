<template>
  <div class="Teaser">
    <div class="Teaser__text-container">
      <span class="Teaser__date">{{date}}</span>
      <Heading :level="2" class="Teaser__title Heading--large">{{title}}</Heading>
      <KirbyBlocks v-if="richText" :content="richText" :path="link.url"></KirbyBlocks>
      <span class="Teaser__read-more">
        <router-link
          class="Teaser__link"
          :to="`/${removeHomeSlug(link.url)}`"
        >
          <span v-html="link.text" />
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import KirbyBlocks from '../components/KirbyBlocks.vue'
import { isHomeSlug } from '../utilities/helpers'
import Heading from '../components/Heading.vue'


export default {
  name: 'Teaser',
  components: {
    KirbyBlocks,
    Heading
  },
  props: {
    richText: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      required: true
    },
  },
  methods: {
    removeHomeSlug(slug) {
      return isHomeSlug(slug) ? '' : `${slug}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Teaser';

  .#{$c} {
    width: 100%;
    margin-bottom: $s-box-margin;
    background-color: $s-color-white;
    border: 1px solid $s-color-black;
    padding: $s-box-padding;

    @include mq($from: medium) {
      width: span(8 of $s-amount-columns);
      margin-left: span(2 wide of $s-amount-columns)
    }

    &__date {
      @include font-style-cygnito-small;
      display: block;
      margin-bottom: 0.4em;

      @include mq($from: medium) {
        font-size: $s-fz-14;
      }
    }

  }
</style>
