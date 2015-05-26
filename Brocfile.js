var	concat		= require('broccoli-concat'),
	mergeTrees	= require('broccoli-merge-trees'),
	uglifyJs	= require('broccoli-uglify-js'),
	scripts;

// concat the JS
scripts = concat('./', {
	inputFiles: ['modernizr.js', 'mowat.js', 'sandbox.js', 'modules/*.js'],
	outputFile: '/mowat.js',
	header: '/** Copyright David Greiner 2015 **/\n',
	footer: '\nMoWAT.startAll();'
});

/*
scripts = uglifyJs(scripts, {
	compress: true
});
*/

module.exports = mergeTrees([scripts]);