<template>
  <div class="PodcastTeaser">
    <div class="PodcastTeaser__image-container">
      <img class="PodcastTeaser__image" :src="image.url" :alt="image.alt" />
    </div>
    <div class="PodcastTeaser__player-container">
      <AudioPlayer :src="file" :program="title" :show-playbar="true" inverted></AudioPlayer>
      <div class="PodcastTeaser__blocks-container">
        <span class="PodcastTeaser__date">{{date}}</span>
        <KirbyBlocks class="PodcastTeaser__KirbyBlocks PodcastTeaser__teaser-text" v-if="richText" :content="richText" :path="link.url"></KirbyBlocks>
        <span class="PodcastTeaser__read-more">
          <router-link
            class="PodcastTeaser__link"
            :to="`/${removeHomeSlug(link.url)}`"
          >
            <span v-html="link.text" />
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import KirbyBlocks from '../components/KirbyBlocks.vue'
import { isHomeSlug } from '../utilities/helpers'
// import Heading from '../components/Heading.vue'
import AudioPlayer from '../components/AudioPlayer.vue'


export default {
  name: 'PodcastTeaser',
  components: {
    KirbyBlocks,
    AudioPlayer,
    // Heading
  },
  props: {
    image: {
      type: Object,
      required: true
    },
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
    file: {
      type: [String, Boolean],
      required: false,
      default: false
    }
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
  $c: 'PodcastTeaser';

  .#{$c} {
    width: 100%;
    margin-bottom: $s-box-margin;

    @include mq($from: medium) {
      display: flex;
      align-items: flex-start;
      background-color: $s-color-black;
      width: span(10 of $s-amount-columns);
    }

    &__image-container {
      width: span(7 of $s-amount-columns);
      padding: $s-box-padding $s-box-distance;
      background-color: $s-color-black;
      padding: $s-box-padding;
      border-bottom: 1px solid $s-color-white;

      @include mq($from: medium) {
        border-bottom: none;
        padding: $s-box-padding $s-box-distance $s-box-padding $s-box-padding;
        flex: 0 0 span(2 wide of 10);
        background-color: $s-color-black;
        width: span(10 of $s-amount-columns);
      }
    }

    &__image {
      border: 1px solid $s-color-white;
      max-width: 100%;
      width: 100%;
      display: block;
    }

    &__player-container {
      padding: $s-box-padding;
      background-color: $s-color-black;

      @include mq($from: medium) {
        padding-left: 0;
        flex: 0 0 span(8 of 10);
        max-width: span(8 of 10);
      }
    }

    /deep/ .AudioPlayer {
      margin-bottom: $s-box-distance;
    }

    &__blocks-container {
      border: 1px solid $s-color-white;
      padding: $s-box-padding;
      color: $s-color-white;
    }

    // Overriding scoped child components with /deep/
    // https://bambielli.com/til/2018-08-19-how-to-target-child-components-with-scoped-css-in-vue/
    /deep/ .Paragraph {
      color: $s-color-white;

      a {
        color: $s-color-primary;

        &:hover {
          color: $s-color-white;
        }
      }
    }

    &__link {
      color: $s-color-primary;

      &:hover {
        color: $s-color-white;
      }
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
