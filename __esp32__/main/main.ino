void setup() {
  Serial.begin(115200);
}

void loop() {
  uint P1 = random(1000);
  uint P2 = random(1000);
  uint P3 = random(1000);

  Serial.print(String("P1:") + String(P1) + String(";"));
  Serial.print(String("P2:") + String(P2) + String(";"));
  Serial.print(String("P3:") + String(P3) + String(";"));

  vTaskDelay(pdMS_TO_TICKS(500));
}

void serialEvent() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil(';');

    Serial.print(String("rcv:") + String(cmd) + String(";"));
  }
}
