<div class="mini-perfil" data-idfca="{{idfca}}" data-usuario="{{cd_usuario}}">
  <div class="mini-perfil-membro membro-large">
    <span class="membro-iniciais" title="{{razao_social}}">{{#foto}}<img src="{{foto}}">{{/foto}}{{^foto}}{{iniciais}}{{/foto}}</span>
  </div>
  <div class="mini-perfil-info">
    <h6 class="mini-perfil-info-titulo">
      <a class="mini-perfil-info-titulo-link">{{razao_social}}</a>
    </h6>
    <!-- <p>@{{hash_user}}</p> -->
  </div>
  <ul class="lista-membros">
    <li class="item-membro excluiparticipante">
      <a class="name" href="#">
        <span class="nome-completo" name="">Remover Participante</span>
      </a>
    </li>
  </ul>
</div>