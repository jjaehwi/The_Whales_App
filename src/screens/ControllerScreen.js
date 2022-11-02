import * as React from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {useState} from 'react';

const Width = Dimensions.get('window').width; //스크린 너비 초기화
const Height = Dimensions.get('window').height; //스크린 높이 초기화

function ControllerScreen({navigation}) {
  const {landscape} = useDeviceOrientation();

  const [text, setText] = useState('없음');
  const [count, setCount] = useState(0);
  const [heading, setHeading] = useState(0);

  const LeftPress = () => {
    setText('좌');
    setHeading(heading - 15);
    console.log('좌');
  };
  const RightPress = () => {
    setText('우');
    setHeading(heading + 15);
    console.log('우');
  };
  const AbovePress = () => {
    setText('상');
    setCount(count + 10);
    console.log('상');
  };
  const BelowPress = () => {
    setText('하');
    setCount(count - 10);
    console.log('하');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        backgroundColor: '#475053',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: landscape ? 0 : 0,
          top: landscape ? 0 : 0,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
          }}>
          입력되는 값: {text}
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
          }}>
          속도 : {count}
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
          }}>
          타각 : {heading}
        </Text>
      </View>

      <TouchableOpacity
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
            '홈으로 가시겠습니까?',
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
                  navigation.replace('HomeScreen');
                },
              },
            ],
            {cancelable: false},
          );
        }}>
        <Text>나가기</Text>
      </TouchableOpacity>
      {/* 로그아웃 버튼 */}

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
      </TouchableOpacity>

      {/* 왼쪽 */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#2e94b9',
          bottom: 20,
          left: 30,
          height: 100,
          width: 100,
        }}
        title="왼쪽"
        onPress={LeftPress}>
        <Text>왼쪽</Text>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* 오른쪽 */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#2e94b9',
          bottom: 20,
          left: 275,
          height: 100,
          width: 100,
        }}
        title="오른쪽"
        onPress={RightPress}>
        <Text>오른쪽</Text>
        <Icon name="arrow-right" size={24} color="black" />
      </TouchableOpacity>

      {/* 위 */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#2e94b9',
          bottom: 140,
          left: 150,
          height: 100,
          width: 100,
        }}
        title="위"
        onPress={AbovePress}>
        <Text>위</Text>
        <Icon name="arrow-up" size={24} color="black" />
      </TouchableOpacity>

      {/* 아래 */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: '#2e94b9',
          bottom: 20,
          left: 150,
          height: 100,
          width: 100,
        }}
        title="아래"
        onPress={BelowPress}>
        <Text>아래</Text>
        <Icon name="arrow-down" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ControllerScreen;
