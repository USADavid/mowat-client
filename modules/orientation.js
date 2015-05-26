MoWAT.createModule("orientation", function(sandbox) {
	
	function listener(event) {
		var json = {
			beta : event.beta,
			gamma : event.gamma,
			alpha : event.alpha,
			absolute : event.absolute
		}
		
		sandbox.sendToServer(json);
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