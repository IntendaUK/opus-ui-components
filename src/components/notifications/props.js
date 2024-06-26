/* eslint-disable max-len */

//CSS Map Functions
import { mapToColor } from '@intenda/opus-ui';

//Props
const props = {
	newMsg: {
		type: 'object',
		desc: 'The notification message object',
		spec: {
			msg: 'string',
			autoClose: 'boolean',
			duration: 'number',
			isGlobal: 'boolean'
		}
	},
	duration: {
		type: 'number',
		desc: 'The default duration that the message should be shown for',
		dft: 3000
	},
	colorBackgroundWarning: {
		type: 'string',
		desc: 'A string that defines the background color of warning type notifications',
		cssVar: 'color-background-warning',
		cssVarVal: mapToColor
	},
	colorBackgroundInfo: {
		type: 'string',
		desc: 'A string that defines the background color of info type notifications',
		cssVar: 'color-background-info',
		cssVarVal: mapToColor
	},
	colorBackgroundDanger: {
		type: 'string',
		desc: 'A string that defines the background color of danger type notifications',
		cssVar: 'color-background-danger',
		cssVarVal: mapToColor
	},
	colorBackgroundSuccess: {
		type: 'string',
		desc: 'A string that defines the background color of success type notifications',
		cssVar: 'color-background-success',
		cssVarVal: mapToColor
	},
	prpsLabel: {
		type: 'object',
		desc: 'A object that defines additional config props for notification labels',
		dft: () => ({})
	},
	prpsIcon: {
		type: 'object',
		desc: 'A object that defines additional config props for notification close icons',
		dft: () => ({})
	},
	msgTypeMda: {
		type: 'object',
		desc: 'Defines custom metadata for custom message types. Said metadata will receive the following prps (and blueprintPrps where applicable): notificationsComponentId, notificationId and msg',
		spec: {
			msgType1: {
				type: 'container',
				wgts: [
					{
						type: 'label',
						prps: { cpt: 'I am a custom message' }
					}
				]
			}
		}
	},
	removeMsg: {
		type: 'object',
		desc: 'Informs the component that a message needs to be closed',
		spec: { notificationId: 'The id of the notification to be removed' }
	}
};

export default props;
