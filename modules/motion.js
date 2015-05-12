MoWAT.createModule("motion", function(sandbox) {
	
	function listener(event) {
		sandbox.log(event.acceleration.x);
		sandbox.log(event.acceleration.y);
		sandbox.log(event.acceleration.z);
		
		sandbox.log(event.accelerationIncludingGravity.x);
		sandbox.log(event.accelerationIncludingGravity.y);
		sandbox.log(event.accelerationIncludingGravity.z);
		
		sandbox.log(event.rotationRate.beta);
		sandbox.log(event.rotationRate.gamma);
		sandbox.log(event.rotationRate.alpha);
		
		sandbox.log(event.interval);
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