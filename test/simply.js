	var should = require('should'),
		simply = require('../lib/simply.js'),
		config = require('./common.js'); // remember to turn common.EDIT_ME.js into common.js to run real tests.


		describe('Simply Wrapper', function(){

			var sdb,
				domain = config.testDomain;

			before(function(){

				sdb = simply(config.key, config.secret, config.region);

			});

			describe('Create, list and delete domains', function(){

				it('can create a domain', function(done){

					sdb.createDomain(domain, function(err, result){

						result.should.equal('ok');

						sdb.listDomains(function(err, result){

							result.should.include(domain);

							done();

						});

					});

				});

				it('can delete a domain', function(done){

					sdb.deleteDomain(domain, function(err, result){

						sdb.listDomains(function(err, result){

							result.should.not.include(domain);

							done();

						});

					});

				});

			});

			describe('Interacting:', function(){

				before(function(done){

					sdb.createDomain(domain, function(){

						done();

					});

				});

				describe('Putting:', function(){


					it('can put an item', function(done){

						sdb.putItem('test1', domain, {Hello : 'World'}, function(err, result){

							result.should.equal('ok');

							done();

						});

					});


				});

				describe('Deleting:', function(){

					before(function(done){

						sdb.putItem('test3', domain, {Hello : 'World'}, function(){

							setTimeout(done, 300); // a nasty hack because sometimes the data isn't available *immediately*

						})

					});

					it('can delete an item', function(done){

						sdb.deleteItem('test2', domain, function(err, result){

							result.should.equal('ok');

							done();

						});

					});

				});

				describe('Getting:', function(){


					before(function(done){

						sdb.putItem('test2', domain, {Hello : 'World'}, function(){

							setTimeout(done, 300); // a nasty hack because sometimes the data isn't available *immediately*

						})

					});

					it('can get an item', function(done){

						sdb.getItem('test2', domain, function(err, result){

							should.exist(result.test2);
							result.test2.should.eql({Hello : 'World'});

							done();

						});

					});


				});

				describe('Selecting', function(){


					before(function(done){

						sdb.putItem('test4a', domain, {Hello : 'Foo'}, function(){

							sdb.putItem('test4b', domain, {Hello : 'Bar'}, function(){

								sdb.putItem('test4c', domain, {Hello : 'Ninjas'}, function(){

									setTimeout(done, 300);

								});				

							});

						});


					});

					it('can use select', function(done){

						sdb.select('select * from `' + domain + '`', function(err, result){

							err.should.be.false;
							should.exist(result.test4a);
							should.exist(result.test4b);
							should.exist(result.test4c);
							result.test4c.should.eql({Hello : 'Ninjas'});

							done();

						});

					});

				});

				after(function(done){

					sdb.deleteDomain(domain, function(){

						done();

					})

				})

			});


		});