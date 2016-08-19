<li class="list-group-item {{#data_visualizacao}}active{{/data_visualizacao}}" data-id="{{id}}" data-tipo="{{tipo}}" data-ref="{{referencia}}">
  <a class="lista-notificacao-item">
    <div class="avatar">
      <i class="{{icone}}" aria-hidden="true"></i>
    </div>
    <div class="user-desc">
      {{#titulo}}
        <span class="name">{{titulo}}</span>
      {{/titulo}}
      <span class="{{#titulo}}name{{/titulo}}{{^titulo}}desc{{/titulo}}" title="{{descricao}}">{{descricao}}</span>
      <span class="time">{{data_notificacao}}</span>
    </div>
  </a>
  {{#data_visualizacao}}
    <span class="notificacao-check fa fa-circle"></span>
  {{/data_visualizacao}}
  {{^data_visualizacao}}
    <span class="notificacao-check marcar-lida fa fa-circle-o" title="Marcar como lida"></span>
  {{/data_visualizacao}}
</li>