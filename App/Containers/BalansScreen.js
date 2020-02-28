import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalansScreenStyle'
import NextButton from '../Components/NextButton'
import ModalMillion from '../Components/ModalMillion'
class BalansScreen extends Component {
  // state = {
  //   swipeableModal: false
  // };
  // onPresMillion = () => {
  //   this.setState({
  //     swipeableModal: true
  //   })
  // }
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <NextButton
            onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
            text='Bank kartı ile'
            color='#000'
            iconBackground='#FED427'
            // borderRadius={10}
            backgroundColor='#fff' />
          <ModalMillion />
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

export default connect(mapStateToProps, mapDispatchToProps)(BalansScreen)
