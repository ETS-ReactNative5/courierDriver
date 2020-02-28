import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuLink from '../Components/MenuLink'
import {driverRegistration} from '../Config/API'
import {Images} from '../Themes'
import AsyncStorage from '@react-native-community/async-storage'
import { remove } from 'ramda'
import API from '../Services/Api'
class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // email: 'emishow@gmail.com',
      // first_name: '',
      // id: '024c8d63-83d7-4abe-ac4f-0c23fb8d8f26',
      // last_name: '',
      // phone_number: '+994501234567',
      // username: 'emishow'
      data: []
    }
    this.getProfileData()
  }

  getProfileData = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.token = 'Bearer ' + token
    const api = API.create()
    let headers = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      }
    }
    const profileData = await api.getProfileData(headers)
    console.log(profileData.data)
    if (profileData.status == 200) {
      this.setState({
        data: profileData.data
      })
    } else {
      console.log(profileData)
      this.setState({
        error: profileData.data.msg
      })
    }
  }
  // componentDidMount () {
  //   const getProfileData = async (token) => {
  //     const data = await fetch(driverRegistration, {
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Access-Control-Allow-Origin': '*',
  //         'Authorization': 'Bearer ' + token
  //       }
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data)
  //         this.setState(data)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //     return data
  //   }
  //   AsyncStorage.getItem('@token')
  //     .then((token) => {
  //       getProfileData(token)
  //     })
  //     .catch((error) => console.log(error))
  // }
  render () {
    console.log(this.props.navigation)
    return (
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderLeft}>
            <Image style={styles.newsImage} source={Images.profilImg} />
          </View>
          <View style={styles.profileHeaderBody}>
            <Text style={styles.profileHeaderBodyText}>{this.state.data.first_name} {this.state.data.last_name}</Text>
            <Text style={styles.profileHeaderBodyTextY}>Balans: 30.00 AZN</Text>
          </View>
        </View>
        <View style={styles.profileBody}>
          <MenuLink text='Hesab'
            onPress={() => this.props.navigation.navigate('AccountScreen')}
            icon='account-settings'
            color='#606060'
            size={25}
            fontSize={20}
          />
          {/*<MenuLink text='Sənədlər'*/}
          {/*  icon='file-document-box-multiple-outline'*/}
          {/*  color='#606060'*/}
          {/*  size={25}*/}
          {/*  fontSize={20} />*/}
          <MenuLink text='Sifarişlər'
            onPress={() => this.props.navigation.navigate('AllOrderScreen')}
            icon='map-search-outline'
            color='#606060'
            size={25}
            fontSize={20} />
          {/*<MenuLink text='Bank hesabı'*/}
          {/*  onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}*/}
          {/*  icon='bank'*/}
          {/*  color='#606060'*/}
          {/*  size={25}*/}
          {/*  fontSize={20} />*/}
          <MenuLink text='Qazanc'
            onPress={() => this.props.navigation.navigate('GainScreen')}
            icon='cash-multiple'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Balans'
            onPress={() => this.props.navigation.navigate('BalansScreen')}
            icon='notification-clear-all'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Bildirişlər'
            onPress={() => this.props.navigation.navigate('NotificationsScreen')}
            icon='settings'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Dəstək'
            onPress={() => this.props.navigation.navigate('SupportScreen')}
            icon='percent'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Çıxış'
            onPress={() => {
              AsyncStorage.removeItem('@token')
              this.props.navigation.navigate('FirstScreen')
            }}
            icon='exit-to-app'
            color='#606060'
            size={25}
            fontSize={20} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verification_id: state.register.verification_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
