import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Easing, Button, TextInput } from 'react-native'
import styles from './Styles/DriverNewOrderBodyStyle'
import { Images } from '../Themes'
import ZoomImage from 'react-native-zoom-image'
import SwipeButton from 'rn-swipe-button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal, { ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import UserAvatar from 'react-native-user-avatar'
import { AirbnbRating } from 'react-native-ratings'
export default class DriverNewOrderBody extends Component {
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
    swipeableModal: false
  };
  onSwipe = () => {
    this.setState({
      swipeableModal: !this.state.swipeableModal

    })
    console.log('swipe-sucsess')
    console.log(this.props.navigation)
  }
  render () {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          {/* <View style={styles.profileHeader}> */}
          {/*  <View style={styles.profileHeaderBody}> */}
          {/*    <Text style={styles.profileHeaderBodyText}>Joe</Text> */}
          {/*    <Text style={styles.profileHeaderBodyTextY}>Kia optima  10-TE-010</Text> */}
          {/*  </View> */}
          {/*  <View style={styles.profileHeaderLeft}> */}
          {/*    <Image style={styles.newsImage} source={Images.userDefaultImg} /> */}
          {/*  </View> */}
          {/* </View> */}
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.cashMetod}>Cash Payment</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>4.20 AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Catdirilma</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>10/10/2019</Text>
              <Text style={styles.sectionTitle}>14:00</Text>
            </View>
          </View>
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
          <View style={styles.imgScroll}>
            <ScrollView horizontal>
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
            </ScrollView>
          </View>
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Qeydlər</Text></View>
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto corporis cupiditate deserunt distinctio ea et explicabo harum id, laborum laudantium natus nostrum qui quo quod unde velit voluptate. Fugiat.</Text></View>
          <View style={styles.sectionLine} />
          <View style={styles.receiverInfoBox}>
            <Text style={styles.adressTitle}>Receiver Name </Text>
            <Text style={styles.receiverFields}>Jon Vik </Text>
            <Text style={styles.adressTitle}>Receiver Phone </Text>
            <Text style={styles.receiverFields}>+994 55 123 45 67 </Text>
          </View>
        </ScrollView>
        <View style={styles.swipeBox}>
          <SwipeButton
            disabled={false}
            title='Sifarishi Tamamla'
            titleColor='#FFFFFF'
            railBackgroundColor='#7B2BFC'
            railBorderColor='#7B2BFC'
            thumbIconBackgroundColor='#7B2BFC'
            thumbIconBorderColor='#7B2BFC'
            thumbIconComponent={SwipeIcon}
            railFillBackgroundColor='#000'
            railFillBorderColor='#fff'
            onSwipeSuccess={this.onSwipe} />
        </View>
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
                  onPress={() => {
                    this.setState({ swipeableModal: false })
                    this.props.navigation.replace('MenuScreen')
                  }} />
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
      </View>
    )
  }
}
