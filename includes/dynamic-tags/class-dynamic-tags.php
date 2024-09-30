<?php
/**
 * The Dynamic Tags class file.
 *
 * @package GenerateBlocks\Dynamic_Tags
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for handling dynamic tags.
 *
 * @since 2.0.0
 */
class GenerateBlocks_Dynamic_Tags extends GenerateBlocks_Singleton {
	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', [ $this, 'register' ] );
		add_filter( 'render_block', [ $this, 'replace_tags' ], 10, 3 );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
		add_filter( 'generateblocks_before_dynamic_tag_replace', [ $this, 'before_tag_replace' ], 10, 2 );
		add_filter( 'generateblocks_dynamic_tag_replacement', [ $this, 'alter_replacement' ], 10, 2 );
	}

	/**
	 * Register the tags.
	 *
	 * @return void
	 */
	public function register() {
		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Title', 'generateblocks' ),
				'tag'    => 'post_title',
				'type'   => 'post',
				'supports' => [ 'link' ],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_title' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Permalink', 'generateblocks' ),
				'tag'    => 'post_permalink',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_permalink' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Published Date', 'generateblocks' ),
				'tag'    => 'published_date',
				'type'   => 'post',
				'supports' => [ 'date', 'link' ],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_published_date' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Modified Date', 'generateblocks' ),
				'tag'    => 'modified_date',
				'type'   => 'post',
				'supports' => [ 'date', 'link' ],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_modified_date' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Featured Image URL', 'generateblocks' ),
				'tag'    => 'featured_image_url',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_featured_image_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Featured Image ID', 'generateblocks' ),
				'tag'    => 'featured_image_id',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_featured_image_id' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Meta', 'generateblocks' ),
				'tag'    => 'post_meta',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_post_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Previous Posts URL', 'generateblocks' ),
				'tag'    => 'previous_posts_page_url',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_previous_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Next Posts URL', 'generateblocks' ),
				'tag'    => 'next_posts_page_url',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_next_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Comments Count', 'generateblocks' ),
				'tag'    => 'comments_count',
				'type'   => 'post',
				'supports' => [ 'link' ],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_count' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Comments URL', 'generateblocks' ),
				'tag'    => 'comments_url',
				'type'   => 'post',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Author Meta', 'generateblocks' ),
				'tag'    => 'author_meta',
				'type'   => 'author',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Author Archives URL', 'generateblocks' ),
				'tag'    => 'author_archives_url',
				'type'   => 'author',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_archive_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Current year', 'generateblocks' ),
				'tag'    => 'current_year',
				'type'   => 'site',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_current_year' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Site Title', 'generateblocks' ),
				'tag'    => 'site_title',
				'type'   => 'site',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_site_title' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Site Tagline', 'generateblocks' ),
				'tag'    => 'site_tagline',
				'type'   => 'site',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_site_tagline' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Term List', 'generateblocks' ),
				'tag'    => 'term_list',
				'type'   => 'term',
				'supports' => [ 'link' ],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_term_list' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Term Meta', 'generateblocks' ),
				'tag'    => 'term_meta',
				'type'   => 'term',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_term_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'User Meta', 'generateblocks' ),
				'tag'    => 'user_meta',
				'type'   => 'user',
				'supports' => [],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_user_meta' ],
			]
		);
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param array  $instance The instance.
	 * @return string
	 */
	public function replace_tags( $content, $block, $instance ) {
		return GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content, $block, $instance );
	}

	/**
	 * Get the source ID.
	 *
	 * @param array  $options The options.
	 * @param string $fallback_type The fallback type.
	 * @return int
	 */
	public static function get_id( $options, $fallback_type = 'post' ) {
		if ( isset( $options['id'] ) ) {
			$id = absint( $options['id'] );
		} elseif ( 'user' === $fallback_type ) {
			$id = get_current_user_id();
		} else {
			if ( is_tax() || is_category() || is_tag() || is_archive() ) {
				$id = get_queried_object_id();
			} else {
				$id = get_the_ID();
			}
		}

		return apply_filters(
			'generateblocks_dynamic_source_id',
			$id
		);
	}

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route(
			'generateblocks/v1',
			'/dynamic-tag-replacements',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_dynamic_tag_replacements' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/get-posts',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_latest_posts' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/post-record',
			array(
				'methods'  => 'GET',
				'callback' => [ $this, 'get_custom_post_record' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
				'args'     => array(
					'postId'   => array(
						'required' => true,
						'validate_callback' => function( $param, $request, $key ) {
							return is_numeric( $param );
						},
					),
					'load'     => array(
						'required' => false,
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param ) || is_array( $param );
						},
						'sanitize_callback' => function( $param, $request, $key ) {
							return is_string( $param ) ? explode( ',', $param ) : $param;
						},
					),
					'options'  => array(
						'required' => false,
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param ) || is_array( $param );
						},
						'sanitize_callback' => function( $param, $request, $key ) {
							return is_string( $param ) ? json_decode( $param, true ) : $param;
						},
					),
				),
			)
		);
	}

	/**
	 * Get dynamic tag.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response
	 */
	public function get_dynamic_tag_replacements( $request ) {
		$content      = urldecode( $request->get_param( 'content' ) );
		$fallback_id  = $request->get_param( 'id' );
		$replacements = [];

		$all_tags  = GenerateBlocks_Register_Dynamic_Tag::get_tags();
		$tags_list = [];

		foreach ( $all_tags as $tag => $data ) {
			$tags_list[] = $data['tag'];
		}

		// Match the content inside the curly brackets.
		preg_match_all( '/\{(.*?)\}/', $content, $matches );

		if ( ! empty( $matches ) ) {
			$inside_brackets = $matches[1];

			// Loop through our tags and add the `id` option if it doesn't exist.
			// We need to do this to ensure the dynamic tag is replaced correctly.
			foreach ( (array) $inside_brackets as $tag ) {
				$split_tag = preg_split( '/[\s|]/', $tag, 2 );
				$tag_name  = $split_tag[0];

				if ( ! in_array( $tag_name, $tags_list, true ) ) {
					continue;
				}

				$tag_details = GenerateBlocks_Register_Dynamic_Tag::get_tag_details( $tag_name );
				$type        = $tag_details['type'];

				if ( 'user' === $type ) {
					$fallback_id = get_current_user_id();
				}

				if ( ! generateblocks_str_contains( $tag, ' ' ) ) {
					// There are no spaces in the tag, so there are no options.
					$content = str_replace( $tag, "{$tag} id:{$fallback_id}", $tag );

					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$content}}", [], new stdClass() ),
					];
				} elseif ( ! generateblocks_str_contains( $tag, 'id:' ) ) {
					// There are spaces in the tag, but no `id` option.
					$content = str_replace( $tag, "{$tag}|id:{$fallback_id}", $tag );

					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$content}}", [], new stdClass() ),
					];
				} else {
					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$tag}}", [], new stdClass() ),
					];
				}
			}
		}

		return rest_ensure_response( $replacements );
	}

	/**
	 * Get all of our posts in all public post types.
	 *
	 * @param WP_REST_Request $request The request.
	 */
	public function get_latest_posts( WP_REST_Request $request ) {
		$search = $request->get_param( 'search' );
		$post_types = get_post_types( array( 'public' => true ), 'names' );
		$result = [];

		foreach ( $post_types as $post_type ) {
			$args = array(
				'post_type' => $post_type,
				'posts_per_page' => 10,
				's' => $search,
			);

			$posts = get_posts( $args );

			if ( ! empty( $posts ) ) {
				$result[] = array(
					'id' => $post_type,
					'label' => ucfirst( $post_type ),
					'items' => array_map(
						function ( $post ) {
							return array(
								'value' => (string) $post->ID,
								'label' => '#' . $post->ID . ': ' . get_the_title( $post->ID ),
							);
						},
						$posts
					),
				);
			}
		}

		return rest_ensure_response( $result );
	}

	/**
	 * Get our post record based on the requested load and post ID.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function get_custom_post_record( WP_REST_Request $request ) {
		$id      = $request->get_param( 'postId' );
		$load    = $request->get_param( 'load' ) ?? [];
		$options = $request->get_param( 'options' ) ?? [];

		// Fetch the post.
		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'no_post', 'Post not found', array( 'status' => 404 ) );
		}

		$response = $post;

		if ( in_array( 'post', $load, true ) ) {
			$post_meta = array_filter(
				get_post_meta( $id ),
				function ( $key ) {
					return ! generateblocks_str_starts_with( $key, '_' );
				},
				ARRAY_FILTER_USE_KEY
			);
			$response->meta = $post_meta;
		}

		// Fetch author data if requested.
		if ( in_array( 'author', $load, true ) ) {
			$author = get_user_by( 'ID', $post->post_author );
			$response->author = $author;
		}

		// Fetch comments if requested.
		if ( in_array( 'comments', $load, true ) ) {
			$comments = get_comments( array( 'post_id' => $id ) );
			$response->comments = $comments;
		}

		// Fetch terms if requested and if taxonomy is provided in options.
		if ( in_array( 'terms', $load, true ) && isset( $options['taxonomy'] ) ) {
			$terms = wp_get_post_terms( $id, $options['taxonomy'] );
			if ( ! isset( $response->terms ) ) {
				$response->terms = [];
			}
			foreach ( $terms as $key => $data ) {
				$response->terms[] = [
					'id'   => $data->term_id,
					'name' => $data->name,
				];
			}
		}

		/**
		 * Allows filtering of the post record response data to add or alter data.
		 *
		 * @since 2.0.0
		 * @param array $response Array of response data.
		 * @param int $id ID of the post record.
		 * @param string[] $load Array of additional data to include with the post record.
		 * @param array $options Additional options for the record lookup.
		 *
		 * @return \WP_REST_Response|\WP_Error Response object.
		 */
		$filtered_response = apply_filters(
			'generateblocks_dynamic_tags_post_record_response',
			$response,
			$id,
			$load,
			$options
		);

		return rest_ensure_response( $filtered_response );
	}


	/**
	 * Before tag replace.
	 *
	 * @param string $content The content.
	 * @param array  $args The arguments.
	 * @return string
	 */
	public function before_tag_replace( $content, $args ) {
		if (
			generateblocks_str_contains( $content, '{previous_posts_page_url' ) ||
			generateblocks_str_contains( $content, '{next_posts_page_url' )
		) {
			$instant_pagination = $args['instance']->context['generateblocks/instantPagination'] ?? true;
			$query_id           = $args['instance']->context['generateblocks/queryId'] ?? '';

			if ( $instant_pagination && class_exists( 'WP_HTML_Tag_Processor' ) ) {
				$p = new WP_HTML_Tag_Processor( $content );

				if ( $p->next_tag(
					[
						'tag_name' => 'a',
					]
				) ) {
					$p->set_attribute( 'data-gb-router-target', 'query-' . $query_id );
					$p->set_attribute( 'data-gb-prefetch', true );
					$content = $p->get_updated_html();
				}
			}
		}

		return $content;
	}

	/**
	 * Alter replacement.
	 *
	 * @param string $replacement The replacement.
	 * @param array  $args The arguments.
	 * @return string
	 */
	public function alter_replacement( $replacement, $args ) {
		if ( isset( $args['block']['blockName'] ) && 'generateblocks/media' === $args['block']['blockName'] ) {
			$src = $args['block']['attrs']['htmlAttributes']['src'] ?? '';

			if ( $src && $src === $args['tag'] && is_int( $replacement ) ) {
				$url = wp_get_attachment_url( $replacement, 'full' );

				if ( $url ) {
					$replacement = $url;
				}
			}
		}

		return $replacement;
	}

	/**
	 * Expand the wp_kses_post sanitization function to allow iframe HTML tags
	 *
	 * @param array  $tags The allowed tags, attributes, and/or attribute values.
	 * @param string $context Context to judge allowed tags by. Allowed values are 'post'.
	 * @return array
	 */
	public static function expand_allowed_html( $tags, $context ) {
		if ( ! isset( $tags['iframe'] ) ) {
			$tags['iframe'] = [
				'src'             => true,
				'height'          => true,
				'width'           => true,
				'frameborder'     => true,
				'allowfullscreen' => true,
				'title'           => true,
			];
		}

		$tags = apply_filters( 'generateblocks_dynamic_tags_allowed_html', $tags, $context );

		return $tags;
	}
}

GenerateBlocks_Dynamic_Tags::get_instance()->init();
