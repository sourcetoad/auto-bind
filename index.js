/**
 * Auto bind methods in es6 classes
 * @param {*} self 
 * @param {*} options 
 */
function autoBind(self, options) {
    options = Object.assign({}, options);
	function filter(key) {
		function match(pattern) { return typeof pattern === 'string' ? key === pattern : pattern.test(key) };
		if (options.include) {
			return options.include.some(match);
		}
		if (options.exclude) {
			return !options.exclude.some(match);
		}
		return true;
	};
	Object.getOwnPropertyNames(self.constructor.prototype).forEach(function(key) {
		const val = self[key];
		if (key !== 'constructor' && typeof val === 'function' && filter(key)) {
			self[key] = val.bind(self);
		}
	});
	return self;
}

const excludedReactMethods = [
	'componentWillMount',
	'UNSAFE_componentWillMount',
	'render',
	'getSnapshotBeforeUpdate',
	'componentDidMount',
	'componentWillReceiveProps',
	'UNSAFE_componentWillReceiveProps',
	'shouldComponentUpdate',
	'componentWillUpdate',
	'UNSAFE_componentWillUpdate',
	'componentDidUpdate',
	'componentWillUnmount',
	'componentDidCatch',
	'setState',
	'forceUpdate'
];

/**
 * Auto bind methods in react classes
 * @param {*} self 
 * @param {*} options 
 */
function autoBindReact(self, options) {
	options = Object.assign({}, options);
	options.exclude = (options.exclude || []).concat(excludedReactMethods);
	return autoBind(self, options);
}


module.exports.autoBind = autoBind;
module.exports.autoBindReact = autoBindReact;
