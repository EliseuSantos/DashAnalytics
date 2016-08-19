function Notificacoes() {
  this.PERMISSAO_PADRAO = "default";
  this.PERMISSAO_GARANTIDA = "granted";
  this.PERMISSAO_NEGADA = "denied";
  this.PERMISSAO = [this.PERMISSAO_GARANTIDA, this.PERMISSAO_PADRAO, this.PERMISSAO_NEGADA];
  this.objetoVazio = {};
  this.StringVazia = "";
  this.verificaIE = Math.floor((Math.random() * 10) + 1);
  this.permissao();
}

Notificacoes.prototype.setNotificacao = function (titulo, opcoes) {
  var notificacao;
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if (window.Notification) {
      notificacao =  new window.Notification(titulo, {
        icon: baseUrl+'assets/imagens/notificacao.png',
        body: opcoes.conteudo || this.StringVazia,
        tag: opcoes.tag || {}
      });
    } else if (window.webkitNotifications) { //Google Chorme
        notificacao = window.webkitNotifications.criaNotificacao(opcoes.icon, titulo, opcoes.conteudo);
        notificacao.show();
    } else if (navigator.mozNotification) { //Firefox
        notificacao = navigator.mozNotification.criaNotificacao(titulo, opcoes.conteudo, opcoes.icon);
        notificacao.show();
    } else if (window.external && window.external.msIsSiteMode()) { //IE9+
        window.external.msSiteModeClearIconOverlay();
        window.external.msSiteModeSetIconOverlay((isString(opcoes.icon) ? opcoes.icon : ''), titulo);
        window.external.msSiteModeActivate();
        notificacao = {
          "verificaIE": this.verificaIE + 1
        };
    }
  } else {
    this.toast(opcoes.conteudo);
  }
  return notificacao;
}

Notificacoes.prototype.permissao = function () {
  if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
      window.webkitNotifications.requestPermission();
  } else if (window.Notification && window.Notification.requestPermission) {
      window.Notification.requestPermission();
  }
}

Notificacoes.prototype.nivelPermissao = function () {
  var permissao;
  if (window.Notification && window.Notification.permissionLevel) {
      //Safari 6
      permissao = window.Notification.permissionLevel();
  } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
      //Chrome & Firefox
      permissao = PERMISSION[window.webkitNotifications.checkPermission()];
  } else if (window.Notification && window.Notification.permission) {
      // Firefox 23+
      permissao = window.Notification.permission;
  } else if (navigator.mozNotification) {
      //Firefox Mobile
      permissao = this.PERMISSAO_GARANTIDA;
  } else if (window.external && (window.external.msIsSiteMode() !== undefined)) {
      //IE9+
      permissao = window.external.msIsSiteMode() ? this.PERMISSAO_GARANTIDA : this.PERMISSAO_PADRAO;
  }
  return permissao;
}

Notificacoes.prototype.criaNotificacao = function (titulo, opcoes) {
  var notificacao;
  if (this.isString(titulo) && opcoes && (this.nivelPermissao() === this.PERMISSAO_GARANTIDA)) {
    notificacao = this.setNotificacao(titulo, opcoes);
    if (opcoes.autoclose) {
        notificacao.addEventListener("show", function () {
            window.setTimeout(function () {
                notificacao.close();
            }, opcoes.autoclose);
        });
    }
    if(opcoes.onclick && opcoes.onclick != '') {
      notificacao.onclick = function(e) {
        opcoes.onclick(e);
      }
    }
    if(opcoes.onshow && opcoes.onshow != '') {
      notificacao.onshow = function(e) {
        opcoes.onclick(e);
      }
    }
  }
  return notificacao;
}

Notificacoes.prototype.isString = function (valor) {
  return (valor && (valor).constructor === String);
}

Notificacoes.prototype.isObject = function (valor) {
  return (valor && (valor).constructor === Object);
}

Notificacoes.prototype.funcaoVazia = function () {
  return function () {};
}

Notificacoes.prototype.toast = function (message, className) {
  var displayLength = 10000;
  className = className || "";
  var container = document.getElementById('toast-container');
    if (container === null) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    var newToast = this.createToast(message, className);
    if(message){
      container.appendChild(newToast);
    }
    newToast.style.top = '35px';
    newToast.style.opacity = 1;
    $(newToast).velocity({ "top" : "0px", opacity: 1 }, {
      duration: 300,
      easing: 'easeOutCubic',
      queue: false});
    var timeLeft = displayLength;
    var counterInterval = setInterval (function(){
      if (newToast.parentNode === null)
        window.clearInterval(counterInterval);
      if (!newToast.classList.contains('panning')) {
        timeLeft -= 20;
      }
      if (timeLeft <= 0) {
        $(newToast).velocity({"opacity": 0, marginTop: '-40px'}, {
          duration: 375,
          easing: 'easeOutExpo',
          queue: false,
          complete: function(){
            if(typeof(completeCallback) === "function") {
              completeCallback();
            }
            this[0].parentNode.removeChild(this[0]);
          }
        });
        window.clearInterval(counterInterval);
      }
    }, 20);
}

Notificacoes.prototype.createToast = function (html, className) {
  var toast = document.createElement('div');
  toast.classList.add('toast');
  if (className) {
    var classes = className.split(' ');
    for (var i = 0, count = classes.length; i < count; i++) {
      toast.classList.add(classes[i]);
    }
  }
  if ( typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object"
    && html !== null && html.nodeType === 1 && typeof html.nodeName==="string") {
    toast.appendChild(html);
  } else if (html instanceof jQuery) {
    toast.appendChild(html[0]);
  } else {
    toast.innerHTML = html;
  }
  var hammerHandler = new Hammer(toast, {prevent_default: false});
  hammerHandler.on('pan', function(e) {
    var deltaX = e.deltaX;
    var activationDistance = 80;
    if (!toast.classList.contains('panning')){
      toast.classList.add('panning');
    }

    var opacityPercent = 1-Math.abs(deltaX / activationDistance);
    if (opacityPercent < 0) {
      opacityPercent = 0;
    }
    $(toast).velocity({left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});
  });

  hammerHandler.on('panend', function(e) {
    var deltaX = e.deltaX;
    var activationDistance = 80;
    if (Math.abs(deltaX) > activationDistance) {
      $(toast).velocity({marginTop: '-40px'}, {
          duration: 375,
          easing: 'easeOutExpo',
          queue: false,
          complete: function(){
            if(typeof(completeCallback) === "function") {
              completeCallback();
            }
            toast.parentNode.removeChild(toast);
          }
      });
    } else {
      toast.classList.remove('panning');
      $(toast).velocity({ left: 0, opacity: 1 }, { duration: 300,
        easing: 'easeOutExpo',
        queue: false
      });
    }
  });

  return toast;
};

var notificacao = new Notificacoes();