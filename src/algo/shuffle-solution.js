'use strict'

const _ = require('lodash')

module.exports = solution => {
	const shuffledSolution = _.clone(solution)
	const startIndex = _.random(solution.length - 1)
	let insertIndex = _.random(solution.length - 1)
	const shuffleLength = _.ceil(solution.length / 4)

	// Make sure the indicies are never the same
	while (startIndex === insertIndex) {
		insertIndex = _.random(solution.length - 1)
	}

	const removedSection = shuffledSolution.splice(startIndex, shuffleLength)
	shuffledSolution.splice(insertIndex, 0, removedSection)

	return _.flatten(shuffledSolution)
}
