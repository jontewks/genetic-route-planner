'use strict'

const Promise = require('bluebird')
const distance = Promise.promisifyAll(require('google-distance'))

const waypoints = require('./waypoints')
const combinations = require('../util/combinations')

const allWaypointCombos = combinations(waypoints)
const allDistances = []

allWaypointCombos.forEach(combo => {
	allDistances.push(distance.getAsync({
		origin: combo[0],
		destination: combo[1],
	}))
})

Promise.all(allDistances)
	.then(data => {
		console.log(data)
	})
