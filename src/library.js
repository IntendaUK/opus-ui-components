//Components
import { AudioPlayer } from './components/audioPlayer';
import { AudioRecorder } from './components/audioRecorder';
import { Button } from './components/button';
import { Camera } from './components/camera';
import { Canvas } from './components/canvas';
import { Checkbox } from './components/checkbox';
import { Code } from './components/code';
import { DatePicker } from './components/datePicker';
import { Divider } from './components/divider';
import { FocusLine } from './components/focusLine';
import { Html } from './components/html';
import { Icon } from './components/icon';
import { Image } from './components/image';
import { Input } from './components/input';
import { Label } from './components/label';
import { MarkdownLabel } from './components/markdownLabel';
import { Notifications } from './components/notifications';
import { ProgressBar } from './components/progressBar';
import { Radio } from './components/radio';
import { Repeater } from './components/repeater';
import { Resizer } from './components/resizer';
import { Slider } from './components/slider';
import { Spinner } from './components/spinner';
import { Tab } from './components/tab';
import { TabContainer } from './components/tabContainer';
import { TimePicker } from './components/timePicker';
import { Treeview } from './components/treeview';
import { Upload } from './components/upload';
import { Url } from './components/url';
import { VideoPlayer } from './components/videoPlayer';
import { WebSocket } from './components/webSocket';

//PropSpecs
import propsAudioPlayer from './components/audioPlayer/props';
import propsAudioRecorder from './components/audioRecorder/props';
import propsButton from './components/button/props';
import propsCamera from './components/camera/props';
import propsCanvas from './components/canvas/props';
import propsCheckbox from './components/checkbox/props';
import propsCode from './components/code/props';
import propsDatePicker from './components/datePicker/props';
import propsDivider from './components/divider/props';
import propsFocusLine from './components/focusLine/props';
import propsHtml from './components/html/props';
import propsIcon from './components/icon/props';
import propsImage from './components/image/props';
import propsInput from './components/input/props';
import propsLabel from './components/label/props';
import propsMarkdownLabel from './components/markdownLabel/props';
import propsNotifications from './components/notifications/props';
import propsProgressBar from './components/progressBar/props';
import propsRadio from './components/radio/props';
import propsRepeater from './components/repeater/props';
import propsResizer from './components/resizer/props';
import propsSlider from './components/slider/props';
import propsSpinner from './components/spinner/props';
import propsTab from './components/tab/props';
import propsTabContainer from './components/tabContainer/props';
import propsTimePicker from './components/timePicker/props';
import propsTreeview from './components/treeview/props';
import propsUpload from './components/upload/props';
import propsUrl from './components/url/props';
import propsVideoPlayer from './components/videoPlayer/props';
import propsWebSocket from './components/webSocket/props';

import 'material-icons/iconfont/material-icons.css';

import { registerComponentTypes } from '@intenda/opus-ui';

registerComponentTypes([{
	type: 'audioPlayer',
	component: AudioPlayer,
	propSpec: propsAudioPlayer
},
{
	type: 'audioRecorder',
	component: AudioRecorder,
	propSpec: propsAudioRecorder
},
{
	type: 'button',
	component: Button,
	propSpec: propsButton
},
{
	type: 'camera',
	component: Camera,
	propSpec: propsCamera
},
{
	type: 'canvas',
	component: Canvas,
	propSpec: propsCanvas
},
{
	type: 'checkbox',
	component: Checkbox,
	propSpec: propsCheckbox
},
{
	type: 'code',
	component: Code,
	propSpec: propsCode
},
{
	type: 'datePicker',
	component: DatePicker,
	propSpec: propsDatePicker
},
{
	type: 'divider',
	component: Divider,
	propSpec: propsDivider
},
{
	type: 'focusLine',
	component: FocusLine,
	propSpec: propsFocusLine
},
{
	type: 'html',
	component: Html,
	propSpec: propsHtml
},
{
	type: 'icon',
	component: Icon,
	propSpec: propsIcon
},
{
	type: 'image',
	component: Image,
	propSpec: propsImage
},
{
	type: 'input',
	component: Input,
	propSpec: propsInput
},
{
	type: 'label',
	component: Label,
	propSpec: propsLabel
},
{
	type: 'markdownLabel',
	component: MarkdownLabel,
	propSpec: propsMarkdownLabel
},
{
	type: 'notifications',
	component: Notifications,
	propSpec: propsNotifications
},
{
	type: 'progressBar',
	component: ProgressBar,
	propSpec: propsProgressBar
},
{
	type: 'radio',
	component: Radio,
	propSpec: propsRadio
},
{
	type: 'repeater',
	component: Repeater,
	propSpec: propsRepeater
},
{
	type: 'resizer',
	component: Resizer,
	propSpec: propsResizer
},
{
	type: 'slider',
	component: Slider,
	propSpec: propsSlider
},
{
	type: 'spinner',
	component: Spinner,
	propSpec: propsSpinner
},
{
	type: 'tab',
	component: Tab,
	propSpec: propsTab
},
{
	type: 'tabContainer',
	component: TabContainer,
	propSpec: propsTabContainer
},
{
	type: 'timePicker',
	component: TimePicker,
	propSpec: propsTimePicker
},
{
	type: 'treeview',
	component: Treeview,
	propSpec: propsTreeview
},
{
	type: 'upload',
	component: Upload,
	propSpec: propsUpload
},
{
	type: 'url',
	component: Url,
	propSpec: propsUrl
},
{
	type: 'videoPlayer',
	component: VideoPlayer,
	propSpec: propsVideoPlayer
},
{
	type: 'webSocket',
	component: WebSocket,
	propSpec: propsWebSocket
}]);
