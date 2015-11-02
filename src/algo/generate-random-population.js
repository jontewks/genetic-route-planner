'use strict'

const _ = require('lodash')

const waypoints = require('../config').waypoints
const populationSize = require('../config').populationSize

module.exports = () => {
	const randomPopulation = []

	_.times(populationSize, () => {
		randomPopulation.push(_.shuffle(waypoints))
	})

	return randomPopulation
}
