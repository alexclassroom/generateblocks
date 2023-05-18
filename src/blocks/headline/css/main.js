import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			borderColor,
			borderColorOpacity,
			highlightTextColor,
			fontFamily,
			fontFamilyFallback,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusUnit,
			iconColor,
			iconColorOpacity,
			removeText,
			display,
			inlineWidth,
			iconStyles,
		} = attributes;

		let fontFamilyFallbackValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		const selector = element + '.gb-headline-' + uniqueId;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			color: textColor,
			'font-family': fontFamily + fontFamilyFallbackValue,
		} ];

		TypographyCSS( cssObj, '.editor-styles-wrapper ' + selector, { ...attributes.typography, fontFamilyFallback } );
		SpacingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		LayoutCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		SizingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		FlexChildCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );

		cssObj[ '.editor-styles-wrapper .gb-container ' + selector ] = [ {
			color: textColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector ].push( {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} );

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.editor-styles-wrapper ' + selector + ' a' ] = [ {
			color: linkColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector + ' a:hover' ] = [ {
			color: linkColorHover,
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconStyles?.paddingTop : null,
			'padding-right': ! removeText ? iconStyles?.paddingRight : null,
			'padding-bottom': ! removeText ? iconStyles?.paddingBottom : null,
			'padding-left': ! removeText ? iconStyles?.paddingLeft : null,
			'color': hexToRGBA( iconColor, iconColorOpacity ), // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			width: iconStyles?.width,
			height: iconStyles?.height,
		} ];

		cssObj[ selector + ' .gb-highlight' ] = [ {
			'color': highlightTextColor, // eslint-disable-line quote-props
		} ];

		if ( inlineWidth ) {
			cssObj[ '.gb-is-root-block[data-block="' + clientId + '"]' ] = [ {
				display,
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'headline' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
