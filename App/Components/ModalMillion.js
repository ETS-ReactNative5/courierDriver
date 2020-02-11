import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/ModalMillionStyle'
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation
} from 'react-native-modals'
import NextButton from './NextButton'
export default class ModalMillion extends Component {
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
      <View style={styles.container}>
        <NextButton
          onPress={() => {
            this.setState({
              swipeableModal: true
            })
          }}
          text='Million'
          color='#000'
          iconBackground='#FED427'
          // borderRadius={10}
          backgroundColor='#fff' />
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
              title='Million'
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
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Zəhmət olmasa, Milli ÖN aparatlarına
                yaxınlaşaraq, Balansınızı artırın</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7B2BFC' }}>12af35ad3</Text>
            </View>
          </ModalContent>
        </Modal>
      </View>
    )
  }
}
