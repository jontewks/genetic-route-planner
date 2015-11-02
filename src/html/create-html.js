'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const optimalRoute = require('../json/optimal-route')

fs.readFileAsync(__dirname + '/base-html.html', 'utf8')
	.then(html => {
		return fs.writeFileAsync(
			__dirname + '/../../index.html',
			html.replace('{{optimalRoute}}', JSON.stringify(optimalRoute))
		)
	})
