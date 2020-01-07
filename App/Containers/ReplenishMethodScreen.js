import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ReplenishMethodScreenStyle'
import NextButton from '../Components/NextButton'
import ModalMillion from '../Components/ModalMillion'
class ReplenishMethodScreen extends Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.btnBox}>
          <NextButton
            onPress={() => this.props.navigation.navigate('AddCrediCardScreen')}
            text='Plastik kart'
            color='#000'
            iconBackground='#FED427'
            borderRadius={10}
            backgroundColor='#fff' />
          <ModalMillion />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplenishMethodScreen)
