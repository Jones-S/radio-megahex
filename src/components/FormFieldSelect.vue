<template>
  <fieldset
    class="FormFieldSelect"
  >
    <label class="FormFieldSelect__field">
      <span class="FormFieldSelect__label">{{ label }}</span>
      <div class="FormFieldSelect__input-wrapper">
        <select
          class="FormFieldSelect__input"
          :name="name"
          @change="$emit('input', $event.target.value)"
        >
          <option
            v-for="(option, index) in optionItems"
            :key="index"
            :value="option.value"
            :selected="option.selected"
          >
            {{ option.option }}
          </option>
        </select>
      </div>
    </label>
  </fieldset>
</template>

<script>
export default {
  name: 'FormFieldSelect',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    optionItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FormFieldSelect';

  .#{$c} {
    @include fieldset;
  }
</style>
