import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';

const Width = Dimensions.get('window').width; //스크린 너비 초기화
const Height = Dimensions.get('window').height; //스크린 높이 초기화

function HomeScreen({navigation}) {
  const {landscape} = useDeviceOrientation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: landscape ? 'row' : 'column',
        alignItems: 'center',
        backgroundColor: '#475053',
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#2e94b9',
          height: landscape ? Height / 2.5 : Height / 4,
          width: landscape ? Width / 1 : Width / 1.8,
          marginBottom: landscape ? 40 : 80,
          marginTop: landscape ? 40 : 80,
          marginLeft: landscape ? 80 : 0,
          marginRight: landscape ? 80 : 0,
        }}
        title="시뮬레이션"
        onPress={() => navigation.replace('SimSetup')}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
          }}>
          시뮬레이션
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#acdcee',
          height: landscape ? Height / 2.5 : Height / 4,
          width: landscape ? Width / 1 : Width / 1.8,
          marginBottom: landscape ? 40 : 80,
          marginTop: landscape ? 40 : 80,
          marginRight: landscape ? 80 : 0,
        }}
        title="컨트롤러"
        onPress={() => navigation.replace('Controller')}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
          수상드론 컨트롤러
        </Text>
        <Icon style={{marginTop: 15}} name="gamepad" size={100} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  nope: {},
});
export default HomeScreen;
