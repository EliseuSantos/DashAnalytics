<?php
  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

  if (!function_exists('pass_crypt')){
    function pass_crypt($senha) {
      return substr(crypt(trim($senha) . date('YdmH',time()), 'MD'), 2);
    }
  }
