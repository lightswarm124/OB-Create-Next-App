module.exports = {
	publicRuntimeConfig: {
	  staticFolder: '/static'
	},
	webpack: (config, { buildId, dev }) => {
		/* Fixes npm packages that depend on `fs` module
		config.node = {
		fs: 'empty'
		};
		*/
		config.resolve.symlinks = false;

		return config;
	}
}
