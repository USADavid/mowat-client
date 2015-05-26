MoWAT.createModule("battery", function(sandbox) {
	
	function logBattery(battery) {
		sandbox.log(battery.charging);
		sandbox.log(battery.level);
		sandbox.log(battery.dischargingTime);
	}
	
	function batteryFunction(battery) {
		logBattery(battery);

		battery.onchargingchange = function () {
			logBattery(battery);
		};

		battery.onlevelchange = function () {
			logBattery(battery);
		};

        battery.ondischargingtimechange = function () {
          logBattery(battery);
        };
	}
	
	return {
		init: function () {
			navigator.getBattery().then(batteryFunction);
		},
		destroy: function () {
			
		}
	};
});