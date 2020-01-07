import React, {Component} from 'react'
import {View, Text, Dimensions} from 'react-native'
import {connect} from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import RegisterAction from '../Redux/RegisterRedux'
import I18n from '../I18n';
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput';
import MyButton from '../Components/MyButton';
import {driverRegistration, toUrl} from '../Config/API'
import Spinner from 'react-native-loading-spinner-overlay';

// Styles
import styles from './Styles/RegisterScreenStyle'


const {width} = Dimensions.get('window');

class PhoneValidateInputScreen extends Component {

  state = {
    country_code: '',
    number: '',
    step: 'phone_number',
    spinner: false

  }

  onPhoneNumberChange = () => {
    this.setState({
      country_code: this.phone.getCountryCode(),
      number: this.phone.getValue(),
    });
    // const {mobile, password} = this.state
    // this.props.attemptLogin(mobile, password)

  };

  onPressLogin = () => {

    console.log(this.props.fetching);
    let number = this.state.number;
    let country_code = '+' + this.state.country_code;
    let num = number.replace(country_code, '');
    let body = {
      country_code: country_code,
      number: num,
      step: "phone_number"
    }

    // this.setState({loading: true})
    const self = this

    // console.log(body, login)
    fetch(driverRegistration, {
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

        const {number} = self.state;
        const verification_id = data.id

        console.log(data.id);
        self.props.attemptRegister(number, verification_id)
        console.log(number);
        if (data.status === 'approved')
          self.props.navigation.navigate('RegisterScreen')
        else if (data.status === 'pending')
          self.props.navigation.navigate('PhoneValidateScreen')


      })
      .catch(function (error) {
        console.log(error);
        console.log('err');
      });

    function status(response) {
      console.log(response)
      console.log('status');
      self.setState({loading: false})
      if (response.status === "pending" || response.status === "approved") {
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
    const {number} = this.state;
    console.log(this.props);
    return (
      <View style={styles.container}>

        {/*<Spinner*/}
        {/*  visible={this.props.fetching}*/}
        {/*  textContent={'Loading...'}*/}
        {/*  textStyle={styles.spinnerTextStyle}*/}
        {/*/>*/}
        <View>


          <View>
            <Text style={{
              fontSize: width * 0.027,
              color: '#BCBEC0',
              marginBottom: width * 0.06
            }}>Phone Number</Text>
            <PhoneInput
              onChangePhoneNumber={this.onPhoneNumberChange}
              initialCountry='az'
              value={number} style={{
              fontSize: width * 0.037,
              borderBottomWidth: 1,
              borderColor: '#353535',
              width: '100%',
              marginBottom: width * 0.1296
            }} ref={ref => {
              this.phone = ref;
            }}/>
          </View>

        </View>
        <View style={styles.buttonContainer}>
          <MyButton
            //    onPress={() => this.props.navigation.navigate('PhoneValidateScreen')}
            onPress={this.onPressLogin}

            backgroundColor='#451E5D'
            color='#fff'
            borderColor='451E5D'
            text={I18n.t('next')}
          />

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
