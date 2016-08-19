<h5 id="addparticipante"><span class="label label-default pull-xs-right">Adicionar novo</span></h5>
<select class="select2-participantes form-control form-control-sm participantes" data-placeholder='Participantes' id="participantes" data-icon="true" data-allow-clear="false" multiple>
  {{#result}}
    <option data-idfca="{{id_fca}}" value="{{cd_usuario}}" data-allowclose="false" selected disabled>{{razao_social}}</option>
  {{/result}}
</select>