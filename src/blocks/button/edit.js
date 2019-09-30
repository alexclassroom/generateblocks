/**
 * Block: Buttons
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import IconPicker from '../../components/icon-picker';
import URLInput from '../../components/url-input';
import DimensionsControl from '../../components/dimensions/';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	TabPanel,
	BaseControl,
	TextControl,
	RangeControl,
	SelectControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;
const fbButtonIds = [];

class FlexBlockButton extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbButtonIds.push( id );
		} else if ( fbButtonIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbButtonIds.push( id );
		} else {
			fbButtonIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId,
			isSelected,
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			text,
			url,
			target,
			rel,
			icon,
			iconLocation,
			customIcon,
			removeText,
			ariaLabel,
			backgroundColor,
			textColor,
			backgroundColorHover,
			textColorHover,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			textTransform,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			marginSyncUnits,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginSyncUnitsTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginSyncUnitsMobile,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSyncUnits,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingSyncUnitsTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingSyncUnitsMobile,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderSizeSyncUnits,
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderSizeSyncUnitsTablet,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderSizeSyncUnitsMobile,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusUnit,
			borderRadiusSyncUnits,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusSyncUnitsTablet,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderRadiusSyncUnitsMobile,
			borderColor,
			borderColorHover,
		} = attributes;

		let fontSizeValue = '',
			borderStyleValue = '',
			iconMargin = 'margin-right: 0.5em;';

		if ( fontSize ) {
			fontSizeValue = fontSize + 'em';
		}

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		if ( 'right' === iconLocation ) {
			iconMargin = 'margin-left: 0.5em;';
		}

		if ( removeText ) {
			iconMargin = 'margin: 0;';
		}

		const css = `
			.editor-block-list__block a.fx-button-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
				padding-top: ` + paddingTop + paddingUnit + `;
				padding-right: ` + paddingRight + paddingUnit + `;
				padding-bottom: ` + paddingBottom + paddingUnit + `;
				padding-left: ` + paddingLeft + paddingUnit + `;
				border-top-left-radius: ` + borderRadiusTopLeft + borderRadiusUnit + `;
				border-top-right-radius: ` + borderRadiusTopRight + borderRadiusUnit + `;
				border-bottom-right-radius: ` + borderRadiusBottomRight + borderRadiusUnit + `;
				border-bottom-left-radius: ` + borderRadiusBottomLeft + borderRadiusUnit + `;
				font-size: ` + fontSizeValue + `;
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + borderColor + `;
				text-transform: ` + textTransform + `;
				margin-top: ` + marginTop + marginUnit + `;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + `;
				margin-left: ` + marginLeft + marginUnit + `;
			}

			.editor-block-list__block a.fx-button-` + uniqueId + `:hover,
			.editor-block-list__block a.fx-button-` + uniqueId + `:focus,
			.editor-block-list__block a.fx-button-` + uniqueId + `:active {
				background-color: ` + backgroundColorHover + `;
				color: ` + textColorHover + `;
				border-color: ` + borderColorHover + `;
			}

			.editor-block-list__block a.fx-button-` + uniqueId + ` .fx-icon {
				` + iconMargin + `
			}
		`

		$( '.fx-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody
						title={ __( 'Typography', 'flexblocks' ) }
						initialOpen={ true }
						>
						<TabPanel className="grid-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Font Size', 'flexblocks' ) }
														value={ fontSize }
														onChange={ ( value ) => {
															setAttributes( {
																fontSize: value
															} );
														} }
														min={ 0.3 }
														max={ 3 }
														step={ 0.1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.button.fontSize }
													/>

													<SelectControl
														label={ __( 'Text Transform', 'flexblocks' ) }
														value={ textTransform }
														options={ [
															{ label: 'none', value: '' },
															{ label: 'uppercase', value: 'uppercase' },
															{ label: 'lowercase', value: 'lowercase' },
															{ label: 'capitalize', value: 'capitalize' },
														] }
														onChange={ ( textTransform ) => { setAttributes( { textTransform } ) } }
													/>
												</Fragment>
											) : '' }

											{ 'tablet' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Font Size', 'flexblocks' ) }
														value={ fontSizeTablet }
														onChange={ ( value ) => {
															setAttributes( {
																fontSizeTablet: value
															} );
														} }
														min={ 0.3 }
														max={ 3 }
														step={ 0.1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.button.fontSizeTablet }
													/>
												</Fragment>
											) : '' }

											{ 'mobile' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Font Size', 'flexblocks' ) }
														value={ fontSizeMobile }
														onChange={ ( value ) => {
															setAttributes( {
																fontSizeMobile: value
															} );
														} }
														min={ 0.3 }
														max={ 3 }
														step={ 0.1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.button.fontSizeMobile }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ false }
						>
						<TabPanel className="grid-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'flexblocks' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'grid-default' === tab.name ? (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'flexblocks' ) }
														valueTop={ marginTop }
														valueRight={ marginRight }
														valueBottom={ marginBottom }
														valueLeft={ marginLeft }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
														attrTop={ 'marginTop' }
														attrRight={ 'marginRight' }
														attrBottom={ 'marginBottom' }
														attrLeft={ 'marginLeft' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnits' }
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
														valueTop={ paddingTop }
														valueRight={ paddingRight }
														valueBottom={ paddingBottom }
														valueLeft={ paddingLeft }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnits }
														attrTop={ 'paddingTop' }
														attrRight={ 'paddingRight' }
														attrBottom={ 'paddingBottom' }
														attrLeft={ 'paddingLeft' }
														attrUnit={ 'paddingUnit' }
														attrSyncUnits={ 'paddingSyncUnits' }
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Size', 'flexblocks' ) }
														valueTop={ borderSizeTop }
														valueRight={ borderSizeRight }
														valueBottom={ borderSizeBottom }
														valueLeft={ borderSizeLeft }
														//unit={ paddingUnit }
														syncUnits={ borderSizeSyncUnits }
														attrTop={ 'borderSizeTop' }
														attrRight={ 'borderSizeRight' }
														attrBottom={ 'borderSizeBottom' }
														attrLeft={ 'borderSizeLeft' }
														attrSyncUnits={ 'borderSizeSyncUnits' }
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Radius', 'flexblocks' ) }
														valueTop={ borderRadiusTopLeft }
														valueRight={ borderRadiusTopRight }
														valueBottom={ borderRadiusBottomRight }
														valueLeft={ borderRadiusBottomLeft }
														valueUnit={ borderRadiusUnit }
														syncUnits={ borderRadiusSyncUnits }
														attrTop={ 'borderRadiusTopLeft' }
														attrRight={ 'borderRadiusTopRight' }
														attrBottom={ 'borderRadiusBottomRight' }
														attrLeft={ 'borderRadiusBottomLeft' }
														attrUnit={ 'borderRadiusUnit' }
														attrSyncUnits={ 'borderRadiusSyncUnits' }
														labelTop={ __( 'T-Left', 'flexblocks' ) }
														labelRight={ __( 'T-Right', 'flexblocks' ) }
														labelBottom={ __( 'B-Right', 'flexblocks' ) }
														labelLeft={ __( 'B-Left', 'flexblocks' ) }
													/>
												</Fragment>
											) : '' }

											{ 'grid-tablet' === tab.name ? (
												<Fragment>
													<BaseControl label={ __( 'Margin', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'margin' }
															label={ __( 'Margin', 'flexblocks' ) }
															valueTop={ marginTopTablet }
															valueRight={ marginRightTablet }
															valueBottom={ marginBottomTablet }
															valueLeft={ marginLeftTablet }
															valueUnit={ marginUnit }
															syncUnits={ marginSyncUnitsTablet }
															attrTop={ 'marginTopTablet' }
															attrRight={ 'marginRightTablet' }
															attrBottom={ 'marginBottomTablet' }
															attrLeft={ 'marginLeftTablet' }
															attrUnit={ 'marginUnit' }
															attrSyncUnits={ 'marginSyncUnitsTablet' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Padding', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'flexblocks' ) }
															valueTop={ paddingTopTablet }
															valueRight={ paddingRightTablet }
															valueBottom={ paddingBottomTablet }
															valueLeft={ paddingLeftTablet }
															valueUnit={ paddingUnit }
															syncUnits={ paddingSyncUnitsTablet }
															attrTop={ 'paddingTopTablet' }
															attrRight={ 'paddingRightTablet' }
															attrBottom={ 'paddingBottomTablet' }
															attrLeft={ 'paddingLeftTablet' }
															attrUnit={ 'paddingUnit' }
															attrSyncUnits={ 'paddingSyncUnitsTablet' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Size', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Size', 'flexblocks' ) }
															valueTop={ borderSizeTopTablet }
															valueRight={ borderSizeRightTablet }
															valueBottom={ borderSizeBottomTablet }
															valueLeft={ borderSizeLeftTablet }
															//unit={ paddingUnit }
															syncUnits={ borderSizeSyncUnitsTablet }
															attrTop={ 'borderSizeTopTablet' }
															attrRight={ 'borderSizeRightTablet' }
															attrBottom={ 'borderSizeBottomTablet' }
															attrLeft={ 'borderSizeLeftTablet' }
															attrSyncUnits={ 'borderSizeSyncUnitsTablet' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Radius', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Radius', 'flexblocks' ) }
															valueTop={ borderRadiusTopLeftTablet }
															valueRight={ borderRadiusTopRightTablet }
															valueBottom={ borderRadiusBottomRightTablet }
															valueLeft={ borderRadiusBottomLeftTablet }
															valueUnit={ borderRadiusUnit }
															syncUnits={ borderRadiusSyncUnits }
															attrTop={ 'borderRadiusTopLeftTablet' }
															attrRight={ 'borderRadiusTopRightTablet' }
															attrBottom={ 'borderRadiusBottomRightTablet' }
															attrLeft={ 'borderRadiusBottomLeftTablet' }
															valueUnit={ 'borderRadiusUnit' }
															attrSyncUnits={ 'borderRadiusSyncUnitsTablet' }
															labelTop={ __( 'T-Left', 'flexblocks' ) }
															labelRight={ __( 'T-Right', 'flexblocks' ) }
															labelBottom={ __( 'B-Right', 'flexblocks' ) }
															labelLeft={ __( 'B-Left', 'flexblocks' ) }
														/>
													</BaseControl>
												</Fragment>
											) : '' }

											{ 'grid-mobile' === tab.name ? (
												<Fragment>
													<BaseControl label={ __( 'Margin', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Margin', 'flexblocks' ) }
															valueTop={ marginTopMobile }
															valueRight={ marginRightMobile }
															valueBottom={ marginBottomMobile }
															valueLeft={ marginLeftMobile }
															valueUnit={ marginUnit }
															syncUnits={ marginSyncUnitsMobile }
															attrTop={ 'marginTopMobile' }
															attrRight={ 'marginRightMobile' }
															attrBottom={ 'marginBottomMobile' }
															attrLeft={ 'marginLeftMobile' }
															attrUnit={ 'marginUnit' }
															attrSyncUnits={ 'marginSyncUnitsMobile' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Padding', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'flexblocks' ) }
															valueTop={ paddingTopMobile }
															valueRight={ paddingRightMobile }
															valueBottom={ paddingBottomMobile }
															valueLeft={ paddingLeftMobile }
															valueUnit={ paddingUnit }
															syncUnits={ paddingSyncUnitsMobile }
															attrTop={ 'paddingTopMobile' }
															attrRight={ 'paddingRightMobile' }
															attrBottom={ 'paddingBottomMobile' }
															attrLeft={ 'paddingLeftMobile' }
															attrUnit={ 'paddingUnit' }
															attrSyncUnits={ 'paddingSyncUnitsMobile' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Size', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Size', 'flexblocks' ) }
															valueTop={ borderSizeTopMobile }
															valueRight={ borderSizeRightMobile }
															valueBottom={ borderSizeBottomMobile }
															valueLeft={ borderSizeLeftMobile }
															syncUnits={ borderSizeSyncUnitsMobile }
															attrTop={ 'borderSizeTopMobile' }
															attrRight={ 'borderSizeRightMobile' }
															attrBottom={ 'borderSizeBottomMobile' }
															attrLeft={ 'borderSizeLeftMobile' }
															attrSyncUnits={ 'borderSizeSyncUnitsMobile' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Radius', 'flexblocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Radius', 'flexblocks' ) }
															valueTop={ borderRadiusTopRightMobile }
															valueRight={ borderRadiusBottomRightMobile }
															valueBottom={ borderRadiusBottomLeftMobile }
															valueLeft={ borderRadiusTopLeftMobile }
															valueUnit={ borderRadiusUnit }
															syncUnits={ borderRadiusSyncUnitsMobile }
															attrTop={ 'borderRadiusTopRightMobile' }
															attrRight={ 'borderRadiusBottomRightMobile' }
															attrBottom={ 'borderRadiusBottomLeftMobile' }
															attrLeft={ 'borderRadiusTopLeftMobile' }
															attrUnit={ 'borderRadiusUnit' }
															attrSyncUnits={ 'borderRadiusSyncUnitsMobile' }
															labelTop={ __( 'T-Left', 'flexblocks' ) }
															labelRight={ __( 'T-Right', 'flexblocks' ) }
															labelBottom={ __( 'B-Right', 'flexblocks' ) }
															labelLeft={ __( 'B-Left', 'flexblocks' ) }
														/>
													</BaseControl>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'flexblocks' ) }
						initialOpen={ false }
						>

						<TabPanel className="layout-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'button-colors',
									title: __( 'Normal', 'flexblocks' ),
									className: 'button-colors',
								},
								{
									name: 'button-colors-hover',
									title: __( 'Hover', 'flexblocks' ),
									className: 'button-colors-hover',
								},
							] }>
							{
								( tab ) => {
									const isNormal = tab.name === 'button-colors';

									return (
										<div>
											{ isNormal ? (
												<Fragment>
													<ColorPicker
														label={ __( 'Background Color', 'flexblocks' ) }
														value={ backgroundColor }
														onChange={ ( nextBackgroundColor ) =>
															setAttributes( {
																backgroundColor: nextBackgroundColor
															} )
														}
														onClear={ () =>
															setAttributes( {
																backgroundColor: flexBlocksDefaults.button.backgroundColor
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'flexblocks' ) }
														value={ textColor }
														onChange={ ( nextTextColor ) =>
															setAttributes( {
																textColor: nextTextColor
															} )
														}
														onClear={ () =>
															setAttributes( {
																textColor: flexBlocksDefaults.button.textColor
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'flexblocks' ) }
														value={ borderColor }
														onChange={ ( value ) =>
															setAttributes( {
																borderColor: value
															} )
														}
														onClear={ () =>
															setAttributes( {
																borderColor: flexBlocksDefaults.button.borderColor
															} )
														}
														alpha={ false }
													/>
												</Fragment>

											) : (

												<Fragment>
													<ColorPicker
														label={ __( 'Background Color', 'flexblocks' ) }
														value={ backgroundColorHover }
														onChange={ ( nextBackgroundColorHover ) =>
															setAttributes( {
																backgroundColorHover: nextBackgroundColorHover
															} )
														}
														onClear={ () =>
															setAttributes( {
																backgroundColorHover: flexBlocksDefaults.button.backgroundColorHover
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'flexblocks' ) }
														value={ textColorHover }
														onChange={ ( nextTextColorHover ) =>
															setAttributes( {
																textColorHover: nextTextColorHover
															} )
														}
														onClear={ () =>
															setAttributes( {
																textColorHover: flexBlocksDefaults.button.textColorHover
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'flexblocks' ) }
														value={ borderColorHover }
														onChange={ ( value ) =>
															setAttributes( {
																borderColorHover: value
															} )
														}
														onClear={ () =>
															setAttributes( {
																borderColorHover: flexBlocksDefaults.button.borderColorHover
															} )
														}
														alpha={ false }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Icon', 'flexblocks' ) }
						initialOpen={ false }
						>

						<IconPicker { ...this.props }
							valueIcon={ icon }
							attrIcon={ 'icon' }
							valueCustomIcon={ customIcon }
							attrCustomIcon={ 'customIcon' }
							valueIconLocation={ iconLocation }
							attrIconLocation={ 'iconLocation' }
							locationOptions={ [
								{ label: __( 'Left', 'flexblocks' ), value: 'left' },
								{ label: __( 'Right', 'flexblocks' ), value: 'right' },
							] }
							valueRemoveText={ removeText }
							attrRemoveText={ 'removeText' }
							valueAriaLabel={ ariaLabel }
							attrAriaLabel={ 'ariaLabel' }
						/>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flexblocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flexblocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<a
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'fx-button': true,
						[`fx-button-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					href={ !! url ? url : undefined }
					target={ !! target ? target : undefined }
					rel={ !! rel ? rel : undefined }
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
				>
					{ icon && 'left' === iconLocation ? (
						<span
							className="fx-icon"
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					) : '' }
					{ ! removeText ? (
						<span className={ 'button-text' }>
							<RichText
								placeholder={ __( 'Add text…' ) }
								value={ text }
								onChange={ ( value ) => setAttributes( { text: value } ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
								isSelected={ isSelected }
								keepPlaceholderOnFocus
							/>
						</span>
					) : '' }
					{ icon && 'right' === iconLocation ? (
						<span
							className="fx-icon"
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					) : '' }
				</a>
				{ isSelected ? (
                    <URLInput
                        url={ url }
                        target={ target }
                        rel={ rel }
                        onChange={ ( data ) => {
                            setAttributes( data );
                        } }
                        autoFocus={ false }
                        className="fx-component-url-input-float"
                    />
                ) : '' }
			</Fragment>
		);
	}
}

export default ( FlexBlockButton );
