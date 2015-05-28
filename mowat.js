var MoWAT = (function () {
	
	var MoWATServerIP = "http://192.168.1.26:3000";
	
	var analyticsData = {}, moduleData = {}, debug = true;
	
	window.setInterval(this.send, 1000); // Send every sec
	window.addEventListener('unload', this.sendBeacon, false);
	
	return {
		debug : function (on) {
			debug = on ? true : false;	
		},
		
		createModule : function (moduleID, creator) {
			var temp;
			if (typeof moduleID === 'string' && typeof creator === 'function') {
				temp = creator(Sandbox.create(this, moduleID));
				if(temp.init && temp.destroy && typeof temp.init === 'function' && typeof temp.destroy === 'function') {
					moduleData[moduleID] = {
						create: creator,
						instance: null
					};
					temp = null;
				} else {
					this.log(1, "Module " + moduleID + " Registration: FAILED, no init or destroy functions");
				}
			} else {
				this.log(1, "Module " + moduleId + " Registration: FAILED, one or more arguments are of incorrect type");
			}
		},
		
		start : function (moduleID) {
			var mod = moduleData[moduleID];
			if(mod) {
				mod.instance = mod.create(Sandbox.create(this, moduleID));
				mod.instance.init();
			}	
		},
		
		startAll : function () {
			var moduleID;
			for (moduleID in moduleData) {
				if(moduleData.hasOwnProperty(moduleID)) {
					this.start(moduleID);
				}
			}
			window.setInterval(this.send, 20000); // Send every 20 sec
		},
		
		stop : function (moduleID) {
			var data;
			if (data = moduleData[moduleID] && data.instance) {
				data.instance.destroy();
				data.instance = null;
			} else {
				this.log(1, "Stop Module '" + moduleID + "': FAILED module not loaded or instance is missing");
			}
		},
		
		stopAll : function () {
			var moduleID;
			for (moduleID in moduleData) {
				if(moduleData.hasOwnProperty(moduleID)) {
					this.stop(moduleID);
				}
			}
		},
		
		log : function (severity, message) { 
			if (debug) { 
				console[ (severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message); 
			} else { 
				// do nothing or send to server
			}
		},
	
		sendToServer : function(module, time, content) {
			if (typeof analyticsData[module] === "undefined") {
				analyticsData[module] = {};
			}
			analyticsData[module][time] = {};
			analyticsData[module][time] = content;
		},
		
		send : function() {
			//console.log(JSON.stringify(analyticsData));
			var json = JSON.stringify(analyticsData);
			if(json !== '{}') {
				var req = new XMLHttpRequest();
				req.open('POST', MoWATServerIP);
				req.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
				req.send(json);
			}
			analyticsData = {};
		},
		
		sendBeacon : function() {
			var json = JSON.stringify(analyticsData);
			if(json !== '{}') {
				if(Modernizr.beacon) {
					if(!navigator.sendBeacon(MoWATServerIP, json)) {
						console.error("sendBeacon returned false");
					}
				} else {
					console.warning("sendBeacon is not supported");
				}
			}
		}
	};
	
	
}());

