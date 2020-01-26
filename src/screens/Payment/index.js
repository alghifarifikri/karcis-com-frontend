import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Left, Card, CardItem, Right, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Modal, { SlideAnimation, ModalTitle, ModalContent } from 'react-native-modals';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    padding: 5,
  },
  banner: {
    height: 50,
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
  iconFilter: {
    fontSize: 20,
    color: '#0064D2',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottom: {
    bottom: -160,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
    elevation: 5,
  },
  image : {
    width: '60%',
    height : 50,
    flex:1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonLogin: {
    backgroundColor: 'yellow',
    borderRadius: 50,
    height: 45,
    width: 100,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0064D2',
    fontSize: 15,
  },
});

class HeaderPayment extends Component {
    render() {
        return (
            <View>
                <View style={styles.banner}>
                <View style={styles.row}>
                    <View style={{flex: 1}}>
                    <Left>
                        <Text
                        style={{
                            padding: 5,
                            color: 'white',
                            fontSize: 15,
                            marginRight: 180,
                        }}>
                        {' '}
                        Pembayaran{' '}
                        </Text>
                        <Text
                        style={{
                            padding: 5,
                            color: 'white',
                            fontSize: 12,
                            marginRight: 180,
                            marginTop: -10
                        }}>
                        {' '}
                        Order ID : 000001{' '}
                        </Text>
                    </Left>

                    <Icons name="arrowleft" style={styles.icon} />
                    </View>
                </View>
                </View>
            </View>
        )
    }
}

class BodyPayments extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible: false
        }
      }

      handlePress = () => {
          this.setState({visible : false})
          console.log('test')
        this.props.navigation.navigate('MyOrder')
        
      }
    render () {
        return (
            <View style = {{backgroundColor: '#fff', flex: 1}}>


                <Card style={{width: '90%', alignSelf: 'center', backgroundColor: '#eee', marginTop: 20}}>

                            <View style={{marginTop: 12}}>
                                <Text style = {{fontSize: 13, marginLeft: 10}}>
                                    Order ID : 000001
                                </Text>
                                <View style = {{marginTop: 10, flexDirection: 'row', marginLeft: 10, marginBottom: 10}}>
                                    <Left>
                                    <Text>
                                        Total Pembayaran
                                    </Text>
                                    </Left>
                                    <Text style ={{color: '#0064D2', marginRight: 20}}>
                                        IDR 300.000
                                    </Text>
                                    
                                </View>
                            </View>
                </Card>

                <View style = {{flexDirection: 'row', margin: 15}}>
                    <Text>
                        Balance
                    </Text>
                </View>

                <Card style={{width: '90%', alignSelf: 'center', backgroundColor: '#eee'}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Icon name='coins' style={{color: 'gold', margin: 10, fontSize: 30}}/>
                                <View style={{marginTop: 12}}>
                                    <Text style = {{fontSize: 13, marginLeft: 10}}>
                                        Username
                                    </Text>
                                    <View style = {{ marginLeft: 10, marginBottom: 10}}>
                                        <Text>
                                            Rp. 2.000.000,-
                                        </Text>
                                    </View>
                                </View>
                                <Right>
                                    <TouchableOpacity onPress={() => {this.setState({ visible: true })}}>
                                        <Text style={{marginRight: 10, color: '#0064D2' }}> Pembayaran </Text>
                                    </TouchableOpacity>
                                </Right>
                        </View>
                </Card>

                <Modal
                visible={this.state.visible}                    
                    modalTitle={<ModalTitle title="Payment" />}
                    modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom', })}
                    onTouchOutside={() => {
                        this.setState({ visible: false });}}>

                    <ModalContent style={{width: 350}}>   
                        <Card style={{width: '100%', alignSelf: 'center', backgroundColor: '#eee', marginTop: 20}}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style={{marginTop: 12}}>
                                    <Text style = {{fontSize: 13, marginLeft: 10}}>
                                        Balance
                                    </Text>
                                    
                                </View>
                                <Right>
                            
                                        <Text style={{marginRight: 10 }}> IDR 2.000.000 </Text>
                            
                                </Right>
                            </View>
                            <Item style = {{flexDirection: 'row'}}>
                                <View style={{marginTop: 12}}>
                                    <Text style = {{fontSize: 13, marginLeft: 10, marginBottom: 20}}>
                                        Total Payment
                                    </Text>
                                    
                                </View>
                                <Right>
                                        <Text style={{marginRight: 10 }}> IDR 300.000 </Text>
                                </Right>
                            </Item>
                            <Item style = {{flexDirection: 'row'}}>
                                <View style={{marginTop: 12}}>
                                    <Text style = {{fontSize: 13, marginLeft: 10, marginBottom: 10}}>
                                        Saldo
                                    </Text>
                                </View>
                                <Right>
                                        <Text style={{marginRight: 10, color: '#0064D2' }}> IDR 1.700.000 </Text>
                                </Right>
                            </Item>
                            </Card>                                              
                                <TouchableOpacity 
                                    onPress={() => {this.setState({visible : false})
                                    this.props.navigation.navigate('MyOrder')}}  
                                    style={[{alignItems: 'center', marginBottom: 10}, styles.buttonLogin]} >
                                        <Text style={styles.buttonText}>CONFIRM</Text>
                                </TouchableOpacity>
                        </ModalContent>
                </Modal>

                    <Card style={{width: '90%', alignSelf: 'center', backgroundColor: '#eee', marginTop: 20}}>
                        <View style = {{flexDirection: 'row'}}>
                            <View style={{marginTop: 12}}>
                                <Text style = {{fontSize: 13, marginLeft: 10, marginBottom: 10}}>
                                    Kode Promo atau Gift Voucher
                                </Text>
                                
                            </View>
                            <Right>
                                <TouchableOpacity>
                                    <Text style={{marginRight: 10, color: '#0064D2' }}> Gunakan </Text>
                                </TouchableOpacity>
                            </Right>
                        </View>
                    </Card>
            </View>
        )
    }
}

const BodyPayment = withNavigation(BodyPayments)

export default class Payment extends Component {
    render() {
        return (
            <>
                <HeaderPayment />
                <BodyPayment />
            </>
        )
    }
}