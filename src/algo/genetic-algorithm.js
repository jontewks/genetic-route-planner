'use strict'

const _ = require('lodash')

const generateRandomPopulation = require('./generate-random-population')
const numGenerations = require('../config').generations
const computeFitness = require('./compute-fitness')
const mutateSolution = require('./mutate-solution')
const shuffleSolution = require('./shuffle-solution')

module.exports = () => {
	let population = generateRandomPopulation()

	_.times(numGenerations, () => {
		const populationsSortedByFitness = []

		_.each(population, solution => {
			const fitness = computeFitness(solution)
			const solutionWithFitness = {
				solution,
				fitness,
			}
			const insertIndex = _.sortedIndex(populationsSortedByFitness, solutionWithFitness, 'fitness')

			if (!_.isEqual(populationsSortedByFitness[insertIndex + 1], solutionWithFitness)) {
				populationsSortedByFitness.splice(insertIndex, 0, solutionWithFitness)
			}
		})

		const newPopulation = []
		const top10Percent = populationsSortedByFitness.slice(
			0,
			_.ceil(populationsSortedByFitness.length / 10)
		)

		_.forEach(top10Percent, solutionObj => {
			newPopulation.push(solutionObj.solution)

			_.times(2, () => {
				newPopulation.push(mutateSolution(solutionObj.solution))
			})

			_.times(7, () => {
				newPopulation.push(shuffleSolution(solutionObj.solution))
			})
		})

		population = newPopulation
	})

	console.log('Best route found', population[0], 'length', computeFitness(population[0]))
}
