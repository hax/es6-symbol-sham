feature('Symbol').sham(function () {

	var count = 0

	function Symbol(description) {
		if (this instanceof Symbol && !('__description__' in this)) {
			throw new TypeError
		}
		++count	
		return new SymbolObject(
			(description === undefined ? '' : String(description)) +
			'@@' + (count + Math.random()).toString(16)
		)
	}

	function SymbolObject(description) {
		this.__description__ = description
	}

	Object.defineProperties(SymbolObject.prototype, {
		constructor: { value: Symbol },
		toString: {
			value: function toString() {
				if (!(this instanceof Symbol)) throw new TypeError
				return 'Symbol(' + this.__description__ + ')'
			}
		},
		valueOf: {
			value: 	function valueOf() {
				if (!(this instanceof Symbol)) throw new TypeError
				return this
			}
		},
	})

	var registry = Object.create(null)

	Object.defineProperties(Symbol, {
		prototype: { value: SymbolObject.prototype },
		'for': {
			value: function _for(key) {
				key = String(key)
				if (key in registry) return registry[key]
				return registry[key] = new SymbolObject(key)
			}
		},
		keyFor: {
			value: function keyFor(sym) {
				if (!(sym instanceof Symbol)) throw new TypeError
				return registry[sym.toString().slice(7, -1)]
			}
		},
	})

	return Symbol

})
