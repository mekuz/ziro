			
			
			
			//initialize the interpreter
			 var initInterpreter = function(interpreter, globalObject) {
		      
		      //we have to link our functions to interpreter functions


		      interpreter.setProperty(globalObject, 'doSend',
		          interpreter.createNativeFunction(function(data){
		          		return doSend(data);//call the doSend function
		          }));

		      //getZiDR, read a digital pin
		      interpreter.setProperty(globalObject, 'getZiDR',
		          interpreter.createNativeFunction(function(pin){
		          		return analogRead[pin];
		          }));

		      //getZiDI, get the distance
		      interpreter.setProperty(globalObject, 'getZiDI',
		          interpreter.createNativeFunction(function(pin){
		          		return getDistance[pin];
		          }));

		      //alert now console.log
		      interpreter.setProperty(globalObject, 'alert',
		          interpreter.createNativeFunction(function(text) {
		        return console.log(text);
		      }));

		      //wait for seconds
		      // Ensure function name does not conflict with variable names.
			  Blockly.JavaScript.addReservedWords('waitFor');
			  interpreter.setProperty(globalObject, 'waitFor', interpreter.createAsyncFunction(
			    function(the_duration, callback) {
			      // Delay the call to the callback.
			      setTimeout(callback, the_duration);
			    }) );

		    };//end initInterpreter

		    var myInterpreter = null;
    		var runner;

		    function resetInterpreter() {
		      myInterpreter = null;
		      if (runner) {
		        clearTimeout(runner);
		        runner = null;
		      }

		    }//end resetInterpreter
  			
  			 function runCode( ) {
  			 	//set the input inModes
  			 	$.each(inMode, function(pin, value){
  			 		doSend('ziIM '+pin+ ' '+value);
  			 	});

				//storeWorkspace();//save workspace
				//ger js code
				
				code =$('#op-js').val();

				let startTime = new Date();
				startTime = startTime.getTime();
				console.log("start");
				//eval("(async ()=> {" + code + "})();");
				myInterpreter = new Interpreter(code, initInterpreter);
				
		          runner = function() {
		            if (myInterpreter) {
		              var hasMore = myInterpreter.run();
		              if (hasMore) {
		                // Execution is currently blocked by some async call.
		                // Try again later.
		                setTimeout(runner, 10);
		              }//end if hasmore
		              else {
		                // Program is complete.
		                let finishTime = new Date();
		                finishTime = finishTime.getTime();
		                console.log("Completed in"+ (finishTime-startTime)+ 'ms');
		                resetInterpreter();
		              }
		            }
		          };//end runner
		          runner();

				
			}//end runCode

			function storeWorkspace()
			{
				 var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
				var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
				localStorage.setItem("blockly.xml", xmlText);
			}
			
			function loadWorkspace() {
				var xmlText = localStorage.getItem("blockly.xml");
				if (xmlText) {
					Blockly.mainWorkspace.clear();
					xmlDom = Blockly.Xml.textToDom(xmlText);
					Blockly.Xml.domToWorkspace(xmlDom,Blockly.mainWorkspace,);
				}
			}
		
			//send out instructions to the robot
			function doSend(data)
			{
				console.log(data);
		        ipc.send('do', data);//just send this data
			}//end doSend
	

			//receiver functions
			let analogRead = {};
			
			ipc.on('analogRead', (event, data) => {
				//convert the data to json, parse it and store
					analogRead = JSON.parse('['+data+']');
					//console.log(data);
			});

			let getDistance = {};

			ipc.on('getDistance', (event, data) => {
				//convert the data to json, parse it and store
					getDistance = JSON.parse('['+data+']');
					//console.log(data);
			});

