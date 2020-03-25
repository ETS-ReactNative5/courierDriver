import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import AppIntroSlider from 'react-native-app-intro-slider'
import {Images} from '../Themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AppIntroSliderScreenStyle'
import API from '../Services/Api'
import Spiner from '../Components/Spiner'
const slides = [
  {
    key: 'somethun',
    title: 'Coverage around the country',
    text: 'Receive orders hundreds of cutomers.',
    image: Images.AppIntroSlide1
  },
  {
    key: 'somethun-dos',
    title: 'Be your own boss.',
    text: 'Do you have free time and want to earn extra money? Start earning today!',
    image: Images.AppIntroSlide2,
    backgroundColor: '#febe29'
  },
  {
    key: 'somethun1',
    title: 'Reliable earnings.',
    text: 'The Delhero Carrier app and its features help you make money you can depend on.',
    image: Images.AppIntroSlide3,
    backgroundColor: '#22bcb5'
  }
]
class AppIntroSliderScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showRealApp: false,
      error: null,
      loading: true
    }
    this.getToken()
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.setState({
      token: this.token
    })
    console.log(token)
    if (token) {
      this.setState({
        loading: false
      })
      this.props.navigation.replace('MenuScreen')
    } else {
      if (this.state.showRealApp === true) {
        this.setState({
          loading: false
        })
        this.props.navigation.replace('FirstScreen')
      } else {
        this.setState({
          loading: false
        })
      }
    }
  }



  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon style={styles.minusIcon} name='arrow-right' color='#ddd' size={30} />
      </View>
    )
  };
  _renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={this._onDone}style={styles.buttonCircle}>
        <Icon style={styles.minusIcon} name='check' color='#ddd' size={30} />
      </TouchableOpacity>
    )
  };
  _renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    )
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true })
    this.props.navigation.replace('FirstScreen')
  }
  render () {
    return (
      <View style={styles.container}>
        {
          this.state.loading === true ? <Spiner size='large' /> : <AppIntroSlider
            slides={slides}
            renderItem={this._renderItem}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroSliderScreen)
