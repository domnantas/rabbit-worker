# Rabbit

## This project uses [cloudflare durable objects template](https://github.com/cloudflare/durable-objects-typescript-rollup-esm).

## Note: You must use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) 1.19.3 or newer to work run publish/dev commands.

## Please read the [Durable Object documentation](https://developers.cloudflare.com/workers/learning/using-durable-objects) before using this.

This project has been inspired by [Ben Awad interview with Dan Abramov](https://www.youtube.com/watch?v=XEt09iK8IXs). They were solving the rabbit problem and said there's no such real-world issues. Well now there is!

This is an API which changes the route parameter on every request. Can you find the rabbit? Here are the API details:

> There are 100 routes - from /0 to /99. Only one of them will respond with a rabbit. Every time you make a request, the rabbit jumps to adjecent route. For example, if the rabbit is currently on route /20, you make a request to /68, the rabbit will jump to either /19 or /21. Can you catch the rabbit?

The worker is published on https://rabbit.domnantas.workers.dev/
