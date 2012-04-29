	var base 	= require('base-framework'),
		aws = require('aws2js'),
		_ 		= require('underscore');

	var simply = base.createChild();


	// helper methods

	var convertToSimpleDBAttributes = function( data ){

		var result = {}, attributeCount = 0;

		_.each(data, function(value, key){

			result['Attribute.' + attributeCount + '.Name'] = key;
			result['Attribute.' + attributeCount + '.Value'] = value;

			attributeCount ++;

		});

		return result;

	};

	var convertAttributesToJSON = function( attributes ){

		var result = {};

		if(_.isArray(attributes)){

			_.each(attributes, function(o, key){

				console.log(o);
				result[o.Name] = o.Value;

			});


		} else {

			result[attributes.Name] = attributes.Value;

		}

		return result;

	};

	simply.addInstanceMethods({
		// default constructor, var sdb = require('simply-wrapper')(key, secret, region);
		init : function(key, secret, region){

			this.sdb = aws.load('sdb', key, secret);
			this.sdb.setRegion(region);

			return this;

		},
		// sdb.createDomain( ... );
		createDomain : function( DomainName, callback ){

			var query = {
				DomainName : DomainName

			};

			this.sdb.request('CreateDomain', query, function(err, result){

				if(!err){

					callback(false, 'ok');

				}else{

					callback(err, 'error');

				}

			});

			return this;


		},

		deleteDomain : function( DomainName, callback ){

			var query = {
				DomainName : DomainName

			};

			this.sdb.request('DeleteDomain', query, function(err, result){

				if(!err){

					callback(false, 'ok');

				}else{

					callback(err, 'error');

				}

			});

			return this;


		},

		listDomains : function( callback ){

			this.sdb.request('ListDomains', function(err, result){

				var domains, processed = []; 

				if(!err){

					domains = result.ListDomainsResult.DomainName;

					_.each(domains, function( domain, index ){

						processed.push( domain['#'] );

					});

					callback( false, processed );

				}else {

					callback( err, result );

				}

			});

		},

		putItem : function( ItemName, DomainName, data, callback ){

			var query = {
					ItemName : ItemName,
					DomainName : DomainName
				};

			_.extend(query, convertToSimpleDBAttributes(data));

			this.sdb.request('PutAttributes', query, function(err, result){

				if(!err){

					callback(false, 'ok');

				}else{

					callback(err, 'error');

				}

			});

			return this;

		},

		getItem : function( ItemName, DomainName, callback ){

			var query = {
				ItemName : ItemName,
				DomainName : DomainName
			};

			this.sdb.request('GetAttributes', query, function(err, result){

				var attributes, processed = {};

				if(!err){

					attributes = result.GetAttributesResult.Attribute;

					processed[ItemName] = convertAttributesToJSON(attributes);

					callback(false, processed);

				}else{

					callback(err, result);

				}

			});

		},

		deleteItem : function( ItemName, DomainName, callback ){

			var query = {
				ItemName : ItemName,
				DomainName : DomainName				
			};

			this.sdb.request('DeleteAttributes', query, function(err, result){

				if(!err){

					callback(false, 'ok');

				}else{

					callback(err, 'error');

				}

			});

		},

		select : function( query, callback ){

			var query = {
				SelectExpression : query
			};

			this.sdb.request('Select', query, function(err, result){

				var items, processed = {};

				if(!err){

					items = result.SelectResult.Item;

					if(_.isArray(items)){

					_.each(items, function(object, index){

						processed[object.Name] = convertAttributesToJSON(object.Attribute);

					});

					} else if( _.isObject(items) ){

						processed[items.Name] = convertAttributesToJSON(items.Attribute);

					}

					callback(false, processed);

				}else {

					callback(err, result);

				}

			});

		}

	});


	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		  exports = module.exports = simply;
		}
		 exports.simply = simply;
	}