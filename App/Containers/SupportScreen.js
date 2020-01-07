import React, { Component } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SupportScreenStyle'

class SupportScreen extends Component {
  render () {
    return (
      <WebView
        source={{uri: 'https://delhero.com/help'}}
        style={{}}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
