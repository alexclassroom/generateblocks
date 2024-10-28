import queryParameterOptions from '../../query-loop/query-parameters';
import ParameterControl from '../../../components/inspector-controls/parameter-list/ParameterControl';

const getParametersList = ( query ) => {
	const options = queryParameterOptions.filter( ( param ) => param.isSticky );

	return options.concat( Object.keys( query ).map( ( id ) => (
		queryParameterOptions.find( ( param ) => ( id === param.id && ! param.isSticky ) )
	) ).filter( Boolean ) );
};

export default ( { query, setParameter, removeParameter } ) => {
	const parameterList = getParametersList( query );

	return (
		<>
			<div style={ { marginBottom: '1.33em' } }>
				{ parameterList && parameterList.map( ( parameter ) => (
					<ParameterControl
						key={ parameter.id }
						parameter={ parameter }
						query={ query }
						setParameter={ setParameter }
						removeParameter={ removeParameter }
					/>
				) ) }
			</div>
		</>
	);
};
