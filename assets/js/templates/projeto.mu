<div class="panel panel-default panel-acoes projetos" data-projeto="{{id_projeto}}">
  <div class="panel-heading" role="tab" id="headingOne">
    <h4 class="panel-title">
      <label class="c-input c-checkbox check-project-titulo" data-projeto="{{id_projeto}}">
        <input type="checkbox" data-projeto="{{id_projeto}}" class="project-check">
        <span class="c-indicator check-project" data-projeto="{{id_projeto}}"></span>
      </label>
      <a class="projetos-descricao" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
        <span class="desc-text-project">
          <span class="{{icon}}"></span> {{desc_projeto}}
        </span>
        <span class="click dtvigencia card-detalhes-badge">
          <i class="fa fa-calendar"></i><span class="dt_limite"> {{dt_limite_projeto}}</span>
        </span>
        <span class="click dtvigencia card-detalhes-badge anexos" data-toggle="collapse" data-target="#anexos" aria-expanded="false" aria-controls="anexos">
          <i class="fa fa-paperclip" aria-hidden="true"></i>
          <span class=""> Anexos <span class="label label-pill label-primary">0</span></span>
        </span>
        <span class="fa fa-folder inativar-projeto" title="Inativar Projeto" data-projeto="{{id_projeto}}"></span>
      </a>
    </h4>
  </div>
  <div id="collapse" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
    <div class="progress progress-project">
      <div class="progress-bar progress-bar-striped active" role="progressbar" data-projeto="{{id_projeto}}" style="width: 0%">0%</div>
    </div>
    <div class="collapse" id="anexos">
      <div class="arquivos">
        <div class="card card-block example drop_zone">
          <label>
            <input type="file" class="fileproject" id="drop_zone" name="files[]" multiple />
            <i class="fa fa-plus" aria-hidden="true"></i> Anexar Arquivos
          </label>
          <progress class="progressanexo" value="0" max="100"></progress>
          <span class="progress-value hide">0%</span>
        </div>
      </div>
      <div class="list-uploads">
      </div>
    </div>
    <div>
      <ul class="lista-acoes" data-projeto="{{id_projeto}}">
      </ul>
      <div class="add-checklist">
        <textarea rows="1" class="add-checklist-textarea" placeholder="Adicionar Ação..." data-projeto="{{id_projeto}}" style="overflow: hidden; word-wrap: break-word; height: 36px;"></textarea>
      </div>
    </div>
  </div>
</div>