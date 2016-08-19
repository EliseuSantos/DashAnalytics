<div id="modalCard" class="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="modalCard" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">
          {{#fcas_arquivados}}<button class="btn btn-blue btn-sm btn-border-o pull-xs-right fcas-arquivados">FCAs Arquivados</button>{{/fcas_arquivados}}
          <a class="text-primary listar-fcas titulo">{{{titulo}}}</a>
          <span class="subtitulo">{{#subtitulo}} / {{{subtitulo}}} {{/subtitulo}}</span>
        </h4>
        <div class="text-inline">
          {{{textinline}}}
        </div>
      </div>
      <div class="modal-body">
        {{{conteudo}}}
      </div>
    </div>
  </div>
</div>