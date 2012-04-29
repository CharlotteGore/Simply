test:
	./node_modules/.bin/mocha \
		--globals attrname,error  \
		--reporter list

.PHONY: test