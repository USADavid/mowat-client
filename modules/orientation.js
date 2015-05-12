MoWAT.createModule("orientation", function(sandbox) {
	
	function listener(event) {
		sandbox.log(event.beta);
		sandbox.log(event.gamma);
		sandbox.log(event.alpha);
		
		sandbox.log(event.absolute);
	}
	
	return {
		init: function () {
			window.addEventListener('deviceorientation', listener);
		},
		destroy: function () {
			window.removeEventListener('deviceorientation', listener);
		}
	};
});