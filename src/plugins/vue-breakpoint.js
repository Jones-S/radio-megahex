import { extend } from 'vue-breakpoint-component'
import breakpoints from './breakpoints.js'

// Default configuration:
const config = {
  breakpoints,
  debounceTime: 100,
  experimental: false
}

const { VShowAt, VHideAt, VBreakpoint } = extend(config)

export default VBreakpoint

export { VShowAt, VHideAt, VBreakpoint }
