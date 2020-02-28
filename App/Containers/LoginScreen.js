import React, {Component} from 'react'
import {Text, Dimensions, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
import Spiner from '../Components/Spiner'
import {driverLogin} from '../Config/API'
// Styles
import styles from './Styles/LoginScreenStyle'
import AsyncStorage from '@react-native-community/async-storage'

const {width} = Dimensions.get('window')
class LoginScreen extends Component {
  state = {
    country_code: '',
    mobile: null,
    password: null,
    error: '',
    loading: false
  }
  // onPres = () => {
  //   const {mobile, password} = this.state
  //   this.isAttempting = true
  //   // attempt a login - a saga is listening to pick it up from here.
  //   this.props.attemptLogin(mobile, password)
  //   this.props.navigation.navigate('MapScreen')
  // }
  onPres = () => {
    this.setState({loading: true})
    if (this.state.password === null || this.state.mobile === null) {
      this.setState({
        error: 'input bos ola bilmez',
        loading: false
      })
    } else {
      this.onCheckFields()
    }
  }
  onCheckFields = () => {
    console.log(this.props.fetching)
    let number = this.state.mobile
    let country_code = '+' + this.state.country_code
    let num = number.replace(country_code, '')
    let body = {
      country_code: country_code,
      number: num,
      password: this.state.password
    }
    // this.setState({loading: true})
    const self = this
    console.log(body)
    // console.log(body, login)
    fetch(driverLogin, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data.access_token)
        AsyncStorage.setItem('@token', data.access_token)
        AsyncStorage.setItem('@location_tracking', data.channels.location_tracking)
        AsyncStorage.setItem('@order_notifications', data.channels.order_notifications)
        self.props.navigation.replace('MenuScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
        self.setState({
          error: error.detail,
          loading: false
        })
      })
    function status (response) {
      self.setState({loading: false})
      if (response.access_token != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }
    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }
  onPhoneNumberChange = () => {
    this.setState({
      country_code: this.phone.getCountryCode(),
      mobile: this.phone.getValue()
    })
    const {mobile, password} = this.state
    this.props.attemptLogin(mobile, password)
  };
  onPasswordChange = (text) => {
    this.setState({password: text})
    const {mobile, password} = this.state
    this.props.attemptLogin(mobile, password)
  };
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton onPress={this.onPres}
        color='#fff'
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        text='Login'
      />
    }
    return <Spiner size='small' />
  }
  render () {
    console.log(this.props)
    const {mobile, password, error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Text style={{
              fontSize: width * 0.05,
              color: '#7B2BFC',
              marginBottom: width * 0.06,

            }}>Mobil Nömrə</Text>
            <PhoneInput onChangePhoneNumber={this.onPhoneNumberChange} initialCountry='az' value={mobile} style={styles.phoneInput} ref={ref => {
              this.phone = ref
            }} />
          </View>
          <MyInput value={password} onChangeText={this.onPasswordChange} secureTextEntry text='Şifrə' />
          {errorMsg}
        </View>
        <View style={styles.buttonContainer}>
          {this.renderButton()}
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    mobile: state.login.mobile,
    password: state.login.password
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (mobile, password) => dispatch(LoginActions.loginRequest(mobile, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
