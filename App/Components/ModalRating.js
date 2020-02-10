import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TextInput, Button, Text } from 'react-native'
import styles from './Styles/ModalRatingStyle'
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
} from 'react-native-modals'
import UserAvatar from 'react-native-user-avatar'
import { AirbnbRating } from 'react-native-ratings'

import I18n from '../I18n'
export default class ModalRating extends Component {
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
    customBackgroundModal: false,
    defaultAnimationModal: false,
    swipeableModal: false,
    scaleAnimationModal: false,
    slideAnimationModal: false,
    bottomModalAndTitle: false,
    bottomModal: false
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            title='Show Modal - Swipeable Modal Animation'
            onPress={() => {
              this.setState({
                swipeableModal: true
              })
            }}
          />
        </View>

        <Modal
          onDismiss={() => {
            this.setState({ swipeableModal: false })
          }}
          width={0.9}
          overlayOpacity={1}
          visible={this.state.swipeableModal}
          rounded
          actionsBordered
          onSwipeOut={() => {
            this.setState({ swipeableModal: false })
          }}
          onTouchOutside={() => {
            this.setState({ swipeableModal: false })
          }}
          swipeDirection={['down', 'up']}
          modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          modalTitle={
            <ModalTitle
              title='Rating'
            />
          }
          footer={
            <ModalFooter style={{ backgroundColor: '#fff', padding: 10, width: '100%' }}>

              <ModalButton
                style={{ backgroundColor: '#7b2bfc', padding: 8, width: '100%', borderRadius: 30 }}
                textStyle={{color: '#fff', fontWeight: 'bold'}}
                text='OK'
                onPress={() => { this.setState({ swipeableModal: false }) }} />
            </ModalFooter>
          }
        >
          <ModalContent style={{ backgroundColor: '#fff', paddingTop: 4 }} >
            <View style={{ alignItems: 'center', paddingTop: 8 }}>
              <UserAvatar size='100' name='Avishay Bar' colors={['#7b2bfc']} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Avishay Ba</Text>
            </View>

            <AirbnbRating
              count={5}
              defaultRating={5}
              size={40}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 4, marginTop: 10 }}
              multiline
              numberOfLines={4}
              onChangeText={(text) => this.setState({text})}
            />
          </ModalContent>
        </Modal>
      </View>
    )
  }
}
