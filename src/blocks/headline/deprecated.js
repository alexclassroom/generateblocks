import blockAttributes from './attributes';
import classnames from 'classnames';
import sanitizeSVG from '../../utils/sanitize-svg';

const {
	RichText,
} = wp.blockEditor;

const {
	applyFilters,
} = wp.hooks;

const deprecated = [
	// v2 - remove wrapper.
	{
		attributes: {
			...blockAttributes,
			content: {
				type: 'array',
				source: 'children',
				selector: 'p,h1,h2,h3,h4,h5,h6',
			},
		},
		supports: {
			anchor: false,
			className: false,
			customClassName: false,
		},
		migrate( attributes ) {
			const oldClasses = ( attributes.cssClasses ? attributes.cssClasses : undefined );
			const oldAnchor = ( attributes.elementId ? attributes.elementId : undefined );
			let currentElement = ( attributes.element ? attributes.element : generateBlocksDefaults.headline.element );

			if ( attributes.icon && attributes.removeText && 'div' !== currentElement ) {
				currentElement = 'div';
			}

			return {
				...attributes,
				className: oldClasses ? oldClasses : undefined,
				anchor: oldAnchor ? oldAnchor : undefined,
				element: currentElement,
			};
		},
		save( { attributes } ) {
			const {
				uniqueId,
				elementId,
				cssClasses,
				element,
				content,
				icon,
				removeText,
				ariaLabel,
			} = attributes;

			const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

			let htmlAttributes = {
				id: !! elementId ? elementId : undefined,
				className: classnames( {
					'gb-headline': true,
					[ `gb-headline-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
				} ),
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

			return (
				<ConditionalWrap
					condition={ icon }
					wrap={ children => <div className={ classnames( {
						'gb-headline-wrapper': true,
						[ `gb-headline-wrapper-${ uniqueId }` ]: true,
					} ) }>{ children }</div> }
				>
					{ icon &&
						<span
							className="gb-icon"
							aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					}

					{ ! removeText &&
						<RichText.Content
							tagName={ element }
							value={ content }
							{ ...htmlAttributes }
						/>
					}
				</ConditionalWrap>
			);
		},
	},
	// v1 - change default h2 to p.
	{
		attributes: {
			...blockAttributes,
			element: {
				type: 'string',
				default: 'p',
			},
		},
		save( { attributes } ) {
			const {
				uniqueId,
				elementId,
				cssClasses,
				element,
				content,
				icon,
				removeText,
				ariaLabel,
			} = attributes;

			const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

			let htmlAttributes = {
				id: !! elementId ? elementId : undefined,
				className: classnames( {
					'gb-headline': true,
					[ `gb-headline-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
				} ),
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

			return (
				<ConditionalWrap
					condition={ icon }
					wrap={ children => <div className={ classnames( {
						'gb-headline-wrapper': true,
						[ `gb-headline-wrapper-${ uniqueId }` ]: true,
					} ) }>{ children }</div> }
				>
					{ icon &&
						<span
							className="gb-icon"
							aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					}

					{ ! removeText &&
						<RichText.Content
							tagName={ element }
							value={ content }
							{ ...htmlAttributes }
						/>
					}
				</ConditionalWrap>
			);
		},
	},
];

export default deprecated;
