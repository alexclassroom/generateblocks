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
class GenerateBlocks_Block_Loop_Item extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Render the Element block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param object $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$query_type = $block->context['generateblocks/queryType'] ?? null;

		if ( GenerateBlocks_Block_Query::TYPE_WP_QUERY === $query_type ) {
			$post_classes = get_post_class();

			if ( class_exists( 'WP_HTML_Tag_Processor' ) ) {
				$tags = new WP_HTML_Tag_Processor( $block_content );

				if ( $tags->next_tag( $attributes['tagName'] ) ) {
					$existing_classes = $tags->get_attribute( 'class' );
					$new_classes = $existing_classes . ' ' . implode( ' ', $post_classes );
					$tags->set_attribute( 'class', $new_classes );
					$block_content = $tags->get_updated_html();
				}
			}
		}

		$html_attributes = $attributes['htmlAttributes'] ?? [];
		$block_content   = generateblocks_with_escaped_attributes(
			$block_content,
			[
				'block_html_attrs' => $html_attributes,
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
