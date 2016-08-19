{{#id_painel}}
  <li class="paineis col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-4 {{^color}}bg-vermelho{{/color}} card-container manual-flip" data-href="indicadores/{{id_painel}}" data-id="{{id_painel}}" {{#color}}style="background-color: {{color}}"{{/color}}>
    <div class="flip-painel">
      <div class="frente">
        <span class="{{^favorito}}fa fa-star-o{{/favorito}} {{#favorito}}fa fa-star{{/favorito}} favoritar {{#favorito}}favoritado{{/favorito}}" title="Favoritar"></span>
        <span class="fa fa-pencil-square-o editar-painel" title="Editar Painel" aria-hidden="true"></span>
        <span class="fa fa-archive apagar-painel" title="Inativar Painel"></span>
        <p>{{desc_painel}}</p>
        <a class="counts-painel">
          {{#countIndicadores}}<span class="label label-primary"><span class="count">{{countIndicadores}}</span> Indicadores</span>{{/countIndicadores}}
          {{#countFcas}}<span class="label label-primary"><span class="count">{{countFcas}}</span> FCAs</span>{{/countFcas}}
          <span class="label label-primary infopainel" title="Data Vigência"><span class="fa fa-calendar-check-o" aria-hidden="true"></span> {{dt_vigencia}}</span>
        </a>
        <a class="mais-info">
          <h2 class="h2-indicador" title="Ver Participantes"><i class="fa fa-users" aria-hidden="true"></i></h2>
        </a>
      </div>
      <div class="fundo">
        <a class="mais-info voltar">
          <h2 class="h2-indicador"><i class="fa fa-undo" aria-hidden="true"></i></h2>
        </a>
        <p class="texto-conteudo">
          <span class="label label-primary" title="Responsável pelo Painel"><span class="fa fa-user-secret" aria-hidden="true"></span> {{responsavel}} </span>
        </p>
      </div>
    </div>
  </li>
{{/id_painel}}