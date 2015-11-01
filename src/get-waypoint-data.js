'use strict'

const Promise = require('bluebird')
const distance = Promise.promisifyAll(require('google-distance'))
const writeFile = Promise.promisify(require('fs').writeFile)

const waypoints = require('./config').waypoints
const createCombos = require('./util/create-combinations')

const waypointCombos = createCombos(waypoints)
const distances = []

waypointCombos.forEach(combo => {
	distances.push(distance.getAsync({
		origin: combo[0],
		destination: combo[1],
	}))
})

Promise.all(distances)
	.then(data => {
		return writeFile(__dirname + '/json/waypoint-data.json', JSON.stringify(data))
	})
