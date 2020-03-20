import React, {Component} from 'react'
import {Linking, Text, Dimensions, View, Image, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CourierGoToClientScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps'
import {Images} from '../Themes'
import MapViewDirections from 'react-native-maps-directions'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import CourierOrderTop from '../Components/CourierOrderTop'
import CourierOrderBody from '../Components/CourierOrderBody'
import API from '../Services/Api'
import io from 'socket.io-client'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class CourierGoToClientScreen extends Component {
  constructor (props) {
    super(props)
    // AirBnB's Office, and Apple Park
    this.state = {
      order_notifications: '',
      location_tracking: '',
      drop_location: '',
      pickup_location: '',
      orderId: '',
      phone_number: null,
      photos: [],
      driverCoordinate: {
        latitude: 40.409264,
        longitude: 49.867092
      },
      coordinates: [
        {
          latitude: 40.409264,
          longitude: 49.867092
        },
        {
          latitude: 40.409264,
          longitude: 49.867092
        }
      ],
      region: {
        latitude: 40.409264,
        longitude: 49.867092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      startLocation: 'Götürüləcək ünvan',
      endLocation: 'Azadliq Prospekti 74',
      driverStatus: 'accepted',
      customerPhone: '',
      customer: {
        first_name: '',
        last_name: ''
      },
      total_distance: 0,
      total_duration: 0,
      bill_amount: 0
    }
    this.mapView = null
    // this.socket.on('location_tracking', function (location_tracking) {
    //   this.socket.join(location_tracking)
    // })
    // this.socket.to('location_tracking').emit(this.state.driverCoordinate)
    // this.socket.on('room', function (room) {
    //   this.socket.join(room)
    // })

  }

  componentDidMount = async () => {
    this.setState({
      pickup_location: this.props.order.pickup_location,
      drop_location: this.props.order.drop_location,
      phone_number: this.props.order.customer.phone_number,
      orderId: this.props.order.id
    })

    const location = await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coordinates: [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            {
              latitude: Number(this.props.order.pickup_ltd),
              longitude: Number(this.props.order.pickup_lng)
            }
          ],
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          driverCoordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
          customerPhone: this.props.order.customer.phone_number,
          startLocation: this.props.order.pickup_location,
          endLocation: this.props.order.drop_location,
          total_distance: this.props.order.total_distance,
          bill_amount: this.props.order.bill_amount,
          total_duration: this.props.order.total_duration,
          orderId: this.props.order.id,
          photos: this.props.order.files,
          message: this.props.order.message,
          customer: {
            first_name: this.props.order.customer.first_name,
            last_name: this.props.order.customer.last_name
          }
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000}
    )
    const token = await AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    const location_tracking = await AsyncStorage.getItem('@location_tracking')
      .then((location_tracking) => {
        this.setState({
          location_tracking
        })

        // socket.on('location_tracking', function (location_tracking) {
        //   socket.join(location_tracking)
        //   console.log('join to locTracking')
        // })
        // console.log(location_tracking)
      })

    // socket.on('connect', (socket) => {
    //   console.log('connect start')
    //   console.log(location_tracking, 'location_tracking')
    //   socket.join(location_tracking)
    //   console.log('join to locTracking')
    // })

    const order_notifications = await AsyncStorage.getItem('@order_notifications')
      .then((order_notifications) => {
        this.setState({
          order_notifications
        })
      })

    this.watchLocation()
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      console.log(this.state.latitude, 'markerltd')
      console.log(this.state.longitude, 'markerlgd')
      console.log(this.state.location_tracking)
      console.log(this.state.driverCoordinate, 'driverCoordinate')
      let position = this.state.driverCoordinate
      // this.socket.on('active_orders', this.updateState)
      let room = this.state.location_tracking
      const socket = io('http://worker.delhero.com', {
        forceNew: true,
        transports: ['websocket']
      })
      socket.on('connect', () => {
        socket.emit('track_location', {
          driverCoordinate: this.state.driverCoordinate
        })
        console.log('driverCoordinate - emit')
      })
    }
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
  }
  watchLocation = () => {
    const {driverCoordinate} = this.state

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords
        console.log(position)
        const newCoordinate = {
          latitude,
          longitude
        }

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(newCoordinate, 500) // 500 is the duration to animate the marker
          }
        } else {
          driverCoordinate.timing(newCoordinate).start()
        }

        this.setState({
          coordinates: [
            {
              latitude: latitude,
              longitude: longitude
            },
            {
              latitude: Number(this.props.order.pickup_ltd),
              longitude: Number(this.props.order.pickup_lng)
            }
          ],
          latitude,
          longitude,
          driverCoordinate: {
            latitude,
            longitude
          },
        })
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    )
  };

  onPressCancel = () => {
    let param = {
      status: 'rejected'
    }

    this.putOrder(param)
  }
  onSwipeArrived = () => {
    let param = {
      status: 'arrived'
    }
    this.putOrder(param)
  }
  onSwipeOngoing = () => {
    let param = {
      status: 'ongoing'
    }
    this.putOrder(param)
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
    const order = await api.putOrder(headers, orderID, param).then((order) => {
      if (param.status === 'rejected') {
        this.props.navigation.replace('MenuScreen')
        console.log(order.status)
      }
      if (order.status === 200) {
        if (order.data.status === 'arrived') {
          this.props.attemptOrder(order.data)
          console.log(order.data.status)
          this.setState({
            driverStatus: order.data.status
          })
        } else if (order.data.status === 'ongoing') {
          this.props.attemptOrder(order.data)
          console.log(order.data.status)
          this.props.navigation.replace('CourierGoToAdressScreen')
        } else {
          // this.setState({orderId: ''})
          this.props.navigation.replace('MenuScreen')
          console.log(order.data.status)
        }
      } else {
        this.setState({
          error: order.data.msg

        })
      }
    })
    console.log(order)
  }

  render () {
    // console.log(this.props.order, 'this props order')
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={{flex: 1}}>
        <MapView
          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.latitudeDelta
          }}
          style={{flex: 1}}
          ref={c => this.mapView = c}
          // onPress={this.onMapPress}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker
            }}
            coordinate={this.state.driverCoordinate}
          />
          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} image={Images.marker} coordinate={coordinate} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
              destination={this.state.coordinates[this.state.coordinates.length - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor='#451E5D'
              optimizeWaypoints
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20)
                  }
                })
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={280}
            headerLayout={() => <CourierOrderTop pickup_location={this.state.startLocation}
              onPressCancel={this.onPressCancel}
              total_duration={this.state.total_duration}
              drop_location={this.state.endLocation}
              phone_number={this.state.customerPhone}
              navigation={this.props.navigation} />}
            slidingPanelLayout={() => <CourierOrderBody navigation={this.props.navigation}
              customerName={this.state.customer.first_name}
              bill_amount={this.state.bill_amount}
              onSwipeDone={this.onSwipeArrived}
              onSwipeOngoing={this.onSwipeOngoing}
              driverStatus={this.state.driverStatus}
              total_distance={this.state.total_distance}
              photos={this.state.photos}
              message={this.state.message}
            />}
          />
        </View>
        <View style={styles.waze}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://waze.com/ul?ll=' + this.props.order.pickup_ltd + ',' + this.props.order.pickup_lng + '&navigate=yes')}>
            <Image source={Images.waze} />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.payload

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptOrder: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourierGoToClientScreen)
