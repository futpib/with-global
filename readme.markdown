
# with-global

Run code that depends on presence of a global variable
without permanent pollution of the global namespace.

Useful with browserify/webpack.

## Example

Say you have an old jquery plugin that never heard of UMD
and wants the `$` global, but you don't want to override
`window.$` (maybe some other code depends on another version
 of jquery).

Solution:

1. Set required globals
2. Evaluate the nasty script
3. Restore old globals


```js
const $ = require('jquery');
const withGlobals = require('with-globals');

withGlobals({
	$,
	jQuery: $,
}, function () {
	// window.$ and window.jQuery now have the desired value
	require('jquery.nastyplugin');
});

// window.$ and window.jQuery were restored to their previous value
```

Note that there is still one thing the nasty module has to do right:
that is to capture the values of necessary globals like this
`(function ($) { ... })($);` Most of the time they do do this.

