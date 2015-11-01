'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const distance = Promise.promisifyAll(require('google-distance'))
const writeFile = Promise.promisify(require('fs').writeFile)

const waypoints = require('./config').waypoints
const createCombos = require('./util/create-combinations')

const waypointCombos = createCombos(waypoints)
const distances = []

_.forEach(waypointCombos, combo => {
	distances.push(distance.getAsync({
		origin: combo[0],
		destination: combo[1],
	}))
})

Promise.all(distances)
	.then(data => {
		const distanceData = {}

		_.forEach(data, trip => {
			const key = [trip.origin, trip.destination].sort()
			distanceData[key] = trip.distanceValue
		})

		return writeFile(__dirname + '/json/distance-data.json', JSON.stringify(distanceData))
	})
