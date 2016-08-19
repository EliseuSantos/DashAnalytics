{{#valores}}
  <tr>
    <td>
      <input type="hidden" value="{{id_periodo}}"> {{periodo}}
    </td>
    <td>
      {{#percentual}}
        <div class="input-group group-percentual">
          <input type="number" value="{{vl_previsto}}" class="form-control">
          <span class="input-group-addon">%</span>
        </div>
      {{/percentual}}
      {{^percentual}}
        <input class="form-control" type="number" value="{{vl_previsto}}">
      {{/percentual}}
    </td>
    <td>
      {{#percentual}}
        <div class="input-group group-percentual">
          <input type="number" value="{{vl_realizado}}" class="form-control">
          <span class="input-group-addon">%</span>
        </div>
      {{/percentual}}
      {{^percentual}}
        <input class="form-control" type="number" value="{{vl_realizado}}">
      {{/percentual}}
    </td>
  </tr>
{{/valores}}
