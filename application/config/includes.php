<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| DEFAULT INCLUDES
| -------------------------------------------------------------------------
| This file lists the css and javascript files that should be included by
| default in your views' header. Scripts in here will be loaded at your
| pages'header, not at the end of the body. Only put scripts in here if
| they are safe and essential.
|
*/
$config['cssIncludes'] = array(
  'font-awesome/font-awesome.min',
  'skeleton',
  'normalize',
  'chartist.min',
  'waitMe',
  'utility',
  'app',
);
$config['cssIncludesPrint'] = array(

);
$config['jsIncludes'] = array(
  'jquery-2.2.0.min',
  'jquery.peity.min',
  'hammer.min',
  'chartist',
  'chartist-plugin-threshold.min',
  'chartist-plugin-pointlabels.min',
  'waitMe',
  'mustache',
  'moment',
  'pt-br',
  'modernizr-2.6.2.min',
  'cryptography',
  'jquery-ui.min',
  'class/client-websocket',
  'triggersWebsocket',
  'global',
  'customEvents'
);
?>
