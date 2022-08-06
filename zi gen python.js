//generate python code

Blockly.Python['io_digital_write'] = function(block) {
  var number_pin_number = block.getFieldValue('pin number');
  var dropdown_pin_value = block.getFieldValue('pin value');
  // TODO: Assemble Python into code variable.
  
  if (dropdown_pin_value=="HIGH"){
	  dropdown_pin_value = 1;
  }else dropdown_pin_value= 0;
  var code = 'digitalWrite('+number_pin_number+','+dropdown_pin_value +');\n';
  return code;
};



Blockly.Python['io_digital_read'] = function(block) {
  var number_pin_name = block.getFieldValue('pin name');
  // TODO: Assemble Python into code variable.
  var code = 'getZiDR('+number_pin_name+')';
 
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['io_get_distance'] = function(block) {
  var number_pin_name = block.getFieldValue('pin name');
  // TODO: Assemble Python into code variable.
  var code = 'getZiDI('+number_pin_name+')';
  //let's us know that this guy is for distace and should not be read as analog input
  inMode[number_pin_name] = 'distance';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['wait'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  var code = 'waitFor('+Math.round(number_name*1000)+');\n';
  return code;
};

Blockly.Python['start_block'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '\n';
  return code;
};

Blockly.Python['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Python.ORDER_ATOMIC];
};

