import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native'
import styles from './Styles/NewOrderModalStyle'
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, ScaleAnimation} from 'react-native-modals'
import MapView, {Marker} from 'react-native-maps'
import { connect } from 'react-redux'

const {width, height} = Dimensions.get('window')

export default class NewOrderModal extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  state = {
    scaleAnimationModal: false
  };

  state = {
    latitude: 0,
    longitude: 0,
    error: null
  }

  componentDidMount () {
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
  }

  render () {
    let that = this
    setTimeout(function () { that.setState({ scaleAnimationModal: true}) }, 1000)
    return (
      <View >

        <Modal
          onTouchOutside={() => {
            this.setState({ scaleAnimationModal: false })
          }}
          width={0.9}
          visible={this.state.scaleAnimationModal}
          onSwipeOut={() => this.setState({ scaleAnimationModal: false })}
          modalAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            console.log('onHardwareBackPress')
            this.setState({ scaleAnimationModal: false })
            return true
          }}
          modalTitle={
            <ModalTitle
              title='YENİ SİFARİŞ'
              align='center'
              style={styles.notificationTitle}
              textStyle={styles.notificationTitle}
            />
          }
          footer={
            <ModalFooter>
              <ModalButton
                text='İMTİNA ET'
                textStyle={{ color: '#451E5D', fontWeight: 'bold' }}
                bordered
                onPress={() => {
                  this.setState({ scaleAnimationModal: false })
                }}
                key='button-1' />
              <ModalButton
                text='QƏBUL ET'
                style={{ backgroundColor: '#451E5D' }}
                textStyle={{ color: '#fff', fontWeight: 'bold' }}
                bordered
                onPress={() => {
                  this.setState({ scaleAnimationModal: false })
                }}
                key='button-2'
              />
            </ModalFooter>
          }
        >
          <ModalContent
            style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 150 }} >
            <View style={styles.container}>
              <MapView style={{flex: 1, height: 150, width: width * 0.8}}
                showsUserLocation
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}

              >
                {<Marker coordinate={this.state} />}
              </MapView>
              <View style={{ backgroundColor: '#fff' }}>
                <Text style={styles.notificationTextB}>Təbriz küç 52 / Gənclik Mall.</Text>
              </View>
            </View>

          </ModalContent>
        </Modal>
      </View>
    )
  }
}
