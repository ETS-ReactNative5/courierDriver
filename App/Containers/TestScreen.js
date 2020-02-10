import React, {Component} from 'react'
import {ScrollView, Platform, Dimensions, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {Images} from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TestScreenStyle'
import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'
import MapViewDirections from 'react-native-maps-directions'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class TestScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      }
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            error: null
          },
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000}
    )
    this.watchLocation()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      console.log(this.state.latitude, this.state.longitude)
    }
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  watchLocation = () => {
    const { coordinate } = this.state

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords

        const newCoordinate = {
          latitude,
          longitude
        }

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500 // 500 is the duration to animate the marker
            )
          }
        } else {
          coordinate.timing(newCoordinate).start()
        }

        this.setState({
          latitude,
          longitude,
          region: {
            longitude: this.state.longitude,
            latitude: this.state.latitude
          }

        })
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    )
  };

  getMapRegion = () => ({
    latitude: this.state.region.latitude,
    longitude: this.state.region.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render () {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.getMapRegion()}
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c}
          // onPress={this.onMapPress}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker
            }}
            coordinate={this.state.coordinate} />
        </MapView>
        <View style={styles.buttonContainer}>
          <MyButton
            onPress={() => this.props.navigation.navigate('OrderScreen')}
            backgroundColor='#451E5D'
            color='#fff'
            borderColor='#451E5D'
            text={I18n.t('teyinEt')}
          />
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen)
