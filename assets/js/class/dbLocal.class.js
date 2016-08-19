"use strict";
// var estruturaBanco = [
//   {
//    nome: 'painel_cadpainel',
//    chave: 'id',
//    colunas: [{
//      nome: 'nome',
//      valor: 'valor'
//    }]
//   }
// ];

// var offlineDB =  new dbLocal();
// offlineDB.criaDB('leadflow', estruturaBanco);
// offlineDB.getAll('painel_cadpainel', function(dados) {
//   console.log(dados);
// });
// var dados = [
//  {id: 1, nome: 'Eliseu dos Santos', valor: 'teste'}
// ];

// offlineDB.insert({
//  tabela: 'painel_cadpainel',
//  dados: dados
// });
class dbLocal {
  constructor() {
    var datastore = null;
    var dados = [];
  }

  criaDB(nomeBanco, dados, versao = 1) {
    var requisicao = indexedDB.open(nomeBanco, versao);
    var self = this;

    requisicao.onupgradeneeded = function(e) {
      var db = e.target.result,
          objeto,
          item,
          index
      ;
      for (var i = 0, ii = dados.length; i < ii; i++) {
        item = dados[i];
        try {
          objeto = db.createObjectStore(item.nome, {keyPath: item.chave});
        } catch (erro) { console.error('Erro ao Criar Banco de Dados'); }
        if (Array.isArray(item.colunas)) {
          for (var j = 0, jj = item.colunas.length; j < jj; j++) {
            index = item.colunas[j];
          }
        }
      }
    };

    requisicao.onsuccess = function(e) {
      self.datastore = e.target.result;
      if(typeof callback == 'function') {
        callback();
      }
    };
  }

  getAll(tabela, callback) {
    var self = this;
    var db = this.datastore;
    var executa = db.transaction([tabela], 'readwrite');
    var estrutura = executa.objectStore(tabela);
    var range = IDBKeyRange.lowerBound(0);
    var requisicao = estrutura.openCursor(range);


    requisicao.onsuccess = function(e) {
      var resultado = e.target.result;
      if (!!resultado == false) {
        return;
      }
      self.dados.push(resultado.value);
      resultado.continue();
    };
  }

  insert(dados, callback) {
    var db = this.datastore;
    var executa = db.transaction(['painel_cadpainel'], 'readwrite');
      tabela = dados.tabela,
      dados = dados.dados,
      objeto;
    objeto = executa.objectStore(tabela);

    for (var i = 0, ii = dados.length; i < ii; i++) {
      var requisicao = objeto.put(dados[i]);
      requisicao.onsuccess = function(e) {
        if(typeof callback == 'function') {
          callback(dados[i]);
        }
      };
    }
  }

  delete(tabela, id, callback) {
    var db = this.datastore;
    var executa = db.transaction([tabela], 'readwrite');
    var objStore = executa.objectStore(tabela);
    var requisicao = objStore.delete(id);
    requisicao.onsuccess = function(e) {
      if(typeof callback == 'function') {
        callback();
      }
    }
  }
}