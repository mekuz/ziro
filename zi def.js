Blockly.defineBlocksWithJsonArray([{
  "type": "io_digital_write",
  "message0": "Set digital pin %1 to %2",
  "args0": [
    {
      "type": "field_number",
      "name": "pin number",
      "value": 0,
      "min": 0,
      "max": 13
    },
    {
      "type": "field_dropdown",
      "name": "pin value",
      "options": [
        [
          "HIGH",
          "HIGH"
        ],
        [
          "LOW",
          "LOW"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "io_digital_read",
  "message0": "Read value of digital pin %1",
  "args0": [
    {
      "type": "field_number",
      "name": "pin name",
      "value": 2,
      "min": 2,
      "max": 13
    }
  ],
  "inputsInline": true,
  "output": [
    "Number",
    "Boolean"
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "io_get_distance",
  "message0": "Get the distance in CM of the ultrasonic sesnsor connected to pin %1",
  "args0": [
    {
      "type": "field_number",
      "name": "pin name",
      "value": 4,
      "min": 2,
      "max": 13
    }
  ],
  "inputsInline": true,
  "output": [
    "Number",
    "Boolean"
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "wait",
  "message0": "wait for %1 seconds",
  "args0": [
    {
      "type": "field_number",
      "name": "NAME",
      "value": 1,
      "min": 0
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "start_block",
  "message0": "Start",
  "nextStatement": null,
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
}]
);