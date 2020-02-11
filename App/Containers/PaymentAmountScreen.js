import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PaymentAmountScreenStyle'
import I18n from '../I18n'
import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
import Spiner from '../Components/Spiner'

class PaymentAmountScreen extends Component {
  state = {
    millionCode: null,
    error: '',
    loading: false
  }
  onPres = () => {
    this.setState({loading: true})
    if (this.state.millionCode === null || this.state.millionCode === '') {
      this.setState({
        error: 'input bos ola bilmez',
        loading: false
      })
    } else {
      this.onCheckFields()
    }
  }
  onCheckFields = () => {
    this.props.navigation.navigate('MenuScreen')
  }
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton onPress={this.onPres}
        color='#fff'
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        text='OK'
      />
    }
    return <Spiner size='small' />
  }
  render () {
    const {error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.box}>
            <Text style={styles.text}>Payment Amount</Text>
            <View style={styles.inputBox}>
              <TextInput
                keyboardType='numeric'
                placeholder='10'
                onChangeText={(text) => {
                  this.setState({
                    millionCode: text
                  })
                }}
                text={I18n.t('Million kod')} />
            </View>
          </View>
          {errorMsg}
        </KeyboardAvoidingView>
        <View style={styles.btnBox}>
          {this.renderButton()}
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAmountScreen)
