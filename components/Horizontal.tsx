import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Horizontal = () => {
  const initialCommodities = [
    {
      name: 'Desk and Bench',
      img: require('../assets/Commodities/kansai-university-84363_640.jpg'),
    },
    {
      name: 'First aid',
      img: require('../assets/Commodities/first_aid_box_4_white_1024x1024.jpg'),
    },
    {
      name: 'Computer lab',
      img: require('../assets/Commodities/School-Computer-Labs-Ensure-Access-2.jpg'),
    },
    {
      name: 'Boards',
      img: require('../assets/Commodities/360_F_117556248_PZuqKIshns6b04aYgW6j9a4uF0BRuwZA.jpg'),
    },
    {
      name: 'Classroom',
      img: require('../assets/Commodities/Classroom-Management-for-an-Effective-Learning-Environment-scaled.jpg'),
    },
  ];

  const [items, setItems] = useState([]);

  const handleActionPress = (index, status, name) => {
    const isDuplicate = items.some(item => item.name === name);

    if (!isDuplicate) {
      setItems(prevItems => [...prevItems, {name, index, Available: status}]);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.name === name ? {...item, Available: status} : item,
        ),
      );

      console.log('Duplicate entry detected. Status updated.');
    }

    console.log('Items:', items);
  };

  const onChangeText =(text)=>{
    console.log(text)
  }
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}>
        {initialCommodities.map((item, index) => (
          <View key={index} style={styles.commodityItem}>
            <View
              style={{
                ...styles.commodityItemBackground,
                backgroundColor: items
                  .filter(singleItem => singleItem.name === item.name)
                  .map(singleItem =>
                    singleItem.Available ? '#7CEC9F' : '#EA7773',
                  )[0],
              }}>
              <Image source={item.img} style={styles.image} />
              <Text style={styles.itemName}>{item.name}</Text>

              {items
                .filter(singleItem => singleItem.name === item.name)
                .map(
                  singleItem =>
                    singleItem.Available && (
                      <View key={index}>
                        <TextInput
                        keyboardType='number-pad'
                          placeholder="qty"
                          style={styles.textInput}
                          required
                          validate={text => {
                            if (text.length < 3) {
                              return false;
                            }
                            return true;
                          }}

                          onChangeText={text => onChangeText(text)}
                          inputMode='numeric'
                          ></TextInput>
                      </View>
                    ),
                )}

              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => handleActionPress(index, true, item.name)}>
                  <Image
                    source={require('../assets/graphics/accept.png')}
                    style={styles.actionImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleActionPress(index, false, item.name)}>
                  <Image
                    source={require('../assets/graphics/delete-button.png')}
                    style={styles.actionImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  commodityItem: {
    width: 390,
    height: 500,
    marginHorizontal: 10,
    marginBottom: 16,
  },
  commodityItemBackground: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 390,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionImage: {
    width: 40,
    height: 40,
    margin: 8,
  },
  textInput: {
    color: '#333',
    fontSize: 34,
  },
});

export default Horizontal;
