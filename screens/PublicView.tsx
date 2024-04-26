import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {getData} from './AsyncStorage';
import Schools from '../components/Schools';
import {SearchBar} from 'react-native-screens';
import {Searchbar} from 'react-native-paper';

const PublicView = ({navigation}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      console.log('Checking user status...');
      const result = await getData('USERSTATUS');

      console.log('Response:', result);

      if (result !== null) {
        setIsLogged(true);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const handlePress = () => {
    if (isLogged) {
      navigation.goBack();
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.login} onPress={handlePress}>
          <Text
            style={{color: '#1e1e1e', fontSize: heightPercentageToDP('2.3%')}}>
            {isLogged ? 'Go back' : 'Login'}
          </Text>
          <AntDesign
            name={isLogged ? 'back' : 'login'}
            size={heightPercentageToDP('2.3%')}
            color="#1e1e1e"
          />
        </TouchableOpacity>
      </View>
      <View style={{padding: 10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            borderWidth: .4,
            borderColor: '#1e1e1e',
          }}
        />
      </View>
      <Schools navigation={navigation} searchQuery={searchQuery}/>
    </ScrollView>
  );
};

export default PublicView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
  },
  login: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0.3,
    borderColor: '#1e1e1e',
    borderRadius: 20,
  },
});
