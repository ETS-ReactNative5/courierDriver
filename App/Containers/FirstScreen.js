import React, {Component} from 'react'
import {Text, View, ImageBackground} from 'react-native'
import {Images} from '../Themes'
import MyButton from '../Components/MyButton'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FirstScreenStyle'
import AsyncStorage from '@react-native-community/async-storage'
class FirstScreen extends Component {
  componentDidMount () {
    // AsyncStorage.removeItem('@token');
    AsyncStorage.getItem('@token')
      .then((token) => {
        console.log(token)
        if (token) this.props.navigation.navigate('MenuScreen')
      })
  }
  render () {
    return (
      <ImageBackground
        style={styles.bg}
        source={Images.bg}>

        {/* <View style={styles.imageContainer}> */}
        {/*  <Image style={styles.image} source={Images.logo}/> */}
        {/* </View> */}

        <View style={styles.whiteArea} />
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>189 taksi şirkətinə </Text> */}
          <Text style={[styles.text, {fontWeight: 'bold'}]}>xoş gəlmisiniz</Text>
        </View>

        <View style={styles.buttonContainer}>
          <MyButton color='#fff'
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            backgroundColor='#451E5D'
            borderColor='#451E5D'
            text='Login'
            width='50%' />
          <MyButton width='50%'
            onPress={() => this.props.navigation.navigate('PhoneValidateInputScreen')}
            backgroundColor='#fff'
            color='#451E5D'
            borderColor='#451E5D'
            text='Register' />
        </View>
      </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)
