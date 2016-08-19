<?php
	if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	if (!function_exists('formato_data_tempo')){
	 	function formato_data_tempo($data){
	 		$obj_data = new DateTime($data);
	 		$formato_data_tempo = $obj_data->format('d/m/Y H:i');
	 		return $formato_data_tempo;
	 	}
	}

  //  Tratamento de Datas para string
  if (!function_exists('formato_data_string')){
    function formato_data_string($datetime, $full = false){
      $agora = new DateTime;
      $atraz = new DateTime($datetime);
      $diff = $agora->diff($atraz);

      $diff->w = floor($diff->d / 7);
      $diff->d -= $diff->w * 7;

      $string = array(
        'y' => 'ano',
        'm' => 'mese',
        'w' => 'semana',
        'd' => 'dia',
        'h' => 'hora',
        'i' => 'minuto',
        's' => 'segundo',
      );
      foreach ($string as $k => &$v) {
        if ($diff->$k) {
          $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
          unset($string[$k]);
        }
      }

      if (!$full) $string = array_slice($string, 0, 1);
      return $string ? implode(', ', $string) . ' atras' : 'agora';
    }
  }

	//	Tratamento de Datas
	if (!function_exists('formato_data_padrao')){
	 	function formato_data_padrao($data){
	 		$obj_data = new DateTime($data);
	 		$formato_data_padrao = $obj_data->format('Y-m-d');
	 		return $formato_data_padrao;
	 	}
	}
	if (!function_exists('formato_data')){
	 	function formato_data($data){
	 		$obj_data = new DateTime($data);
	 		$formato_data = $obj_data->format('d/m/Y');
	 		return $formato_data;
	 	}
	}
 	if (!function_exists('formato_dia')){
	 	function formato_dia($data){
	 		$obj_data = new DateTime($data);
	 		$formato_dia = $obj_data->format('d');
	 		return $formato_dia;
	 	}
 	}
 	if (!function_exists('formato_mes')){
	 	function formato_mes($data){
	 		$obj_data = new DateTime($data);
	 		$formato_mes = $obj_data->format('m');
	 		return $formato_mes;
	 	}
 	}
 	if (!function_exists('formato_ano')){
	 	function formato_ano($data){
	 		$obj_data = new DateTime($data);
	 		$formato_ano = $obj_data->format('Y');
	 		return $formato_ano;
	 	}
 	}

 	// Tratamento de Tempo
	if (!function_exists('formato_tempo')){
	 	function formato_tempo($data){
	 		$obj_data = new DateTime($data);
	 		$formato_tempo = $obj_data->format('H:i:s');
	 		return $formato_tempo;
	 	}
 	}
 	if (!function_exists('formato_hora_minuto')){
	 	function formato_hora_minuto($data){
	 		$obj_data = new DateTime($data);
	 		$formato_hora_minuto = $obj_data->format('H:i');
	 		return $formato_hora_minuto;
	 	}
 	}
 	if (!function_exists('formato_hora')){
	 	function formato_hora($data){
	 		$obj_data = new DateTime($data);
	 		$formato_hora = $obj_data->format('H');
	 		return $formato_hora;
	 	}
 	}
 	if (!function_exists('formato_minuto')){
	 	function formato_minuto($data){
	 		$obj_data = new DateTime($data);
	 		$formato_minuto = $obj_data->format('i');
	 		return $formato_minuto;
	 	}
 	}

 	if (!function_exists('transNomeDiaPtBr')){
	 	function transNomeDiaPtBr($dia){
	 		$nomeDia = array(
        'Sun' => 'dom',
        'Mon' => 'seg',
        'Tue' => 'ter',
        'Wed' => 'qua',
        'Thu' => 'qui',
        'Fri' => 'sex',
        'Sat' => 'sab',
      );
	 		return $nomeDia[$dia];
	 	}
	}

	if (!function_exists('transNomeDiaCompletoPtBr')){
		function transNomeDiaCompletoPtBr($dia){
			$nomeDia = array(
				'Sunday' => 'Domingo',
				'Monday' => 'Segunda-feira',
				'Tuesday' => 'Terça-feira',
				'Wednesday' => 'Quarta-feira',
				'Thursday' => 'Quinta-feira',
				'Friday' => 'Sexta-feira',
				'Saturday' => 'Sabado',
			);
			return $nomeDia[$dia];
		}
	}

	if (!function_exists('transNomeMesPtBr')){
	 	function transNomeMesPtBr($mes){
	 		$nomeMes = array(
        'January' => 'Janeiro',
        'February' => 'Fevereiro',
        'March' => 'Março',
        'April' => 'Abril',
        'May' => 'Maio',
        'June' => 'Junho',
        'July' => 'Julho',
        'August' => 'Agosto',
        'September' => 'Setembro',
        'October' => 'Outubro',
        'November' => 'Novembro',
        'December' => 'Dezembro'
      );
	 		return $nomeMes[$mes];
	 	}
	}

  if(!function_exists('getNomeMesPorNumero')) {
    function getNomeMesPorNumero($mes) {
      $meses = array(
        1 => 'Janeiro',
        2 => 'Fevereiro',
        3 => 'Março',
        4 => 'Abril',
        5 => 'Maio',
        6 => 'Junho',
        7 => 'Julho',
        8 => 'Agosto',
        9 => 'Setembro',
        10 => 'Outubro',
        11 => 'Novembro',
        12 => 'Dezembro'
      );
      return $meses[$mes];
    }
  }

?>
