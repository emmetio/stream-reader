export default {
	entry: './index.js',
	targets: [
		{format: 'cjs', dest: 'dist/stream-reader.cjs.js'},
		{format: 'es',  dest: 'dist/stream-reader.es.js'}
	]
};
