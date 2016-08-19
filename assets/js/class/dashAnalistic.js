function painelBordo() {
  this.host = window.location.host;
  this.checkNetwork = false;
  this.time = null;
  this.objetoAjax;
  this.baseUrl = 'http://';
  this.baseUrl = '/leadflow/';
  this.tmpTemplate;
  this.mover = false;
  this.idmov = false;
  this.fetchingNotificacao = false;
  this.fetchingCausa = false;
  this.relModelo = new RelModelo();
}

painelBordo.prototype.getTotalNaoLidas = function() {
  this.callAjax({
    tipo: 'JSON',
    url: 'notificacoes/getNotificacoesNaoLidas',
  }, function(dados) {
    var countNotifica = $('#notification_count');
    var intCountNotifica = parseInt(dados);
    countNotifica.text(intCountNotifica);
    if (intCountNotifica <= 0) countNotifica.addClass('hidden');
    if (intCountNotifica > 0) countNotifica.removeClass('hidden');
  });
};

painelBordo.prototype.setAcao = function(elemento) {
  var dt_limite = $(elemento).closest('#lista-projetos').find('.dt_limite').text();
  dt_limite = moment(dt_limite, 'DD/MM/YYYY').format('DD/MM/YYYY');
  var cindicator = $('ul[data-projeto="' + elemento.dataset.projeto + '"] li:last').find('.c-indicator');
  if (!cindicator.length) {
    cindicator = $('.projetos[data-projeto="' + elemento.dataset.projeto + '"] .lista-acoes');
  }

  $(cindicator).popover({
    template: painelBordo.htmlTemplatePopover('popover-prazo-acao', false),
    title: 'Ação do Projeto',
    content: localStorage.getItem('tmpPrazoAcao'),
    trigger: 'manual',
    placement: 'bottom',
    html: true
  }).popover('show');
  $(cindicator).on('show.bs.popover', function(e) {
    $('.popover-prazo-acao .icon-fechar').on('click', function() {
      $('.popover-prazo-acao').popover('dispose');
    });
  });
  $('.select2-pessoas').select2(painelBordo.select2AjaxOptions('Pessoas/getUsuariosPorNome', 'cd_usuario', 'razao_social'));
  $('<option>').val(document.getElementById('usuario-session').value)
    .text(document.getElementById('razao-social-session').value)
    .appendTo($('.popover-prazo-acao .select2-pessoas'))
    .trigger('change');
  $('.date').datepicker();
  $('.date').datepicker('setDate', dt_limite);
  $('.salva-acao').click(function(e) {
    var form = $('.prazo-acao input, .prazo-acao select');
    var dt_acao = $('.popover-prazo-acao #dt_limite').val();
    if (painelBordo.verificaCamposObrigatorios(e, form)) {
      painelBordo.callAjax({
        tipo: 'JSON',
        url: 'indicadores/salvarAcao',
        data: {
          id_projeto: elemento.dataset.projeto,
          desc_acao: elemento.value,
          dt_limite: moment(dt_acao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          cd_usuario: form[1].value
        }
      }, function(dados) {
        elemento.value = '';
        $('.lista-acoes li:last').attr('data-acao', dados.id_acao);
        $(cindicator).popover('dispose');
        dados.tipo = 'newAcao';
        websocket.send(dados);
      });
    }
  });
};

painelBordo.prototype.ativaAcao = function(id_acao) {
  this.callAjax({
    tipo: 'JSON',
    url: 'fca/ativaAcao',
    data: {
      id_acao: id_acao
    }
  }, function(dados) {
    swal({
      title: 'Ação Ativada',
      text: 'A ação foi reativada com sucesso',
      timer: 2000,
      type: 'success',
      showConfirmButton: false
    });
    dados.tipo = 'acaoAtivada';
    websocket.send(dados);
  });
};

painelBordo.prototype.ativaProjeto = function(id_projeto) {
  this.callAjax({
    tipo: 'JSON',
    url: 'fca/ativaProjeto',
    data: {
      id_projeto: id_projeto
    }
  }, function(dados) {
    swal({
      title: 'Projeto Ativado',
      text: 'O projeto foi reativado com sucesso',
      timer: 2000,
      type: 'success',
      showConfirmButton: false
    });
    dados.tipo = 'projetoAtivado';
    websocket.send(dados);
  });
};

painelBordo.prototype.setAcaoProjeto = function(id_acao, id_fca) {
  swal({
    title: 'Transformar Ação',
    text: "Deseja realmente transformar ação em projeto?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, transformar',
    cancelButtonText: 'Cancelar'
  }).then(function(isConfirm) {
    if (isConfirm) {
      this.callAjax({
        tipo: 'JSON',
        data: {
          id_acao: id_acao,
          id_fca: id_fca
        },
        url: 'fca/setAcaoProjeto',
      }).done(function(dados) {
        swal({
          title: 'Projeto Criado',
          text: 'O projeto foi criado com sucesso',
          timer: 2000,
          type: 'success',
          showConfirmButton: false
        });
        dados.tipo = 'setAcaoProjeto';
        dados.id_acao = id_acao;
        websocket.send(dados);
      });
    }
  }.bind(this));
};

painelBordo.prototype.setNotificacaoLidaUsuario = function() {
  this.callAjax({
    tipo: 'JSON',
    url: 'notificacoes/setNotificacaoLidaUsuario',
  }, function(dados) {
    if (dados) {
      $("#notification_count").addClass('hidden');
    }
  });
};

painelBordo.prototype.getBackgroundUsuario = function() {
  this.callAjax({
    tipo: 'JSON',
    url: 'usuario/getBackgroundUsuario',
  }, function(dados) {
    if (dados.tipo == 'img') {
      var elemento = $('body')[0];
      if (dados.valor.split('/')[1] == 'uploads' || dados.valor.split('/').pop() == 'background.png') {
        $('body').css('background', 'url(' + baseUrl + dados.valor + ')');
        elemento.style.backgroundSize = 'cover';
      } else {
        $('body').css('background', 'url(' + baseUrl + dados.valor + ')');
      }
    } else {
      $('body').css('background-color', localStorage.getItem('background'));
    }
    return false;
  });
};

painelBordo.prototype.setBackgroundUsuario = function(background) {
  this.callAjax({
    tipo: 'JSON',
    url: 'usuario/setBackgroundUsuario',
    data: {
      background: background
    }
  }, function(dados) {
    if (dados.tipo == 'img') {
      var elemento = $('body')[0];
      $('body').css('background', 'url(' + baseUrl + dados.valor + ')');
      elemento.style.backgroundSize = 'cover';
    } else {
      if ($('body')[0].hasAttribute('style')) {
        $('body').removeAttr("style");
      }
      localStorage.setItem('background', background);
      $('body').css('background-color', localStorage.getItem('background'));
    }
  });
};

painelBordo.prototype.fixaMenu = function() {
  this.callAjax({
    tipo: 'JSON',
    url: 'Usuario/fixaMenu',
    data: {
      st_menu: ($('[data-board]').hasClass('fixa-menu')) ? 'f' : 't'
    }
  }, function(dados) {
    if (dados == 'f') {
      $('#board').removeClass('fixa-menu');
      $('.conteudo-modelo').removeClass('fixa-menu');
      $('#stmenu').removeClass('fix');
      $('#cd-menu-trigger').trigger('click');
    } else {
      $('#board').addClass('fixa-menu');
      $('.conteudo-modelo').addClass('fixa-menu');
      $('#cd-lateral-nav').addClass('lateral-menu-is-open');
      $('#stmenu').addClass('fix');
    }
  });
};

painelBordo.prototype.initPopoverTooltip = function() {
  $('[data-toggle="popover"]').popover({
    container: 'body',
    template: painelBordo.htmlTemplatePopover()
  });
};

painelBordo.prototype.popoverAlert = function(dados, elemento) {
  $(elemento).popover({
    title: 'Ações do Card',
    content: dados.conteudo,
    template: this.htmlTemplatePopover('popoverAlert', true),
    placement: 'bottom',
    html: true
  });
  $(elemento).popover('show');
};

painelBordo.prototype.onReload = function(callback) {
  if (window.performance && performance.navigation.type == 1) {
    callback();
  }
};

painelBordo.prototype.criaThumbParticipante = function(participante, cd_usuario, id_fca = false, foto = false, dono = false, superS = false) {
  var id_fca = (id_fca) ? id_fca : '';
  var html = '<div class="icons-popover-membro icons-popover-no-menu" title="' + participante + '" data-usuario="' + cd_usuario + '" data-idfca="' + id_fca + '"><span class="icons-popover-iniciais" title="">';
  if (foto && foto != '') {
    html += '<img style=" background-image: url(' + this.baseUrl + foto + ');">';
  } else {
    html += participante.getInitials();
  }
  if (dono) {
    html += '<i class="fa fa-angle-double-up usuario-dono" title="Dono do Painel" aria-hidden="true"></i>';
  }
  if (superS) {
    html += '<i class="fa fa-certificate usuario-super" title="Usuário Super" aria-hidden="true"></i>';
  }
  html += '</span></div>';
  return html;
};

painelBordo.prototype.verificaNovoFca = function() {
  var id_fca = localStorage.getItem('novoFca');
  if (id_fca && id_fca != null) {
    $('.lista-fcas[data-idfca="' + id_fca + '"] .ribbon').removeClass('hidden');
    localStorage.removeItem('novoFca');
  }
};

painelBordo.prototype.atualizaO2 = function(id_ideia, id_meta, id_indicador, callback) {
  this.callAjax({
    url: 'Indicadores/atualizaO2',
    data: {
      id_meta: id_meta,
      id_meta: id_meta,
      id_indicador: id_indicador,
      id_o2: id_ideia,
    }
  }, function() {
    callback();
  });
};

painelBordo.prototype.limitaCaracter = function(string, limite) {
  if (string.length >= limite) {
    return string.substring(0, limite) + '...';
  } else {
    return string;
  }
};

painelBordo.prototype.modalMeta = function(id_indicador) {
  var modal = $('#modal-nova-meta');
  $('#tp-meta-nova-meta, #periodicidade-nova-meta').select2();
  $('#cd-usuario-nova-meta').select2(painelBordo.select2AjaxOptions('Pessoas/getUsuariosPorNome', 'cd_usuario', 'razao_social'));
  if (!$('#cd-usuario-nova-meta').val()) {
    $('<option>').val($('#usuario-session').val())
      .text($('#razao-social-session').val())
      .appendTo('#cd-usuario-nova-meta')
      .trigger('change');
  }
  $('#ano-nova-meta').datepicker({
    format: 'yyyy',
    minViewMode: 2,
    maxViewMode: 2,
    zIndexOffset: 999999
  }).datepicker('setDate', $('#filter-ano').val());
  modal.data('id-indicador', id_indicador).modal('show');
  modal.on('hidden.bs.modal', function() {
    $(this).find('input, select').val('');
  });
};


painelBordo.prototype.projetosInativos = function(id_fca) {
  this.callAjax({
    url: 'fca/getProjetosInativos',
    tipo: 'JSON',
    data: {
      id_fca: id_fca
    }
  }, function(dados) {
    if (dados && dados.length) {
      var objProjeto = {
        projetos: dados,
        id_fca: id_fca
      };
      $(Mustache.render(localStorage.getItem('tmpModalProjetosInativos'), {})).appendTo('body');
      $('#modalProjetosInativos .modal-body').html($(Mustache.render(localStorage.getItem('tmpProjetoInativo'), objProjeto)));
      $('#modalProjetosInativos').modal('show');
    } else {
      swal({
        title: 'Nenhum dado encontrado',
        type: 'info',
        timer: 4000,
        showConfirmButton: true
      });
    }
  });
};

painelBordo.prototype.acoesInativas = function(id_fca) {
  this.callAjax({
    url: 'fca/getAcoesInativas',
    tipo: 'JSON',
    data: {
      id_fca: id_fca
    }
  }, function(dados) {
    if (dados && dados.length) {
      var objAcao = {
        acoes: dados,
        id_fca: id_fca
      };
      $(Mustache.render(localStorage.getItem('tmpModalAcoesInativas'), {})).appendTo('body');
      $('#modalAcoesInativas .modal-body').html($(Mustache.render(localStorage.getItem('tmpAcoesInativas'), objAcao)));
      $('#modalAcoesInativas').modal('show');
    } else {
      swal({
        title: 'Nenhum dado encontrado',
        type: 'info',
        timer: 4000,
        showConfirmButton: true
      });
    }
  });
};

painelBordo.prototype.modalFca = function() {
  var elemento = $('#modalCard');
  var args = arguments[0];
  var callback = arguments[1];
  objetoAjax = {
    tipo: 'html',
    data: args,
    url: 'Fca/modalFca'
  };
  painelBordo.callAjax(objetoAjax).done(function(dados) {
    painelBordo.verificaNovoFca();
    elemento.find('.text-inline').html('');
    if (!elemento.length || !elemento.hasClass('in')) {
      $(Mustache.render(localStorage.getItem('tmpModal'), args))
        .setAtributtes(args)
        .find('.listar-fcas')
        .setAtributtes(args)
        .end()
        .find('.modal-body')
        .html(dados)
        .end()
        .appendTo('body')
        .modal('show');
    } else {
      var titulo = args.titulo;
      var subtitulo = args.subtitulo;
      var textinline = args.textinline;
      if (!args.fcas_arquivados) {
        elemento.find('.fcas-arquivados').hide();
      } else {
        elemento.find('.fcas-arquivados').text('FCAs Arquivados').show();
      }
      if (titulo && titulo.toString().trim() != '') {
        elemento.find('.modal-title .titulo')
          .html(titulo);
        if (subtitulo && subtitulo.toString().trim() != '' && !textinline) {
          elemento.find('.modal-title .subtitulo')
            .html(' / ' + subtitulo);
        }
        if (textinline && textinline.toString().trim() != '') {
          elemento.find('.text-inline')
            .html(textinline);
        }
      }

      elemento.setAtributtes(args).find('.modal-body')
        .html(dados)
        .end();
    }

  }.bind(this)).done(function() {
    if (callback) {
      callback();
    }
  });
};

painelBordo.prototype.modalRelatorio = function() {
  var elemento = $('#modalRelatorio');
  var args = arguments[0];
  var callback = arguments[1];
  objetoAjax = {
    tipo: 'html',
    data: args,
    url: 'Relatorio/modal'
  };
  painelBordo.callAjax(objetoAjax).done(function(dados) {
    if (dados.trim().length > 0) {
      painelBordo.verificaNovoFca();
      if (!elemento.length || !elemento.hasClass('in')) {
        $(Mustache.render(localStorage.getItem('tmpModalRelatorio'), args))
          .setAtributtes(args)
          .find('.modal-body')
          .html(dados)
          .end()
          .appendTo('body')
          .modal('show');
      } else {
        var titulo = args.titulo;
        var subtitulo = args.subtitulo;
        if (titulo && titulo.trim() != '') {
          elemento.find('.modal-title .titulo')
            .text(titulo)
          if (subtitulo && subtitulo.trim() != '') {
            elemento.find('.modal-title .subtitulo')
              .text(' / ' + subtitulo)
          }
        }

        elemento.setAtributtes(args).find('.modal-body')
          .html(dados)
          .end();
      }
    }
    if (callback) {
      callback(dados);
    }
  }.bind(this));
};

painelBordo.prototype.triggersDraggleDropNewIdeias = function() {
  // $('.lista-oxigenio .lista-cards .card').draggable({
  //   refreshPositions: !0,
  //   appendTo: 'body',
  //   containment: 'window',
  //   connectToSortable: "#board",
  //   scroll: false,
  //   helper: 'clone',
  //   start: function(e, ui) {
  //     ui.helper.css('z-index', "1");
  //     ui.helper.addClass('on-drag-o2');
  //     $(e.target).closest('.lista-oxigenio').find('.o2-indicador').trigger('click');
  //   },
  //   stop: function (e, ui) {
  //     $(e.target).remove();
  //     ui.helper.removeClass('on-drag-o2');
  //   }
  // });

  // $('.lanca-fcas').droppable({
  //   accept: '.o2-card',
  //   drop: function (event, ui) {
  //     var card = $(event.target);
  //     var id_meta = card.closest('.lista-cards').data('idmeta');
  //     var id_indicador = card.closest('.list-wrapper').data('id-indicador');
  //     var o2 = $(ui.draggable);
  //     var id_ideia = o2.data('idideia');
  //     painelBordo.atualizaO2(id_ideia, id_meta, id_indicador, function() {
  //       $(o2).remove();
  //       swal({
  //         title: 'Ideia Lançada',
  //         text: 'Ideia adicionada a meta',
  //         timer: 2000,
  //         type: 'success',
  //         showConfirmButton: false
  //       });
  //       // websocket.send({
  //       //   tipo: 'newIdeiasFca',
  //       //   desc_acao
  //       // });
  //     });
  //   }
  // });
};

painelBordo.prototype.setO2Acao = function(id_o2, id_projeto, desc_acao, callback) {
  this.callAjax({
    url: 'Indicadores/setO2Acao',
    tipo: 'JSON',
    data: {
      id_o2: id_o2,
      id_projeto: id_projeto,
      desc_acao: desc_acao,
    }
  }, function(dados) {
    dados.tipo = 'newAcao';
    websocket.send(dados);
    callback(dados);
  });
};

painelBordo.prototype.htmlTemplatePopover = function(parametro, titulo) {
  var classe = (parametro != '' && parametro != undefined) ? parametro : '';
  var hidden = (titulo != '' && parametro != undefined) ? 'hidden' : '';
  return '<div class="popover ' + classe + '" role="tooltip"><h3 class="popover-title popover-leader-cabecalho ' + hidden + '"></h3><span class="fa fa-times icon-fechar ' + hidden + '"></span><div class="popover-content popover-leader-conteudo"></div></div>';
};

painelBordo.prototype.textareaSize = function(elemento) {
  $(elemento).each(function() {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight - 10) + 'px';
  });
};

