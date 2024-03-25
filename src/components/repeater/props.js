/* eslint-disable max-len */

//External Props
import { propsSharedDataLoader, propsSharedDataLoaderExternal } from '@intenda/opus-ui';

//Props
const props = {
	rowMda: {
		type: 'object',
		desc: 'Metadata that should go inside each repeater row'
	},
	rowPrps: {
		type: 'object',
		desc: 'Properties that should be applied to each row\'s mda',
		dft: () => ({})
	},
	elementIdFormat: {
		type: 'string',
		desc: 'A template string defining how each wgt\'s id should be formatted'
	},
	rowMdaScope: {
		type: 'string',
		desc: 'Defines a scope for use when replacing accessors inside rowMda of nested repeaters'
	},
	virtualized: {
		type: 'boolean',
		desc: 'When set to true, contents will be dynamically rendered as and when needed. Useful for when there are hundreds of elements being rendered that slows down the browser. When this is set to true, the component height or width must also be set (depending on the virtualizedDirection) and has to be of the form ???px'
	},
	virtualizedDirection: {
		type: 'string',
		desc: 'Defines the directon in which virtualized elements should be rendered',
		options: ['vertical', 'horizontal'],
		dft: ({ virtualized }) => {
			return virtualized ? 'vertical' : undefined;
		}
	},
	virtualizedItemSize: {
		type: 'integer',
		desc: 'Defines the height or width of virtualized items (depending on virtualizedDirection). If this is not known and set, virtualization can not be used'
	}
};

export default Object.assign(props, propsSharedDataLoader, propsSharedDataLoaderExternal, {
	//Overrides
	pageSize: { dft: 10 }
});
