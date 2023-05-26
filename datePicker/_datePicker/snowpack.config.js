module.exports = {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/src' },
	},
	plugins: ['@snowpack/plugin-sass'],
};
