function ClientWebsocket() {
  // Status Conexão WebSocket
  this.STATE_DISCONNECTED = 0;
  this.STATE_CONNECTED = 1;
  this.STATE_CONNECTING = 2;
  this.STATE_CLOSED = 3;
  this.serverUrl = 'ws://192.168.5.2:3333';
  this.checkNetwork = true;
  // this.verificaWebSocket(function(dados) {
  //   if(dados == 1) {
  this.ws = new WebSocket(this.serverUrl);
  this.verifica = true;
  this.initWebsocket();
    // }
  // });
}

ClientWebsocket.prototype.initWebsocket = function (handle) {
  this.ws.onopen = function(event) {};

  this.ws.onclose = function(e) {};

  this.ws.onerror = function(event) {
    websocket.ws.close();
  };
}

ClientWebsocket.prototype.recursiveEncrypt = function (data) {
  if(typeof data == 'object') {
    $.each(data, function(key, value) {
      data[key] = websocket.recursiveEncrypt(data[key]);
    });
  } else {
    data = Crypt.AES.encrypt(data.toString());
  }
  return data;
}

ClientWebsocket.prototype.send = function (dados) {
  if (this.ws.readyState == this.STATE_CONNECTED) {
    if(typeof dados == 'object') {
      $.each(dados, function(indice, valor) {
        if(valor != null) {
          if(typeof valor != 'object') {
            valor = $('<div>' + valor + '</div>').text();
          }
          dados[indice] = websocket.recursiveEncrypt(valor);
        }
      });
      this.ws.send(JSON.stringify(dados));
    } else {
      this.ws.send(dados);
    }
  } else {
    this.ws.close();
    return "Você não está conectato com o servidor de websocket";
  }
}

ClientWebsocket.prototype.verificaWebSocket = function (callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    callback(xhr.readyState);
  };
  xhr.withCredentials = true;
  xhr.open('GET', 'http://192.168.5.189:3333', true);
  xhr.send(null);
}

ClientWebsocket.prototype.websocketDisconnect = function () {
  this.ws.close();
}

var websocket = new ClientWebsocket();




