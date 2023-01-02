import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	paths: {
		base : "/localhost:8080"
	},
	preprocess: vitePreprocess()
};

export default config;
