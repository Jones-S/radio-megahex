import { getRandomInt } from '../utilities/helpers'

export const kirbyTagsHelper = {
	methods: {
		convertKirbyTags(text) {
			// Inspired by: https://github.com/Chalarangelo/parse-md-js/blob/master/parsemd.js
			const boldItalicsRegex = /(\*{1,2})(.*?)\1/g
			// https://regex101.com/r/9y3XU0/2
			const linkRegex = /\(link:\ (.+)\ text: (.[^\)]+)\)/g // eslint-disable-line
			const newLineRegex = /(?:\r\n|\r|\n)/g

			const boldItalicsReplacer = (fullMatch, tagStart, tagContents) => {
				return `<${tagStart.trim().length === 1 ? 'em' : 'strong'}>${tagContents}</${tagStart.trim().length === 1 ? 'em' : 'strong'}>`
			}

			const linkReplacer = (fullMatch, tagStart, tagContents) => {
				return `<a href="${tagStart}" target="_blank">${tagContents}</a>`
			}

			let html = text.replace(newLineRegex, '<br>')
			html = html.replace(boldItalicsRegex, boldItalicsReplacer)
			html = html.replace(linkRegex, linkReplacer)
			return html
		}
	}
}

export const connectionLineHelper = {
	methods: {
		susyColumns(min = 7, max = 12) {
      return getRandomInt(min, max)
    }
	}
}

export const draggableImageHelper = {
  methods: {
    async setInitialSize(src) {
      // Create image programmatically (use promises to use async await)
      const imageDimensions = await this.addImageProcess(src)

      // create initial size
      const aspectRatio = imageDimensions.width / imageDimensions.height

      const documentWidth = document.body.clientWidth
      const browserHeight = window.innerHeight

      const smallerWindowSideSize = documentWidth > browserHeight ? browserHeight : documentWidth

      // determine width of screen, to not create images bigger than a fraction of the smaller browser side
      const maxWidth = smallerWindowSideSize / 3

      // set randomized initial size
      const initialWidth = getRandomInt(150, maxWidth)
      const initialHeight = initialWidth / aspectRatio
      return { initialWidth, initialHeight }
    },
    onload2promise (img) {
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = reject
      })
    },
    async addImageProcess(src) {
      let img = new Image()
      let imgPromise = this. onload2promise(img)
      img.src = src
      await imgPromise
      const {
        height,
        width
      } = img
      return { height, width }
    },
    setInitialPosition(imageInitialWidth, imageInitialHeight, minDistanceTotop) {
      const documentWidth = document.body.clientWidth
      const documentHeight = document.body.clientHeight
      const maxXPosition = documentWidth - imageInitialWidth
      const initialXPosition = getRandomInt(1, maxXPosition)

      let maxYPosition = documentHeight - imageInitialHeight
      maxYPosition = maxYPosition > minDistanceTotop && maxYPosition >= 0 ? maxYPosition : minDistanceTotop
      const initialYPosition = getRandomInt(minDistanceTotop, maxYPosition)

      return { x: initialXPosition, y: initialYPosition }
    },

  }
}
