ipc.on('initSaveFile', (event, data) => {
	console.log('asked to save the file');
	saveFile(event);//pass this event so we can send back,
});

ipc.on('initSaveFileAs', (event, data) => {
	console.log('asked to save the file as');
	saveFile(event, true);//pass this event so we can send back, isDialog,true
});


function saveFile(event,isDialog){
	 let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);//the xml
	let xmlText = Blockly.Xml.domToPrettyText(xmlDom);//the text

	let data = {
		workspace: xmlText,
		language: 'blockly',
		path : currentFilePath
	};//store details in an object
	console.log("isDialog "+isDialog);

	if(isDialog)//dialog was specifically requested for
	{
		event.sender.send('saveFileDialog', data);
	}
	else if(!currentFilePath)//where we have fresh file
	{
		event.sender.send('saveFileDialog', data);
	}
	else //we have a returning file, saving to same file path
	{
		event.sender.send('saveFile', data);
	}

}//end function saveFile

ipc.on('fileToOpen', (event, data) => {
	console.log('asked to open file');
	let fileData = JSON.parse(data);//convert to obj
	let xmlText = fileData.workspace;//
	if (xmlText) {
					Blockly.mainWorkspace.clear();
					xmlDom = Blockly.Xml.textToDom(xmlText);
					Blockly.Xml.domToWorkspace(xmlDom,Blockly.mainWorkspace,);
				}
});

let  currentFilePath='';

ipc.on('fileSavePath', (event, filePath) => {
	currentFilePath = filePath;//set the current filePath
	console.log(filePath);
	renameFileTitle(filePath.substring(filePath.lastIndexOf("\\")+1, filePath.lastIndexOf('.')));

});

ipc.on('newFile', (event) => {
	currentFilePath = '';//clear the filePath
	console.log("New File");
	freshWorkspace();
	renameFileTitle("New");
});

function renameFileTitle(fileTitle){
	document.title = "Zion Robotics: "+ fileTitle.toUpperCase();
}