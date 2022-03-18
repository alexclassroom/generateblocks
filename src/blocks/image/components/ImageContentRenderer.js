import ImagePlaceholder from './ImagePlaceholder';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import RootElement from '../../../components/root-element';
import Element from '../../../components/element';
import Image from './Image';
import BlockControls from './BlockControls';

export default function ImageContentRenderer( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		isSelected,
		context,
	} = props;

	const {
		uniqueId,
		isDynamicContent,
		contentType,
		dynamicSource,
		anchor,
		featuredImage, // Injected by DynamicRenderer
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
	} = attributes;

	const imageUrl = isDynamicContent ? featuredImage?.source_url : attributes.mediaUrl;
	const altText = isDynamicContent ? featuredImage?.alt_text : attributes.alt;
	const titleText = isDynamicContent ? featuredImage?.title?.rendered : attributes.title;
	const captionText = isDynamicContent ? featuredImage?.caption?.rendered : attributes.caption;

	let htmlAttributes = {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/image',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	const isDescendentOfQueryLoop = !! context[ 'generateblocks/query' ];

	const canUploadImage =
		! isDynamicContent ||
		(
			isDynamicContent &&
			'featured-image' === contentType &&
			'current-post' === dynamicSource &&
			! isDescendentOfQueryLoop
		);

	const anchorAttributes = {
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
		disabled: true,
	};

	const imageProps = {
		src: imageUrl,
		alt: altText,
		title: titleText,
		caption: captionText,
		className: `gb-image-${ uniqueId }`,
		isDynamic: !! isDynamicContent,
		setAttributes,
		isSelected,
		anchorAttributes,
	};

	return (
		<>
			<BlockControls { ...props } imageUrl={ imageUrl } canUploadImage={ canUploadImage } />

			<RootElement name={ name } clientId={ clientId }>
				<Element tagName="figure" htmlAttrs={ blockProps }>
					{ ( !! imageUrl )
						? <Image { ...imageProps } />
						: <ImagePlaceholder { ...props } canUploadImage={ canUploadImage } />
					}
				</Element>
			</RootElement>
		</>
	);
}
