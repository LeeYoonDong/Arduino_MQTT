[
        {
                "id": "bd1450de71e64bba",
                "type": "tab",
                "label": "흐름도 1",
                "disabled": false,
                "info": "",
                "env": [],
                "nodes": [
                  {
                    "id": "6a1b9073fbff523e",
                    "type": "mqtt in",
                    "z": "bd1450de71e64bba",
                    "name": "",
                    "topic": "test/dht/temperature",
                    "qos": "1",
                    "datatype": "auto-detect",
                    "broker": "8f3cac5d851f8394",
                    "nl": false,
                    "rap": true,
                    "rh": 0,
                    "inputs": 0,
                    "x": 510,
                    "y": 300,
                    "wires": [
                      [
                        "6849afc7a44e1a34",
                        "06fbcb7088ed5908"
                      ]
                    ]
                  },
                  {
                    "id": "60cbf6d2d9d9d01e",
                    "type": "mqtt in",
                    "z": "bd1450de71e64bba",
                    "name": "",
                    "topic": "test/dht/humidity",
                    "qos": "1",
                    "datatype": "auto-detect",
                    "broker": "8f3cac5d851f8394",
                    "nl": false,
                    "rap": true,
                    "rh": 0,
                    "inputs": 0,
                    "x": 520,
                    "y": 540,
                    "wires": [
                      [
                        "5a9390eea62cf5f8",
                        "dd421ae6b3c55bda"
                      ]
                    ]
                  },
                  {
                    "id": "6849afc7a44e1a34",
                    "type": "ui_gauge",
                    "z": "bd1450de71e64bba",
                    "name": "",
                    "group": "dddebc81e3ad61c8",
                    "order": 0,
                    "width": 0,
                    "height": 0,
                    "gtype": "gage",
                    "title": "Temperature",
                    "label": "C",
                    "format": "{{value}}",
                    "min": "-10",
                    "max": "40",
                    "colors": [
                      "#00b500",
                      "#e6e600",
                      "#ca3838"
                    ],
                    "seg1": "",
                    "seg2": "",
                    "className": "",
                    "x": 1130,
                    "y": 300,
                    "wires": []
                  },
                  {
                    "id": "5a9390eea62cf5f8",
                    "type": "ui_gauge",
                    "z": "bd1450de71e64bba",
                    "name": "",
                    "group": "dddebc81e3ad61c8",
                    "order": 0,
                    "width": 0,
                    "height": 0,
                    "gtype": "gage",
                    "title": "Humidity",
                    "label": "%",
                    "format": "{{value}}",
                    "min": "10",
                    "max": "100",
                    "colors": [
                      "#00b500",
                      "#e6e600",
                      "#ca3838"
                    ],
                    "seg1": "",
                    "seg2": "",
                    "className": "",
                    "x": 1140,
                    "y": 540,
                    "wires": []
                  },
                  {
                    "id": "926b8ca4d384bcf0",
                    "type": "mysql",
                    "z": "bd1450de71e64bba",
                    "mydb": "5d7dd65c812397ac",
                    "name": "",
                    "x": 930,
                    "y": 420,
                    "wires": [
                      [
                        "d03282835d199ec8"
                      ]
                    ]
                  },
                  {
                    "id": "d03282835d199ec8",
                    "type": "debug",
                    "z": "bd1450de71e64bba",
                    "name": "debug 1",
                    "active": true,
                    "tosidebar": true,
                    "console": false,
                    "tostatus": false,
                    "complete": "payload",
                    "targetType": "msg",
                    "statusVal": "",
                    "statusType": "auto",
                    "x": 1140,
                    "y": 420,
                    "wires": []
                  },
                  {
                    "id": "06fbcb7088ed5908",
                    "type": "function",
                    "z": "bd1450de71e64bba",
                    "name": "temp2db",
                    "func": "var temp = (payload: msg.payload);\nvar date = new Date(msg.payload);\nmsg.topic = \"INSERT INTO temperature(temp, date) VALUES('\" + msg.payload + \"', '\" + date.toString() + \"')\";\nreturn msg;",
                    "outputs": 1,
                    "noerr": 0,
                    "initialize": "",
                    "finalize": "",
                    "libs": [],
                    "x": 700,
                    "y": 380,
                    "wires": [
                      [
                        "926b8ca4d384bcf0"
                      ]
                    ]
                  },
                  {
                    "id": "dd421ae6b3c55bda",
                    "type": "function",
                    "z": "bd1450de71e64bba",
                    "name": "hum2db",
                    "func": "var temp = { payload: msg.payload };\nvar date = new Date(msg.payload);\nmsg.topic = \"INSERT INTO temperature(hum, date) VALUES('\" + msg.payload + \"', '\" + date.toString() + \"')\";\nreturn msg;",
                    "outputs": 1,
                    "noerr": 0,
                    "initialize": "",
                    "finalize": "",
                    "libs": [],
                    "x": 700,
                    "y": 460,
                    "wires": [
                      [
                        "926b8ca4d384bcf0"
                      ]
                    ]
                  },
                  {
                    "id": "8f3cac5d851f8394",
                    "type": "mqtt-broker",
                    "name": "",
                    "broker": "localhost",
                    "port": "1883",
                    "clientid": "",
                    "autoConnect": true,
                    "usetls": false,
                    "protocolVersion": "4",
                    "keepalive": "60",
                    "cleansession": true,
                    "birthTopic": "",
                    "birthQos": "0",
                    "birthPayload": "",
                    "birthMsg": {},
                    "closeTopic": "",
                    "closeQos": "0",
                    "closePayload": "",
                    "closeMsg": {},
                    "willTopic": "",
                    "willQos": "0",
                    "willPayload": "",
                    "willMsg": {},
                    "userProps": "",
                    "sessionExpiry": ""
                  },
                  {
                    "id": "dddebc81e3ad61c8",
                    "type": "ui_group",
                    "name": "DHT",
                    "tab": "776ba7cef4881f15",
                    "order": 1,
                    "disp": true,
                    "width": "6",
                    "collapse": false,
                    "className": ""
                  },
                  {
                    "id": "5d7dd65c812397ac",
                    "type": "MySQLdatabase",
                    "name": "",
                    "host": "127.0.0.1",
                    "port": "3306",
                    "db": "dht11",
                    "tz": "",
                    "charset": "UTF8"
                  },
                  {
                    "id": "776ba7cef4881f15",
                    "type": "ui_tab",
                    "name": "Home",
                    "icon": "dashboard",
                    "order": 1,
                    "disabled": false,
                    "hidden": false
                  }
                ]
              }
]