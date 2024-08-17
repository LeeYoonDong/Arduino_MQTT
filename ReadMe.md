# IoT DHT11 센서 데이터 수집 및 시각화 시스템

이 프로젝트는 Arduino Uno와 ESP8266을 사용하여 DHT11 센서의 온습도 데이터를 수집하고, MQTT를 통해 데이터를 전송하며, Node-RED를 사용하여 데이터를 시각화하고 MySQL 데이터베이스에 저장하는 IoT 시스템입니다.

## 목차

1. [개요](#개요)
2. [사용된 기술](#사용된-기술)
3. [하드웨어 구성](#하드웨어-구성)
4. [소프트웨어 구성](#소프트웨어-구성)
5. [설치 방법](#설치-방법)
6. [사용 방법](#사용-방법)
7. [프로젝트 구조](#프로젝트-구조)
8. [향후 개선 사항](#향후-개선-사항)

## 개요

이 프로젝트는 IoT 시스템의 기본적인 구조를 구현합니다. DHT11 센서에서 수집된 온습도 데이터를 ESP8266을 통해 MQTT 브로커로 전송하고, Node-RED에서 이 데이터를 받아 실시간으로 시각화하며 MySQL 데이터베이스에 저장합니다.

## 사용된 기술

- Arduino Uno
- ESP8266 Wi-Fi 모듈
- DHT11 온습도 센서
- MQTT (Mosquitto)
- Node-RED
- MySQL 데이터베이스

## 하드웨어 구성

- Arduino Uno + ESP8266 쉴드
- DHT11 센서 (디지털 핀 7번에 연결)

## 소프트웨어 구성

1. Arduino 스케치: ESP8266을 통해 Wi-Fi 연결 및 MQTT 통신
2. Node-RED 플로우: MQTT 데이터 수신, 시각화, 데이터베이스 저장
3. MySQL 데이터베이스: 센서 데이터 저장

## 설치 방법

1. Arduino IDE 설치 및 ESP8266 보드 추가
2. 필요한 라이브러리 설치:
   - DHT sensor library
   - ESP8266WiFi
   - Ticker
   - AsyncMqttClient
3. Node-RED 설치 및 필요한 노드 추가:
   - node-red-dashboard
   - node-red-node-mysql
4. MySQL 데이터베이스 설치 및 구성

## 사용 방법

1. Arduino 스케치 업로드:
   - Wi-Fi 및 MQTT 브로커 설정 수정
   - 스케치 업로드
2. Node-RED 플로우 가져오기:
   - 제공된 flows.json 파일 가져오기
   - MQTT 브로커 및 MySQL 연결 설정 수정
3. MySQL 데이터베이스 구성:
   - 'dht11' 데이터베이스 생성
   - 'temperature' 및 'humidity' 테이블 생성
4. 시스템 실행:
   - Arduino 및 센서 전원 연결
   - Node-RED 플로우 배포
   - 대시보드에서 데이터 확인

## 프로젝트 구조

- `arduino_sketch/`: Arduino 스케치 파일
- `node_red_flows/`: Node-RED 플로우 JSON 파일
- `database/`: MySQL 데이터베이스 스키마 및 쿼리

## 향후 개선 사항

- 실제 하드웨어 구성 및 테스트
- 보안 강화 (SSL/TLS 적용)
- 데이터 분석 기능 추가

<br/>
<br/>

# IoT DHT11 Sensor Data Collection and Visualization System

This project implements an IoT system that collects temperature and humidity data from a DHT11 sensor using Arduino Uno and ESP8266, transmits the data via MQTT, and uses Node-RED to visualize the data and store it in a MySQL database.

## Table of Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Hardware Setup](#hardware-setup)
4. [Software Setup](#software-setup)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Project Structure](#project-structure)
8. [Future Improvements](#future-improvements)

## Overview
This project implements a basic structure of an IoT system. It collects temperature and humidity data from a DHT11 sensor, transmits it to an MQTT broker via ESP8266, and then uses Node-RED to receive this data for real-time visualization and storage in a MySQL database.

## Technologies Used
- Arduino Uno
- ESP8266 Wi-Fi module
- DHT11 temperature and humidity sensor
- MQTT (Mosquitto)
- Node-RED
- MySQL database

## Hardware Setup
- Arduino Uno + ESP8266 shield
- DHT11 sensor (connected to digital pin 7)

## Software Setup
1. Arduino sketch: Wi-Fi connection and MQTT communication via ESP8266
2. Node-RED flow: MQTT data reception, visualization, and database storage
3. MySQL database: Sensor data storage

## Installation
1. Install Arduino IDE and add ESP8266 board
2. Install required libraries:
   - DHT sensor library
   - ESP8266WiFi
   - Ticker
   - AsyncMqttClient
3. Install Node-RED and add necessary nodes:
   - node-red-dashboard
   - node-red-node-mysql
4. Install and configure MySQL database

## Usage
1. Upload Arduino sketch:
   - Modify Wi-Fi and MQTT broker settings
   - Upload sketch
2. Import Node-RED flow:
   - Import provided flows.json file
   - Modify MQTT broker and MySQL connection settings
3. Configure MySQL database:
   - Create 'dht11' database
   - Create 'temperature' and 'humidity' tables
4. Run the system:
   - Connect Arduino and sensor to power
   - Deploy Node-RED flow
   - Check data on the dashboard

## Project Structure
- `arduino_sketch/`: Arduino sketch files
- `node_red_flows/`: Node-RED flow JSON files
- `database/`: MySQL database schema and queries

## Future Improvements
- Actual hardware setup and testing
- Enhance security (apply SSL/TLS)
- Add data analysis features

