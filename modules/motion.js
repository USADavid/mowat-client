MoWAT.createModule("motion", function(sandbox) {
	
	function listener(event) {
		var json = {
			accelerationX : event.acceleration.x,
			accelerationY : event.acceleration.y,
			accelerationZ : event.acceleration.z,
			accelerationIncludingGravityX : event.accelerationIncludingGravity.x,
			accelerationIncludingGravityY : event.accelerationIncludingGravity.y,
			accelerationIncludingGravityZ : event.accelerationIncludingGravity.z,
			rotationRateBeta : event.rotationRate.beta,
			rotationRateGamma : event.rotationRate.gamma,
			rotationRateAlpha : event.rotationRate.alpha,
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