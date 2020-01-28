import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconA from 'react-native-vector-icons/AntDesign'
import { List, ListItem, Left, Right, Body } from 'native-base'

import { HeaderProfile } from '../../components/Header'
import HorizontalProfileMission from '../../components/HorizontalProfileMission'
import { ScrollView } from 'react-native-gesture-handler'

import { connect } from 'react-redux';
import { setPage } from '../../redux/action/page';
import { getBalance } from '../../redux/action/balance';
import { withNavigation } from 'react-navigation';
import { logout } from '../../redux/action/auth';
import { StackActions, NavigationActions } from 'react-navigation';
import rupiahFormat from '../../utils/rupiahFormat';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height / 4.9;

class AccountOriginal extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      isBalanceLoading: true,
      isSuccess: false,
      message: ''
    }
  }

   async componentDidMount(){
    const jwt = this.props.auth.data.token;
    await this.props.dispatch(setPage('Account'));
    await this.props.navigation.addListener('didFocus', () => this.onScreenFocus(jwt));
    if(jwt){
      await this.props.dispatch(getBalance(jwt));
    }
    else {
      await this.props.navigation.navigate('Login');
    }
  }

  onScreenFocus(jwt){
    if(jwt === null && jwt === undefined && jwt === ''){
      this.props.navigation.navigate('Login');
    }
    else {
      this.props.dispatch(setPage('Account'));
      this.props.dispatch(getBalance(jwt)); 
    }
  }

  async handleLogout(){
      const jwt = await this.props.auth.data.token
      if(jwt !== null){
          await this.props.dispatch(logout(jwt))
      }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.auth.isLoading !== this.state.isLoading) {
      if (prevProps.auth.isLoading === true) {
        this.setState({
          isLoading: true
        })
        console.log('masih loading')
      } else {
        console.log('sudah fulfill')
        if (!this.props.auth.isAuth) {
          console.log('berhasil logout')
          await this.setState({
            isLoading: false,
            isSuccess: true,
            message: "Logout Success.",
          })
          this.handleRedirect()
        } else {
          console.log('gagal logout')
          await this.setState({
            isLoading: false,
            isSuccess: false,
            message: "Logout Failed. Try Again.",
          })
          this.handleRedirect()
        }
      }
    }

    if(prevProps.balance.isLoading !== this.state.isBalanceLoading){
      if(!prevProps.balance.isLoading){
        this.setState({isBalanceLoading: false});
      }
    }
  }

  async handleRedirect() {
      if (this.state.isSuccess) {
          Alert.alert('Logout Message', this.state.message, [
              { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
          ])
      } else {
          Alert.alert('Logout Message', this.state.message)
      }
  }

  render() {
    return (
      <SafeAreaView>
      <StatusBar backgroundColor="#0953A6" barStyle="light-content" />
        <HeaderProfile title="Akun" />
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.banner}>
            </View>
            <View style={styles.bannerContent}>
              <View style={styles.containerName}>
                <Text style={styles.textName}>{`${this.props.auth.data.first_name} ${this.props.auth.data.last_name}`}</Text>
                <Icon name="pencil" size={20} color='#0064D2' />
              </View>
              <View style={styles.containerVerify}>
                <Text style={styles.textVerify}>Unverified</Text>
                <IconA name="checkcircleo" color="#757575" />
              </View>
              <View style={styles.containerSaldo}>
                <Icon name="ticket-confirmation" size={20} color='#FFBF00' />
                  {
                    !this.state.isBalanceLoading
                    ? <Text style={styles.textSaldo}>
                        Basic - {rupiahFormat(this.props.balance.data.balance, 'Rp.')}
                      </Text>
                    : <ActivityIndicator size="small" color="blue" />
                  }
                <Text style={styles.textTixPoint}> TIX Point</Text>
              </View>
            </View>
            <Text style={styles.textSubtitle}>Selesaikan semua misi dan dapatkan 10.000 TIX Points</Text>
            <View>
              <HorizontalProfileMission />
            </View>
          </View>
          <View style={styles.containerOptionProfile}>
            <List>
              <ListItem>
                <Left>
                  <Icon name="account-card-details-outline" size={25} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textTitleOption}>Smart Profile</Text>
                  <Text style={styles.textDescOption}>Pesan lebih cepat, isi data penumpang dengan satu klik.</Text>
                </Body>
                <Right style={{ flex: 0.6 }}>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Icon name="credit-card" size={25} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textTitleOption}>Smart Pay</Text>
                  <Text style={styles.textDescOption}>Cara membayar dan menerima refund yang lebih cepat & aman.</Text>
                </Body>
                <Right style={{ flex: 0.6 }}>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Icon name="credit-card-plus" size={25} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textTitleOption}>Daftar Refund</Text>
                  <Text style={styles.textDescOption}>Pesan lebih cepat, isi data penumpang dengan satu klik.</Text>
                </Body>
                <Right style={{ flex: 0.6 }}>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
            </List>
          </View>
          <View style={styles.containerOptionProfile1}>
            <List>
              <ListItem last>
                <Body>
                  <Text style={styles.textTitleOption}>Loyalty Program</Text>
                </Body>
                <Right>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
            </List>
          </View>
          <View style={styles.containerOptionProfile2}>
            <List>
              <ListItem>
                <Body>
                  <Text style={styles.textTitleOption}>Pengaturan</Text>
                </Body>
                <Right>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
              <ListItem last>
                <Body>
                  <Text style={styles.textTitleOption}>Pusat Bantuan</Text>
                </Body>
                <Right>
                  <Icon name="chevron-right" size={25} color="#757575" />
                </Right>
              </ListItem>
            </List>
          </View>
          <TouchableOpacity onPress={() => this.handleLogout()} style={styles.containerOptionProfile3}>
            <List>
              <ListItem last>
                <Body>
                  <TouchableOpacity onPress={() => this.handleLogout()}>
                    <Text style={styles.textTitleOption}>Keluar</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
            </List>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  banner: {
    height: BannerHeight,
    width: BannerWidth,
    backgroundColor: '#0064D2'
  },
  body: {
    backgroundColor: '#FFF',
    paddingBottom: 20,
    marginBottom: 20
  },
  bannerContent: {
    height: BannerHeight / 1,
    width: '90%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: -100,
    elevation: 5,
    borderRadius: 5,
    padding: 16
  },
  containerName: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textName: {
    color: '#35405A',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerVerify: {
    flexDirection: "row",
    alignItems: 'center'
  },
  textVerify: {
    fontSize: 13,
    color: '#F26A67',
    paddingVertical: 5,
    marginRight: 5
  },
  containerSaldo: {
    flexDirection: "row"
  },
  textSaldo: {
    color: '#35405A',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 2
  },
  textTixPoint: {
    color: '#35405A',
    fontSize: 14,
  },
  textSubtitle: {
    color: '#35405A',
    fontSize: 14,
    paddingHorizontal: 16,
    marginTop: 16
  },
  textTitleOption: {
    color: '#35405A',
    fontSize: 16
  },
  containerOptionProfile: {
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  containerOptionProfile1: {
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  containerOptionProfile2: {
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  containerOptionProfile3: {
    backgroundColor: '#FFF',
    marginBottom: 100
  },
  textDescOption: {
    color: '#646D83',
    fontSize: 13
  }
})

const mapStateToProps = state => {
  return {
    auth: state.auth,
    balance: state.balance
  }
}

const Account = withNavigation(AccountOriginal)

export default connect(mapStateToProps)(Account)