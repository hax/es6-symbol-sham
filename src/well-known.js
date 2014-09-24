feature('Symbol:well-known').shim(function () {

	var props = [
		'create', 'hasInstance', 'isConcatSpreadable', 'isRegExp', 
		'iterator', 'toPrimitive', 'toStringTag', 'unscopables',
	]

	for (var i = 0; i < props.length; ++i) shimSymbolProp(props[i])

	function shimSymbolProp(prop) {
		var path = 'Symbol.' + prop
		feature(path).shimProperty(function () {
			return {
				value: Symbol.for(path)
			}
		})
	}

})
