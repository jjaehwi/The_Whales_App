import * as React from 'react';
import {useEffect} from 'react';
import {useState, Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  FlatList,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

// import {BleManager} from 'react-native-ble-plx';
import BleManager from '../../BleManager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function SimulationMainScreen({navigation}) {
  const [displayText, setDisplayText] = useState(['스캔']);
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true)
        .then(results => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = data => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  };

  const handleDiscoverPeripheral = peripheral => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const testPeripheral = peripheral => {
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              setList(Array.from(peripherals.values()));
            }
            console.log('Connected to ' + peripheral.id);

            setTimeout(() => {
              /* Test read current RSSI value */
              BleManager.retrieveServices(peripheral.id).then(
                peripheralData => {
                  console.log('Retrieved peripheral services', peripheralData);

                  BleManager.readRSSI(peripheral.id).then(rssi => {
                    console.log('Retrieved actual RSSI value', rssi);
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                      p.rssi = rssi;
                      peripherals.set(peripheral.id, p);
                      setList(Array.from(peripherals.values()));
                    }
                  });
                },
              );
            }, 900);
          })
          .catch(error => {
            console.log('Connection error', error);
          });
      }
    }
  };

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

    return () => {
      console.log('unmount');
      bleManagerEmitter.removeListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
      bleManagerEmitter.removeListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      );
      bleManagerEmitter.removeListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      );
    };
  }, []);

  const renderItem = item => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => testPeripheral(item)}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#333333',
              padding: 10,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
            }}>
            RSSI: {item.rssi}
          </Text>
          <Text
            style={{
              fontSize: 8,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
              paddingBottom: 20,
            }}>
            {item.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  // const [deviceScan, setDeviceScan] = useState(false);
  // const [devices, setDevices] = useState([]);

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use Bluetooth');

  //       const _BleManager = new BleManager();
  //       _BleManager.startDeviceScan(null, null, async (error, device) => {
  //         if (error) {
  //           console.log('Error at if(error): ', error);
  //           return null;
  //         }
  //         if (!device) {
  //           console.log('Error at if(device === null)');
  //           return null;
  //         }
  //         if (device.name === 'HC-06' || device.id === '88:25:83:F0:30:BC') {
  //           manager.stopDeviceScan();
  //           console.log(device);

  //           /* serviceUUID = 00001101-0000-1000-8000-00805F9B34FB */
  //           if (device.serviceUUIDs) {
  //             console.log(device.serviceUUIDs);
  //             console.log(device.name);
  //           }
  //           const deviceConnected = await device.connect();
  //           console.log(deviceConnected);
  //           console.log(deviceConnected.id);
  //           console.log(deviceConnected.name);
  //           console.log(
  //             deviceConnected.serviceUUIDs,
  //           ); /* HERE THE servicesUUIDs is NULL */
  //         }
  //       });
  //     } else {
  //       console.log('Bluetooth permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // function startScan() {
  //   const _BleManager = new BleManager();
  //   _BleManager.startDeviceScan(null, null, async (error, device) => {
  //     if (error) {
  //       console.log('Error at if(error): ', error);
  //       return null;
  //     }
  //     if (!device) {
  //       console.log('Error at if(device === null)');
  //       return null;
  //     }
  //     if (device.name === 'HC-06' || device.id === '88:25:83:F0:30:BC') {
  //       manager.stopDeviceScan();
  //       console.log(device);

  //       /* serviceUUID = 00001101-0000-1000-8000-00805F9B34FB */
  //       if (device.serviceUUIDs) {
  //         console.log(device.serviceUUIDs);
  //         console.log(device.name);
  //       }
  //       const deviceConnected = await device.connect();
  //       console.log(deviceConnected);
  //       console.log(deviceConnected.id);
  //       console.log(deviceConnected.name);
  //       console.log(
  //         deviceConnected.serviceUUIDs,
  //       ); /* HERE THE servicesUUIDs is NULL */
  //     }
  //   });
  // }

  // const connectDevice = device => {
  //   _BleManager.stopDeviceScan();
  //   _BleManager.connectToDevice(device.id).then(async device => {
  //     await device.discoverAllServicesAndCharacteristics();
  //     _BleManager.stopDeviceScan();
  //     setDisplayText(`Device connected\n with ${device.name}`);
  //     setConnectDevice(device);
  //     setDevices([]);
  //     device.services().then(async service => {
  //       for (const ser of service) {
  //         ser.characteristics().then(characteristics => {
  //           getCharacteristics([...characteristics, characteristic]);
  //         });
  //       }
  //     });
  //   });
  // };

  // const disconnectedDevice = () => {
  //   connectedDevice.cancelConnection();
  // };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={{margin: 10, marginTop: 200}}>
              <Button
                title={'블루투스 스캔 (' + (isScanning ? 'on' : 'off') + ')'}
                onPress={() => startScan()}
              />
            </View>

            <View style={{margin: 10}}>
              <Button
                title="연결된 주변기기 검색"
                onPress={() => retrieveConnected()}
              />
            </View>

            {list.length == 0 && (
              <View style={{flex: 1, margin: 20}}>
                <Text style={{textAlign: 'center', marginTop: 100}}>
                  No peripherals
                </Text>
              </View>
            )}
          </View>
          {/* <TouchableOpacity
            style={{
              flex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#2e94b9',
              right: 15,
              top: 15,
              height: 50,
              width: 100,
            }}
            title="나가기"
            onPress={() => {
              Alert.alert(
                '나가기',
                '설정화면으로 가시겠습니까?',
                [
                  {
                    text: '아니오',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: '예',
                    onPress: () => {
                      navigation.replace('SimSetup');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Text>나가기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#2e94b9',
              right: 15,
              top: 75,
              height: 50,
              width: 100,
            }}
            title="로그아웃"
            onPress={() => {
              Alert.alert(
                '로그아웃',
                '로그아웃 하시겠습니까?',
                [
                  {
                    text: '아니오',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: '예',
                    onPress: () => {
                      AsyncStorage.clear();
                      navigation.replace('LoginScreen');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Text>로그아웃</Text>
          </TouchableOpacity> */}
        </ScrollView>
        <FlatList
          data={list}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
}

export default SimulationMainScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     padding: 10,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: 'skyblue',
//   },
//   circleView: {
//     width: 250,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     height: 250,
//     borderRadius: 150,
//     borderWidth: 10,
//     borderColor: 'white',
//   },
//   boldTextStyle: {
//     fontSize: 30,
//     color: '#000',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'white',
//   },
// });
