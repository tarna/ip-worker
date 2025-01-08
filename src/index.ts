export default {
	async fetch(request, env, ctx): Promise<Response> {
		const ip = request.headers.get('cf-connecting-ip');
        if (request.url.includes('plain')) {
            return new Response(ip, {
                headers: {
                    'content-type': 'text/plain',
                },
            });
        } else {
            return new Response(JSON.stringify({ ip, ...request.cf }), {
                headers: {
                    'content-type': 'application/json',
                }
            });
        }
	},
} satisfies ExportedHandler<Env>;