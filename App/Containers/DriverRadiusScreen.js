import React, { Component } from 'react'
import { View, Dimensions, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import InputSpinner from 'react-native-input-spinner'
// import Permissions from 'react-native-permissions'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DriverRadiusScreenStyle'
import MapView, { Marker } from 'react-native-maps'
import AnimatedMarker from '../Components/AnimatedMarker'
// import InputSpiner from '../Components/InputSpiner'
//
// import { ifElse, reject } from 'ramda'
import SwipeButton from 'rn-swipe-button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
class DriverRadiusScreen extends Component {
  state = {
    isOnDefaultToggleSwitch: false,

    region: {
      latitude: 40.4050531,
      longitude: 49.8346519,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05 * ASPECT_RATIO

    },
    spiner: {
      buttonRightDisabled: false,
      buttonLeftDisabled: false,
      number: 1,
      max: 6,
      min: 0,
      disabled: false,
      oneMore: 0
    },
    circle: {
      latitude: 40.4050531,
      longitude: 49.8346519,
      radius: 0 * ASPECT_RATIO

    },
    markers: {
      latitude: 40.4050531,
      longitude: 49.8346519,
      error: null
    }

  };

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          markers: {
            ...this.state.markers,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          }
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 2000}
    )
  }

  onToggle (isOn) {
    console.log('Changed to ' + isOn)
  }

  onblije = (number) => {
    let delta = this.state.region.latitudeDelta
    console.log(number)
    this.setState({
      region: {
        ...this.state.region,
        latitudeDelta: delta / 2,
        longitudeDelta: delta / 2
      }
    })
  }

  onDalshe = (num) => {
    let delta = this.state.region.latitudeDelta
    let radiusKM = this.state.circle.radius
    // console.log(num);
    if (num > this.state.spiner.min) {
      delta = delta * 2
      radiusKM = radiusKM + 1000
      console.log(radiusKM)
    }
    if (this.state.spiner.oneMore === 1) {
      this.setState({
        spiner: {
          ...this.state.spiner,
          oneMore: this.state.spiner.oneMore - 1
        }
      })
    }
    this.setState({
      region: {
        ...this.state.region,
        latitudeDelta: delta,
        longitudeDelta: delta
      },
      circle: {
        ...this.state.circle,
        radius: radiusKM
      }

    })
    console.log(this.state.circle.radius)
  }
  //
  onMin = () => {
    console.log('min')
    let delta = this.state.region.latitudeDelta
    if (this.state.spiner.oneMore < 1) {
      this.setState({
        region: {
          ...this.state.region,
          latitudeDelta: delta / 2,
          longitudeDelta: delta / 2
        },
        spiner: {
          ...this.state.spiner,
          oneMore: this.state.spiner.oneMore + 1
        }
      })
    } else {
      this.setState({
        region: {
          ...this.state.region
        }
      })
    }
  }

  render () {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={styles.mainContainer}>
        <MapView
          loadingEnabled
          zoomEnabled
          showsUserLocation
          style={styles.map}
          region={this.state.region} >
          {/*<Marker*/}
          {/*  coordinate={this.state.markers} >*/}
          {/*  <AnimatedMarker />*/}
          {/*</Marker>*/}
        </MapView>
        {/*<View style={styles.switchBox}>*/}
        {/*  <ToggleSwitch*/}
        {/*    size='large'*/}
        {/*    onColor='#7B2BFC'*/}
        {/*    offColor='#ecf0f1'*/}
        {/*    isOn={this.state.isOnDefaultToggleSwitch}*/}
        {/*    onToggle={isOnDefaultToggleSwitch => {*/}
        {/*      this.setState({ isOnDefaultToggleSwitch })*/}
        {/*      this.onToggle(isOnDefaultToggleSwitch)*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Sifariş qəbul etmək istədiyiniz radiusu seçin</Text>
        </View>
        <View style={styles.countBox}>
          <InputSpinner
            max={this.state.spiner.max}
            min={this.state.spiner.min}
            step={1}
            width={200}
            fontSize={25}
            textColor={'#fff'}
            append={<Text style={styles.simbol}>KM</Text>}
            colorMax={'#fff'}
            colorMin={'#40c5f4'}
            buttonTextColor={'#000'}
            buttonStyle={{backgroundColor: '#fff' }}
            value={this.state.spiner.number}
            onIncrease={this.onDalshe}
            onDecrease={this.onblije}
            onMin={this.onMin}
            buttonLeftDisabled={this.state.spiner.buttonLeftDisabled}
            buttonRightDisabled={this.state.spiner.buttonRightDisabled}
            disabled={this.state.spiner.disabled}
          />
        </View>
        <View style={{flex: 1, width: '100%', position: 'absolute', bottom: '10%', alignSelf: 'flex-end' }}>
          <SwipeButton
            disabled={false}
            title='Tesdiqle'
            titleColor='#FFFFFF'
            railBackgroundColor='#7B2BFC'
            railBorderColor='#7B2BFC'
            thumbIconBackgroundColor='#7B2BFC'
            thumbIconBorderColor='#7B2BFC'
            thumbIconComponent={SwipeIcon}
            railFillBackgroundColor='transparant'
            railFillBorderColor='#fff'
            onSwipeSuccess={() =>
              this.props.navigation.replace('MenuScreen')
            } />
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
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverRadiusScreen)
