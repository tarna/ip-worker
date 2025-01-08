import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('IP worker', () => {
	it('responds with the correct IP address (json)', async () => {
        const request = new IncomingRequest('http://example.com', {
            headers: {
                'cf-connecting-ip': '0.0.0.0',
            },
        });
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        await waitOnExecutionContext(ctx);
        expect(await response.json()).toMatchInlineSnapshot(`
            {
              "ip": "0.0.0.0",
            }
        `);
    });

    it('responds with the correct IP address (plain)', async () => {
        const request = new IncomingRequest('http://example.com/plain', {
            headers: {
                'cf-connecting-ip': '0.0.0.0',
            },
        });
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        await waitOnExecutionContext(ctx);
        expect(await response.text()).toMatchInlineSnapshot(`"0.0.0.0"`);
    });
});