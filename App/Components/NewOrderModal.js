import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text, Dimensions} from 'react-native'
import styles from './Styles/NewOrderModalStyle'
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, ScaleAnimation} from 'react-native-modals'
import MapView, {Marker} from 'react-native-maps'

const {width} = Dimensions.get('window')

export default class NewOrderModal extends Component {
  render () {
    const {scaleAnimationModal, latitude, longitude, coordinate, pickup_location} = this.props
    console.log(coordinate)
    return (
      <View>

        <Modal
          // onTouchOutside={() => {
          //   this.setState({scaleAnimationModal: false})
          // }}
          width={0.9}
          visible={scaleAnimationModal}
          onSwipeOut={() => this.setState({scaleAnimationModal: false})}
          modalAnimation={new ScaleAnimation()}
          // onHardwareBackPress={() => {
          //   console.log('onHardwareBackPress')
          //   this.setState({scaleAnimationModal: false})
          //   return true
          // }}
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
                textStyle={{color: '#451E5D', fontWeight: 'bold'}}
                bordered

                onPress={this.props.onPressCancel}
                key='button-1' />
              <ModalButton
                text='QƏBUL ET'
                style={{backgroundColor: '#451E5D'}}
                textStyle={{color: '#fff', fontWeight: 'bold'}}
                bordered
                onPress={this.props.onPressAccept}
                key='button-2'
              />
            </ModalFooter>
          }
        >
          <ModalContent
            style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 150}}>
            <View style={styles.container}>
              <MapView style={{flex: 1, height: 150, width: width * 0.8}}
                showsUserLocation
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                  latitudeDelta: 0.0922 / 4,
                  longitudeDelta: 0.0421 / 4
                }}

              >
                {<Marker coordinate={coordinate} />}
              </MapView>
              <View style={{backgroundColor: '#fff'}}>
                <Text style={styles.notificationTextB}>{pickup_location}</Text>
              </View>
            </View>

          </ModalContent>
        </Modal>
      </View>
    )
  }
}
