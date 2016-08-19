<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pesquisas {
  public function __construct(){
  	$CI =& get_instance();
  	$CI->load->helper('formatacao_string_helper');
  	$CI->load->helper('formatacao_data_helper');
  	$CI->load->model('pesquisa_model');
  }

 	public function busca($parametro){
    $CI =& get_instance();
  	if($parametro['entrada'] == ''){
 			$resultado = array(
        'resultado'     => $CI->pesquisa_model->pesquisa($parametro['maximo'], $parametro['inicio'], $parametro['join'], null, $parametro['get'], $parametro['orderBy']),
        'numero_linhas' => count($CI->pesquisa_model->pesquisa(null, null, $parametro['join'], null, $parametro['get'], $parametro['orderBy'])),
        'parametro'     => $parametro['entrada']
      );
      if($resultado['numero_linhas'] > 0){
 				return $resultado;
      } else {
      	return FALSE;
      }

		} else if (pesquisa_alfabetico($parametro['entrada']) && !pesquisa_alfanumerico($parametro['entrada'])){
      $parametro['procura'] = 'camposchaves';
      $parametro['like'] = array(
      	'campo'		=> $parametro['camposChaves'],
      	'entrada' => strtolower($parametro['entrada'])
      );
      $resultado = array(
        'resultado'     => $CI->pesquisa_model->pesquisa($parametro['maximo'], $parametro['inicio'], $parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy']),
        'numero_linhas' => count($CI->pesquisa_model->pesquisa(null, null,$parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy'])),
        'parametro'     => $parametro['entrada']
      );
      if($resultado['numero_linhas'] > 0){
 				return $resultado;
      } else {
      	return FALSE;
      }

    } elseif (pesquisa_alfanumerico($parametro['entrada']) && !strpos($parametro['entrada'], '/')) {
      $parametro['procura'] = 'camposchaves';
      $parametro['like'] = array(
        'campo'   => $parametro['camposChaves'],
        'entrada' => $parametro['entrada']
      );
      $resultado = array(
        'resultado'     => $CI->pesquisa_model->pesquisa($parametro['maximo'], $parametro['inicio'], $parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy']),
        'numero_linhas' => count($CI->pesquisa_model->pesquisa(null, null,$parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy'])),
        'parametro'     => $parametro['entrada']
      );
      if($resultado['numero_linhas'] > 0){
        return $resultado;
      } else {
        return FALSE;
      }
    } elseif (substr_count($parametro['entrada'], '/') == 2){
    	$parametro['procura'] = 'dt_nasc';
      $parametro['like'] = array(
      	'campo'		=> 'dt_nasc',
      	'entrada' => $parametro['entrada']
      );
      $resultado = array(
        'resultado'     => $CI->pesquisa_model->pesquisa($parametro['maximo'], $parametro['inicio'], $parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy']),
        'numero_linhas' => count($CI->pesquisa_model->pesquisa(null, null,$parametro['join'], $parametro['like'], $parametro['get'], $parametro['orderBy'])),
        'parametro'     => $parametro['entrada']
      );
      if($resultado['numero_linhas'] > 0){
 				return $resultado;
      } else {
      	return FALSE;
      }
    }	else {
    	return FALSE;
    }
 	}
}
?>
