var Sandbox = {
	create : function(core, moduleSelector) {
		return {
			sendToServer : function(json) {
				MoWAT.sendToServer(moduleSelector, Date.now(), json);
			},
			log : function(text) {
				//MoWAT.log(1, text);
			}
		};
	}	
};