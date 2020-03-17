import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Easing } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderHistoryInnerScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
import { Images } from '../Themes'
import ZoomImage from 'react-native-zoom-image'
class OrderHistoryInnerScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.adressContainer}>
          <View style={styles.dashBox}>
            <Icon name='circle' color='#000080' size={20} />
            <Dash style={{ width: 1, height: 40, flexDirection: 'column' }} />
            <Icon name='circle' color='#C71585' size={20} />
          </View>
          <View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Pickup</Text>
              <Text style={styles.adressText}>{this.props.orderInner.pickup_location}</Text>
            </View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Dropoff</Text>
              <Text style={styles.adressText}>{this.props.orderInner.drop_location}</Text>
            </View>
          </View>
        </View>
        <ScrollView >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeaderBody}>
              <Text style={styles.profileHeaderBodyText}>{this.props.orderInner.driver.first_name}</Text>
              <Text style={styles.profileHeaderBodyTextY}>{this.props.orderInner.driver.last_name}</Text>
            </View>
            <View style={styles.profileHeaderLeft}>
              <Image style={styles.newsImage} source={Images.userDefaultImg} />
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Ödəniş növü</Text>
              <Text style={styles.cashMetod}>Nəğd</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>{this.props.orderInner.bill_amount} AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Məsafə</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>{this.props.orderInner.total_distance} KM</Text>
            </View>
          </View>
          {/* <View style={styles.cashBox}> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>Catdirilma</Text> */}
          {/*  </View> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>10/03/2020</Text> */}
          {/*    <Text style={styles.sectionTitle}>14:00</Text> */}
          {/*  </View> */}
          {/* </View> */}
          {this.props.orderInner.files.length === 0 ? null : <View>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
            <View style={styles.imgScroll}>
              <ScrollView horizontal>
                {
                  this.props.orderInner.files.map((item, key) =>
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
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>{this.props.orderInner.message}</Text></View>
          <View style={styles.sectionLine} />
          <View style={styles.receiverInfoBox}>
            {this.props.orderInner.receiver_name === '' ? null : <View>
              <Text style={styles.adressTitle}>Çatdırılacaq şəxs:</Text>
              <Text style={styles.receiverFields}>{this.props.orderInner.receiver_name} </Text>
            </View>}
            <Text style={styles.adressTitle}>Çatdırılacaq şəxsin nömrəsi:</Text>
            <Text style={styles.receiverFields}>{this.props.orderInner.receiver_phone}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderInner: state.orderInner.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryInnerScreen)
