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

export const draggableImageHelper = {
  methods: {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async setInitialSize(src) {
      console.log('src: ', src)
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
      const initialWidth = this.getRandomInt(150, maxWidth)
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
      const initialXPosition = this.getRandomInt(1, maxXPosition)

      let maxYPosition = documentHeight - imageInitialHeight
      maxYPosition = maxYPosition > minDistanceTotop && maxYPosition >= 0 ? maxYPosition : minDistanceTotop
      const initialYPosition = this.getRandomInt(minDistanceTotop, maxYPosition)

      return { x: initialXPosition, y: initialYPosition }
    },

  }
}
