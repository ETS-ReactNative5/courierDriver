import React, {Component} from 'react'
import {View, Dimensions, KeyboardAvoidingView, Button, Platform} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CourierGoToAdressScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, {Marker} from 'react-native-maps'
import {Images} from '../Themes'
import MapViewDirections from 'react-native-maps-directions'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import DriverNewOrderTop from '../Components/DriverNewOrderTop'
import DriverNewOrderBody from '../Components/DriverNewOrderBody'
import AsyncStorage from '@react-native-community/async-storage'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class CourierGoToAdressScreen extends Component {
  constructor (props) {
    super(props)

    // AirBnB's Office, and Apple Park
    this.state = {
      pickup_location: '',
      drop_location: '',
      bill_amount: '',
      total_distance: '',
      phone_number: null,
      customerName: '',
      orderId: '',
      // order_notifications: '',
      // location_tracking: '',
      driverCoordinate: {
        latitude: 40.409264,
        longitude: 49.867092
      },
      coordinates: [
        {
          latitude: 49.84381139999999,
          longitude: 40.3897426
        },
        {
          latitude: 49.846126,
          longitude: 40.41348199999999
        }
      ],
      region: {
        latitude: 40.4093,
        longitude: 49.8671,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      startLocation: 'Picup',
      endLocation: 'Azadliq Prospekti 74',
      driverStatus: 'arrived'
    }
  }

  componentDidMount = async () => {
    console.log(this.props.order.id)
    console.log(this.props.order.pickup_location)
    console.log(this.props.order.drop_location)
    console.log(this.props.order.bill_amount)
    console.log(this.props.order.total_distance)
    console.log(this.props.order.customer.phone_number)
    console.log(this.props.order.drop_ltd,'drop_ltd')
    console.log(this.props.order.drop_lng,'drop_lng')
    console.log(this.props.order.pickup_ltd,'pickup_ltd')
    console.log(this.props.order.pickup_lng,'pickup_lng')
    console.log('------')
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          pickup_location: this.props.order.pickup_location,
          drop_location: this.props.order.drop_location,
          bill_amount: this.props.order.bill_amount,
          total_distance: this.props.order.total_distance,
          phone_number: this.props.order.customer.phone_number,
          customerName: this.props.order.customer.first_name,
          orderId: this.props.order.id,
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
          coordinates: [
            {
              latitude: Number(this.props.order.pickup_ltd),
              longitude: Number(this.props.order.pickup_lng)

            },
            {
              latitude: Number(this.props.order.drop_ltd),
              longitude: Number(this.props.order.drop_lng)
            }
          ],
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
    console.log(this.state)
    // const location_tracking = await AsyncStorage.getItem('@location_tracking')
    //   .then((location_tracking) => {
    //     this.setState({
    //       location_tracking
    //     })
    //   })
    // const order_notifications = await AsyncStorage.getItem('@order_notifications')
    //   .then((order_notifications) => {
    //     this.setState({
    //       order_notifications
    //     })
    //   })
    // this.watchLocation()
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
          // coordinates: [
          //   {
          //     latitude: Number(this.props.order.drop_ltd),
          //     longitude: Number(this.props.order.drop_lng)
          //   },
          //   {
          //     latitude: latitude,
          //     longitude: longitude
          //
          //   }
          // ],
          driverCoordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
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

  onSwipeDone = () => {
    let body = {
      status: 'done'
    }
    // this.setState({loading: true})
    const self = this
    const ordersUrl = orders + this.props.order.id
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
        self.props.attemptOrder(data)

        self.props.navigation.replace('OrderScreen')
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

  render () {

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
          style={styles.map}
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
            headerLayout={() => <DriverNewOrderTop pickup_location={this.state.pickup_location}
              drop_location={this.state.drop_location}
              onSwipeDone={this.onSwipeDone}
              navigation={this.props.navigation} />}
            slidingPanelLayout={() => <DriverNewOrderBody navigation={this.props.navigation}
              customerName={this.state.customerName}
              bill_amount={this.state.bill_amount}
              total_distance={this.state.total_distance}
            />}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CourierGoToAdressScreen)
