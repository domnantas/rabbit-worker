export { RabbitDurableObject } from './rabbitDurableObject'

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env)
    } catch (e) {
      return new Response(`${e}`)
    }
  },
}

async function handleRequest(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url: URL = new URL(request.url)
  const parameters: Array<string> = url.pathname
    .split('/')
    .filter((parameter) => parameter !== '')

  if (parameters.length > 1) {
    return new Response(
      `Too many parameters. Specify a hole e.g. ${url.origin}/42`,
      {
        status: 400,
      },
    )
  }

  if (parameters.length === 0) {
    return new Response(`Please specify hole e.g. ${url.origin}/42`, {
      status: 400,
    })
  }

  const guessedHole: number = parseInt(parameters[0], 10)

  const durableObjectId: DurableObjectId = env.RABBIT.idFromName('A')
  const durableObject: DurableObjectStub = env.RABBIT.get(durableObjectId)
  const durableObjectResponse: Response = await durableObject.fetch(request)
  const hole: number = parseInt(await durableObjectResponse.text())

  console.log('guessedHole', guessedHole)
  console.log('hole', hole)

  if (hole !== guessedHole) {
    return new Response('Rabbit is not here', { status: 404 })
  }

  console.log('Rabbit got caught!')
  return fetch(
    'https://i.pinimg.com/originals/02/07/b6/0207b6b5817da1984c2f08693122f32e.jpg',
  )
}

interface Env {
  RABBIT: DurableObjectNamespace
}
