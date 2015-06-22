MoWAT.createModule("audiovideo", function(sandbox) {
	
	var videoInput = document.getElementById('videoInput');
	
	var webRtcPeer;
	
	var server = '192.168.1.26:8080'
	
	var ws;
	
	function onOffer(offerSdp) {
		sandbox.log('Invoking SDP offer callback function ' + location.host);
		var message = {
			id : 'start',
			sdpOffer : offerSdp
			}
		sendMessage(message);
	}
	
	function onError(error) {
		sandbox.log(error);
	}
	
	function startResponse(message) {
		sandbox.log("SDP answer received from server. Processing ...");
		webRtcPeer.processSdpAnswer(message.sdpAnswer);
	}
	
	function sendMessage(message) {
		var jsonMessage = JSON.stringify(message);
		sandbox.log('Senging message: ' + jsonMessage);
		ws.send(jsonMessage);
	}
	
	return {
		init: function () {
			if(Modernizr.getusermedia) {
				sandbox.log("Creating WebRtcPeer and generating local sdp offer ...");
				ws = new WebSocket('ws://' + server);
				ws.onmessage = function(message) {
					var parsedMessage = JSON.parse(message.data);
					sandbox.log('Received message: ' + message.data);
				
					switch (parsedMessage.id) {
					case 'startResponse':
						startResponse(parsedMessage);
						break;
					case 'error':
						onError("Error message from server: " + parsedMessage.message);
						break;
					default:
						onError('Unrecognized message', parsedMessage);
					}
				}
				window.onbeforeunload = function() {
					ws.close();
				}
	
				webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(null, onOffer, onError);
			}
		},
		destroy: function () {
			sandbox.log("Stopping video call ...");
			if (webRtcPeer) {
				webRtcPeer.dispose();
				webRtcPeer = null;
		
				var message = {
					id : 'stop'
				}
				sendMessage(message);
			}
			ws.close();
		}
	};
});