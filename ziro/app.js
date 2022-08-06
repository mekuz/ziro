document.querySelector('#connect').addEventListener('click', function(event) {
  /* Clicking this button will attempt to connect to the PLAYBULB Candle and
   * read some values such as Device Name and Battery Level. */
   document.querySelector('#state').classList.add('connecting');
  connect();
  /*
  .then(function() {
    //console.log(playbulbCandle.device);
    document.querySelector('#state').classList.remove('connecting');
    document.querySelector('#state').classList.add('connected');
  })
  .catch(function(error) {
    console.error('Argh!', error);
  });
*/
});

let myDevice; //the device
let SEND_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';

let SEND_SERVICE_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
let RES_SERVICE_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

let toggleChar;//toggle characteristic
let notifyChar;//for receiving notifications

const toggleButton = document.getElementById('toggle');
function connect()
{
     navigator.bluetooth.requestDevice({
    /*filters:
      [
        { name: 'Zee Ro machine' },
        { services: [SEND_SERVICE] },
      ]
      */
      acceptAllDevices: true
  })
    .then(device => {
      myDevice = device;
      console.log (device);
      return device.gatt.connect();
    })
    .then(server => server.getPrimaryService(SEND_SERVICE))
    .then(service => service.getCharacteristics())
    .then(chas => {
      chas.forEach( ch => {
          if(ch.uuid == SEND_SERVICE_CHARACTERISTIC)
          {
              toggleChar = ch;//set the one for sending
          }
          else if(ch.uuid == RES_SERVICE_CHARACTERISTIC)
          {
              notifyChar = ch;//set the one for receiv
              //start notifications
              notifyChar.startNotifications()
              .then( note => { //the notification
                  notifyChar.addEventListener('characteristicvaluechanged',handleNotif);
              });
          }//end else if
       });
     
    })
    .catch(error => {
      console.error(error);
    });

}//end connect

function doToggle() {
  /* This function is called when user clicks on an effect radio button. */
  console.log('toggle');
  //send toggle message
  var enc = new TextEncoder(); // always utf-8
  let val = enc.encode("red_led");
  toggleChar.writeValueWithResponse(val)
  .then(function(res) {
    console.log(toggleChar);

   });

}

function handleNotif(){
   const characteristic = event.target;
  let val = new TextDecoder().decode(characteristic.value); // always utf-8
  console.log(val);
}

document.querySelector('#toggle').addEventListener('click', doToggle);
