import React, {Component} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, Dimensions, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput';
import MyButton from '../Components/MyButton';
// Styles
import styles from './Styles/LoginScreenStyle'
import {driverLogin} from "../Config/API";

const {width} = Dimensions.get('window');

class LoginScreen extends Component {

  state = {
    country_code: '',
    number: '',
    password: '',

  }

  onPhoneNumberChange = () => {
    this.setState({
      country_code: this.phone.getCountryCode(),
      number: this.phone.getValue(),
    });
    // const {mobile, password} = this.state
    // this.props.attemptLogin(mobile, password)

  };
  onPasswordChange = (text) => {
    this.setState({password: text});

  };


  onPressLogin = () => {

    console.log(this.state);

    let password = this.state.password;
    let number = this.state.number;
    let country_code = '+' + this.state.country_code;
    let num = number.replace(country_code, '');
    let body = {
      country_code: country_code,
      number: num,
      password: password
    }

    // this.setState({loading: true})
    const self = this

    // console.log(body, login)
    fetch(driverLogin, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },

    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);


        console.log(data.access_token);
        self.props.navigation.navigate('TabScreen')


      })
      .catch(function (error) {
        console.log(error);
        console.log('err');
      });

    function status(response) {
      console.log(response)
      console.log('status');
      self.setState({loading: false})
      if (response.status === 200 || response.access_token != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json(response) {
      console.log(response);
      console.log('json');
      return response.json()
    }


  }


  render() {
    const {mobile, password} = this.state
    return (
      <View style={styles.container}>

        <View>

          <View>
            <Text style={{
              fontSize: width * 0.027,
              color: '#BCBEC0',
              marginBottom: width * 0.06
            }}>Phone Number</Text>
            <PhoneInput
              onChangePhoneNumber={this.onPhoneNumberChange}
              initialCountry='az' value={mobile} style={{
              fontSize: width * 0.037,
              borderBottomWidth: 1,
              borderColor: '#353535',
              width: '100%',
              marginBottom: width * 0.1296
            }} ref={ref => {
              this.phone = ref;
            }}/>
          </View>

          <MyInput value={password} onChangeText={this.onPasswordChange} secureTextEntry={true}
                   text='Password'/>

        </View>
        <View style={styles.buttonContainer}>
          <MyButton onPress={this.onPressLogin}
                    backgroundColor='#451E5D'
                    color='#fff'
                    borderColor='451E5D'
                    text='Login'
          />
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
