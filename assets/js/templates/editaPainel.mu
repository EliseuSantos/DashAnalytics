{{#id_painel}}
  <div class="novo-projeto" style="display: block !important;" data-id="{{id_painel}}">
    <form class="form-painel edita-painel" name="painel">
        <div class="col-md-12">
          <div class="form-group">
            <input type="text" class="form-control form-control-sm" name="descricao" placeholder="Descrição" value="{{desc_painel}}">
          </div>
          <div class="form-group">
            <input type="text" class="form-control form-control-sm date" name="dt_vigencia" placeholder="Data de Vigência" value="{{dt_vigencia}}" date-format="DD/MM/YYYY">
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-secondary btn-block btn-sm select-color">Selecione a cor</button>
            <div class="color-picker hidden" style="display: block;">
              <div data-col="#1abc9c" style="background-color: #1abc9c"></div>
              <div data-col="#2ecc71" style="background-color: #2ecc71"></div>
              <div data-col="#3498db" style="background-color: #3498db"></div>
              <div data-col="#9b59b6" style="background-color: #9b59b6"></div>
              <div data-col="#34495e" style="background-color: #34495e"></div>
              <div data-col="#16a085" style="background-color: #16a085"></div>
              <div data-col="#27ae60" style="background-color: #27ae60"></div>
              <div data-col="#2980b9" style="background-color: #2980b9"></div>
              <div data-col="#8e44ad" style="background-color: #8e44ad"></div>
              <div data-col="#2c3e50" style="background-color: #2c3e50"></div>
              <div data-col="#f1c40f" style="background-color: #f1c40f"></div>
              <div data-col="#e67e22" style="background-color: #e67e22"></div>
              <div data-col="#e74c3c" style="background-color: #e74c3c"></div>
              <div data-col="#ecf0f1" style="background-color: #ecf0f1"></div>
              <div data-col="#95a5a6" style="background-color: #95a5a6"></div>
              <div data-col="#f39c12" style="background-color: #f39c12"></div>
              <div data-col="#d35400" style="background-color: #d35400"></div>
              <div data-col="#c0392b" style="background-color: #c0392b"></div>
              <div data-col="#bdc3c7" style="background-color: #bdc3c7"></div>
              <div data-col="#7f8c8d" style="background-color: #7f8c8d"></div>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-block atualiza-painel">Atualizar</button>
        </div>
      </div>
    </form>
  </div>
{{/id_painel}}