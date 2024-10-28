import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { OpenPanel, IconControl } from '@edge22/components';

import {
	ApplyFilters,
	ColorPickerControls,
	UnitControl,
} from '@components/index.js';
import { moreDesignOptions } from '@utils';
import { useBlockStyles } from '@hooks/useBlockStyles';
import generalSvgs from '@components/icon-picker/svgs-general';
import socialSvgs from '@components/icon-picker/svgs-social';

export const shapeColorControls = [
	{
		label: 'Color',
		id: 'shape-color',
		items: [
			{
				tooltip: 'Color',
				value: 'color',
				selector: 'svg',
			},
		],
	},
];

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		html,
		className,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

	const iconType = className?.includes( 'gb-shape--divider' ) ? 'divider' : 'icon';

	let icons = applyFilters(
		'generateblocks.editor.iconSVGSets',
		{
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
		},
		{ attributes }
	);

	if ( 'divider' === iconType ) {
		icons = generateBlocksInfo.svgShapes;
	}

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				title={ __( 'Shape', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="shape"
			>
				<IconControl
					label={ __( 'Icon', 'generateblocks' ) }
					value={ html }
					onChange={ ( value ) => setAttributes( { html: value } ) }
					onClear={ () => setAttributes( { html: '' } ) }
					icons={ icons }
					iconType={ iconType }
					clearLabel={ __( 'Clear', 'generateblocks' ) }
					openLabel={ __( 'Open Library', 'generateblocks' ) }
					modalTitle={ __( 'Shape Library', 'generateblocks' ) }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
				panelId="design"
			>
				<UnitControl
					id="width"
					label={ __( 'Width', 'generateblocks' ) }
					value={ getStyleValue( 'width', currentAtRule, 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'width', value, currentAtRule, 'svg' ) }
				/>

				<UnitControl
					id="height"
					label={ __( 'Height', 'generateblocks' ) }
					value={ getStyleValue( 'height', currentAtRule, 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'height', value, currentAtRule, 'svg' ) }
				/>

				<ColorPickerControls
					items={ shapeColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="settings"
			/>
		</ApplyFilters>
	);
}
