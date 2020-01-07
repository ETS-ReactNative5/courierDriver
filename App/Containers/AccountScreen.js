import React, { Component } from 'react'
import {View, Text, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AccountScreenStyle'
import I18n from '../I18n'
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
const {width} = Dimensions.get('window')
class AccountScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View>
            <MyInput text={I18n.t('name').toUpperCase()} value='Ali' />
            <MyInput text={I18n.t('surname')} value='Hasanli' />
            <MyInput text={I18n.t('Email')} value='morqan@gmail.com' />
            <MyInput text={I18n.t('NÖMRƏ')} value='+99455 475 85 63' />
          </View>
          <View style={styles.buttonContainer}>
            <MyButton onPress={this.onPres}
              backgroundColor='#7b2bfc'
              color='#fff'
              borderColor='#7b2bfc'
              text={I18n.t('SUBMIT')}
            />

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
