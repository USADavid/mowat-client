var Sandbox = {
	create : function(core, moduleSelector) {
		return {
			sendToServer : function(json) {
				MoWAT.sendToServer('{"' + moduleSelector + '":' + json + '}');
			},
			log : function(text) {
				//MoWAT.log(1, text);
			}
		};
	}	
};