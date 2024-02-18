import React  from 'react';
import { View ,StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import FlatCard from '../../components/FlatCard';
import TopBanner from './TopBanner';


type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {

  return (
    <View style={styles.container}>
<TopBanner />
     <FlatCard navigation={navigation} />


    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ecf0f1',
  },
});
