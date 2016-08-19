<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {
  public function __construct() {
    parent:: __construct();
  }

  public function index() {
    $this->loadHead();
    $this->loadHeaderMenu();
    $this->load->view('home');
    $this->loadScripts();
    $this->loadFoot();
  }
}
