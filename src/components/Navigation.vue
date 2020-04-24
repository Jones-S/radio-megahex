<template>
  <div class="Navigation">
    <ul :class="['Navigation__list', navMenuOpen ? 'is-open' : '']">
      <li
        v-for="(item, key) in menu"
        :key="`nav-item-${key}`"
        :class="['Navigation__item']"
        @click="closeMenu"
      >
        <router-link
          class="Navigation__link"
          :to="`/${removeHomeSlug(item.uri)}`"
          :exact="isHomeSlug(item.uri)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="item.title" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isHomeSlug } from '../utilities/helpers'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters('data', ['getMenu', 'langLinks']),
    ...mapGetters('ui', ['navMenuOpen']),
    menu() {
      return this.getMenu
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('keyup', e => {
        this.handleKeyboardEvent(e)
      })
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('keyup')
    }
  },
  methods: {
    ...mapActions('ui', ['toggleMenu', 'closeMenu']),
    isHomeSlug(slug) {
      return isHomeSlug(slug)
    },
    removeHomeSlug(slug) {
      return this.isHomeSlug(slug) ? '' : `${slug}`
    },
    handleKeyboardEvent(e) {
      const key = e.which || e.keyCode
      if (key === 27) {
        // Esc key
        this.closeMenu()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Navigation';

  .#{$c} {
    &__list {
      display: flex;
      flex-direction: column;
    }

    &__item {
      border: 1px solid $s-color-black;
      margin-bottom: $s-box-distance;

      &:hover {
        border: 1px solid $s-color-primary;
        box-shadow: inset 0 1px 10px 3px $s-color-primary;
      }
    }

    &__link {
      @include font-style-extra;
      text-decoration: none;
      padding-left: $s-box-distance * 2;
      padding-right: $s-box-distance * 2;
      display: block;
      min-width: 14rem;
      height: $s-size-textbox;
      display: flex;
      align-items: center;

      &.router-link-exact-active {
        color: $s-color-primary;
      }
    }

  }
</style>
