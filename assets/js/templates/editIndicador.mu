<div id="modal-editIndicador" class="modal fade bd-example-modal-lg in" role="dialog" aria-labelledby="modal-editIndicador" data-id-indicador="{{id_indicador}}" data-id-meta="{{id_meta}}" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title">Atualizar Indicador</h4>
      </div>
      <div class="modal-body">
        <form name="indicador" id="atualiza-indicador">
           <fieldset class="form-group">
            <label>Nome do Indicador</label>
            <input class="listq-quadro-input titulo-nova-lista" type="text" name="desc_indicador" value="{{desc_indicador}}" id="desc-indicador" placeholder="Nome do Indicador">
          </fieldset>
          <fieldset class="form-group">
            <label>Conceito</label>
            <input class="listq-quadro-input titulo-nova-lista" type="text" name="conceito" id="conceito" placeholder="Conceito" value="{{conceito}}">
          </fieldset>
          <fieldset class="form-group">
            <label>Ano</label>
            <input class="listq-quadro-input titulo-nova-lista" type="text" name="ano" id="ano" placeholder="Ano" value="{{ano}}">
          </fieldset>
          <div class="row">
            <div class="col-md-12">
              <fieldset class="form-group">
                <label>Dimensão</label>
                <select class="form-control form-control-sm" name="dimensao" id="dimensao" data-placeholder="Selecione a dimensão"></select>
              </fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <fieldset class="form-group">
                <label>Tipo do Indicador</label>
                <select class="form-control form-control-sm" name="tipo_indicador" id="tipo-indicador" placeholder="Selecione um tipo">
                  <option value="A">Acumulado</option>
                  <option value="P">Percentual</option>
                  <option value="M">Média</option>
                </select>
              </fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <fieldset class="form-group">
                <label>Tipo de Ordenação</label>
                <select class="form-control form-control-sm" name="tp_meta" id="tp-meta" data-placeholder="Tipo">
                  <option value="C">Crescente</option>
                  <option value="D">Decrescente</option>
                </select>
              </fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <fieldset class="form-group">
                <label>Responsável</label>
                <select class="select2 form-control-sm responsavel" name="cd_usuario" id="cd-usuario" data-placeholder="Responsável"></select>
              </fieldset>
            </div>
          </div>
          <div class="row-fluid">
            <div cass="col-md-12">
              <label>Faixa</label>
              <fieldset class="form-group">
                <input class="listq-quadro-input titulo-nova-lista faixa-baixa" id="faixa-baixa" type="number" value="{{faixa_1}}" name="faixa_1" placeholder="Faixa" min="0">
                <input class="listq-quadro-input titulo-nova-lista faixa-media" id="faixa-media" type="number" value="{{faixa_2}}" name="faixa_2" placeholder="Faixa" min="0">
                <input class="listq-quadro-input titulo-nova-lista faixa-alta" id="faixa-alta" type="number" value="{{faixa_3}}" name="faixa_3" placeholder="Faixa" min="0">
              </fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button class="btn btn-primary-outline atualiza-indicador btn-block" type="button">Atualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>