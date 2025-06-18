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
TaskHandle_t handler_task = NULL;

// -----------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(RELAY_3, OUTPUT);
  pinMode(RELAY_4, OUTPUT);
  pinMode(RELAY_5, OUTPUT);
  pinMode(RELAY_6, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  // Task
  xTaskCreate(taskMeasurement, "taskMeasurement", 8192, NULL, 1, &handler_task);
}

void loop() {
  readSerial();
  vTaskDelay(pdMS_TO_TICKS(100));
}

void taskMeasurement(void *params) {
  TickType_t elapsed_time = xTaskGetTickCount();

  for (;;) {
    uint p1 = random(1000);
    uint p2 = random(1000);
    uint p3 = random(1000);

    sendSerial(cmd("p1", String(p1)) + cmd("p2", String(p2)) + cmd("p3", String(p3)));

    vTaskDelayUntil(&elapsed_time, pdMS_TO_TICKS(1000));
  }
}

// -----------------------------------------------------------------------------
void sendSerial(String data) {
  Serial.print(data.substring(0, data.length() - 1) + ";");
}

String cmd(String key, String value) {
  return String(key + ":" + value + ",");
}

void readSerial() {
  while (Serial.available()) {
    String data = Serial.readStringUntil(';');
    onSerialData(data);
  }
}

void onSerialData(String data) {
  if (data.startsWith("sync:")) {

    String rly1_v = String(digitalRead(RELAY_1));
    String rly2_v = String(digitalRead(RELAY_2));
    String rly3_v = String(digitalRead(RELAY_3));
    String rly4_v = String(digitalRead(RELAY_4));
    String rly5_v = String(digitalRead(RELAY_5));
    String rly6_v = String(digitalRead(RELAY_6));

    sendSerial(cmd("rly1", rly1_v)
               + cmd("rly2", rly2_v)
               + cmd("rly3", rly3_v)
               + cmd("rly4", rly4_v)
               + cmd("rly5", rly5_v)
               + cmd("rly6", rly6_v));

  } else if (data.startsWith("rly1:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_1, value);
    sendSerial(cmd("rly1", String(value)));

  } else if (data.startsWith("rly2:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_2, value);
    sendSerial(cmd("rly2", String(value)));

  } else if (data.startsWith("rly3:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_3, value);
    sendSerial(cmd("rly3", String(value)));

  } else if (data.startsWith("rly4:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_4, value);
    sendSerial(cmd("rly4", String(value)));

  } else if (data.startsWith("rly5:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_5, value);
    sendSerial(cmd("rly5", String(value)));

  } else if (data.startsWith("rly6:")) {
    int value = data.substring(5).toInt();
    digitalWrite(RELAY_6, value);
    sendSerial(cmd("rly6", String(value)));

  } else if (data.startsWith("buzz:")) {
    int value = data.substring(5).toInt();
    analogWrite(BUZZER, value ? 200 : 0);
    sendSerial(cmd("buzz", String(value)));
  }
}
