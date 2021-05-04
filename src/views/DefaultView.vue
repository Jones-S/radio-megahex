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

      <ContentBox v-if="blogTextKirbyBlocks" :columns="10">
          <KirbyBlocks v-if="blogTextKirbyBlocks" :content="blogTextKirbyBlocks"></KirbyBlocks>
      </ContentBox>

      <ContentBox v-if="channel">
        <TwitchEmbed :channel="channel"></TwitchEmbed>
      </ContentBox>
      <template v-for="(teaser, index) in teasers">
        <Teaser
          v-if="teaser.pageType === 'blog'"
          :key="`${index}-${teaser.title.slice(0, 6)}`"
          :rich-text="teaser.richText"
          :date="teaser.date"
          :title="teaser.title"
          :link="teaser.link"
        ></Teaser>
        <PodcastTeaser
          v-if="teaser.pageType === 'archive'"
          :key="`${index}-${teaser.title.slice(0, 6)}`"
          :image="teaser.image"
          :rich-text="teaser.richText"
          :date="teaser.date"
          :title="teaser.title"
          :link="teaser.link"
          :file="teaser.file"
        ></PodcastTeaser>
      </template>
      <ContentBox
        v-for="(paragraph, index) in paragraphs"
        :key="index"
        :inverted="!!paragraph.inverted"
        :columns="susyColumns(minCol, maxCol)"
        :no-line="false"
      >
        <Heading :level="2">{{ paragraph.title }}</Heading>
        <Paragraph v-if="paragraph.text" :content="paragraph.text"></Paragraph>
      </ContentBox>

      <Chat />

      <FloatingImages v-if="floatingImages" :images="floatingImages" />
      <ChatButton />
    </div>
    <Loader v-else></Loader>
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
import KirbyBlocks from '../components/KirbyBlocks.vue'
import PodcastTeaser from '../components/PodcastTeaser.vue'
import Chat from '../components/Chat.vue'
import ChatButton from '../components/ChatButton.vue'
import Teaser from '../components/Teaser.vue'
import { connectionLineHelper } from '../mixins/helpers'
import { format } from 'date-fns'
import config from '../config'

export default {
  name: 'DefaultView',
  components: {
    Chat,
    PodcastTeaser,
    KirbyBlocks,
    AudioPlayer,
    Loader,
    ArchiveMeta,
    TwitchEmbed,
    FloatingImages,
    Paragraph,
    ChatButton,
    ContentBox,
    Heading,
    Teaser
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
    curatedPosts() {
      if (!this.page?.content?.related) return false
      return this.page.content.related
    },
    paragraphs() {
      if (!this.page?.content?.paragraphs) return false
      console.log('JSON.parse(this.page.content.paragraphs): ', this.page.content.paragraphs)
      return this.page.content.paragraphs
    },
    channel() {
      if (!this.page?.content?.twitch_channel) return false
      return this.page.content.twitch_channel
    },
    tags() {
      if (!this.page?.content?.tags) return false
      return this.page.content.tags.map((tag) => tag.text)
    },
    format() {
      if (!this.page?.content?.format) return false
      return mapFormat(this.page.content.format).name
    },
    blogTextKirbyBlocks() {
      if (!this.page?.content?.blogtext) return false
      return this.page.content.blogtext
    },
    floatingImages() {
      if (!this.page?.content?.draggable_images) return false
      return this.page.content.draggable_images
    },
    date() {
      if (!this.page?.content?.date) return false
      return this.prepareDate(this.prepareDateString(this.page.content.date))
    },
    time() {
      if (!this.page?.content?.date || !this.page.content.end_time) return false
      const date = this.prepareDateString(this.page.content.date)
      const starttime = this.prepareTimeFromDate(date)
      return `${starttime}—${this.page.content.end_time}`
    },
    file() {
      if (!this.page?.content?.filename) return false
      let fileString = this.page.content.filename
      return this.prepareFilePath(fileString)
    },
    teasers() {
      if (!this.page?.content?.related) return false
      const teasers = this.page.content.related.map(teaser => {
        return {
          image: {
            url: teaser?.teaserImage?.image?.thumb,
            alt: teaser?.teaserImage?.image?.alt
          },
          richText: teaser?.teaserText || '',
          title: teaser?.title || '',
          link: {
            url: teaser.uri,
            text: '> Weiterlesen...',
          },
          pageType: teaser?.pageType,
          date: this.prepareDate(teaser.date),
          file: this.prepareFilePath(teaser.filename)
        }
      })
      console.log('teasers: ', teasers)
      return teasers
    }
  },
  methods: {
    prepareDateString(string) {
      // Because the better-rest plugin by robinscholz adds a non breaking space &#160; to the date format in the REST API we need to replace this
      return string.replace('&#160;', 'T')

    },
    prepareDate(dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd')
    },
    prepareTimeFromDate(date) {
      return format(new Date(date), 'HH:mm')
    },
    prepareFilePath(fileString) {
      // if the filename contains a full path we want to just return that
      if (fileString.startsWith('https')) {
        return fileString
      }
      // also check if the filename has a file suffix
      fileString = fileString.endsWith('.mp3') ? fileString : `${fileString}.mp3`
      // but normally we just have the filename and want to return a full path
      return `${config.recordingsUrl}${fileString}`
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
    // @include grid-debug;

    &__date {
      &::after {
        display: inline-block;
        content: '';
        margin-right: 1em;
      }
    }
  }
</style>
