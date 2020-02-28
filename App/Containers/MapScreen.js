import React, {Component} from 'react'
import {View, TouchableOpacity, Text, KeyboardAvoidingView, Dimensions, Platform} from 'react-native'
import {connect} from 'react-redux'
import MapView, {AnimatedRegion, Marker} from 'react-native-maps'
import I18n from '../I18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import io from 'socket.io-client'
import API from '../Services/Api'
// Styles
import styles from './Styles/MapScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import CourierNewOrderTop from '../Components/CourierNewOrderTop'
import CourierNewOrderBody from '../Components/CourierNewOrderBody'
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
    scaleAnimationModal: false,
    drop_location: '',
    pickup_location: '',
    customer: {
      first_name: '',
      last_name: ''
    },
    total_distance: 0,
    total_duration: 0,
    bill_amount: 0
  }

  componentDidMount () {
    console.disableYellowBox = true
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
      orderId
      // scaleAnimationModal: true
    })
    console.log(result.order_id, 'soket-result')
    console.log(this.state.orderId, 'state-result')
    this.subscribeToPubNub()
  }
  onPressCancel = () => {
    let param = {
      status: 'rejected'
    }
    this.putOrder(param)
  }
  onSwipeAccept = () => {
    let param = {
      status: 'accepted'
    }
    this.putOrder(param)
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
      }
    })
        .then(json)
        .then(status)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          console.log(data)
          self.props.attemptOrder(data)
          self.setState({
            // scaleAnimationModal: true,
            pickup_location: data.pickup_location,
            drop_location: data.drop_location,
            total_distance: data.total_distance,
            bill_amount: data.bill_amount,
            total_duration: data.total_duration,
            pickup: {
              latitude: Number(data.drop_lng),
              longitude: Number(data.drop_ltd)
            },
            customer: {
              first_name: data.customer.first_name,
              last_name: data.customer.last_name
            }
          })
          console.log(self.state.customer.first_name)
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
  putOrder = async (param) => {
    const orderID = this.state.orderId
    const token = await AsyncStorage.getItem('@token')
    this.token = 'Bearer ' + token
    const api = API.create()
    let headers = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      }
    }
    const order = await api.putOrder(headers, orderID, param)
    console.log(order)
    if (order.status == 200) {
      if (order.data) {
        this.props.attemptOrder(order.data)
        this.props.navigation.replace('CourierGoToClientScreen')
      } else {
        this.setState({orderId: ''})
      }
    } else {
      this.setState({
        error: order.data.msg

      })
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
        {this.state.orderId !== '' ? <SlidingPanel
          headerLayoutHeight={200}
          headerLayout={() => <CourierNewOrderTop pickup_location={this.state.pickup_location}
            onPressCancel={this.onPressCancel}
            total_duration={this.state.total_duration}
            drop_location={this.state.drop_location}
            phone_number={this.state.phone_number}
            navigation={this.props.navigation} />}
          slidingPanelLayout={() => <CourierNewOrderBody navigation={this.props.navigation}
            first_name={this.state.customer.first_name}
            bill_amount={this.state.bill_amount}
            onSwipeAccept={this.onSwipeAccept}
            total_distance={this.state.total_distance}
          />}
        /> : null }

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
