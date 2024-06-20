const handleDrag = (props, e) => {
	const { setState } = props;

	e.preventDefault();
	e.stopPropagation();

	if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
		setState({ dragging: true });
};

const handleDragIn = (props, e) => {
	e.preventDefault();
	e.stopPropagation();
};

const handleDragOut = (props, e) => {
	const { setState } = props;

	e.preventDefault();
	e.stopPropagation();

	setState({ dragging: false });
};

const onDrop = (newState, passedFiles, canSelectMultiple) => {
	const fileList = [];
	if (canSelectMultiple) {
		for (let i = 0; i < passedFiles.length; i++) {
			if (!passedFiles[i].name)
				return;

			fileList.push(passedFiles[i].name);
		}
		newState.files = passedFiles;
	} else {
		const list = new DataTransfer();
		list.items.add(passedFiles[0]);
		fileList.push(passedFiles[0].name);
		newState.files = list.files;
	}
	newState.fileList = fileList;
};

const handleDrop = (props, e) => {
	const { setState, state: { canSelectMultiple } } = props;

	e.preventDefault();
	e.stopPropagation();

	const newState = { dragging: false };

	if (e.dataTransfer.files && e.dataTransfer.files.length > 0)
		onDrop(newState, e.dataTransfer.files, canSelectMultiple);

	setState(newState);
};

const handleDragStart = (props, e) => {
	e.dataTransfer.clearData();
};

export const onMount = (props, ref) => {
	const { getHandler } = props;

	let div = ref.current;

	const cbDragStart = getHandler(handleDragStart);
	const cbDragIn = getHandler(handleDragIn);
	const cbDragOut = getHandler(handleDragOut);
	const cbDrag = getHandler(handleDrag);
	const cbDrop = getHandler(handleDrop);

	div.addEventListener('dragstart', cbDragStart);
	div.addEventListener('dragenter', cbDragIn);
	div.addEventListener('dragleave', cbDragOut);
	div.addEventListener('dragover', cbDrag);
	div.addEventListener('drop', cbDrop);
};

export const onInputRefChanged = (props, inputRef) => {
	const handlerOnClickButton = inputRef.current.click.bind(inputRef.current);
	props.setState({ handlerOnClickButton });
};

export const openFileSelector = (props, ref) => {
	const { state: { tOpenFileSelector }, setState } = props;
	if (!tOpenFileSelector)
		return;

	ref.current.firstChild.click();

	setState({ tOpenFileSelector: false });
};

export const handleFiles = (props, ref, e) => {
	const { setState, state: { handlerOnChange } } = props;
	let fileList = [];

	if (ref.current.files && ref.current.files.length > 0) {
		for (let i = 0; i < ref.current.files.length; i++) {
			if (!ref.current.files[i].name)
				return;

			fileList.push(ref.current.files[i].name);
		}
		setState({
			files: e.target.files,
			fileList
		});
	}

	if (handlerOnChange)
		handlerOnChange(ref);
};

