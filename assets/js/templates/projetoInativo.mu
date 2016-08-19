{{#projetos}}
  <div class="card card-block lista-fcas" data-idprojeto="{{id_projeto}}">
    <div class="div-buttons">
      <button class="ativar-projeto" data-idprojeto="{{id_projeto}}">
        <i class="fa fa-undo" aria-hidden="true"></i>
      </button>
    </div>
    <blockquote class="card-blockquote">
      <p>{{desc_projeto}}</p>
    </blockquote>
  </div>
{{/projetos}}