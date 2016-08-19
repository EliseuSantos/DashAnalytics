{{#id_indicador}}
  <div class="list-wrapper indicadores" id="{{id_meta}}" data-id-indicador="{{id_indicador}}" data-pesq="{{desc_indicador}}" data-responsavel="{{cd_usuario}}" data-periodicidade="{{periodicidade}}" data-id-meta="{{id_meta}}">
    <div class="list indicadores" data-id-meta="{{id_meta}}">
      <div class="list-header header-indicador">
        <span class="o2-indicador">
          <h2 class="h2-indicador">O2</h2>
        </span>
        <div class="text-xs-center titulo-indicador">
          <h5 class="titulo-indicador-update" data-value="{{desc_indicador}}">{{desc_indicador}}</h5>
        </div>
        <span class="fa fa-share-alt compartilhar-indicador {{#compartilhado}}compartilhado{{/compartilhado}}" title="{{#compartilhado}}Compartilhado por: {{responsavel}}{{/compartilhado}} {{^compartilhado}}Compartilhar Indicador{{/compartilhado}}"></span>
        <span class="fa fa-folder inativar-indicador" title="Inativar Indicador"></span>
      </div>
      <div class="list-header">
        <div class="elements-list label-header-list pull-xs-right">
          <span class="label label-primary tp-indicador" title="Tipo do Indicador">{{tipoIndicador}}</span>
          <span class="label label-primary ciclo-indicador" title="Ciclo">{{ciclo}}</span>
          <span class="label label-default resp-indicador" title="Responsável: {{login}}" data-original-title="{{login}}">{{loginPequeno}}</span>
          <span class="label label-default total-fca"></span>
        </div>
      </div>
      <div class="lista-cards" data-idpainel="{{id_painel}}" data-idindicador="{{id_indicador}}" data-idresponsavel="{{cd_usuario}}" data-idmeta="{{id_meta}}">
        {{#cards}}
          <div class="card card-block lanca-fcas" data-previsto="" data-realizado="" data-periodo="">
            <div class="list-card-details text-md-center font-weight-bold card-text">
              <a class="text-md-center font-weight-bold card-text">
                {{nome}}
              </a>
            </div>
          </div>
        {{/cards}}
      </div>
      <div class="open-card-composer text-xs-center">
        {{^compartilhado}}
          <a class="lanc-valor" data-tipo="{{ciclo}}" data-indicador="{{id_indicador}}" data-meta="{{id_meta}}">
            <span class="badge-cards label label-pill label-primary">0</span> Lançar Valor
          </a>
          <a class="nova-meta" data-indicador="{{id_indicador}}">
            <span class="fa fa-plus"></span> Nova Meta
          </a>
        {{/compartilhado}}
      </div>
    </div>
    <div class="list lista-oxigenio hidden" data-id="{{id_indicador}}" data-id-meta="{{id_meta}}">
      <h3 class="o2-text">O2</h3>
      <div class="list-header">
        <span class="o2-indicador">
          <h2 class="h2-indicador">Metas</h2>
        </span>
        <h6 class="text-xs-center titulo-indicador">O2</h6>
      </div>
      <div class="lista-cards"></div>
      <a class="open-card-composer text-xs-center lanc-valor">
        <span class="badge-cards label label-pill label-primary contador-ideia">0</span> Adicionar nova Ideia
      </a>
    </div>
  </div>
{{/id_indicador}}