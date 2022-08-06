//board.on("ready",  function() {
	console.log('hi');
	for (var count = 0; count < 100000; count++) {
  board.digitalWrite(13,0);
  //await chill(1000);
  //board.digitalWrite(13,0);
  //await chill(1000);
}

//	});

    
	
	function chill(ms) {
		return new Promise((resolve) => {
		setTimeout(resolve, ms);
		});
	}  //end chill