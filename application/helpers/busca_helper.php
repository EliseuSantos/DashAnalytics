<?php
	if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	if (!function_exists('modal_busca_simples')){
		/**
		 * Carrega na view um modal de busca simples, onde apenas um resultado pode
		 * ser selecionado.
		 *
		 * @param string $id Atributo id do elemento HTML correspondente ao modal.
		 *
		 * @param string $title Cabeçalho do modal.
		 *
		 * @param string $ajaxURL URL da página a ser chamada pela busca em ajax.
		 *
		 * @param string[] $colunas Nomes das colunas da busca.
		 *
		 * @param string $chave Nome do campo que será usado como chave de comparação
		 * dos objetos json retornados pelo ajax. Recomenda-se o uso de um id único.
		 *
		 * @param string $selecionado Chave do objeto que virá selecionado inicialmente
		 * pela busca. Por padrão a seleção virá vazia.
		 *
		 * @param string $size Tamanho do modal, utilizando classes do bootstrap.
		 * Possíveis valores são: 'xs', 'sm', 'md', 'lg'.
		 *
		 * @return void
		 */
	 	function modal_busca_simples($id, $title, $ajaxURL, $colunas, $chave, $selecionado = null, $size = 'lg') {
			$data['id'] = $id;
			$data['title'] = $title;
			$data['ajaxURL'] = base_url($ajaxURL);
			$data['colunas'] = $colunas;
			$data['size'] = $size;
			$data['chave'] = $chave;
			$data['selecionado'] = isset($selecionado)?array($selecionado):array();

			get_instance()->load->view('partials/modal/busca', $data);
	 	}
	}

	if (!function_exists('modal_busca_multipla')){
		/**
		 * Carrega na view um modal de busca múltipla, onde mais de um resultado
		 * pode ser selecionado.
		 *
		 * @param string $id Atributo id do elemento HTML correspondente ao modal.
		 *
		 * @param string $title Cabeçalho do modal.
		 *
		 * @param string $ajaxURL URL da página a ser chamada pela busca em ajax.
		 *
		 * @param string[] $colunas Nomes das colunas da busca.
		 *
		 * @param string $chave Nome do campo que será usado como chave de comparação
		 * dos objetos json retornados pelo ajax. Recomenda-se o uso de um id único.
		 *
		 * @param string[] $selecionados Array contendo as chaves do objetos que
		 * virão selecionados inicialmente pela busca. Por padrão a seleção virá vazia.
		 *
		 * @param string $size Tamanho do modal, utilizando classes do bootstrap.
		 * Possíveis valores são: 'xs', 'sm', 'md', 'lg'.
		 *
		 * @return void
		 */
	 	function modal_busca_multipla($id, $title, $ajaxURL, $colunas, $chave, $selecionados = array(), $size = 'lg') {
			$data['id'] = $id;
			$data['title'] = $title;
			$data['ajaxURL'] = base_url($ajaxURL);
			$data['multiple'] = 'multiple';
			$data['colunas'] = $colunas;
			$data['size'] = $size;
			$data['chave'] = $chave;
			$data['selecionado'] = $selecionados;

			get_instance()->load->view('partials/modal/busca', $data);
	 	}
	}

	if (!function_exists('campo_busca_simples')){
		/**
		 * Carrega na view um botão ligado a um modal de busca simples, onde
		 * apenas um resultado pode ser selecionado.
		 *
		 * @param string $id Atributo id e nome do elemento HTML..
		 *
		 * @param string $modalId Id do modal de busca a ser chamado pelo botão.
		 *
		 * @param string $chave Nome do campo que será usado como chave de comparação
		 * dos objetos json retornados pelo ajax. Recomenda-se o uso de um id único.
		 *
		 * @param string $format Formatação do texto do botão. Propriedades do
		 * elemento podem ser impressas referindo-se a ele com uma %.
		 * Ex: "[%id] %desc_item - %count"
		 *
		 * @param string $placeholder Texto mostrado quando não houver seleção.
		 *
		 * @param string $classs String contendo classes css que serão adicionadas
		 * ao botão.
		 *
		 * @param object $selecionado Objeto que já vem selecionado inicialmente.
		 * Por padrão nenhum objeto vira selecionado.
		 *
		 * @return void
		 */
	 	function campo_busca_simples($id, $modalId, $chave, $format, $placeholder, $classes = '', $selecionado = null) {
			$text = '';
			$title = '';
			if(isset($selecionado)) {
				$text = $format;
				foreach($selecionado as $idx => $val) {
					$text = str_replace("%$idx",trim($val),$text);
				}
				if(strlen($text) > 100) {
					$title = $text;
					$text = substr($text,0,98) . '...';
				}
			}
			echo form_button(
              array(
                'type' => 'button',
                'id' => $id,
                'name' => $id,
                'class' => 'campo-busca-simples ' . $classes,
                'content' => $text,
				'title' => isset($selecionado)?$placeholder:$title,
				'placeholder' => $placeholder,
                'data-modal' => '#' . $modalId,
                'data-format' => $format,
                'data-selected' => htmlspecialchars(json_encode($selecionado)),
              )
            );
	 	}
	}

	if (!function_exists('campo_busca_multipla')){
		/**
		 * Carrega na view um campo (lista não ordenada) ligado a um modal
		 * de busca múltipla, onde mais de um resultado pode ser selecionado.
		 *
		 * @param string $id Atributo id e nome do elemento HTML correspondente a lista.
		 *
		 * @param string $modalId Id do modal de busca a ser utilizado pela lista.
		 *
		 * @param string $chave Nome do campo que será usado como chave de comparação
		 * dos objetos json retornados pelo ajax. Recomenda-se o uso de um id único.
		 *
		 * @param string $format Formatação dos elementos da lista. Propriedades do
		 * elemento podem ser impressas referindo-se a ele com uma %.
		 * Ex: "[%id] %desc_item - %count"
		 *
		 * @param string $placeholder Texto mostrado quando a lista estiver vazia.
		 *
		 * @param string[] $selecionados Array contendo os objetos que
		 * virão selecionados inicialmente pela busca, com todas as colunas.
		 * Por padrão a seleção virá vazia.
		 *
		 * @return void
		 */
	 	function campo_busca_multipla($id, $modalId, $chave, $format, $placeholder, $selecionados = array()) {
			echo '<ul id="', $id, '" name="', $id, '" class="campo-busca-multipla" placeholder="', $placeholder;
			echo '" data-key="', $chave, '" data-modal="#', $modalId, '" data-format="', $format, '" ';

			if(count($selecionados)) {
				$selecionadosChaves = array();
                foreach ($selecionados as $item) {
                    $selecionadosChaves[] = $item->cd_geral;
                }
				echo 'data-selected="', htmlspecialchars(json_encode($selecionadosChaves)), '">';
				foreach($selecionados as $item) {
					$text = $format;
					$title = '';
					foreach($item as $idx => $val) {
						$text = str_replace("%$idx",trim($val),$text);
					}
					if(strlen($text) > 50) {
						$title = $text;
						$text = substr($text,0,48) . '...';
					}
					echo '<li data-', $chave, '="', $item->{$chave}, '" title="', $title, '">';
					echo '<span>', $text, '</span>';
					echo '<a class="apaga-procedimento" tabindex="0"></a>';
					echo '</li>';
				}
			} else {
				echo '>';
			}
			echo '</ul>';
	 	}
	}

?>
