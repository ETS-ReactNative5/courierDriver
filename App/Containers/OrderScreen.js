import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderScreenStyle'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
import MyButton from '../Components/MyButton'
import ModalRating from '../Components/ModalRating'

class OrderScreen extends Component {
  state = {
    scaleAnimationModal: false
  };
  onPressOK = async () => {
    await this.setState({scaleAnimationModal: false})
    this.props.navigation.replace('MenuScreen')
  }
  onPress =() => {
    this.setState({scaleAnimationModal: true})
    console.log(this.state.scaleAnimationModal)
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.orderFinishedBox}>
          <View style={styles.orderPriceBox}>
            <View>
              <Text style={styles.orderTextContent}>6.8 km</Text>
              <Text style={styles.orderTextFealds}>MƏSAFƏ</Text>
            </View>
            <View>
              <Text style={styles.orderTextContent}>5.95 AZN</Text>
              <Text style={styles.orderTextFealds}>GEDİŞ HAQQI</Text>
            </View>
          </View>
          <View>
            <Text style={styles.orderRoadTime}>12 dəq 50 san</Text>
          </View>
        </View>
        <View style={styles.userLikesContainer}>
          <View style={styles.adressBox}>
            <View style={styles.iconBox}>
              <Icon name='circle-outline' size={21} color='#27093D' />
              <Dash style={styles.orderDash} />
              <Icon name='map-marker-outline' size={25} color='#27093D' />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.text}>Füzuli küçəsi 14</Text>
              <Text style={styles.text}>Dilarə Əliyeva 23A</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameBox}>
              <Text style={styles.nameBoxText}>GEDİŞ HAQQI:</Text>
            </View>
            <View>
              <Text style={styles.infoText}>4.60 AZN</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameBox}>
              <Text style={styles.nameBoxText}>GÖZLƏMƏ:</Text>
            </View>
            <View>
              <Text style={styles.infoText}>1.15 AZN</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameBox}>
              <Text style={styles.nameBoxText}>ENDİRİM:</Text>
            </View>
            <View>
              <Text style={styles.infoText}>0.00 AZN</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameBox}>
              <Text style={styles.infoText}>CƏM:</Text>
            </View>
            <View>
              <Text style={styles.infoText}>5.95 AZN</Text>
            </View>
          </View>
          <View style={styles.btnBox}>
            <MyButton
              onPress={this.onPress}
              color='#fff'
              backgroundColor='#7B2BFC'
              borderColor='#7B2BFC'
              borderRadius={30}
              text='OK' />
          </View>
        </View>

        <ModalRating
          scaleAnimationModal={this.state.scaleAnimationModal}
          onPressOK={this.onPressOK}
          navigation={this.props.navigation} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
