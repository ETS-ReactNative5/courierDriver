import React, {Component} from 'react'
import {View, TouchableOpacity, Text, KeyboardAvoidingView, Dimensions, Platform} from 'react-native'
import {connect} from 'react-redux'
import MapView, {AnimatedRegion, Marker} from 'react-native-maps'
import I18n from '../I18n'
import MyButton from '../Components/MyButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import NewOrderModal from '../Components/NewOrderModal'
import io from 'socket.io-client'
// Styles
import styles from './Styles/MapScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapScreen extends Component {
  state = {
    pickup: {
      latitude: 40.3942544,
      longitude: 49.5747749
    },
    drop: {
      latitude: 40.3942544,
      longitude: 49.5747749
    },
    drop_location: '',
    pickup_location: '',
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0
    }),
    order_notifications: '',
    location_tracking: '',
    latitude: 40.4093,
    longitude: 49.8671,
    orderId: '',
    error: null,
    scaleAnimationModal: false
  }

  componentDidMount () {
    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    AsyncStorage.getItem('@location_tracking')
      .then((location_tracking) => {
        this.setState({
          location_tracking
        })
      })
    AsyncStorage.getItem('@order_notifications')
      .then((order_notifications) => {
        this.setState({
          order_notifications
        })
      })
    // this.watchLocation()


    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000}
    )
    window.navigator.userAgent = 'ReactNative'
    const socket = io('http://worker.delhero.com', {
      forceNew: true,
      transports: ['websocket']
    })
    socket.on('connect', () => console.log('Connection'))
    socket.on('active_orders', this.updateState)
  }
  updateState = result => {
    const orderId = result.order_id
    this.setState({
      orderId,
      scaleAnimationModal: true
    })
    console.log(result.order_id, 'soket-result')
    console.log(this.state.orderId, 'state-result')
    this.subscribeToPubNub()
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  onPressCancel = () => {
    this.setState({scaleAnimationModal: false})
  }
  onPressAccept = () => {
    let body = {
      status: 'accepted'
    }
    // this.setState({loading: true})
    const self = this
    // const ordersUrl = orders + '67cad33c-236a-4a75-a46e-0bedd35f142f'
    const ordersUrl = orders + this.state.orderId
    // console.log(body, login)


    console.log(body)
    fetch(ordersUrl, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
        // 'X-localization': currentLang
        //   'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        self.props.attemptOrder(data)
        self.setState({scaleAnimationModal: false})
        self.props.navigation.replace('CourierGoToClientScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log('-------')
      console.log(response.status)
      console.log('-------')
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }
  subscribeToPubNub = () => {
    const self = this
    const ordersUrl = orders + self.state.orderId
      // console.log(body, login)
    fetch(ordersUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
          // 'X-localization': currentLang
          //   'Accept': 'application/json',
          // 'Content-Type': 'application/json'
      }
    })
        .then(json)
        .then(status)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          console.log(data)
          self.props.attemptOrder(data)

          self.setState({
            scaleAnimationModal: true,
            pickup_location: data.pickup_location,
            pickup: {
              latitude: Number(data.drop_lng),
              longitude: Number(data.drop_ltd)
            }
          })
        })
        .catch(function (error) {
          console.log(error)
          console.log('err')
        })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log('-------')
      console.log(response.status)
      console.log('-------')
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

          // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation
          provider={MapView.PROVIDER_GOOGLE}
          showsMyLocationButton
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ASPECT_RATIO
          }}

        >
          {/* <Marker coordinate={this.state}/> */}
        </MapView>

        <View style={styles.buttonContainer} />
        <View style={[styles.gumburger]}>
          <TouchableOpacity onPress={this.props.open}>
            <Icon style={styles.nameBoxIcon} size={30} name='menu' />
          </TouchableOpacity>
        </View>
        <NewOrderModal
          pickup_location={this.state.pickup_location}
          coordinate={this.state.pickup}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          scaleAnimationModal={this.state.scaleAnimationModal}
          onPressAccept={this.onPressAccept}
          onPressCancel={this.onPressCancel}
          navigation={this.props.navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptOrder: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
