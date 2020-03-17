import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, Easing } from 'react-native'
import styles from './Styles/CourierNewOrderBodyStyle'
import { Images } from '../Themes'
import ZoomImage from 'react-native-zoom-image'
import SwipeButton from 'rn-swipe-button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CourierNewOrderBody extends Component {
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

  render () {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeaderBody}>
              <Text style={styles.profileHeaderBodyText}>{this.props.first_name}</Text>
              {/* <Text style={styles.profileHeaderBodyTextY}>Kia optima  10-TE-010</Text> */}
            </View>
            <View style={styles.profileHeaderLeft}>
              <Image style={styles.newsImage} source={Images.profilImg} />
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Ödəniş növü</Text>
              <Text style={styles.cashMetod}>Nəğd</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>{this.props.bill_amount} AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Məsafə</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>{this.props.total_distance} KM</Text>
            </View>
          </View>
          {/* <View style={styles.cashBox}> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>Catdirilma</Text> */}
          {/*  </View> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>10/10/2019</Text> */}
          {/*    <Text style={styles.sectionTitle}>14:00</Text> */}
          {/*  </View> */}
          {/* </View> */}
          {this.props.photos.length === 0 ? null : <View>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
            <View style={styles.imgScroll}>
              <ScrollView horizontal>
                {
                  this.props.photos.map((item, key) =>
                    (
                      <ZoomImage
                        key={key}
                        source={{uri: item.url}}
                        imgStyle={{width: 110, height: 110, borderRadius: 15}}
                        style={styles.img}
                        duration={200}
                        enableScaling={false}
                        easingFunc={Easing.ease}
                      />
                    ))
                }
              </ScrollView>
            </View>
          </View>}
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Qeydlər</Text></View>
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>{this.props.message}</Text></View>
          <View style={styles.receiverInfoBox} />
        </ScrollView>
        <View style={styles.swipeBox}>
          <SwipeButton
            disabled={false}
            title='Qəbul et'
            titleColor='#FFFFFF'
            railBackgroundColor='#7B2BFC'
            railBorderColor='#7B2BFC'
            thumbIconBackgroundColor='#7B2BFC'
            thumbIconBorderColor='#7B2BFC'
            thumbIconComponent={SwipeIcon}
            railFillBackgroundColor='#000'
            railFillBorderColor='#fff'
            onSwipeSuccess={this.props.onSwipeAccept} />
        </View>
      </View>
    )
  }
}
