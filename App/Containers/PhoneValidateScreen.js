import React, {Component} from 'react'
import {View, Text, KeyboardAvoidingView, Alert} from 'react-native'
import {connect} from 'react-redux'
import CodeInput from 'react-native-code-input'
import MyButton from '../Components/MyButton'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

// Styles
import styles from './Styles/PhoneValidateScreenStyle'
import {driverRegistration} from '../Config/API'

class PhoneValidateScreen extends Component {
  state = {
    code: '',
    verification_id: ''

  }
  _alert = message => Alert.alert(
    'Confirmation Code',
    message,
    [{text: 'OK'}],
    {cancelable: false}
  )

  componentDidMount () {
    this.setState({
      verification_id: this.props.verification_id

    })
  }

  _onFulfill1 = (code) => {
    let {verification_id} = this.state

    let body = {
      verification_id: verification_id,
      sms_code: code,
      step: 'code'
    }

    // this.setState({loading: true})
    const self = this

    // console.log(body, login)
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

        console.log(data)
        // self.props.attemptRegister(number, verification_id)
        // console.log(number);
        self.props.navigation.navigate('RegisterScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      self.setState({loading: false})
      if (response.status === 'approved') {
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

    useResponse = async (data) => {
      const {number} = this.state
      const verification_id = data.id
      this.props.attemptRegister(number, verification_id)
      console.log(number)
      this.props.navigation.navigate('PhoneValidateScreen')
    }
  }

  render () {
    const {verification_id} = this.props
    console.log('redux')
    console.log(verification_id)
    console.log('redux')
    return (
      <View style={styles.container}>

        <View style={styles.kodBox}>
          <Text style={styles.kodTitle}>Zəhmət olmasa identifikasiya
            kodunu daxil edin</Text>
          <KeyboardAvoidingView behavior='position' style={{borderBottomWidth: 1}}>
            <CodeInput
              ref='codeInputRef2'
              secureTextEntry
              borderType='circle'
              activeColor='#7C7C7C'
              inactiveColor='#7C7C7C'
              autoFocus={false}
              inputPosition='center'
              codeLength={6}
              size={25}
              onFulfill={this._onFulfill1}
              containerStyle={{marginTop: 40, marginBottom: 45}}
              codeInputStyle={{borderWidth: 0, backgroundColor: '#D9D9DA'}}

            />
          </KeyboardAvoidingView>

        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.register.number,
    verification_id: state.register.verification_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidateScreen)
