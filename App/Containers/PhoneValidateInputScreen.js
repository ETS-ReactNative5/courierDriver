import React, {Component} from 'react'
import {View, Text, Dimensions} from 'react-native'
import {connect} from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import RegisterAction from '../Redux/RegisterRedux'
import I18n from '../I18n'
import PhoneInput from 'react-native-phone-input'
import MyButton from '../Components/MyButton'
import {driverRegistration, mainUrl} from '../Config/API'
import Spiner from '../Components/Spiner'

// Styles
import styles from './Styles/RegisterScreenStyle'

const {width} = Dimensions.get('window')

class PhoneValidateInputScreen extends Component {
  state = {
    country_code: '',
    number: '',
    step: 'phone_number',
    error: '',
    loading: false
  }

  onPres = () => {
    this.setState({loading: true})
    if (this.state.number === '' || this.state.country_code === '') {
      this.setState({
        error: 'input bos ola bilmez',
        loading: false
      })
    } else {
      this.onPressLogin()
    }
  }
  onPhoneNumberChange = () => {
    this.setState({
      country_code: this.phone.getCountryCode(),
      number: this.phone.getValue()
    })
    // const {mobile, password} = this.state
    // this.props.attemptLogin(mobile, password)
  };

  onPressLogin = () => {
    console.log(this.props.fetching)
    let number = this.state.number
    let country_code = '+' + this.state.country_code
    let num = number.replace(country_code, '')
    let body = {
      country_code: country_code,
      number: num,
      step: 'phone_number'
    }
    // this.setState({loading: true})
    const self = this
    console.log(body)
    // console.log(body, login)
    let url = mainUrl + 'driver/api/drivers?country_code=' + encodeURIComponent(country_code) + '&phone_number=' + num
    fetch(url, {
      method: 'HEAD',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(check)
      .catch(error => console.error(error))
    function status (response) {
      console.log(response)
      console.log('status')
      self.setState({loading: false})
      if (response.status === 'pending' || response.status === 'approved') {
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
    function check (response) {
      console.log('head status')
      console.log(response.status)
      if (response.status === 404) {
        console.log(body)
        fetch(driverRegistration, {
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
            const {number} = self.state
            const verification_id = data.id
            console.log(data.id)
            self.props.attemptRegister(number, verification_id)
            console.log(number)
            if (data.status === 'approved') { self.props.navigation.navigate('RegisterScreen') } else if (data.status === 'pending') {
              console.log('PhoneValidateScreen')
              self.props.navigation.navigate('PhoneValidateScreen')
            }
          })
          .catch(function (error) {
            console.log(error)
            console.log('err')
          })
      } else {
        self.props.navigation.navigate('LoginScreen')
      }
    }
  }
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton
        onPress={this.onPres}
        color='#fff'
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        text={I18n.t('next')}
      />
    }
    return <Spiner size='small' />
  }
  render () {
    console.log(this.props)
    const {number, error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Text style={{
              fontSize: width * 0.05,
              color: '#7B2BFC',
              marginBottom: width * 0.2
            }}>Enter your phone number</Text>
            <PhoneInput
              onChangePhoneNumber={this.onPhoneNumberChange}
              initialCountry='az'
              value={number} style={{
                fontSize: width * 0.037,
                borderBottomWidth: 1,
                borderColor: '#353535',
                width: '100%',
                marginBottom: width * 0.1
              }} ref={ref => {
                this.phone = ref
              }} />
          </View>
          {errorMsg}
        </View>
        <View style={styles.buttonContainer}>
          {this.renderButton()}
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.register.number,
    verification_id: state.register.verification_id,
    fetching: state.register.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (number, verification_id) => dispatch(RegisterAction.registerRequest(number, verification_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidateInputScreen)
