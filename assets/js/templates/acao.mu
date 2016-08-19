{{#id_acao}}
  {{^atualiza}}
  <li data-acao="{{id_acao}}">
  {{/atualiza}}
    <label class="c-input c-checkbox">
      <input type="checkbox" data-projeto="{{id_projeto}}" data-acao="{{id_acao}}" class="subacao" {{#dt_conclusao}}checked{{/dt_conclusao}}>
      <span class="c-indicator"></span>
    </label>
    <label class="desc-acaoprojeto">
      <span class="desc"><div contenteditable="true" placeholder="{{desc_acao}}">{{desc_acao}}</div></span>
      <span class="responsavel" data-cdusuario="{{cd_usuario}}" data-responsavel="{{responsavel}}"><i class="fa fa-user" aria-hidden="true"></i> {{responsavel}}</span>
      <span class="dtlimite"><i class="fa fa-calendar" aria-hidden="true"></i> {{dt_limite}}</span>
      <span class="pull-xs-right set-acaoprojeto" data-idacao="{{id_acao}}" title="Transformar em Projeto"><i class="fa fa-language" aria-hidden="true"></i></span>
      <span class="fa fa-folder pull-xs-right inativar-acao" title="Inativar Ação" data-acao="{{id_acao}}"></span>
    </label>
  {{^atualiza}}
  </li>
  {{/atualiza}}
{{/id_acao}}