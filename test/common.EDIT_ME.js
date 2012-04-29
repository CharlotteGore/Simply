	/*

		Add key, secret and region.
		Pick a domain that won't interfere with any of your existing domains.
		Rename this file to common.js
		Run tests.
		Feel happy


	*/

	var config = {

		key : 'AWS_ACCESS_KEY',
		secret : 'AWS_ACCESS_SECRET',
		testDomain : 'simply-wrapper-test',
		region : 'AWS_REGION'

	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		  exports = module.exports = config;
		}
	}