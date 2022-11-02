# The_Whales_App

2022 한이음 공모전 스마트해상물류 경진대회\_더웨일즈팀 컨트롤러 어플리케이션

## 🚀 주제

- 메타공간과 수상드론을 통한 항만 안전운항 관리 솔루션

## 작품 소개

- 시뮬레이터 + 관제 서버 + 수상드론 + APP의 조합인 안전운항 솔루션 개발
- 축소 실물 시뮬레이터를 이용, 소형선박 운항자 대상 안전교육
- 센서 모듈의 실제 선박 부착을 통한 초저지연 안전 관리
- 통합 서버를 관리함으로써, 기존 항만 안전 관리 솔루션 활용성 향상

## 📱 어플리케이션

- react-native 로 개발했다. (한계점)
- 선택 화면에서 수상드론과 시뮬레이터 중 하나를 선택하여 조종할 수 있도록 구현한다.
- 백엔드 서버와 통신하여 조종 값 전달한다.
- ~~아두이노 UNO를 통해 생성된 조종값을 블루투스 모듈을 통해 안드로이드 APP으로 전송된다.~~
- 수상드론, 시뮬레이터 둘 중 선택한 장치에 따라 해당 장치에 대한 조종값을 서버로 전송하면 서버가 수상드론 또는 시뮬레이터로 조종값을 전달한다.

### 한계점(느낀점)

- 효율성

  - 웹 프론트 개발을 위해 자바스크립트와 리액트를 공부하고 있었기 때문에 웹과 비슷하게 앱을 개발하기위해 리액트 네이티브 프레임워크를 통해 개발하게 된 것이다.
  - 웹의 페이지를 만드는 것처럼 앱의 액티비티를 자바스크립트로 제작하기 때문에 안드로이드,ios를 배우지 않았던 당시에는 진입장벽 없이 개발했다.
  - 안드로이드와 ios 둘 다 에뮬레이터에서 실행해 볼 수 있었기 때문에 동시개발할 수 있는 효율도 있었다.

- 블루투스 통신

  - 아두이노 블루투스 통신을 위해 BleManager, ble-plx 라이브러리를 둘 다 써보았는데 결국 실패했다.
  - 나중에 따로 어플리케이션과 블루투스 통신하는 사이드 프로젝트를 진행해야겠다.
