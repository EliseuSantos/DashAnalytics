<?php header('Content-Type: text/html; charset=utf-8; X-UA-Compatible: IE=Edge'); ?>
<!DOCTYPE HTML>
<html>
  <head>
    <title>DashAnalytics</title>
    <?php foreach($this->config->item('cssIncludes') as $css) { ?>
    <link rel="stylesheet" href="<?=base_url('assets/css/'.$css.'.css');?>">
    <?php }
      foreach($this->config->item('cssIncludesPrint') as $css) {
    ?>
    <link rel="stylesheet" media="print" href="<?=base_url('assets/css/'.$css.'.css');?>">
    <?php }
      if(isset($cssIncludes)) foreach($cssIncludes as $css) {
    ?>
    <link rel="stylesheet" href="<?=base_url('assets/css/'.$css.'.css');?>">
    <?php } ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body>