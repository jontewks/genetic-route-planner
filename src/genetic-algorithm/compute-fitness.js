'use strict'

const distances = require('../json/distance-data')

// Computes the fitness of this solution based on the total distance traveled
module.exports = solution => {
	let fitness = 0.0

	for (let i = 0; i < solution.length; i++) {
		const waypoint1 = solution[i]
		const waypoint2 = solution[i + 1] || solution[0] // Wrap back to beginning for last element
		const key = [waypoint1, waypoint2].sort()

		fitness += distances[key]
	}

	return fitness
}
