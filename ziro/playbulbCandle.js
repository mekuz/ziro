/* This file will contain the PlaybulbCandle Class that will be used to
 * interact with the PLAYBULB Candle Bluetooth device. */
(function() {
  'use strict';

  const CANDLE_SERVICE_UUID = 0xFF02;

  class PlaybulbCandle {
    constructor() {
      this.device = null;
    }
    connect() {
      let options = {filters:[{name:[ 
        'Zee Ro machine' ]}]};
      return navigator.bluetooth.requestDevice(options)
      .then(device=> {
        this.device = device.gatt.connect();
        return this.device;
      })
      .then(server => {
        log('GATT server connected, getting service...');

        return server.getPrimaryService(0xFFE0);
      })
/*
      .
      then(service => {
        log('Service found, getting characteristic...');

        return service.getCharacteristic(0xFFE1);
      }).
      then(characteristic => {
        log('Characteristic found');
        characteristicCache = characteristic;

        return characteristicCache;
      });
*/
      .bind(this);
    
    }
  }

  window.playbulbCandle = new PlaybulbCandle();

})();