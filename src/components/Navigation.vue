<template>
  <div :class="['Navigation', { 'is-open' :navMenuOpen }]">
    <ul :class="['Navigation__list']">
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
          <span v-html="item.title" />
        </router-link>
      </li>
    </ul>
    <button v-if="breakpointCurrent.innerWidth < 430" class="Navigation__menu-button" @click="toggleMenu">{{ navMenuOpen ? 'X Menu' : 'Open Menu'}}</button>
    <VBreakpoint @input="updateBreakpoint($event)" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { isHomeSlug } from '../utilities/helpers'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters('data', ['getMenu']),
    ...mapGetters('ui', ['navMenuOpen']),
    ...mapState('ui', ['breakpointCurrent']),
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
    },
    updateBreakpoint(breakpoint) {
      // save breakpoint to store to use in as many components as we want
      // https://github.com/adi518/vue-breakpoint-component/issues/24
      this.$store.commit('ui/UPDATE_BREAKPOINT', breakpoint)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/css/global';
  $c: 'Navigation';

  .#{$c} {
    transform: translateY(calc(-100% + #{$s-size-textbox}));
    transition: transform $s-animation-duration-default;
    position: absolute;
    right: $s-size-gutter-small;

    @include mq($from: 430) {
      position: relative;
      right: auto;
    }

    &.is-open {
      transform: none;
    }

    @include mq($from: 430) {
      transform: none;
    }

    &__list {
      display: flex;
      flex-direction: column;
      background-color: $s-color-white;
    }

    &__menu-button {
      @include reset-button;
      @include font-style-extra;
      display: inline-block;
      position: relative;
      text-align: right;
      background-color:white;
      height: $s-size-textbox;

      &:hover {
        border: 1px solid $s-color-primary;
        box-shadow: inset 0 1px 10px 3px $s-color-primary;
      }
    }

    &__item,
    &__menu-button {
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
