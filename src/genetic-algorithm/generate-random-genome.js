'use strict'

const _ = require('lodash')
const waypoints = require('../config').waypoints

// Generates a random solution from all the waypoints to begin modifying
module.exports = () => {
	return _.shuffle(waypoints)
}
