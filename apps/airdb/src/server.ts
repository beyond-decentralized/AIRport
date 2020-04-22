// Require the framework and instantiate it
import * as fastifyLib from 'fastify'

const fastify = fastifyLib({logger: false})

fastify.register(require('fastify-cors'), {
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
fastify.put('/save/:schemaId/:entityId', async (
	request,
	reply
) => {
	return {hello: 'world'}
})

fastify.put('/addUser/:email', async (
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
		await fastify.listen(31808)
		fastify.log.info(`server listening on ${(fastify.server as any).address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()