painelBordo.prototype.callAjax = function(data, callback) {
  var dados = (data.data != '' && data.data != undefined) ? data.data : null;
  var ajax = $.ajax({
    type: (data.metodo && data.metodo != '') ? data.metodo : 'POST',
    url: this.baseUrl + data.url,
    dataType: (data.tipo && data.tipo != '') ? data.tipo : 'JSON',
    data: dados,
    cache: false,
    success: function(dados) {
      $('.tooltip').tooltip('dispose');
      if (typeof callback == 'function') {
        callback(dados);
      }
    }
  });
  return ajax;
};

painelBordo.prototype.pesquisaGeral = function(pesquisa, array) {
  return $.grep(array, function(dados) {
    var busca = painelBordo.removeAcentos(dados.dataset.pesq);
    if (busca && busca.search(new RegExp(painelBordo.removeAcentos(pesquisa), "ig")) >= 0) {
      return dados;
    }
  });
};

painelBordo.prototype.removeAcentos = function(texto) {
  return texto.replace(/[áàãâä]/gi, "a")
    .replace(/[éè¨ê]/gi, "e")
    .replace(/[íìïî]/gi, "i")
    .replace(/[óòöôõ]/gi, "o")
    .replace(/[úùüû]/gi, "u")
    .replace(/[ç]/gi, "c")
    .replace(/[ñ]/gi, "n");
};

