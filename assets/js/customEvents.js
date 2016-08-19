worker.addEventListener('message', function(e) {
  var dados = e.data;
  switch (dados.tipo) {

    case 'newCausa':

      var elemento1 = $('.lista-causaraiz');
      if($('.dica-causaraiz').length && !$('.btn.causa-raiz').hasClass('hidden')) {
        $('.btn.causa-raiz').addClass('hidden');
      } else {
        $('.btn.causa-raiz').removeClass('hidden');
      }

      var elemento2 = $('#lista-projetos');
      if(elemento2.length) {
        $('.dica-causaraiz').addClass('hidden');
        $.each(dados.causa, function(key) {
          painelBordo.getParticipantesPorIdFca(this.id_fca, function(participantes) {
            $.each(participantes, function() {
              if(cd_usuario_session == this.cd_usuario) {
                notificacao.setNotificacao('Nova Causa', {
                  conteudo: 'Projeto '+ dados.projeto[key].desc_projeto.trim() + ' adicionado por '+ dados.projeto[key].responsavel+ ' em '+ moment().format('DD/MM/YYYY HH:mm'),
                  tag: dados.projeto[key].id_projeto
                });
              }
            });
          });
        });
        for(var i = 0; i < dados.projeto.length; i++) {
          dados.projeto[i].icon = dados.causa[i].icon;
          $(Mustache.render(localStorage.getItem('tmpProjeto'), dados.projeto[i])).appendTo(elemento2);
        }
      }
      break;

    case 'newDimensao':

      var elemento = $('ul.lista-dimensao');
      // notificacao.setNotificacao('Nova Dimensão', {
      //   conteudo: 'Dimensão '+ dados.desc_dimensao + ' adicionada em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_dimensao
      // });
      if(elemento.length) {
        $(Mustache.render(localStorage.getItem('tmpDimensao'), dados)).appendTo(elemento);
      }
      break;

    // case 'removeIdeia':
    //   break;

    case 'progressoProjeto':

      // notificacao.setNotificacao('Progresso', {
      //   conteudo: 'Projeto '+ dados.projeto.trim() + ' '+ dados.progresso+' completo em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.progresso
      // });
      break;

    case 'progressoAcao':

      // notificacao.setNotificacao('Ação', {
      //   conteudo: 'Ação '+ dados.acao + ' concluida em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.acao
      // });
      break;

    case 'atualizaAcao':

      var acao = dados.acao;
      var elemento = $('ul.lista-acoes[data-projeto="'+acao.id_projeto+'"] li[data-acao="'+acao.id_acao+'"]');
      // notificacao.setNotificacao('Ação Atualizada', {
      //   conteudo: 'Ação '+ acao.desc_acao + ' atualiza em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: acao.id_acao
      // });
      if(elemento.length) {
        acao.atualiza = true;
        $(elemento).html($(Mustache.render(localStorage.getItem('tmpAcao'), acao)));
        if(dados.dt_limite) {
          $('[data-projeto="'+acao.id_projeto+'"]').find('.informacao-projeto').removeClass('hidden').end().find('.card-detalhes-badge.click.dtvigencia:first span').html(' '+dados.dt_limite);
        }
      }
      break;

    case 'newAcao':
      var acao = dados.acao;
      var elemento = $('ul.lista-acoes[data-projeto="'+acao.id_projeto+'"]');
      // notificacao.setNotificacao('Nova Ação', {
      //   conteudo: 'Ação '+ acao.desc_acao + ' adicionada em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: acao.id_acao
      // });
      if(elemento.length) {
        $(Mustache.render(localStorage.getItem('tmpAcao'), acao)).appendTo(elemento);
        if(dados.dt_limite) {
          $('[data-projeto="'+acao.id_projeto+'"]').find('.informacao-projeto').removeClass('hidden').end().find('span.card-detalhes-badge.click.dtvigencia:first').html('<i class="fa fa-calendar"></i> '+dados.dt_limite);
        }
        painelBordo.triggerProgresso($('ul[data-projeto="'+acao.id_projeto+'"] li:last-child'), acao.id_projeto, acao.id_acao, false);
      }
      break;

    case 'newPainel':

      var elemento;
      var titulo;
      var mensagem;
      if(dados.reativado) {
        titulo = 'Painel Reativado';
        mensagem = 'reativado';
      } else {
        titulo = 'Novo Painel';
        mensagem = 'adicionado';
      }
      if(dados.parametro == 'favorito') {
        elemento = $('ul.lista-paineis-favoritos');
      } else {
        elemento = $('ul.lista-paineis');
      }
      if(cd_usuario_session == dados.cd_usuario || cd_usuario_session == dados.cd_usuario_session || usuario_super) {
        // notificacao.setNotificacao('Novo Painel', {
        //   conteudo: titulo+' '+ dados.desc_painel + ' '+ mensagem +' por '+ dados.responsavel+ ' em '+ moment().format('DD/MM/YYYY HH:mm'),
        //   tag: dados.id_painel
        // });
        if(elemento.length) {
          if(!dados.favorito || dados.favorito == 'f') {
            dados.favorito = '';
          }
          $(Mustache.render(localStorage.getItem('tmpPainel'), dados)).appendTo(elemento);
        }
        $('#listpaineisArquivados .card[data-painel="'+dados.id_painel+'"]').fadeOut(300, function() {
          $(this).remove();
        });

        if($('.painel.meus-paineis ul li').length == 0) {
          $('.painel.meus-paineis div:first').remove();
        }
        if($('.painel.categoria-favorito div:first:hidden').length) {
          $('.painel.meus-paineis div:first:hidden').removeClass('hidden');
        }

        if($('.painel.categoria-favorito ul li').length == 0) {
          $('.painel.categoria-favorito div:first').remove();
        } else if($('.painel.categoria-favorito div:first:hidden').length) {
          $('.painel.categoria-favorito div:first:hidden').removeClass('hidden');
        }
      }
      break;

    case 'atualizaPainel':

      var elemento;
      if(dados.favorito == 'f') {
        dados.favorito = '';
        elemento = $('ul.lista-paineis');
      } else {
        elemento = $('ul.lista-paineis-favoritos');
      }
      // notificacao.setNotificacao('Painel Atualizado', {
      //   conteudo: 'Painel '+ dados.desc_painel + ' atualizado por '+ dados.responsavel + ' em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_painel
      // });
      if(elemento.length) {
        elemento.find('[data-id="'+dados.id_painel+'"]').remove();
        var template = $(Mustache.render(localStorage.getItem('tmpPainel'), dados));
        if(!dados.parametro || dados.parametro == '') {
          template.appendTo(elemento);
        } else {
          template.insertBefore(elemento.find('li[data-id="'+dados.parametro+'"]'));
        }
      }
      break;

    case 'favoritaPainel':
        if(dados.acao == 'favoritado') {
          dados.favorito = 't';
          // notificacao.setNotificacao('Novo Indicador', {
          //   conteudo: 'Painel '+ dados.desc_painel + ' favoritado em '+ moment().format('DD/MM/YYYY HH:mm'),
          //   tag: dados.id_indicador
          // });
          $('.meus-paineis .lista-paineis li[data-id="'+dados.id_painel+'"]').fadeOut(500, function() {
            $(this).remove();
            if(!$('.painel.categoria-favorito li.paineis').length) {
              $('.painel.categoria-favorito').addClass('hidden');
            }
          });
          $('.painel.categoria-favorito').removeClass('hidden');
          $('.painel.categoria-favorito .row').removeClass('hidden');
          $(Mustache.render(localStorage.getItem('tmpPainel'), dados)).hide()
            .appendTo('.painel.categoria-favorito ul')
            .fadeIn(700);
        } else if(dados.acao == 'meuspaineis') {
          dados.favorito = '';
          // notificacao.setNotificacao('Novo Indicador', {
          //   conteudo: 'Painel '+ dados.desc_painel + ' retirado dos favoritos em '+ moment().format('DD/MM/YYYY HH:mm'),
          //   tag: dados.id_indicador
          // });
          $(Mustache.render(localStorage.getItem('tmpPainel'), dados)).hide()
            .appendTo('.painel.meus-paineis ul').fadeIn(700);
          $('.categoria-favorito .lista-paineis-favoritos li[data-id="'+dados.id_painel+'"]').fadeOut(500, function() {
            $(this).remove();
            if(!$('.painel.categoria-favorito li.paineis').length) {
              $('.painel.categoria-favorito').addClass('hidden');
            }
          });
        }
      break;

    case 'newIndicador':
      var elemento = $('#board[data-painel="'+dados.id_painel+'"] div.novoelemento');
      if(elemento.length && (cd_usuario_session == dados.cd_usuario)) {
        var ciclo = { 1: 'Anual', 2: 'Semestral', 3: 'Mensal', 4: 'Quinzenal', 5: 'Semanal', 6: 'Diário' };
        var tipoIndicador = { A: 'Acumulado', P: 'Percentual', M: 'Média' };
        dados.login = dados.login.toUpperCase();
        dados.loginPequeno = dados.login.substring(0, 2);
        dados.ciclo = ciclo[dados.periodicidade];
        dados.tipoIndicador = tipoIndicador[dados.tipo_indicador];
        if(dados.parametro == 'novo') {
          // notificacao.setNotificacao('Novo Indicador', {
          //   conteudo: 'Indicador '+ dados.desc_indicador + ' adicionado em '+ moment().format('DD/MM/YYYY HH:mm'),
          //   tag: dados.id_indicador
          // });
        } else {
          // notificacao.setNotificacao('Indicador Reativado', {
          //   conteudo: 'Indicador '+ dados.desc_indicador + ' reativado em '+ moment().format('DD/MM/YYYY HH:mm'),
          //   tag: dados.id_indicador
          // });
          $('#indicadores-arquivados .card[data-meta="'+dados.id_meta+'"]').fadeOut(300, function() {
            $(this).remove();
          });
        }
        $(Mustache.render(localStorage.getItem('tmpIndicador'), dados)).insertBefore(elemento);
        var cardMeta = $('.list.indicadores[data-id-meta="' + dados.id_meta  + '"]');
        $.get('/leadflow/indicadores/getTotalValoresPorIdMeta/' + dados.id_meta, function(total) {
          cardMeta.find('span.badge-cards').text(total);
        });
        $.get('/leadflow/indicadores/getValoresAjax/' + dados.id_meta + '/' + cd_usuario_session, function(template) {
          var listaValores = cardMeta.find('.lista-cards');
          listaValores.empty();
          listaValores.append(template);
        });
        $.get('/leadflow/indicadores/getTotalFcaPorIdMeta/' + dados.id_meta, function(total) {
          cardMeta.find('.total-fca')
            .attr('data-original-title', total)
            .text(total);
          cardMeta.find('.total-fca').tooltip();
        });
      }
      break;

    case 'newIndicadorComp':

      console.log(dados);
      for (var i = 0; i < dados.paineisComp.length; i++) {
        var elemento = $('#board[data-painel="'+dados.paineisComp[i]+'"] div.novoelemento');
        if(elemento.length && (cd_usuario_session == dados.cd_usuario)) {
          var ciclo = { 1: 'Anual', 2: 'Semestral', 3: 'Mensal', 4: 'Quinzenal', 5: 'Semanal', 6: 'Diário' };
          var tipoIndicador = { A: 'Acumulado', P: 'Percentual', M: 'Média' };
          dados.login = dados.login.toUpperCase();
          dados.loginPequeno = dados.login.substring(0, 2);
          dados.ciclo = ciclo[dados.periodicidade];
          dados.tipoIndicador = tipoIndicador[dados.tipo_indicador];
          if(dados.parametro == 'novo') {
            // notificacao.setNotificacao('Novo Indicador', {
            //   conteudo: 'Indicador '+ dados.desc_indicador + ' adicionado em '+ moment().format('DD/MM/YYYY HH:mm'),
            //   tag: dados.id_indicador
            // });
          } else {
            // notificacao.setNotificacao('Indicador Reativado', {
            //   conteudo: 'Indicador '+ dados.desc_indicador + ' reativado em '+ moment().format('DD/MM/YYYY HH:mm'),
            //   tag: dados.id_indicador
            // });
            $('#indicadores-arquivados .card[data-meta="'+dados.id_meta+'"]').fadeOut(300, function() {
              $(this).remove();
            });
          }
          $(Mustache.render(localStorage.getItem('tmpIndicador'), dados)).insertBefore(elemento);
          var cardMeta = $('.list.indicadores[data-id-meta="' + dados.id_meta  + '"]');
          $.get('/leadflow/indicadores/getTotalValoresPorIdMeta/' + dados.id_meta, function(total) {
            cardMeta.find('span.badge-cards').text(total);
          });
          $.get('/leadflow/indicadores/getValoresAjax/' + dados.id_meta + '/' + cd_usuario_session, function(template) {
            var listaValores = cardMeta.find('.lista-cards');
            listaValores.empty();
            listaValores.append(template);
          });
          $.get('/leadflow/indicadores/getTotalFcaPorIdMeta/' + dados.id_meta, function(total) {
            cardMeta.find('.total-fca')
              .attr('data-original-title', total)
              .text(total);
            cardMeta.find('.total-fca').tooltip();
          });
        }
      }
      break;

    case 'atualizaIndicador':
      $('.list-wrapper.indicadores[data-id-meta="'+dados.id_meta+'"]').remove();
      var elemento = $('#board[data-painel="'+dados.id_painel+'"] div.novoelemento');
      if(elemento.length && (cd_usuario_session == dados.cd_usuario)) {
        var ciclo = { 1: 'Anual', 2: 'Semestral', 3: 'Mensal', 4: 'Quinzenal', 5: 'Semanal', 6: 'Diário' };
        var tipoIndicador = { A: 'Acumulado', P: 'Percentual', M: 'Média' };
        dados.login = dados.login.toUpperCase();
        dados.loginPequeno = dados.login.substring(0, 2);
        dados.ciclo = ciclo[dados.periodicidade];
        dados.tipoIndicador = tipoIndicador[dados.tipo_indicador];
        $(Mustache.render(localStorage.getItem('tmpIndicador'), dados)).insertBefore(elemento);
        var cardMeta = $('.list.indicadores[data-id-meta="' + dados.id_meta  + '"]');
        $.get('/leadflow/indicadores/getTotalValoresPorIdMeta/' + dados.id_meta, function(total) {
          cardMeta.find('span.badge-cards').text(total);
        });
        $.get('/leadflow/indicadores/getValoresAjax/' + dados.id_meta + '/' + cd_usuario_session, function(template) {
          var listaValores = cardMeta.find('.lista-cards');
          listaValores.empty();
          listaValores.append(template);
        });
        $.get('/leadflow/indicadores/getTotalFcaPorIdMeta/' + dados.id_meta, function(total) {
          cardMeta.find('.total-fca')
            .attr('data-original-title', total)
            .text(total);
          cardMeta.find('.total-fca').tooltip();
        });
      }

      break;

    case 'newValores':

      $.get('/leadflow/indicadores/getTotalValoresPorIdMeta/' + dados.id_meta, function(total) {
        $('.lanc-valor[data-meta="' + dados.id_meta + '"] > span.badge-cards').text(total);
      });
      $.get('/leadflow/indicadores/getValoresAjax/' + dados.id_meta + '/' + cd_usuario_session, function(template) {
        var listaValores = $('.list.indicadores[data-id-meta="' + dados.id_meta  + '"] .lista-cards');
        listaValores.empty();
        listaValores.append(template);
      });
      break;

    case 'indicadorInativado':

      // notificacao.setNotificacao('Indicador Inativado', {
      //   conteudo: 'Indicador '+ dados.desc_indicador + ' inativado em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_indicador
      // });

      $('.list-wrapper[data-id-meta="'+dados.id_meta+'"]').fadeOut(500, function() {
        $(this).remove();
      });
      var elemento = $('#indicadores-arquivados');
      if(elemento.length) {
        var ciclos = [];
        ciclos[1] = 'Anual';
        ciclos[2] = 'Semestral';
        ciclos[3] = 'Mensal';
        ciclos[4] = 'Quinzenal';
        ciclos[5] = 'Semanal';
        ciclos[6] = 'Diário';
        dados.desc_indicador = dados.desc_indicador + ' - ' + ciclos[dados.periodicidade];
        $(Mustache.render(localStorage.getItem('tmpIndicadorArquivado'), dados)).appendTo(elemento);
      }
      break;

    case 'newIdeia':

      var elemento = $('.lista-oxigenio[data-id-meta="'+ dados.id_meta +'"] .lista-cards');
      var lista = elemento.closest('.list-wrapper');
      // notificacao.setNotificacao('Nova Ideia', {
      //   conteudo: 'Ideia '+ dados.desc_o2 + ' adicionada em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_o2
      // });
      if(elemento.length) {
        dados.id = dados.desc_o2.replace(/ /g,'') + 'b';
        $(Mustache.render(localStorage.getItem('tmpIdeia'), dados)).appendTo(elemento);
      }
      var contador = parseInt(elemento.find('.card').length) -1;
      lista.find('.contador-ideia').html(contador);
      break;

    case 'painelInativado':

      // notificacao.setNotificacao('Painel Inativado', {
      //   conteudo: 'Painel '+ dados.desc_painel + ' inativado em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_painel
      // });
      $('.paineis[data-id="'+dados.id_painel+'"]').fadeOut(500, function() {
        $(this).remove();
        if($('.painel.meus-paineis ul li').length == 0) {
          $('.painel.meus-paineis div:first').remove();
        } else if($('.painel.categoria-favorito div:first:hidden').length) {
          $('.painel.meus-paineis div:first:hidden').removeClass('hidden');
        }

        if($('.painel.categoria-favorito ul li').length == 0) {
          $('.painel.categoria-favorito div:first').addClass('hidden');
        } else if($('.painel.categoria-favorito div:first:hidden').length) {
          $('.painel.categoria-favorito div:first:hidden').removeClass('hidden');
        }
      });
      var elemento = $('#listpaineisArquivados');
      if(elemento.length) {
        $(Mustache.render(localStorage.getItem('tmpPainelArquivado'), dados)).appendTo(elemento);
      }
      break;

    case 'atualizarFoto':

      // notificacao.setNotificacao('Foto Atualizada', {
      //   conteudo: dados.razao_social + ' atualizou sua foto de perfil em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.cd_pessoa
      // });
      if(dados.cd_pessoa == document.getElementById('pessoa-session').value) {
        $.ajax({
          url: '/leadflow/usuario/checarAlteracaoImagem',
          method: 'POST',
          dataType: 'json',
          data: { foto: dados.foto }
        }).done(function(result) {
          if(result) {
            $('.imagem-usuario-info > img').attr('src', painelBordo.baseUrl + dados.foto);
            $('.usuario-img > img').attr('src', painelBordo.baseUrl + dados.foto);
          }
        });
      }
      break;

    case 'newArquivo':

      var elemento = $('#modalCard[data-idfca="'+dados.id_fca+'"]').find(dados.elemento);
      dados.datahref = baseUrl + dados.path;
      dados.textolimitado = painelBordo.limitaCaracter(dados.desc_arquivo, 22).trim();
      if(elemento.length) {
        // notificacao.setNotificacao('Novo Anexo', {
        //   conteudo: 'Anexo '+ dados.desc_arquivo + ' adicionado em '+ moment().format('DD/MM/YYYY HH:mm'),
        //   tag: dados.desc_arquivo
        // });
        var tipo = dados.desc_arquivo.split('.').pop().toLowerCase();
        if((tipo in painelBordo.extensoesPermitidas())) {
          var extensao = ['jpg', 'png', 'gif', 'jpeg'];
          if($.inArray(tipo, extensao) != -1) {
            elemento.append($(Mustache.render(localStorage.getItem('tmpArquivos'), dados)).find('.anexo-thumbnail-preview').css('background-image', 'url("'+baseUrl + dados.path+'")').end(), null);
          } else {
            elemento.append($(Mustache.render(localStorage.getItem('tmpArquivos'), dados)).find('.anexo-thumbnail-preview').addClass(painelBordo.extensoesPermitidas()[tipo]).end(), null);
          }
        } else {
          elemento.append($(Mustache.render(localStorage.getItem('tmpArquivos'), dados)).find('.anexo-thumbnail-preview').addClass('fa-file-o').end(), null);
        }
        if(dados.elemento == '.listanexo-fca') {
          var countfcaanexo = $('.listanexo-fca').siblings('.modulo-title').find('.count-anexo-fca');
          $('.modulo').removeClass('hide');
          countfcaanexo.html(parseInt(countfcaanexo.text())+1);
        } else {
          $('div.projetos[data-projeto="'+dados.id_projeto+'"]').find('.anexos span .label').html(parseInt($('.anexos span .label').text())+1);
        }
        $(".fancybox").fancybox({
          openEffect  : 'elastic',
          closeEffect : 'elastic',
          helpers : {
            title : {
              type : 'inside'
            }
          },
          type: 'iframe',
          scrolling : 'auto',
          preload   : true,
          autoSize: true,
          href : $(this).data('href')
        });
      }
      break;

    case 'excluiAnexo':

      var elemento;
      if(dados.parametro == 'fca') {
        elemento = $('.count-anexo-fca');
      }
      // notificacao.setNotificacao('Anexo Excluido', {
      //   conteudo: 'O anexo '+ dados.desc_arquivo + ' adicionado em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.desc_arquivo
      // });
      if(dados.parametro == 'fca') {
        $(elemento).html(parseInt($(elemento).text())-1);
        if(parseInt($(elemento).text()) == 0) {
          $('.modulo').addClass('hide');
        }
      } else {
        $('[data-path="'+dados.path+'"]').closest('.panel-collapse').siblings('.panel-heading').find('.anexos span .label').html(parseInt($('.anexos span .label').text())-1);
      }
      $('[data-path="'+dados.path+'"]').fadeOut(500, function() {
        $(this).remove();
      });
      break;

    case 'removeParticipante':
      $('.popover .icons-popover-membro[data-usuario="'+dados.cd_usuario+'"]').fadeOut(500, function() {
        $(this).remove();
        $('.popover').popover('dispose');
      });

      $('.tab-pane .icons-popover-membro[data-usuario="'+dados.cd_usuario+'"]').fadeOut(500, function() {
        $(this).remove();
        $('.popover').popover('dispose');
      });
      break;

    case 'addParticipante':

      if($('.tab-pane .list-participantes [data-usuario="'+dados.cd_usuario+'"]').length == 0) {
        console.log(dados);
        $('.tab-pane .list-participantes').append(painelBordo.criaThumbParticipante(dados.pesq, dados.cd_usuario, dados.id_fca, dados.foto, false, dados.super));
      }

      break;

    case 'newPatern':

      // notificacao.setNotificacao('Novo Patern', {
      //   conteudo: 'Patern '+ dados.desc_arquivo + ' adicionado em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.desc_arquivo
      // });
      dados.src = baseUrl + dados.path;
      $(Mustache.render(localStorage.getItem('tmpPatern'), dados))
                .insertBefore('label.select-background');
      break;

    case 'arquivarFca':

      $('.lista-fcas[data-idfca="' + dados.id_fca + '"]').fadeOut(500, function() {
        $(this).remove();
        painelBordo.getParticipantesPorIdFca(dados.id_fca, function(participantes) {
          $.each(participantes, function() {
            if(cd_usuario_session == this.cd_usuario) {
              notificacao.setNotificacao('FCA Inativado', {
                conteudo: 'O FCA '+ dados.desc_fca + '  foi inativado em '+ moment().format('DD/MM/YYYY HH:mm'),
                tag: dados.id_fca
              });
            }
          });
        });
      });

      break;

    case 'ordenaIndicador':

      painelBordo.updateSortables(dados);

      break;

    case 'removeBackground':

      $('#'+dados.idmov + ' .list').removeClass('movendo');

      break;

    case 'novaMeta':

      $.getJSON(painelBordo.baseUrl + 'Indicadores/getIndicadorPorIdMeta/' + dados.id_meta, function(indicador) {
        if(indicador.cd_usuario == $('#usuario-session').val()) {
          var elemento = $('#board[data-painel="' + indicador.id_painel + '"] div.novoelemento');
          indicador.login = indicador.login.toUpperCase();
          indicador.loginPequeno = indicador.login.substring(0, 2);
          $(Mustache.render(localStorage.getItem('tmpIndicador'), indicador)).insertBefore(elemento);
          $.get('/leadflow/indicadores/getTotalValoresPorIdMeta/' + dados.id_meta, function(total) {
            $('.lanc-valor[data-meta="' + dados.id_meta + '"] > span.badge-cards').text(total);
          });
          $.get('/leadflow/indicadores/getTotalFcaPorIdMeta/' + dados.id_meta, function(total) {
            var cardMeta = $('.indicadores[data-id-meta="' + dados.id_meta + '"] .total-fca');
            cardMeta.attr('data-original-title', total)
                    .text(total);
            cardMeta.tooltip();
          });
        }
      });

      break;

    case 'excluiPatern':

      $('.select-background [data-path="'+dados.path+'"]').closest('.select-background').fadeOut(500, function() {
        $(this).remove();
      });

      break;

    case 'alterTpIndicador':

      var result = '';
      if(dados.tipo_indicador == 'A') {
        result = 'Acumulado';
      } else if(dados.tipo_indicador == 'P') {
        result = 'Percentual';
      } else {
        result = 'Média';
      }
      $('.list-wrapper.indicadores[data-id-indicador="'+dados.id_indicador+'"]').find('.tp-indicador').text(result);

      break;

    case 'setAcaoProjeto':

      $('.lista-acoes li[data-acao="'+dados.id_acao+'"]').fadeOut(500, function() {
        $(this).remove();
        var elemento2 = $('#lista-projetos');
        if(elemento2.length) {
          $('.dica-causaraiz').addClass('hidden');
            // notificacao.setNotificacao('Novo Projeto', {
            //   conteudo: 'Projeto '+ dados.desc_projeto.trim() + ' adicionada por '+ dados.responsavel+ ' em '+ moment().format('DD/MM/YYYY HH:mm'),
            //   tag: dados.id_projeto
            // });
            $(Mustache.render(localStorage.getItem('tmpProjeto'), dados)).appendTo(elemento2);
              $('#modalCard').animate({
                scrollTop: $('#modalCard')[0].scrollHeight
              }, 700);
        }
      });

      break;

    case 'projetoAtivado':
      $('#modalProjetosInativos .card[data-idprojeto="'+dados.id_projeto+'"]').fadeOut(500, function() {
        $(this).remove();
      });
      var elemento2 = $('#lista-projetos');
      if(elemento2.length) {
        $('.dica-causaraiz').addClass('hidden');
        // notificacao.setNotificacao('Novo Projeto', {
        //   conteudo: 'Projeto '+ dados.desc_projeto.trim() + ' reativado por '+ dados.responsavel+ ' em '+ moment().format('DD/MM/YYYY HH:mm'),
        //   tag: dados.id_projeto
        // });
        $(Mustache.render(localStorage.getItem('tmpProjeto'), dados)).appendTo(elemento2);
          $('#modalCard').animate({
            scrollTop: $('#modalCard')[0].scrollHeight
          }, 700);
      }

      break;

    case 'acaoAtivada':

      var elemento = $('ul.lista-acoes[data-projeto="'+dados.id_projeto+'"]');
      // notificacao.setNotificacao('Nova Ação', {
      //   conteudo: 'Ação '+ dados.desc_acao + ' reativada em '+ moment().format('DD/MM/YYYY HH:mm'),
      //   tag: dados.id_acao
      // });
      if(elemento.length) {
        $(Mustache.render(localStorage.getItem('tmpAcao'), dados)).appendTo(elemento);
        painelBordo.triggerProgresso($('ul[data-projeto="'+ dados.id_projeto +'"] li:last-child'), dados.id_projeto, dados.id_acao, false);
      }

      break;

    case 'projetoInativado':

      var elemento = $('#lista-projetos div.panel[data-projeto="'+dados.id_projeto+'"]');
      if(elemento.length) {
        elemento.fadeOut(500, function() {
          $(this).remove();
        });
      }

      break;

    case 'acaoInativada':

      var elemento = $('.lista-acoes li[data-acao="'+ dados.id_acao +'"]');
      if(elemento.length) {
        elemento.fadeOut(500, function() {
          $(this).remove();
        });
      }

      break;

    case 'novaNotificacao':

      var data = (typeof dados.data.length == 'undefined') ? [dados.data] : dados.data;
      painelBordo.renderNotificacoes(data, true);

      break;

    case 'descompartilhaIndicador':

        $('.list-wrapper[data-id-indicador="'+dados.id_indicador+'"]').fadeOut(500, function() {
          $(this).remove();
        });

      break;
  };
}, false);