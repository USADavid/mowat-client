MoWAT.createModule("orientation", function(sandbox) {
	
	function listener(event) {
		sandbox.log(event.beta);
		sandbox.log(event.gamma);
		sandbox.log(event.alpha);
		
		sandbox.log(event.absolute);
		
		var json = '{';
		json += '"beta" : "' + event.beta + '",';
		json += '"gamma" : "' + event.gamma + '",';
		json += '"alpha" : "' + event.alpha + '",';
		json += '"absolute" : "' + event.absolute + '"';
		json += '}';
		
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