#define RELAY_1 1
#define RELAY_2 2
#define RELAY_3 41
#define RELAY_4 42
#define RELAY_5 45
#define RELAY_6 46

#define BUZZER 21

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
  uint P1 = random(1000);
  uint P2 = random(1000);
  uint P3 = random(1000);

  Serial.print(String("P1:") + String(P1) + String(";"));
  Serial.print(String("P2:") + String(P2) + String(";"));
  Serial.print(String("P3:") + String(P3) + String(";"));

  digitalWrite(RELAY_1, HIGH);
  digitalWrite(RELAY_2, HIGH);
  digitalWrite(RELAY_3, HIGH);
  digitalWrite(RELAY_4, HIGH);
  digitalWrite(RELAY_5, HIGH);
  digitalWrite(RELAY_6, HIGH);

  vTaskDelay(pdMS_TO_TICKS(2000));

  digitalWrite(RELAY_1, LOW);
  digitalWrite(RELAY_2, LOW);
  digitalWrite(RELAY_3, LOW);
  digitalWrite(RELAY_4, LOW);
  digitalWrite(RELAY_5, LOW);
  digitalWrite(RELAY_6, LOW);

  vTaskDelay(pdMS_TO_TICKS(2000));
}

void serialEvent() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil(';');

    Serial.print(String("rcv:") + String(cmd) + String(";"));
  }
}