painelBordo.prototype.pesquisaPessoas = function(pesquisa, array) {
  var limitearray = array.length;
  if (this.pesquisaGeral(pesquisa, array)) {
    $(array).fadeIn(500, function() {
      $(array).not(painelBordo.pesquisaGeral(pesquisa, array)).fadeOut(500);
    });
  } else {
    $(array).fadeIn(500);
  }
};

painelBordo.prototype.pesquisaArquivados = function(pesquisa, array) {
  var limitearray = array.length;
  if (this.pesquisaGeral(pesquisa, array)) {
    $(array).show();
    $(array).not(painelBordo.pesquisaGeral(pesquisa, array)).hide();
  } else {
    $(array).show();
  }
}

painelBordo.prototype.pesquisaPainel = function(pesquisa, array) {
  var limitearray = array.length;
  if (this.pesquisaGeral(pesquisa, array)) {
    $(array).show();
    $(array).not(this.pesquisaGeral(pesquisa, array)).hide();
  } else {
    $(array).show();
  }
};

painelBordo.prototype.pesquisaPaineis = function(pesquisa, array) {
  var limitearray = array.length;
  if (this.pesquisaGeral(pesquisa, array)) {
    $(array).show();
    $(array).not(this.pesquisaGeral(pesquisa, array)).hide();
  } else {
    $(array).show();
  }
};

