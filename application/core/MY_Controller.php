<?php
  class MY_Controller extends CI_Controller {

    public function __construct() {
      parent::__construct();
      require_once APPPATH.'third_party/Mustache/Autoloader.php';
      Mustache_Autoloader::register();
      $options =  array('extension' => '.php');
      $this->mustache = new Mustache_Engine(
        array(
          'loader' => new Mustache_Loader_FilesystemLoader(FCPATH . 'application/views/partials/widgets', $options),
        )
      );
      $this->load->helper('formatacao_data_helper');
      $this->load->helper('formatacao_string_helper');
      date_default_timezone_set('America/Maceio');
    }

    protected function loadHead() {
      $data['cssIncludes'] = func_get_args();
      $this->load->view('partials/head',$data);
    }

    protected function loadScripts() {
      $data['jsIncludes'] = func_get_args();
      $this->load->view('partials/scripts',$data);
    }

    protected function loadFoot() {
      $this->load->view('partials/foot');
    }

    protected function loadHeaderMenu($descricao = false) {
      $data = array(
        'compartilhado' => false,
      );
      $data['conteudoNav'] = '';
      $this->load->view('partials/nav_top', $data);
    }

    public function getArquivos($path) {
      $result = array();
      $times = array();
      if(is_dir($path)) {
        $files = scandir($path);
        foreach ($files as $file) {
          $arquivo = $path.'/'.$file;
          $images = array('jpg', 'png', 'gif', 'jpeg');
          $extensao = strtolower(pathinfo($file, PATHINFO_EXTENSION));
          if($file != '.' && $file != '..' && !is_dir($path.'/'.$file)) {
            $result[] = array(
              'desc_arquivo' => $file,
              'dt_criacao'   => date('d/m/Y H:i', filemtime($path.'/'.$file)),
              'path'   => $arquivo,
              'icon' => $this->iconFile($extensao),
              'image' => (in_array($extensao, $images)) ? 'style="background-image: url(\''.base_url($arquivo).'\')"'  : ''
            );
            $times[] = filemtime($path.'/'.$file);
          }
        }
        array_multisort($times,$result);
      }
      return $result;
    }

    protected function excluirArquivo($path) {
      if(file_exists($path)) {
        unlink($path);
        return true;
      } else {
        return false;
      }
    }

    public function is_ajax() {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    public function iconFile($extensao) {
      $extensoes = array(
        'png'  => 'fa-file-image-o',
        'jpg'  => 'fa-file-image-o',
        'jpeg' => 'fa-file-image-o',
        'gif'  => 'fa-file-image-o',
        'zip'  => 'fa-file-archive-o',
        'ppt'  => 'fa-file-powerpoint-o',
        'pptx' => 'fa fa-file-powerpoint-o',
        'rar'  => 'fa-file-archive-o',
        'pdf'  => 'fa-file-pdf-o',
        'doc'  => 'fa-file-word-o',
        'docx' => 'fa-file-word-o',
        'xlsx' => 'fa-file-excel-o',
        'xlsm' => 'fa-file-excel-o',
        'xls'  => 'fa-file-excel-o',
        'txt'  => 'fa-file-text-o',
        'csv'  => 'fa-file-excel-o',
        'bmp'  => 'fa-file-image-o',
        'csv'  => 'fa-file-excel-o',
        'avi'  => 'fa-file-video-o',
        'flv'  => 'fa-file-video-o',
        'mp4'  => 'fa-file-video-o',
        'mp3'  => 'fa-file-audio-o',
        'ogg'  => 'fa-file-audio-o',
        'wav'  => 'fa-file-audio-o',
        'wmv'  => 'fa-file-video-o',
      );
      if(isset($extensoes[$extensao])) {
        return $extensoes[$extensao];
      } else {
        return 'fa-file-o';
      }
    }

    protected function calculaPercentual($feito, $total) {
      if($total > 0) {
        $count1 = $feito / $total;
        $count2 = $count1 * 100;
        $count = number_format($count2, 0);
        return $count;
      } else {
        return 0;
      }
    }

    public function useTemplate($template, $dados = array()) {
      if($template) {
        echo $this->mustache->render($template, $dados);
      } else {
        return false;
      }
    }
  }
?>