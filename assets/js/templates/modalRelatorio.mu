<div id="modalRelatorio" class="modal fade">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <a class="text-primary titulo">{{titulo}}</a> <span class="subtitulo">{{#subtitulo}} / {{subtitulo}} {{/subtitulo}}</span>
      </div>
      <div class="modal-body"></div>
      {{! <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary btn-print-relatorio"><i class="fa fa-print pull-xs-left" aria-hidden="true" onclick="window.print();"></i> Imprimir</button>
      </div> }}
    </div>
  </div>
</div>

