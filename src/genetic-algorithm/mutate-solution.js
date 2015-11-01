'use strict'

const _ = require('lodash')
const maxMutations = require('../config').maxMutations

// Applies between 1 and maxMutations to the current solution by swapping two waypoints.
module.exports = solution => {
	const mutatedSolution = solution
	const numMutations = _.random(1, maxMutations)

	_.times(numMutations, () => {
		const swapIndex1 = _.random(solution.length - 1)
		let swapIndex2 = _.random(solution.length - 1)

		// Make sure the indicies to swap are never the same
		while (swapIndex1 === swapIndex2) {
			swapIndex2 = _.random(solution.length - 1)
		}

		const toSwap = mutatedSolution[swapIndex1]
		mutatedSolution[swapIndex1] = mutatedSolution[swapIndex2]
		mutatedSolution[swapIndex2] = toSwap
	})

	return mutatedSolution
}
