const withCSS = require('@zeit/next-css')
module.exports = {
	publicRuntimeConfig: {
	  	staticFolder: '/static'
	},
	webpack: (config, { buildId, dev }) => {
		config.node = {
			fs: 'empty'
		};
		config.resolve.symlinks = false;

		return config;
	}
}
