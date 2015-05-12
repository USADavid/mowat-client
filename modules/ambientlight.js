MoWAT.createModule("ambientlight", function(sandbox) {
	
	function listener(event) {
		sandbox.log(event.value)
	}
	
	return {
		init: function () {
			window.addEventListener('devicelight', listener);
		},
		destroy: function () {
			window.removeEventListener('devicelight', listener);
		}
	};
});