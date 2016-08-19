<form name="indicador" id="form-novo-indicador">
  <div class="form-group">
    <select class="listq-quadro-input titulo-nova-lista" type="text" name="desc_indicador" id="desc-indicador" data-placeholder="Nome do Indicador"></select>
  </div>
  <div class="form-group">
    <input class="listq-quadro-input titulo-nova-lista" type="text" name="conceito" id="conceito" placeholder="Conceito" autocomplete="off">
  </div>
  <div class="form-group">
    <input class="listq-quadro-input titulo-nova-lista" type="text" name="ano" id="ano" placeholder="Ano" autocomplete="off">
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <select class="form-control form-control-sm" name="dimensao" id="dimensao" data-placeholder="Selecione a dimensão"></select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <select class="form-control form-control-sm" name="tipo_indicador" id="tipo-indicador" placeholder="Selecione um tipo">
          <option value="A">Acumulado</option>
          <option value="P">Percentual</option>
          <option value="M">Média</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <select class="form-control form-control-sm" name="tp_meta" id="tp-meta" data-placeholder="Tipo">
          <option value="C">Crescente</option>
          <option value="D">Decrescente</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <select class="form-control form-control-sm" name="periodicidade" id="periodicidade" data-placeholder="Periodicidade">
          <option value="1">Anual</option>
          <option value="2">Semestral</option>
          <option value="3">Mensal</option>
          <option value="4">Quinzenal</option>
          <option value="5">Semanal</option>
          <option value="6">Diário</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <select class="select2 form-control-sm" name="cd_usuario" id="cd-usuario" data-placeholder="Responsável"></select>
      </div>
    </div>
  </div>
  <div class="row-fluid">
    <div cass="col-md-12">
      <div class="form-group">
        <input class="listq-quadro-input titulo-nova-lista faixa-baixa" id="faixa-baixa" type="number" name="faixa_1" placeholder="Faixa" autocomplete="off" min="0">
        <input class="listq-quadro-input titulo-nova-lista faixa-media" id="faixa-media" type="number" name="faixa_2" placeholder="Faixa" autocomplete="off" min="0">
        <input class="listq-quadro-input titulo-nova-lista faixa-alta" id="faixa-alta" type="number" name="faixa_3" placeholder="Faixa" autocomplete="off" min="0">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button class="btn btn-primary-outline salva-indicador btn-block" type="button">Salvar</button>
    </div>
  </div>
</form>