painelBordo.prototype.triggerProgresso = function(elemento, dataset = false, id_acao, checked_acao) {
  var id = dataset;
  var nomeProjeto = $('.panel-default.panel-acoes.projetos[data-projeto="' + id + '"] .desc-text-project').text().trim();
  var classe;

  if ($(elemento).hasClass('project-check')) {
    var totalSubacao = $('ul[data-projeto=' + id + '] input[type="checkbox"]').length;
    var finalizadasSubacao = $('ul[data-projeto=' + id + '] input[type="checkbox"]:checked').length;
    var progresso = $('div.progress-bar[data-projeto=' + id + ']')[0];
    if (finalizadasSubacao < totalSubacao) {
      $('ul[data-projeto=' + id + '] input[type="checkbox"]').each(function() {
        this.checked = true;
      });
      $(progresso).removeClass('progress-bar-success progress-bar-danger progress-bar-warning');
      progresso.style.width = '100%';
      progresso.innerText = '100%';
      $(progresso).addClass('progress-bar-success');
      var dados = {
        tipo: 'progressoProjeto',
        projeto: nomeProjeto,
        progresso: '100%'
      };
      websocket.send(dados);
      this.atualizaProgressoProjetoTodos(id, 100, 't', 'success');

    } else {
      $('ul[data-projeto=' + id + '] input[type="checkbox"]').each(function() {
        this.checked = false;
      });
      progresso.style.width = '0%';
      progresso.innerText = '';
      var dados = {
        tipo: 'progressoProjeto',
        projeto: nomeProjeto,
        progresso: '0%'
      };
      websocket.send(dados);
      this.atualizaProgressoProjetoTodos(id, 0, 'f', '');
    }
  } else {
    var filhos_subacao = elemento.children;
    var progresso = $('div.progress-bar[data-projeto=' + id + ']')[0];
    var filhos_checked_proj = $('.check-project-titulo[data-projeto=' + id + '] input[type="checkbox"]');
    var filhos_checked = $('ul.lista-acoes[data-projeto=' + id + '] input[type="checkbox"]:checked');
    var filhos = $('ul.lista-acoes[data-projeto=' + id + '] input[type="checkbox"]');
    var prog = this.calculaPorcentagem(filhos_checked.length, filhos.length);
    if (filhos_checked.length > 0 && filhos_checked.length == filhos.length) {
      $('[data-projeto=' + id + ']').find('input[type="checkbox"]').prop("checked", true);
      filhos_checked_proj[0].checked = true;
    } else {
      filhos_checked_proj[0].checked = false;
    }
    $(progresso).removeClass('progress-bar-success progress-bar-danger progress-bar-warning');
    var porcentagemInt = parseInt(prog.slice(0, -1));
    if (porcentagemInt <= 30) {
      $(progresso).addClass('progress-bar-danger');
      classe = 'danger';
    } else if (porcentagemInt >= 30 && porcentagemInt <= 70) {
      $(progresso).addClass('progress-bar-warning');
      classe = 'warning';
    } else {
      $(progresso).addClass('progress-bar-success');
      classe = 'success';
    }
    progresso.style.width = prog;
    progresso.innerText = prog;
    var dados = {
      tipo: 'progressoProjeto',
      projeto: nomeProjeto,
      progresso: (prog && !isNaN(prog.slice(0, -1))) ? prog : '0%'
    };
    var nomeAcao = $('li[data-acao="' + id_acao + '"] label span.desc div').text().trim();
    websocket.send(dados);
    if (checked_acao) {
      var dados = {
        tipo: 'progressoAcao',
        acao: nomeAcao
      };
      websocket.send(dados);
    }
    this.atualizaProgressoProjeto(id, id_acao, prog.slice(0, -1), classe, filhos_checked_proj[0].checked, checked_acao);
  }
};

painelBordo.prototype.extensoesPermitidas = function() {
  return {
    png: 'fa-file-image-o',
    jpg: 'fa-file-image-o',
    jpeg: 'fa-file-image-o',
    gif: 'fa-file-image-o',
    zip: 'fa-file-archive-o',
    ppt: 'fa-file-powerpoint-o',
    pptx: 'fa fa-file-powerpoint-o',
    odp: 'fa fa-file-powerpoint-o',
    rar: 'fa-file-archive-o',
    pdf: 'fa-file-pdf-o',
    doc: 'fa-file-word-o',
    docx: 'fa-file-word-o',
    xlsx: 'fa-file-excel-o',
    xlsm: 'fa-file-excel-o',
    xls: 'fa-file-excel-o',
    txt: 'fa-file-text-o',
    csv: 'fa-file-excel-o',
    bmp: 'fa-file-image-o',
    csv: 'fa-file-excel-o',
    avi: 'fa-file-video-o',
    flv: 'fa-file-video-o',
    mp4: 'fa-file-video-o',
    mp3: 'fa-file-audio-o',
    ogg: 'fa-file-audio-o',
    wav: 'fa-file-audio-o',
    wmv: 'fa-file-video-o',
  };
};

painelBordo.prototype.excluiAnexo = function(pasta, tipo) {
  swal({
    title: 'Excluir Anexo',
    text: "Deseja realmente excluir este Arquivo?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then(function(isConfirm) {
    if (isConfirm) {
      this.callAjax({
        tipo: 'JSON',
        data: {
          pasta: pasta,
          parametro: tipo
        },
        url: 'Fca/apagaArquivo'
      }, function(dados) {
        dados.tipo = 'excluiAnexo';
        dados.parametro = tipo;
        websocket.send(dados);
      });
    }
  }.bind(this));
};

painelBordo.prototype.excluiPatern = function(path) {
  swal({
    title: 'Remover Background',
    text: "Deseja realmente remover este background de sua lista?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, remover',
    cancelButtonText: 'Cancelar'
  }).then(function(isConfirm) {
    if (isConfirm) {
      this.callAjax({
        tipo: 'JSON',
        data: {
          pasta: path
        },
        url: 'Usuario/apagaArquivo'
      }, function(dados) {
        dados.tipo = 'excluiPatern';
        websocket.send(dados);
      });
    }
  }.bind(this));
};

painelBordo.prototype.erroExtensao = function() {
  return swal({
    title: 'Erro',
    text: 'Extensão não permitida',
    type: 'error',
    timer: 4000,
    showConfirmButton: false
  });
};

painelBordo.prototype.erroTamanho = function() {
  return swal({
    title: 'Erro',
    text: 'Tamanho Excedido, o limite de anexo é de no máximo 20mb',
    type: 'error',
    timer: 4000,
    showConfirmButton: false
  });
};

painelBordo.prototype.fechaPaineisDeEdicao = function() {
  $('.novo-projeto').each(function() {
    var elemento = $('[class^="lista-paineis"] li[data-id="' + this.dataset.id + '"]')[0];
    if (elemento != undefined) {
      elemento.style.height = '6em';
    }
    $('[class^="lista-paineis"] li[data-id="' + this.dataset.id + '"]').find('.flip-painel').css('display', 'block');
    $(this).not('.novo-painel').remove();
    $('.lista-paineis li').removeClass('editando-painel');
  });
};

painelBordo.prototype.anexoFca = function(evt, id_fca) {
  var files = evt.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    var ext = f.name.split('.').pop().toLowerCase();
    if ((ext in this.extensoesPermitidas()) && f.type != '') {
      var size = f.size / 1024 / 1024;
      if (size <= 20) {
        var reader = new FileReader();
        reader.onload = (function(arquivo) {
          return function(e) {
            var dados = [{
              anexo: arquivo,
              elemento: '.listanexo-fca',
              id_fca: id_fca,
            }];
            this.ajaxUpload('fca/uploadFca', dados, 'newArquivo');
          }.bind(this);
        }.bind(this))(f);
        reader.readAsDataURL(f);
      } else {
        this.erroTamanho();
      }
    } else {
      this.erroExtensao();
    }
  }
};

painelBordo.prototype.anexoProjeto = function(evt, id_projeto, id_fca, elementprogress) {
  var files = evt.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    var ext = f.name.split('.').pop().toLowerCase();
    if ((ext in this.extensoesPermitidas()) && f.type != '') {
      var size = f.size / 1024 / 1024;
      if (size <= 20) {
        var reader = new FileReader();
        reader.onload = (function(arquivo) {
          return function(e) {
            var dados = [{
              anexo: arquivo,
              id_fca: id_fca,
              elemento: '.list-uploads',
              id_projeto: id_projeto
            }];
            this.ajaxUpload('fca/uploadProjeto', dados, 'newArquivo', elementprogress);
          }.bind(this);
        }.bind(this))(f);
        reader.readAsDataURL(f);
      } else {
        this.erroTamanho();
      }
    } else {
      this.erroExtensao();
    }
  }
};

