<template>
  <fieldset ref="fieldset" class="FormFieldChecbox">
    <legend class="FormFieldCheckbox__label">
      {{ label }}
    </legend>
    <div v-if="uidedOptionItems.length" class="FormFieldCheckbox__checkbox-group">
      <div
        v-for="(option, index) in uidedOptionItems"
        :key="index"
        class="FormFieldCheckbox__checkbox-item"
      >
        <input
          :id="option.uid"
          class="FormFieldCheckbox__input"
          :name="name"
          :value="option.option"
          type="checkbox"
          tabindex="-1"
          @change="handleCheckBoxes(option.value, $event.target.checked)"
        />
        <label
          class="FormFieldCheckbox__option-label"
          tabindex="0"
          :for="option.uid"
        >
          {{ option.option }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script>
import addUid from '../utilities/addUid'

export default {
  name: 'FormFieldCheckbox',
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
  data() {
    return {
      checkboxes: [],
    }
  },
  computed: {
    uidedOptionItems() {
      if (this.optionItems.length) {
        return this.optionItems.map((i) => {
          i.uid = addUid(i.option)
          return i
        })
      }
      return false
    },
  },
  methods: {
    handleCheckBoxes() {
      // check for all checked items within the fieldset
      const checkedFields = this.$refs.fieldset.querySelectorAll(
        'input[type=checkbox]:checked'
      )

      // going through all checkboxes (nodeList)
      // first we need to add a polyfill for IE11
      // copied from: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window
          for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this)
          }
        }
      }

      const checkedValues = []
      checkedFields.forEach((field) => {
        checkedValues.push(field.value)
      })

      this.checkboxes = checkedValues
      this.$emit('input', [...this.checkboxes])
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'FormFieldCheckbox';

  .#{$c} {

  }
</style>
