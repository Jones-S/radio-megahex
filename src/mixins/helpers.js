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
