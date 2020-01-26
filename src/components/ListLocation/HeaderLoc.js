import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Left, Input, Item } from 'native-base'
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Fontisto';
import MyIcon from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#eee',
      padding: 5,
    },
    banner: {
      height: 100,
      backgroundColor: '#0064D2',
    },
    icon: {
      fontSize: 25,
      color: 'white',
      padding: 5,
      paddingRight: 15,
      paddingBottom: 10,
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  });

class HeaderLoc extends Component {
    render() {
        return (
<View>
        <View style={styles.banner}>
          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Left>
                <Text
                  style={{
                    padding: 15,
                    color: 'white',
                    fontSize: 15,
                    marginRight: 220,
                    marginTop: 2
                  }}>
                  {' '}
                  Tujuan{' '}
                </Text>
              </Left>
              <Icons name="cross" style={styles.icon} />
            </View>
          </View>
          <View style={{backgroundColor: 'white', borderRadius: 5, width: '90%', height: '40%', alignSelf: 'center', flexDirection: 'row'}}>
            <MyIcon name="location" style={{color : 'grey', fontSize: 30, marginTop: '2.5%'}} />
            <Input placeholder='Nginep ke mana?' style={{marginLeft: '1%', marginTop: '-2%'}} ></Input>
            <TouchableOpacity>
            <Icon name="search" style={{color : 'grey', fontSize: 25, marginTop: 5, marginRight: '2%'}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
        )
    }
}

export default HeaderLoc