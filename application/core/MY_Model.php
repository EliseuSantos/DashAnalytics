<?php
class MY_Model extends CI_Model {
  public function __construct(){
  	parent::__construct();
    $this->load->helper('formatacao_data_helper');
    $this->load->helper('formatacao_string_helper');
//    $CI = &get_instance();
//    $this->websystem = $CI->load->database('websystem', TRUE);
  }
  function utf8($string) {
    $cur_encoding = mb_detect_encoding($string) ;
    if($cur_encoding == "UTF-8" && mb_check_encoding($string,"UTF-8")) {
      return $string;
    } else {
      return utf8_encode($string);
    }
  }
}
?>
