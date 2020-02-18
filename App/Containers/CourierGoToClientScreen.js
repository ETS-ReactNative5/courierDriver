import React, {Component} from 'react'
import {Linking, Text, Dimensions, View, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CourierGoToClientScreenStyle'
import MyButton from '../Components/MyButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SwipeButton from 'rn-swipe-button'
import MapView, { Marker } from 'react-native-maps'
import {Images} from '../Themes'
import MapViewDirections from 'react-native-maps-directions'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
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
      startLocation: 'Picup',
      endLocation: 'Azadliq Prospekti 74',
      driverStatus: 'arrived'
    }
    this.mapView = null
  }
  // componentDidMount (): void {
  //   this.setState({
  //     coordinates: [this.props.order.drop_location, this.props.order.pickup_location]
  //   })
  //   console.log(this.state.coordinates)
  // }
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
          error: null
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
      })
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
          longitude
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
  onPressArrived = () => {
    let body = {
      status: 'ongoing'
    }
    // this.setState({loading: true})
    const self = this
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
        self.setState({driverStatus: 'start'})
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }
  onSwipeStart = () => {
    console.log('şifarişe başla')
    let body = {
      status: 'ongoing'
    }
    // this.setState({loading: true})
    const self = this
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
        console.log('Request succeeded with JSON response CourierGoToClinet -----', data)
        console.log(data)
        self.props.attemptOrder(data)

        console.log('geçmeden önce')
        self.props.navigation.replace('CourierGoToAdressScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }
  onPressCancel = () => {
    let body = {
      status: 'rejected'
    }

    // this.setState({loading: true})
    const self = this
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
        self.props.navigation.navigate('MenuScreen')
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
  render () {
    console.log(this.props.order)
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={styles.container}>
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
        <View style={styles.orderContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.inputButton}>
              <Text style={styles.inputText}>{this.state.startLocation}</Text>
              <Text style={styles.inputText}>{this.props.order.pickup_location}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.actionBox}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={this.onPressCancel}>
              <Icon name='cancel' color='#C71585' size={25} />
              <Text style={styles.adressTitle}>Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Icon name='message-text-outline' color='#C71585' size={25} />
              <Text style={styles.adressTitle}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Icon name='phone' color='#C71585' size={25} />
              <Text style={styles.adressTitle} onPress={() => {
                Linking.openURL('tel:' + this.state.customerPhone)
              }}>Call</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />
          {this.state.driverStatus == 'arrived'
            ? <View style={styles.swipeBox}>
              <MyButton color='#fff'
                onPress={this.onPressArrived}
                backgroundColor='#34C57A'
                borderColor='#34C57A'
                text='Catdim'
                width='97%' />
            </View>
            : <View style={styles.swipeBox}>
              <SwipeButton
                disabled={false}
                title='Sifarishi Bashlad'
                titleColor='#FFFFFF'
                railBackgroundColor='#7B2BFC'
                railBorderColor='#7B2BFC'
                thumbIconBackgroundColor='#7B2BFC'
                thumbIconBorderColor='#7B2BFC'
                thumbIconComponent={SwipeIcon}
                railFillBackgroundColor='#000'
                railFillBorderColor='#fff'
                onSwipeSuccess={this.onSwipeStart} />
            </View>
          }
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
