import React, {Component} from 'react'
import {View, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native'
import {connect} from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import I18n from '../I18n'

import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
// Styles
import styles from './Styles/RegisterScreenStyle'
import {driverRegistration} from '../Config/API'
import AsyncStorage from '@react-native-community/async-storage'

const {width} = Dimensions.get('window')

class RegisterScreen extends Component {
  state = {
    first_name: '',
    verification_id: '',
    last_name: '',
    password: '',
    email: ''

  }
  useResponse: RegisterScreen.useResponse

  componentDidMount () {
    this.setState({
      verification_id: this.props.verification_id
    })
  }

  onPressRegister = () => {
    let {email, first_name, last_name, password, verification_id} = this.state

    let body = {
      email,
      first_name,
      last_name,
      password,
      verification_id,
      step: 'account'
    }

    // this.setState({loading: true})
    const self = this

    // console.log(body, login)
    console.log(body)
    console.log(driverRegistration)
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
        console.log(data.access_token)
        AsyncStorage.setItem('@token', data.access_token)
        self.props.navigation.navigate('DriverRadiusScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
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

    this.useResponse = async (data) => {
      try {
        // const is_company = data.data.is_company||0
        await AsyncStorage.setItem('@token', data.data.token)

        this.props.navigation.navigate('PhoneValidateScreen')
      } catch (e) {
        Alert.alert('Error: ' + e.message)
      }
    }
  }

  render () {
    return (
      <ScrollView>

        <KeyboardAvoidingView behavior='position' style={styles.container}>
          <View>
            <MyInput onChangeText={(text) => {
              this.setState({
                first_name: text
              })
            }} text={I18n.t('name').toUpperCase()} />
            <MyInput
              onChangeText={(text) => {
                this.setState({
                  last_name: text
                })
              }}
              text={I18n.t('surname')} />

            <MyInput
              onChangeText={(text) => {
                this.setState({
                  email: text
                })
              }}
              text={I18n.t('email')} />
            <MyInput
              onChangeText={(text) => {
                this.setState({
                  password: text
                })
              }}
              secureTextEntry text={I18n.t('password')} />

          </View>
          <View style={styles.buttonContainer}>
            <MyButton onPress={this.onPressRegister}
              // onPress={() => this.props.navigation.navigate('TabScreen')}
              backgroundColor='#451E5D'
              color='#fff'
              borderColor='451E5D'
              text={I18n.t('next')}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
