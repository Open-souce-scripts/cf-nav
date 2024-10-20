import { config } from './config.js';
import { renderHTML, renderIndex, renderSeller } from './render.js';

// Simple in-memory cache
const cache = new Map();

async function handleRequest(request) {
  const url = new URL(request.url);
  const cacheKey = url.pathname;

  // Check if response is cached
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  };

  const response = new Response(renderHTML(renderIndex(), config.selling_ads ? renderSeller() : null), init);

  // Cache the response
  cache.set(cacheKey, response.clone());

  return response;
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

