MoWAT.createModule("motion", function(sandbox) {
	
	function listener(event) {
		var json = {
			acceleration : {
				x : event.acceleration.x,
				y : event.acceleration.y,
				z : event.acceleration.z
			},
			accelerationIncludingGravity : {
				x : event.accelerationIncludingGravity.x,
				y : event.accelerationIncludingGravity.y,
				z : event.accelerationIncludingGravity.z
			},
			rotationRate : {
				beta : event.rotationRate.beta,
				gamma : event.rotationRate.gamma,
				alpha : event.rotationRate.alpha
			},
			interval : event.interval
		}
		
		sandbox.sendToServer(json);
	}
	
	return {
		init: function () {
			window.addEventListener('devicemotion', listener);
		},
		destroy: function () {
			window.removeEventListener('devicemotion', listener);
		}
	};
});