painelBordo.prototype.anexoPatern = function(evt) {
  var files = evt.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    var ext = f.name.split('.').pop().toLowerCase();
    var extensoesPermitidas = ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
    if ($.inArray(ext, extensoesPermitidas) > -1 && f.type != '') {
      var size = f.size / 1024 / 1024;
      if (size <= 20) {
        var reader = new FileReader();
        reader.onload = (function(arquivo) {
          return function(e) {
            var dados = [{
              anexo: arquivo,
            }];
            this.ajaxUpload('usuario/uploadPatern', dados, 'newPatern');
          }.bind(this);
        }.bind(this))(f);
        reader.readAsDataURL(f);
      } else {
        this.erroTamanho();
      }
    } else {
      this.erroExtensao();
    }
  }
};

painelBordo.prototype.ajaxUpload = function(url, data, evento, elementprogress = false) {
  var form = new FormData();
  if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      for (var index in data[i]) {
        form.append(index, data[i][index]);
      }
    }
  } else {
    form.append('anexo', data);
  }
  $.ajax({
    url: this.baseUrl + url,
    data: form,
    dataType: 'JSON',
    processData: false,
    contentType: false,
    type: 'POST',
    xhr: function() {
      var xhr = $.ajaxSettings.xhr();
      if (elementprogress) {
        xhr.upload.onprogress = function(e) {
          var porcentagem = Math.floor(e.loaded / e.total * 100);
          $(elementprogress).siblings('.progress-value').removeClass('hide');
          $(elementprogress).val(porcentagem);
          $(elementprogress).siblings('.progress-value').text(porcentagem + '%');
        };
        xhr.upload.onloadend = function() {
          setTimeout(function() {
            $(elementprogress).val(0);
            $(elementprogress).siblings('.progress-value').text('0%');
            $(elementprogress).siblings('.progress-value').addClass('hide');
          }, 2000);
        };
      }
      return xhr;
    }
  }).done(function(data) {
    data.tipo = evento;
    websocket.send(data);
  });
};

painelBordo.prototype.calculaPorcentagem = function(completo, total) {
  var valor1 = completo / total;
  var resultado = valor1 * 100;

  return (resultado.toFixed(0) == 0) ? 0 + '%' : resultado.toFixed(0) + '%';
};

painelBordo.prototype.atualizaProgressoProjeto = function(id_projeto, id_acao, progresso, classe, status, checked_acao) {
  var objetoAjax = {
    tipo: 'JSON',
    data: {
      id_projeto: id_projeto,
      id_acao: id_acao,
      progresso: (!isNaN(progresso)) ? progresso : 0,
      class_status: classe,
      checked_acao: (checked_acao) ? 't' : 'f',
      status: status
    },
    url: 'Fca/setProgressoProjeto'
  };
  if (progresso == 100) objetoAjax.data.status = 't';
  this.callAjax(objetoAjax);
};

painelBordo.prototype.atualizaProgressoProjetoTodos = function(id_projeto, progresso, status, class_status) {
  var objetoAjax = {
    tipo: 'JSON',
    data: {
      id_projeto: id_projeto,
      progresso: (!isNaN(progresso)) ? progresso : 0,
      status: status,
      class_status: class_status
    },
    url: 'Fca/setAllProgressoProjeto'
  };
  this.callAjax(objetoAjax);
};

painelBordo.prototype.inativarAcao = function(id_acao) {
  var objetoAjax = {
    tipo: 'JSON',
    data: {
      id_acao: id_acao,
    },
    url: 'Fca/inativarAcao'
  };
  this.callAjax(objetoAjax, function(dados) {
    dados.tipo = 'acaoInativada';
    websocket.send(dados);
  });
};

painelBordo.prototype.inativarProjeto = function(id_projeto) {
  var objetoAjax = {
    tipo: 'JSON',
    data: {
      id_projeto: id_projeto,
    },
    url: 'Fca/inativarProjeto'
  };
  this.callAjax(objetoAjax, function(dados) {
    dados.tipo = 'projetoInativado';
    websocket.send(dados);
  });
};

painelBordo.prototype.updateSortables = function(dados) {
  if (dados != null) {
    var valor = dados.valor;
    var addlist;
    if (valor != null) {
      var data = valor.split(':');
      var elements = [];
      if (data[0]) {
        var ids = data[1].split(',');
        for (var i = 0; i < ids.length; i++) {
          elements.push($('.list-wrapper.indicadores[data-id-meta="' + ids[i] + '"]').clone());
        }
        $('#board > .list-wrapper:not(.novoelemento)').remove();
        $.each(elements, function() {
          $(this).insertBefore('.novoelemento');
        });
      }
      if (!this.idmov) {
        this.idmov = data[1];
      }
      if (!this.mover) {
        $('.list-wrapper.indicadores[data-id-meta="' + this.idmov + '"] .list').addClass('movendo');
      }
      if (dados.updated && !this.mover) {
        websocket.send({
          tipo: 'removeBackground',
          idmov: this.idmov
        });
        this.idmov = false;
      }
    }
  }
};

painelBordo.prototype.updateSortable = function(tipo, event, ui) {
  var tipo = (tipo != null) ? tipo : 'erro';
  // Switch de forma mais elegante utilizando objeto literal
  var acoesRepostaWebsocket = {
    'sortstart': function(event, ui) {
      painelBordo.mover = true;
      websocket.send({
        tipo: 'ordenaIndicador',
        valor: ":" + ui.item.data('id-meta')
      });
    },
    'sortupdate': function(event, ui) {
      var id = ($(event.target).hasClass('board')) ? 'board' : ($(event.target).hasClass('lista-cards')) ? ui.item.data('id-meta') : '';
      $('.carregando-move').remove();
      websocket.send({
        tipo: 'ordenaIndicador',
        valor: "#" + id + ":" + $("#" + id).not('.novoelemento').sortable('toArray').join(','),
        updated: true
      });
      this.mover = false;
      var dados = [];
      $('#board > .list-wrapper.indicadores').each(function(key) {
        dados.push({
          id_meta: $(this).data('id-meta'),
          ordem: key
        });
      });
      painelBordo.callAjax({
        tipo: 'json',
        data: {
          dados: dados
        },
        url: 'indicadores/setOrdemMeta'
      });
    },
    'erro': function() {}
  };
  return acoesRepostaWebsocket[tipo](event, ui);
};

painelBordo.prototype.initSortables = function(callback) {
  // Move Quados Completos
  $("#board").sortable({
    item: '.list-wrapper',
    refreshPositions: true,
    dropOnEmpty: true,
    cursor: 'pointer',
    placeholder: "sombra-move",
    forceHelperSize: true,
    forcePlaceholderSize: true,
    scroll: false,
    opacity: 0.7,
    revert: 300,
    delay: 150,
    handle: '.list',
    start: function(e, ui) {
      var elemento = $(ui.helper.children()[0]);
      ui.placeholder.height(elemento.outerHeight());
    }
  });
  callback();
};

