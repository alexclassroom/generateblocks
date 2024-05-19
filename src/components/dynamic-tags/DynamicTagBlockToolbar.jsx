import { ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { DynamicTagDropdown } from './DynamicTagDropdown.jsx';

export function DynamicTagBlockToolbar( { onInsert, tooltip, renderToggle = false, content } ) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<DynamicTagDropdown
					onInsert={ onInsert }
					tooltip={ tooltip }
					renderToggle={ renderToggle }
					content={ content }
				/>
			</ToolbarGroup>
		</BlockControls>

	);
}
