<template>
  <div class="DefaultView">
    <div v-if="page">
      <ContentBox
        v-if="page.id !== 'home'"
        :inverted="true"
        :columns="susyColumns()"
        :no-line="false"
      >
        <Heading :level="1" v-if="date" class="Heading--inline DefaultView__date">{{ date }}</Heading>
        <Heading :level="1" v-if="time" class="Heading--colored Heading--inline">{{ time }}</Heading>
        <Heading :level="1">{{ page.title }}</Heading>
      </ContentBox>
      <ContentBox
        v-if="tags || format"
        :inverted="true"
        :columns="susyColumns()"
        :no-line="false"
      >
        <ArchiveMeta v-if="tags || format" :tags="tags" :format="format" />
      </ContentBox>
      <ContentBox
        v-if="file"
        :columns="susyColumns()"
      >
       <AudioPlayer :src="file" :program="page.title" :show-playbar="true"></AudioPlayer>
      </ContentBox>
      <ContentBox
        v-for="(paragraph, index) in paragraphs"
        :key="index"
        :inverted="!!paragraph.inverted"
        :columns="susyColumns(minCol, maxCol)"
        :no-line="index === paragraphs.length - 1"
      >
        <Heading :level="2">{{ paragraph.title }}</Heading>
        <Paragraph v-if="paragraph.text" :content="paragraph.text"></Paragraph>
      </ContentBox>
      <FloatingImages v-if="floatingImages" :images="floatingImages" />
    </div>
    <Loader v-else></Loader>
    <ContentBox v-if="channel">
      <TwitchEmbed :channel="channel"></TwitchEmbed>
    </ContentBox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFormat } from '../utilities/mapData'
import BaseView from './BaseView.vue'
import Paragraph from '../components/Paragraph.vue'
import TwitchEmbed from '../components/TwitchEmbed.vue'
import Loader from '../components/Loader.vue'
import ArchiveMeta from '../components/ArchiveMeta.vue'
import Heading from '../components/Heading.vue'
import ContentBox from '../components/ContentBox.vue'
import FloatingImages from '../components/FloatingImages.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import { connectionLineHelper } from '../mixins/helpers'
import { format } from 'date-fns'
import config from '../config'

export default {
  name: 'DefaultView',
  components: {
    AudioPlayer,
    Loader,
    ArchiveMeta,
    TwitchEmbed,
    FloatingImages,
    Paragraph,
    ContentBox,
    Heading
  },
  extends: BaseView,
  mixins: [connectionLineHelper],
  data: () => {
    return {
      minCol: 7,
      maxCol: 12,
    }
  },
  computed: {
    ...mapGetters('data', ['page']),
    paragraphs() {
      if (!this.page || !this.page.content || !this.page.content.paragraphs) return false
      return this.page.content.paragraphs
    },
    channel() {
      if (!this.page || !this.page.content || !this.page.content.twitch_channel) return false
      return this.page.content.twitch_channel
    },
    tags() {
      if (!this.page || !this.page.content || !this.page.content.tags) return false
      return this.page.content.tags.map((tag) => tag.text)
    },
    format() {
      if (!this.page || !this.page.content || !this.page.content.format) return false
      return mapFormat(this.page.content.format).name
    },
    floatingImages() {
      if (!this.page || !this.page.content || !this.page.content.draggable_images) return false
      return this.page.content.draggable_images
    },
    date() {
      if (!this.page || !this.page.content || !this.page.content.date) return false
      // Because the better-rest plugin by robinscholz adds a non breaking space &#160; to the date format in the REST API we need to replace this
      const date = this.page.content.date.replace('&#160;', 'T')
      return format(new Date(date), 'yyyy-MM-dd')
    },
    time() {
      if (!this.page || !this.page.content || !this.page.content.date || !this.page.content.end_time) return false
      const date = this.page.content.date.replace('&#160;', 'T')
      const starttime = format(new Date(date), 'HH:mm')
      return `${starttime}—${this.page.content.end_time}`
    },
    file() {
      if (!this.page || !this.page.content || !this.page.content.filename) return false
      let filename = this.page.content.filename
      // if the filename contains a full path we want to just return that
      if (filename.startsWith('https')) {
        return filename
      }
      // also check if the filename has a file suffix
      filename = filename.endsWith('.mp3') ? filename : `${filename}.mp3`
      // but normally we just have the filename and want to return a full path
      return `${config.recordingsUrl}${filename}`
    }
  },
  mounted() {
    this.$forceUpdate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'DefaultView';

  .#{$c} {
    &__date {
      &::after {
        display: inline-block;
        content: '';
        margin-right: 1em;
      }
    }
  }
</style>
