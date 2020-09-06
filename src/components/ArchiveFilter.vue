<template>
  <div class="ArchiveFilter">
    <Heading :level="3" class="ArchiveFilter__title">Filter</Heading>
    <form
      ref="form"
      class="ArchiveFilter__form"
      @submit.prevent="submit"
      @keyup.enter="submit"
      @change="submit"
    >
      <FormFieldSelect v-if="formats" :label="'Format'" :name="'format'" :option-items="formats" @input="updateFormData($event, 'format')" />
      <FormFieldCheckbox v-if="tags" :label="'Tags'" :name="'tag'" :option-items="tags" @input="updateFormData($event, 'tag')" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormFieldSelect from './FormFieldSelect.vue'
import FormFieldCheckbox from './FormFieldCheckbox.vue'
import Heading from './Heading.vue'

export default {
  name: 'ArchiveFilter',
  components: {
    FormFieldCheckbox,
    FormFieldSelect,
    Heading
  },
  data: () => {
    return {
      formData: {},
    }
  },
  created () {
    this.fetchFilterData()
  },
  methods: {
    ...mapActions('data', ['fetchFilterData']),
    submit() {
      this.$store.dispatch('ui/setArchiveFilter', {
        data: this.formData
      })
    },
    updateFormData(value, name) {
      this.formData[name] = value
    },
  },
  computed: {
    ...mapState('data', ['filterData']),
    formats() {
      if (!this.filterData.formats) return false
      const options = this.filterData.formats.map((format) => {
        return {
          value: format.slug,
          option: format.name,
          selected: false
        }
      })
      options.unshift({
        value: 0,
        option: 'Alle',
        selected: false
      })
      return options
    },
    tags() {
      if (!this.filterData.tags) return false
      return this.filterData.tags
        .filter(tag => tag.length > 1) // remove accidental filters with just 1 character
        .map(tag => {
          return {
            value: tag,
            option: tag,
            checked: false
          }
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'ArchiveFilter';

  .#{$c} {
    margin-bottom: $s-size-spacer-medium;

  // Overriding scoped child components with /deep/
  // https://bambielli.com/til/2018-08-19-how-to-target-child-components-with-scoped-css-in-vue/
  /deep/ .Heading {
    color: $s-color-white;
  }
  }
</style>
