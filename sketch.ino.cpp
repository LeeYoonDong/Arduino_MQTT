#include "DHT.h"
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>

#define WIFI_SSID "KT_GIGA_2G_Wave2_7365"  // WiFi 이름
#define WIFI_PASSWORD "7dgb0eg354"         // WiFi 비밀번호
#define MQTT_HOST IPAddress(218, 150, 45, 161)  // 라즈베리파이 컴퓨터 IP
#define MQTT_PORT 1883
#define MQTT_PUB_TEMP "esp/dht/temperature"  // MQTT 토픽
#define MQTT_PUB_HUM "esp/dht/humidity"
#define DigitalPin_DHT 7  // DHT 연결 디지털핀
#define DHTTYPE DHT11     // DHT 센서 타입

DHT dht(DigitalPin_DHT, DHTTYPE);  // DHT 센서 초기화

float temp;
float hum;

// 객체 선언
AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

unsigned long previousMillis = 0;  // 이전 센서값 측정 시간
const long interval = 30000;  // 센서값 측정 주기

void connectToWifi() {
  Serial.println("Wi-Fi 연결 중...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Wi-Fi 연결완료.");
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Wi-Fi 연결해제.");
  mqttReconnectTimer.detach();  // MQTT 재연결 타이머 해제
  wifiReconnectTimer.once(2, connectToWifi);
}

void connectToMqtt() {
  Serial.println("MQTT 연결 중...");
  mqttClient.connect();
}

void onMqttConnect(bool sessionPresent) {
  Serial.println("MQTT 연결완료.");
  Serial.print("세션 존재: ");
  Serial.println(sessionPresent);
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("MQTT 연결해제.");
  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

void onMqttPublish(uint16_t packetId) {
  Serial.println("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  dht.begin();

  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCredentials("yoondong", "jltfx2");  // 브로커 접속

  connectToWifi();
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {  // interval=30sec
    previousMillis = currentMillis;  // 이전 센서값 측정 시간 갱신

    hum = dht.readHumidity();  // 습도값 읽기
    temp = dht.readTemperature();  // 온도값 읽기

    // 온도 토픽 발행
    uint16_t packetIdPub1 = mqttClient.publish(MQTT_PUB_TEMP, 1, true, String(temp).c_str());
    Serial.printf("Publishing on topic %s at QoS 1, packetId: %i ", 
                  MQTT_PUB_TEMP, packetIdPub1);
    Serial.printf("Message: %.2f \n", temp);

    // 습도 토픽 발행
    uint16_t packetIdPub2 = mqttClient.publish(MQTT_PUB_HUM, 1, true, String(hum).c_str());
    Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", 
                  MQTT_PUB_HUM, packetIdPub2);
    Serial.printf("Message: %.2f \n", hum);
  }
}