var data;
var event;

function recursiveDecrypt(data) {
  if(typeof data == 'object') {
    $.each(data, function(key, value) {
      data[key] = recursiveDecrypt(data[key]);
    });
  } else {
    data = Crypt.AES.decrypt(data.toString());
  }
  return data;
}

websocket.ws.onmessage  = function(event) {
  if(event.data != 'null') {
    data = JSON.parse(event.data);
    if(typeof data == 'object') {
      $.each(data, function(indice, valor) {
        if(valor != null) {
          if(typeof valor != 'object') {
            valor = $('<div>' + valor + '</div>').text(); 
          }
          data[indice] = recursiveDecrypt(valor);
        }
      });
      worker.postMessage(data);
    }
  }
}