module.exports = {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/src' },
	},
	optimize: {
		minify: true,
	},
	plugins: ['@snowpack/plugin-sass'],
};
