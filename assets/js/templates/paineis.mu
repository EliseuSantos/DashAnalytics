<div class="busca">
  <h6>Selecione o painel que deseja compartilhar</h6>
  <span class="texto-compartilhamento">Ao compartilhar o indicador ele estará visível para o painel selecionado como também seus valores, fcas, ações e anexos</span>
  <div class="row">
    <div class="col-md-12">
      <form class="form-search">
          <input type="text" id="pesquisa-compartilharpainel" class="form-control search-query" placeholder="Buscar por painel ou responsável..." />
      </form>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-12">
    <ul class="lista-paineis">
      {{#paineis}}
        <li class="paineis {{classeCor}} compartilhado {{#compartilhado}} active {{/compartilhado}}" data-pesq="{{id_painel}} {{desc_painel}} {{responsavel}}" title="{{desc_painel}}" data-painel="{{id_painel}}" {{#color}} style="background-color: {{color}};" {{/color}}>
          <span class="painel-option"></span>
          <i class="fa fa-check painel-option-confirm" aria-hidden="true"></i>
          <div class="flip-painel">
            {{#desc_painel_limitado}}
              <p>{{desc_painel_limitado}}</p>
            {{/desc_painel_limitado}}
            <a class="counts-painel">
              <span class="resp-painel">{{responsavel}}</span>
            </a>
          </div>
        </li>
      {{/paineis}}
    </ul>
  </div>
</div>