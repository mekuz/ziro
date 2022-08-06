const { ipcRenderer } = require('electron');
 
function init() {
  // add global variables to your web page
  window.isElectron = true;
  //we need the ipcRenderer to send messages to and fro. i
  window.ipcRenderer = ipcRenderer;
}

//start
init();
//log
console.log('pre load');
		