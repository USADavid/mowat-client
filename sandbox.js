var Sandbox = {
	create : function(core, moduleSelector) {
		return {
			log : function(text) {
				MoWAT.log(1, text);
			}
		};
	}	
};