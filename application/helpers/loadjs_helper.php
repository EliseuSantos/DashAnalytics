<?php
 
function loadJs($arquivos){
  $return = '';

  if(!is_array($arquivos)){
    $return .= "<script type='text/javascript' src='" . base_url($arquivos) . "'></script>\n";
  } else {
    foreach($arquivos as $arquivo){
      $return .= "<script type='text/javascript' src='" . base_url($arquivo) . "'></script>\n";
    }
  }

  echo $return;
}

?>