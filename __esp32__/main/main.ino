#define RELAY_1 1
#define RELAY_2 2
#define RELAY_3 41
#define RELAY_4 42
#define RELAY_5 45
#define RELAY_6 46

#define RS485_TX 17
#define RS485_RX 18

#define BUZZER 21

// -----------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(RELAY_3, OUTPUT);
  pinMode(RELAY_4, OUTPUT);
  pinMode(RELAY_5, OUTPUT);
  pinMode(RELAY_6, OUTPUT);
}

void loop() {
  uint p1 = random(1000);
  uint p2 = random(1000);
  uint p3 = random(1000);

  sendSerial("p1", String(p1));
  sendSerial("p2", String(p2));
  sendSerial("p3", String(p3));

  readSerial();

  vTaskDelay(pdMS_TO_TICKS(100));
}

// -----------------------------------------------------------------------------
void sendSerial(String cmd, String value) {
  Serial.print(cmd + String(":") + value + String(";"));
}

void readSerial() {
  while (Serial.available()) {
    String data = Serial.readStringUntil(';');
    onSerialData(data);
  }
}

void onSerialData(String data) {
  if (data.startsWith("sync:")) {
    sendSerial("rly1", String(digitalRead(RELAY_1)));
    sendSerial("rly2", String(digitalRead(RELAY_2)));
    sendSerial("rly3", String(digitalRead(RELAY_3)));
    sendSerial("rly4", String(digitalRead(RELAY_4)));
    sendSerial("rly5", String(digitalRead(RELAY_5)));
    sendSerial("rly6", String(digitalRead(RELAY_6)));

  } else if (data.startsWith("rly1:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_1, value);
    sendSerial("rly1", String(value));

  } else if (data.startsWith("rly2:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_2, value);
    sendSerial("rly2", String(value));

  } else if (data.startsWith("rly3:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_3, value);
    sendSerial("rly3", String(value));

  } else if (data.startsWith("rly4:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_4, value);
    sendSerial("rly4", String(value));

  } else if (data.startsWith("rly5:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_5, value);
    sendSerial("rly5", String(value));

  } else if (data.startsWith("rly6:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_6, value);
    sendSerial("rly6", String(value));
  }
}
