'use strict'

module.exports = (array) => {
	const output = []

	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			output.push([array[i], array[j]])
		}
	}

	return output
}