painelBordo.prototype.setTemplateCardPopover = function(elemento) {
  this.objetoAjax = {
    tipo: 'html',
    url: 'Templates/opcoesCardPopover'
  }
  this.callAjax(this.objetoAjax, function(dados) {
    $(elemento).popover({
      title: 'Ações do Card',
      content: dados,
      template: painelBordo.htmlTemplatePopover(),
      placement: 'bottom',
      html: true
    });
    $(elemento).popover('show');
  });
};

painelBordo.prototype.stringMoment = function(string) {
  var formatos = ["YYYY", "M", "MM", "D", "DD", "DD-MM-YYYY", "YYYY-MM-DD", "MM-DD-YYYY",
    "YYYY-DD-MM", "MM-YYYY", "YYYY-MM", "DD/MM/YYYY", "YYYY/MM/DD",
    "MM/DD/YYYY", "YYYY/DD/MM", "MM/YYYY", "YYYY/MM",
    "DD-MM-YYYYTHH:mm", "YYYY-MM-DDTHH:mm", "MM-DD-YYYYTHH:mm",
    "YYYY-DD-MMTHH:mm", "MM-YYYYTHH:mm", "YYYY-MMTHH:mm", "ddd, DD MM YYYY HH:mm:ss GMT", "DD/MM/YYYYTHH:mm", "YYYY/MM/DDTHH:mm",
    "MM/DD/YYYYTHH:mm", "YYYY/DD/MMTHH:mm", "MM/YYYYTHH:mm", "YYYY/MMTHH:mm", "HH:mm", "hh:mm:ss", "hh:mm"
  ];
  return moment(string, formatos);
};

painelBordo.prototype.getDates = function() {
  var arrayDatas = [];
  $('.table-timeMachine tr').each(function() {
    arrayDatas.push(this.dataset.machine);
  });
  return arrayDatas;
};

// Verifica se os elementos passados no seletor como parâmetro, foram preenchidos ou selecionados
painelBordo.prototype.verificaCamposObrigatorios = function(e, elementos, parametro = false, showError = false) {
  var valido = true;

  for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].type === 'radio' || elementos[i].type === 'checkbox') {
      var checked;
      if (elementos[i].name) {
        checked = elementos.filter('[name=' + elementos[i].name + ']:checked');
      } else {
        checked = 0;
      }
      checked = checked.length;
      if (checked) {
        $(elementos[i]).closest('.form-group').removeClass('has-danger');
        $(elementos[i]).removeClass('has-danger');
      } else if ($(elementos[i]).type != 'hidden') {
        $(elementos[i]).closest('.form-group').addClass('has-danger');
        $(elementos[i]).addClass('has-danger');
        valido = false;
        e.preventDefault();
      }
    } else {
      if (!$(elementos[i]).not('[type="hidden"]').val() && !$(elementos[i]).hasClass('select2-search__field')) {
        -$(elementos[i]).closest('.form-group').addClass('has-danger');
        $(elementos[i]).addClass('has-danger');
        $(elementos[i]).focus();
        valido = false;
        e.preventDefault();
      } else {
        $(elementos[i]).closest('.form-group').removeClass('has-danger');
        $(elementos[i]).removeClass('has-danger');
        $(elementos[i]).closest('.form-group').addClass('has-success');
        $(elementos[i]).addClass('has-success');
      }
    }
  }
  if (!valido && showError) {
    swal({
      title: "Campo obrigatório não preenchido",
      type: "error",
      timer: 2500,
      showConfirmButton: true
    });
  }
  return valido;
};

painelBordo.prototype.select2AjaxOptions = function(url, id, text, showId, tag = false, iniciais = false, urlOptions = false) {
  if (urlOptions) {
    return {
      ajax: {},
      query: function(options) {
        if (!options.term) {
          $.getJSON(this.baseUrl + urlOptions, function(optionsDefault) {
            options.callback({
              results: optionsDefault
            });
          });
        } else {
          var newOptions = [];
          if (tag) {
            newOptions.push({
              id: options.term,
              text: options.term + ' (Novo)'
            });
          }
          if (options.term && options.term.trim().length >= 3) {
            $.ajax({
              url: this.baseUrl + url,
              type: 'GET',
              dataType: 'JSON',
              data: {
                busca: options.term
              }
            }).done(function(data) {
              $.each(data, function() {
                newOptions.push({
                  id: this[id].trim(),
                  text: this[text].trim()
                });
              });
              options.callback({
                results: newOptions
              });
            });
          } else {
            $.getJSON(this.baseUrl + urlOptions + '/' + options.term, function(result) {
              options.callback({
                results: result
              });
            });
          }
        }
      }
    };
  } else {
    return {
      tags: (tag) ? true : false,
      minimumInputLength: 3,
      delay: 400,
      ajax: {
        url: this.baseUrl + url,
        dataType: 'json',
        data: function(params) {
          return {
            busca: params.term
          };
        },
        processResults: function(data, params) {
          $.each(data, function() {
            this.id = this[id].trim();
            this.text = this[text].trim();
          });
          return {
            results: data
          };
        }
      },
      escapeMarkup: function(markup) {
        return markup;
      },
      templateResult: function(data) {
        var conteudo = '';
        if (data.loading) return 'Pesquisando';
        if (data.hasOwnProperty(id)) {
          if (data.foto) {
            conteudo += '<span class="img-select2"><img src=' + painelBordo.baseUrl + data.foto + ' width="20"/></span>';
          }
          if (data.text) {
            conteudo += '<span>' + data.text + '</span>';
          }
          return conteudo;
        } else {
          return data.loading ? 'Pesquisando...' : (tag && !urlOptions) ? data.text + ' (Novo)' : data.text;
        }
      },
      templateSelection: function(data) {
        var conteudo = '';
        // return showId?(data.id + ' ' + data.text):data.text;
        if (iniciais) {
          conteudo = painelBordo.criaThumbParticipante(data.text, data.id, (data.foto) ? data.foto : false, false, data.super);
        } else {
          if (data.loading) return data.text;
          if (data.foto && iniciais) {
            conteudo += '<span class="img-select2"><img src=' + painelBordo.baseUrl + data.foto + ' width="20"/></span>';
          }
          if (data.text) {
            conteudo += '<span>' + data.text + '</span>';
          }
        }
        return conteudo;
      },
      createSearchChoice: function(term, data) {
        return {
          id: term,
          text: term
        };
      },
    }
  }
};

painelBordo.prototype.setElementosSessao = function() {
  $.getJSON('/leadflow/usuario/getDadosSessao', function(data) {
    $('<input>').attr('type', 'hidden')
      .attr('id', 'usuario-session')
      .val(Crypt.AES.encrypt(data.cd_usuario))
      .appendTo('body');
    $('<input>').attr('type', 'hidden')
      .attr('id', 'pessoa-session')
      .val(Crypt.AES.encrypt(data.cd_pessoa))
      .appendTo('body');
    $('<input>').attr('type', 'hidden')
      .attr('id', 'razao-social-session')
      .val(Crypt.AES.encrypt(data.razao_social))
      .appendTo('body');
  });
};

painelBordo.prototype.getElementosSessao = function() {
  return {
    cd_usuario: Crypt.AES.decrypt($('#usuario-session').val()),
    cd_pessoa: Crypt.AES.decrypt($('#pessoa-session').val()),
    razao_social: Crypt.AES.decrypt($('#razao-social-session').val())
  };
};


