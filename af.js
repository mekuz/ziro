
	}

    function sendZiDW(pin, val){
		ardPort.write('ziDW '+pin+ ' '+ val +'\r\n')
	}
	
	function chill(ms) {
		return new Promise((resolve) => {
		setTimeout(resolve, ms);
		});
	}  //end chill