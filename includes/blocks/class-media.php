<?php
/**
 * Handles the Element block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Element block.
 */
class GenerateBlocks_Block_Media extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Render the Void Element block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$html_attributes = $attributes['htmlAttributes'] ?? [];
		$link_attributes = $attributes['linkHtmlAttributes'] ?? [];
		$block_content   = generateblocks_with_escaped_attributes(
			$block_content,
			[
				'block_html_attrs' => $html_attributes,
				'link_html_attrs'  => $link_attributes,
			]
		);

		// Add styles to this block if needed.
		$block_content = generateblocks_maybe_add_block_css(
			$block_content,
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		return $block_content;
	}
}
