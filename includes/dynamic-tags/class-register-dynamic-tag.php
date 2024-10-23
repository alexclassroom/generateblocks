<?php
/**
 * The Register Dynamic Tag class file.
 *
 * @package GenerateBlocks\Dynamic_Tags
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for registering dynamic tags.
 *
 * @since 1.9.0
 */
class GenerateBlocks_Register_Dynamic_Tag {
	/**
	 * The tags.
	 *
	 * @var array
	 */
	private static $tags = [];

	/**
	 * Constructor.
	 *
	 * @param array $args The arguments.
	 */
	public function __construct( $args ) {
		if ( ! isset( $args['tag'] ) || ! isset( $args['return'] ) || ! isset( $args['title'] ) ) {
			return;
		}

		if ( ! isset( $args['type'] ) ) {
			$args['type'] = 'post';
		}

		self::$tags[ $args['tag'] ] = $args;
	}

	/**
	 * Parse options.
	 *
	 * @param string $options_string The options string.
	 * @param string $tag_name The tag name.
	 * @return array
	 */
	private static function parse_options( $options_string, $tag_name ) {
		$pairs = explode( '|', $options_string );
		$result = [
			'tag_name' => $tag_name, // Make it so the tag name is available to us in $options.
		];

		if ( empty( $pairs ) ) {
			return $result;
		}

		foreach ( $pairs as $pair ) {
			if ( generateblocks_str_contains( $pair, ':' ) ) {
				list( $key, $value ) = explode( ':', $pair, 2 );
			} else {
				$key = $pair;
				$value = true; // Default value if no colon is present.
			}

			$result[ $key ] = $value;
		}

		return $result;
	}

	/**
	 * Get the tags.
	 *
	 * @return array
	 */
	public static function get_tags() {
		return self::$tags;
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param Object $instance The block instance.
	 * @return string
	 */
	public static function replace_tags( $content, $block, $instance ) {
		foreach ( self::$tags as $tag_name => $data ) {
			$opening_tag = '{' . $tag_name;

			if ( ! generateblocks_str_contains( $content, $opening_tag ) ) {
				continue;
			}

			$full_tag = $opening_tag . '}';
			$supports = $data['supports'];

			if ( generateblocks_str_contains( $content, $full_tag ) ) {
				$full_tag       = self::maybe_prepend_protocol( $content, $full_tag );
				$replacement    = $data['return']( [], $block, $instance );
				$og_replacement = $replacement; // Keep a copy of this in case it's manipulated via filter.

				/**
				 * Allow developers to filter the replacement.
				 *
				 * @since 2.0.0
				 *
				 * @param string $replacement The replacement.
				 * @param string $full_tag The full tag.
				 * @param mixed  $content The replacement.
				 * @param array  $block The block.
				 * @param Object $instance The block instance.
				 */
				$replacement = apply_filters(
					'generateblocks_dynamic_tag_replacement',
					$replacement,
					[
						'tag'      => $full_tag,
						'content'  => $content,
						'block'    => $block,
						'instance' => $instance,
						'supports' => $supports,
						'options'  => [],
					]
				);

				// Tags are required to have a value by default. Since this tag has no options,
				// we can remove the block and break out of the loop if there is no replacement.
				if ( ! $replacement ) {
					$content = '';
					break;
				}

				/**
				 * Allow developers to filter the content before dynamic tag replacement.
				 *
				 * @since 2.0.0
				 *
				 * @param string $content The content.
				 * @param string $full_tag The full tag.
				 * @param mixed  $replacement The replacement.
				 * @param array  $block The block.
				 * @param Object $instance The block instance.
				 */
				$content = apply_filters(
					'generateblocks_before_dynamic_tag_replace',
					$content,
					[
						'tag'            => $tag_name,
						'full_tag'       => $full_tag,
						'replacement'    => $replacement,
						'og_replacement' => $og_replacement,
						'block'          => $block,
						'instance'       => $instance,
						'supports'       => $supports,
						'options'        => [],
					]
				);

				$content = str_replace( $full_tag, (string) $replacement, $content );
			} else {
				$pattern = '/\{' . $tag_name . '(\s+([^}]+))*\}/';
				preg_match_all( $pattern, $content, $matches, PREG_SET_ORDER );

				foreach ( $matches as $match ) {
					$full_tag       = $match[0];
					$full_tag       = self::maybe_prepend_protocol( $content, $full_tag );
					$options_string = $match[2] ?? '';
					$options        = self::parse_options( $options_string, $tag_name );
					$replacement    = $data['return']( $options, $block, $instance );
					$og_replacement = $replacement; // Keep a copy of this in case it's manipulated via filter.
					$required       = isset( $options['required'] ) && 'false' === $options['required'] ? false : true;

					/**
					 * Allow developers to filter the replacement.
					 *
					 * @since 2.0.0
					 *
					 * @param string $replacement The replacement.
					 * @param string $full_tag The full tag.
					 * @param mixed  $content The replacement.
					 * @param array  $block The block.
					 * @param Object $instance The block instance.
					 */
					$replacement = apply_filters(
						'generateblocks_dynamic_tag_replacement',
						$replacement,
						[
							'tag'      => $tag_name,
							'full_tag' => $full_tag,
							'content'  => $content,
							'block'    => $block,
							'instance' => $instance,
							'options'  => $options,
							'supports' => $supports,
						]
					);

					// If this tag is required for the block to render and there is no replacement,
					// we can remove the block and break out of the loop.
					if ( $required && ! $replacement ) {
						$content = '';
						break;
					}

					/**
					 * Allow developers to filter the content before dynamic tag replacement.
					 *
					 * @since 2.0.0
					 *
					 * @param string $content The content.
					 * @param string $full_tag The full tag.
					 * @param mixed  $replacement The replacement.
					 * @param array  $block The block.
					 * @param Object $instance The block instance.
					 */
					$content = apply_filters(
						'generateblocks_before_dynamic_tag_replace',
						$content,
						[
							'tag'            => $full_tag,
							'replacement'    => $replacement,
							'og_replacement' => $og_replacement,
							'block'          => $block,
							'instance'       => $instance,
							'options'        => $options,
							'supports'       => $supports,
						]
					);

					$content = str_replace( $full_tag, (string) $replacement, $content );
				}
			}
		}

		return $content;
	}

	/**
	 * Maybe prepend the protocol to our dynamic tag.
	 * Some core blocks automatically prepend the protocol to URLs, so we need to account for that.
	 * This function checks if the protocol is already prepended and if so, prepends it to the tag so the entire thing is replaced.
	 *
	 * @param string $content The content.
	 * @param string $tag The tag.
	 * @return string
	 */
	public static function maybe_prepend_protocol( $content, $tag ) {
		if ( generateblocks_str_contains( $content, 'http://' . $tag ) ) {
			$tag = 'http://' . $tag;
		}

		if ( generateblocks_str_contains( $content, 'https://' . $tag ) ) {
			$tag = 'https://' . $tag;
		}

		return $tag;
	}


	/**
	 * Get the details of a specific registered tag.
	 *
	 * @param string $tag The dynamic tag used for lookup.
	 * @return array|null The tag details or null if not found.
	 */
	public static function get_tag_details( $tag ) {
		return self::$tags[ $tag ] ?? null;
	}
}
