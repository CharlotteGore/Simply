#Simply

## Intro

A friendly API to interact with AWS SimpleDB for aws2js. 

### The Code

To install

	npm install simply-wrapper
	// then satisfy the dependencies...
	cd node_modules/simply-wrapper
	npm install

To use

	// get a simply object..
	var simply = require('simply-wrapper')(key, secret, region);


	// Create a domain: domain = string
	simply.createDomain( domain, callback ) // callback is passed err and result. Result is 'ok' if okay.

	// Delete a domain: domain = string
	simply.deleteDomain( domain , callback ) // callback is passed err and result. Result is 'ok' if okay.

	// List domains
	simply.deleteDomain( callback ) // callback is passed err and result. Result is ['domain1', 'domain2'] if okay.

	// Put an item: ItemName = string, unique identifier, domain = string, data = { Key : 'Value' }
	simply.putItem(ItemName, domain, data, callback ) // callback is passed err and result. Result is 'ok' if okay.

	// Get an item: ItemName = unique string identifier, domain = string, 
	simply.getItem(ItemName, domain, callback) // callback passed err and result. Result is { 'TheItemName' : { Key : 'Value', ... } } if okay

	// Delete an item: ItemName = unique string identifier, domain = string
	simply.deleteItem(ItemName, domain, callback ) // callback is passed err and result. Result is 'ok' if okay.

	// Run a select query
	simply.select('select * from `my-domain`', callback) // { 'ItemName' : { Attributes }, 'FirstItemName' : { Attributes }, ... }

### Run the tests

To run the tests you need Mocha and Should.js. You should also put your AWS key, secret, chosen region and 
a safe test domain to use in common.js by editing common.EDIT_ME.js and renaming it to 'common.js'

Then: 

	make test