painelBordo.prototype.getIndicadorPorId = function(id_indicador) {
  return this.callAjax({
    tipo: 'JSON',
    url: 'indicadores/getIndicadorPorId',
    data: {
      id_indicador: id_indicador
    }
  });
};

painelBordo.prototype.getIndicadorPorIdMeta = function(id_meta) {
  return this.callAjax({
    tipo: 'JSON',
    url: 'indicadores/getIndicadorPorIdMeta/' + id_meta,
  });
};

painelBordo.prototype.setIndicadorGlobal = function(id_painel) {
  $.get('/leadflow/indicadores/getIndicadorGlobal/' + id_painel, function(porcentagem) {
    $('.indicador-global-gota').addClass('before');
    if (porcentagem > 70) {
      $('.indicador-global').height('0%')
        .addClass('verde')
        .addClass('after')
        .height(porcentagem + '%');
      $('.indicador-global-gota').addClass('gota-verde');
    } else if (porcentagem > 30) {
      $('.indicador-global').height('0%')
        .addClass('amarelo')
        .addClass('after')
        .height(porcentagem + '%');
      $('.indicador-global-gota').addClass('gota-amarela');
    } else {
      $('.indicador-global').height('0%').addClass('vermelho')
      if (porcentagem > 0) {
        $('.indicador-global').addClass('after')
          .height(porcentagem + '%');
      }
      $('.indicador-global-gota').addClass('gota-vermelha');
    }
  });
};

painelBordo.prototype.getTemplatesMustache = function() {
  $.getJSON('/leadflow/templates/getTemplatesMustache', function(tmps) {
    $.each(tmps, function(name) {
      if (typeof localStorage.getItem(name) == 'object' || this.filetime != localStorage.getItem(name + '_filetime')) {
        $.get('/leadflow/assets/js/templates/' + this.template + '?t=' + new Date().getTime(), function(template) {
          localStorage.setItem(name, template);
        });
        $.get('/leadflow/templates/getTemplateFileTime/' + this.template, function(filetime) {
          localStorage.setItem(name + '_filetime', filetime);
        });
      }
    });
  });
};

painelBordo.prototype.getNotificacoesParcial = function() {
  var notificacoesList = $('#notificationsBody > ul');
  var from = notificacoesList.data('lowest');
  var limit = 20;
  if (!this.fetchingNotificacao) {
    this.fetchingNotificacao = true;
    $.ajax({
      url: this.baseUrl + 'Notificacoes/getNotificacoesParcial/' + from + '/' + limit,
      method: 'get',
      dataType: 'json'
    }).done(function(result) {
      painelBordo.renderNotificacoes(result);
    });
  }
};

painelBordo.prototype.getCausaRaizParcial = function() {
  var causaRaizList = $('.lista-causaraiz');
  var from = causaRaizList.data('lowest');
  var limit = 10;
  if (!this.fetchingCausa) {
    this.fetchingCausa = true;
    $.ajax({
      url: this.baseUrl + 'CausaRaiz/getCausaRaizParcial/' + from + '/' + limit,
      method: 'get',
      dataType: 'json'
    }).done(function(result) {
      painelBordo.renderCausaRaiz(result);
    });
  }
};

painelBordo.prototype.renderCausaRaiz = function(causaRaizList) {
  var lowest, highest;
  var elemento = $('.lista-causaraiz');
  $.each(causaRaizList, function() {
    lowest = elemento.data('lowest');
    highest = elemento.data('highest');
    if (lowest == '0' || parseInt(this.id_causa) < parseInt(lowest)) {
      elemento.data('lowest', this.id_causa);
    }
    if (highest == '0' || parseInt(this.id_causa) > parseInt(highest)) {
      elemento.data('highest', this.id_causa);
    }
    $(Mustache.render(localStorage.getItem('tmpCausaRaiz'), this)).appendTo(elemento);
  });
  this.fetchingCausa = false;
};


painelBordo.prototype.renderNotificacoes = function(notificacoes, nova = false) {
  var lowest, highest;
  var notificacoesList = $('#notificationsBody > ul');
  $.each(notificacoes, function() {
    lowest = notificacoesList.data('lowest');
    highest = notificacoesList.data('highest');
    if (lowest == '0' || parseInt(this.id) < parseInt(lowest)) {
      notificacoesList.data('lowest', this.id);
    }
    if (highest == '0' || parseInt(this.id) > parseInt(highest)) {
      notificacoesList.data('highest', this.id);
    }
    this.data_notificacao = moment(this.data_notificacao).fromNow();
    switch (this.tipo) {
      case '1':
        this.icone = 'fa fa-flag-checkered';
        break;
      case '2':
        this.icone = 'fa fa-university';
        break;
      case '3':
        this.icone = 'fa fa-cube';
        break;
      case '4':
        this.icone = 'fa fa-thumb-tack';
        break;
      default:
        this.icone = 'fa fa-bell-o';
        break;
    }
    if (nova) {
      $(Mustache.render(localStorage.getItem('tmpNotificacao'), this))
        .prependTo(notificacoesList);
    } else {
      $(Mustache.render(localStorage.getItem('tmpNotificacao'), this))
        .appendTo(notificacoesList);
    }
  });
  this.fetchingNotificacao = false;
  this.getTotalNaoLidas();
};

painelBordo.prototype.calcBall = function() {
  var objCor = {
    azul: $('.fca.circulo-global.circulo-azul').length,
    vermelho: $('.fca.circulo-global.circulo-vermelho').length,
    verde: $('.fca.circulo-global.circulo-verde').length,
    amarelo: $('.fca.circulo-global.circulo-amarelo').length,
    Mazul: $('.fca.circulo-global-metade.circulo-azul').length,
    Mvermelho: $('.fca.circulo-global-metade.circulo-vermelho').length,
    Mverde: $('.fca.circulo-global-metade.circulo-verde').length,
    Mamarelo: $('.fca.circulo-global-metade.circulo-amarelo').length,
  };
  $('.total-circulos td').html(Mustache.render(localStorage.getItem('tmpTotalBolas'), objCor));
};

painelBordo.prototype.metasParcial = function(params) {
  $.when(
    $.ajax({
      url: painelBordo.baseUrl + 'Modelo/MetasParcial/' + params,
      method: 'GET',
      dataType: 'HTML'
    }).done(function(result) {
      result = $('<div/>').html(result).text();
      painelBordo.renderPaineis(result, false, params);
    })
  ).then(function() {
    $('.conteudo-modelo').waitMe('hide');
  });
}

painelBordo.prototype.appendPaineis = function(paineis, callback) {
  var app = $(paineis).each(function(key, element) {
    $('#tabela-global table').append(element);
  }.bind(this));
  if(typeof callback == 'function') {
    callback(app);
  }
};

painelBordo.prototype.renderPaineis = function(paineis, nova = false, calc = false) {
  var lowest, highest;
  if (paineis.length) {
    this.appendPaineis(paineis, function(app) {
      this.relModelo.geraGraficoPorPainel(app, function() {
        var elemento = $(app);
        var totalElementosResult = $(app).length;
        var totalItemBusca = 4;
        if (totalElementosResult > 0) {
          var from = $('#tabela-global table').find('tbody:last').data('idpainel');
          var limit = 1;
          var params = window.location.pathname.split('/').pop();
          if (params == 'visualizacao') {
            params = 'visualizacao/' + from + '/' + limit;
          } else {
            params = 'modelo/' + from + '/' + limit;
          }
          this.metasParcial(params);
        } else {
          this.calcBall();
          $('#tabela-global table tfoot').removeClass('hidden');
        }
      }.bind(this));
    }.bind(this));
  } else {
    this.calcBall();
    $('#tabela-global table tfoot').removeClass('hidden');
  }
};

