// Require the framework and instantiate it
import * as fastifyLib from 'fastify'

const fastify = fastifyLib({logger: true})
const fastifyLocal = fastifyLib({logger: true})

fastifyLocal.register(require('fastify-cors'), {
	// put your options here
})

// Declare a route
fastify.get('/', async (
	request,
	reply
) => {
	return {hello: 'world'}
})

// Declare a route
fastifyLocal.get('/', async (
	request,
	reply
) => {
	return {hello: 'local world'}
})

// Declare a route
fastifyLocal.put('/save/:schemaId/:entityId', async (
	request,
	reply
) => {
	return {hello: 'world'}
})

fastifyLocal.put('/addUser/:email', async (
	request,
	reply
) => {
	return {
		added: true
	}
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(31817, '0.0.0.0')
		fastify.log.info(`server listening on ${(fastify.server as any).address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

const startLocal = async () => {
	try {
		await fastifyLocal.listen(31808, '127.0.0.1')
		fastifyLocal.log.info(`local server listening on ${(fastifyLocal.server as any).address().port}`)
	} catch (err) {
		fastifyLocal.log.error(err)
		process.exit(1)
	}
}

Promise.all([start(), startLocal()]).then()
