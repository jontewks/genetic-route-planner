'use strict'

const Promise = require('bluebird')
const distance = Promise.promisifyAll(require('google-distance'))
const writeFile = Promise.promisify(require('fs').writeFile)

const waypoints = require('./config').waypoints
const createCombos = require('./util/create-combinations')

const waypointCombos = createCombos(waypoints)
const distanceData = {}

Promise.resolve(waypointCombos)
	.each(combo => {
		return Promise.delay(110).then(() => {
			distance.getAsync({
				origin: combo[0],
				destination: combo[1],
			})
				.then(data => {
					const key = [combo[0], combo[1]].sort()
					distanceData[key] = data.distanceValue
				})
		})
	})
	.then(() => {
		return writeFile(__dirname + '/json/distance-data.json', JSON.stringify(distanceData))
	})
