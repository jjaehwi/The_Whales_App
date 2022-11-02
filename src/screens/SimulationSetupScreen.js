import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  RefreshControl,
  Platform,
  SafeAreaView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Dimensions} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {useState} from 'react';
import {useEffect} from 'react';
import {State} from 'react-native-gesture-handler';

if (Platform.OS === 'ios') {
  API_Host = true;
} else if (Platform.OS === 'android') {
  API_Host = false;
}

const Width = Dimensions.get('window').width; //스크린 너비 초기화
const Height = Dimensions.get('window').height; //스크린 높이 초기화

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

function SimulationSetupScreen({navigation}) {
  const {landscape} = useDeviceOrientation();
  const [statewifi, setStatewifi] = useState(false);
  // const [statetype, setStatetype] = useState();
  const [statebluetooth, setStatebluetooth] = useState(false);
  const [disable, setDisable] = useState();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setStatewifi(state.isConnected);
      // setStateype(state.type);
      setStatebluetooth(state.isConnected);
      state.isConnected ? setDisable(false) : setDisable(true);
      console.log(disable);
    });
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'blue',
            marginBottom: 20,
            left: 15,
            top: 15,
            height: 50,
            width: 100,
          }}
          title="뒤로가기"
          onPress={() => navigation.replace('HomeScreen')}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
            뒤로가기
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'white',
        }}>
        <Image
          style={{
            margin: 30,
            backgroundColor: '#475053',
            height: 200,
            width: 200,
          }}
          source={require('The_Whales/assets/plan_wifi.jpeg')}
        />

        <Image
          style={{
            backgroundColor: '#475053',
            marginTop: 75,
            height: 100,
            width: 100,
          }}
          source={
            statewifi
              ? require('The_Whales/assets/connect.png')
              : require('The_Whales/assets/disconnect.png')
          }
        />

        <Image
          style={{
            margin: 30,
            height: 200,
            width: 200,
          }}
          source={require('The_Whales/assets/controller.png')}
        />
        <Image
          style={{
            backgroundColor: '#475053',
            marginTop: 75,
            height: 100,
            width: 100,
          }}
          source={
            statebluetooth
              ? require('The_Whales/assets/connect.png')
              : require('The_Whales/assets/disconnect.png')
          }
        />
      </View>

      <View style={{}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            height: 70,
            backgroundColor: 'blue',
            opacity: disable ? 0.1 : 1,
          }}
          title="시뮬레이션 메인"
          onPress={() => navigation.replace('SimMain')}
          disabled={disable}>
          <Text
            style={{
              fontSize: 24,
              color: '#f0fbff',
              fontWeight: 'bold',
            }}>
            다 음 으 로
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SimulationSetupScreen;
