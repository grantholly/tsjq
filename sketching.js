(function () {

    this.test = {
	a: 1,
	b: 2,
	c: [],
    }
    
    this.jsonString = ''
    
    function encodeObject(o) {
		this.jsonString += '{'
		for (k in o) {
			// would need to check the type of the value
			// to avoid [object Object] strings
			if (! (o[k] instanceof Array)
			&& ! (o[k] instanceof Object)) {
			this.jsonString += k.toString()
			this.jsonString += ':'
			this.jsonString += this.test[k].toString()
			// need to check if we are at the end of iteration
			// to avoid a trailing comma
			this.jsonString += ','
			}
		}
		this.jsonString += '}'
    }

    function encodeArray(a) {
		this.jsonString += '['
		for (var i = 0; i < a.length; i ++) {
			if (! (a[i] instanceof Array)
			&& ! (a[i] instanceof Object)) {
			this.jsonString += a[i].toString()
			this.jsonString += ','
			}
		}
		this.jsonString += ']'
	}
	
	function encodeBoolean(b) {
		/* might need to guard against expressions
		for example:
		encodeBoolean(() => {return true})
		will return 'true', but we only want to return
		'true' or 'false' if b is the value true or false
		*/
		if ((b === true)
			|| b === false) {
				return b.toString()
			}
	}

	function encodeNull(n) {
		if (n === null) {
			return 'null'
		}
	}

	function encodeString(s) {
		switch(typeof s) {
			case 'object':
				if (s.constructor.name === 'String') {
					return s.toString()
				}
			case 'string':
				return s
		}
	}

	function encodeNumber(n) {
		if ((typeof n === 'number') 
			|| (n.constructor.name === 'Number')) {
				return n.toString()
			}
	}
	
	// happy path
	console.log(encodeBoolean(true))
	console.log(encodeBoolean(false))
	console.log(encodeNumber(101))
	console.log(encodeNull(null))
	console.log(encodeString('yeah sure ok'))

	// scary path
	console.log(encodeBoolean('true'))
	console.log(encodeBoolean('false'))
	console.log(encodeNumber('202'))
	console.log(encodeNull(100))
	console.log(encodeString(true))
    
})()
