import { __ } from '@wordpress/i18n';

const defaultContext = {
	id: '',
	blockName: '',
	isInQueryLoop: false,
	supports: {
		responsiveTabs: false,
		settingsPanel: {
			enabled: false,
			label: __( 'Settings', 'generateblocks' ),
			icon: 'wrench',
		},
		layout: {
			enabled: false,
			display: false,
			flexDirection: false,
			flexWrap: false,
			alignItems: false,
			justifyContent: false,
		},
		sizingPanel: {
			enabled: false,
			width: false,
			height: false,
			minWidth: false,
			minHeight: false,
			maxWidth: false,
			maxHeight: false,
			useGlobalMaxWidth: false,
		},
		typography: {
			enabled: false,
			fontWeight: false,
			textTransform: false,
			fontSize: false,
			lineHeight: false,
			letterSpacing: false,
			fontFamily: false,
		},
		spacing: {
			enabled: false,
			inlineWidth: false,
			stackVertically: false,
			fillHorizontalSpace: false,
			zIndex: false,
			innerZIndex: false,
			dimensions: [],
		},
		colors: {
			enabled: false,
			elements: [],
		},
		backgroundGradient: {
			enabled: false,
		},
		backgroundPanel: {
			enabled: false,
		},
		shapesPanel: {
			enabled: false,
		},
		icon: {
			enabled: false,
			location: [],
		},
		htmlTags: {
			enabled: false,
			tags: [],
		},
	},
};

export default defaultContext;