painelBordo.prototype.getDtCompetencia = function(card) {
  var periodicidade = card.closest('.list-wrapper').data('periodicidade');
  var data = card.find('.card-text:first').text().trim();
  switch (periodicidade) {
    //Anual
    case 1:
      dataCompetencia = moment(data, 'YYYY').endOf('year').format('DD/MM/YYYY');
      break;
      //Semestral
    case 2:
      var ano = data.slice(-4);
      var mes = (data[0] == 1) ? '06' : '12';
      dataCompetencia = moment(mes + '/' + ano, 'MM/YYYY').endOf('month').format('DD/MM/YYYY');
      break;
      //Mensal
    case 3:
      var ano = data.slice(0, 4);
      var mes = moment(data.slice(7), 'MMMM').format('MM');
      dataCompetencia = moment(mes + '/' + ano, 'MM/YYYY').endOf('month').format('DD/MM/YYYY');
      break;
      //Quinzenal
    case 4:
      data = data.split(' ');
      var quinzena = data[0].slice(0, 1);
      var ano = data[5];
      var mes = moment(data[3], 'MMMM').format('MM');
      var dia = (quinzena == '1') ? '14' : moment(mes + '/' + ano, 'MM/YYYY').endOf('month').format('DD');
      dataCompetencia = dia + '/' + mes + '/' + ano;
      break;
      //Semanal
    case 5:
      data = data.split(' ');
      var semana = data[0].slice(0, 1);
      var ano = data[5];
      var mes = moment(data[3], 'MMMM').format('MM');
      var dia;
      if (semana == 1) {
        dia = '07';
      } else if (semana == 2) {
        dia = '14';
      } else if (semana == 3) {
        dia = '21';
      } else {
        dia = moment(mes + '/' + ano, 'MM/YYYY').endOf('month').format('DD');
      }
      dataCompetencia = dia + '/' + mes + '/' + ano;
      break;
      //Diário
    case 6:
      dataCompetencia = data.slice(0, 10);
      break;
    default:
      dataCompetencia = moment().format('DD/MM/YYYY');
      break;
  }
  return dataCompetencia;
};

painelBordo.prototype.descompartilhaIndicador = function(id_painel, id_indicador) {
  this.callAjax({
    tipo: 'JSON',
    url: 'indicadores/desompartilharIndicador',
    data: {
      id_indicador: id_indicador,
      id_painel: id_painel
    }
  });
};

painelBordo.prototype.graficoPorPeriodo = function() {
  $('#board .list-wrapper.indicadores').each(function(indice, indicador) {
    var periodo = $(indicador).find('.card');
    periodo.each(function(indice, elemento) {
      $(elemento).waitMe({
        effect: 'win8',
        text: '',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: '30'
      });
      var parametro = $(elemento).find(".bar-colours-1").html().split(',');
      if (parametro != undefined) {
        var totalTd = periodo.length;
        $(elemento).find('span.concluidas').text('Concluidas: ' + parametro[0]);
        $(elemento).find('span.vencidas').text('Vencidas: ' + parametro[1]);
        $(elemento).find('span.naoconcluidas').text('Não Concluidas: ' + parametro[2]);
        parametro = parametro.filter(function(e) {
          return e > 0
        });
        if (parametro.length) {
          $(elemento).find(".bar-colours-1")
            .peity("bar", {
              width: '40%',
              height: '36px',
              fill: ["#5cb85c", "#d9534f", "#f0ad4e"]
            });
        } else {
          $(elemento).find(".bar-colours-1").html('-');
        }
        setTimeout(function() {
          $(elemento).waitMe('hide');
        }, 300);
      }
    }.bind(this));
  }.bind(this));
};

painelBordo.prototype.getDadosRelAcoes = function(obj, callback) {
  $.ajax({
    url: '/leadflow/Modelo/relAcoes',
    data: obj,
    dataType: 'JSON',
    type: 'POST',
  }).done(function(dados) {
    callback(dados);
  });
};

painelBordo.prototype.graficoGeral = function() {
  var expReg = /\d+/;
  var id = window.location.pathname;
  var id_painel = id.match(expReg)[0];
  $('.ct-chart').waitMe({
    effect: 'win8',
    text: '',
    bg: 'rgba(255,255,255,0.7)',
    color: '#000',
    maxSize: '30'
  });
  $.ajax({
    url: '/leadflow/Modelo/relAcoesGeralPorPainel',
    dataType: 'JSON',
    type: 'POST',
    data: {
      id_painel: id_painel
    }
  }).done(function(dados) {
    var series = [];
    $.each(dados, function(key, value) {
      series.push(value);
    });
    var parametro = {
      series: series
    };
    var chart = new Chartist.Bar('.ct-chart', parametro, {
      height: '180px',
      distributeSeries: true
    });
    chart.on('created', function() {
      setTimeout(function() {
        $('.rel-total .total').text(dados.total);
        $('.rel-total .concluidas').text(dados.concluidas);
        $('.rel-total .vencidas').text(dados.vencidas);
        $('.rel-total .naoconcluidas').text(dados.naoconcluidas);
        $('.ct-chart').waitMe('hide');
      }, 200);
    });
  });
};

painelBordo.prototype.triggerCards = function() {
  $('.card').click(function() {
    if ($('.ui-sortable-helper').length == 0) {
      $('#modalCard').modal('show');
    }
  });
}

painelBordo.prototype.getParticipantesPorIdFca = function(id_fca, callback) {
  $.ajax({
    url: this.baseUrl + 'Fca/getParticipantesPorIdFca/',
    method: 'POST',
    dataType: 'JSON',
    data: {
      idfca: id_fca
    }
  }).done(function(participantes) {
    callback(participantes);
  });
}

String.prototype.getInitials = function() {
  if (typeof this != "undefined") {
    var names = this.toString().split(' ');
    var first = names[0].slice(0, 1);
    var second;
    if (names.length > 1) {
      second = names.pop().slice(0, 1);
    } else {
      first = names[0].slice(0, 1);
      second = names[0].slice(1, 2);
    }
    return first.trim().capitalize() + second.trim().capitalize();
  } else {
    return false;
  }
};

String.prototype.capitalize = function() {
  return this.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
  });
};

Array.prototype.allValuesSame = function() {
  for (var i = 1; i < this.length; i++) {
    if (this[i] > 0) return false;
  }
  return true;
};

function filaGestor() {}

filaGestor.prototype.modalGestor = function() {
  var elemento = $('#modalCard');
  var args = arguments[0];
  var callback = arguments[1];
  objetoAjax = {
    tipo: 'html',
    data: args,
    url: 'Filagestor/modalAcao'
  };
  painelBordo.callAjax(objetoAjax).done(function(dados) {
    $(Mustache.render(localStorage.getItem('tmpModal'), args))
      .setAtributtes(args)
      .find('.modal-body')
      .html(dados)
      .end()
      .appendTo('body')
      .modal('show');
  }.bind(this));
}

var painelBordo = new painelBordo();