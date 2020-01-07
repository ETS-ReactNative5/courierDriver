import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import DATA from '../Fixtures/DATA'
import MyButton from '../Components/MyButton'
import Dash from 'react-native-dash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// import I18n from '../I18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AllOrderScreenStyle'

// const orders = require('../Fixtures/orders.json')

class AllOrderScreen extends Component {
  renderOrdersItem = ({item}) => {
    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderBox}>
          <Icon name='chevron-right' size={30} color='#451E5D' />
          {/* <Image style={styles.orderImg} source={item.picture} /> */}
          <Text style={styles.orderText}>{item.type} | {item.date} </Text>
        </View>
        <View style={styles.orderBox}>
          <View>
            <View style={styles.orderAdressBox}>
              <Icon style={{paddingLeft: 3}} name='circle-outline' size={16} color='#606060' />
              <Text style={styles.orderAdress}>{item.startPlace}</Text>
            </View>
            <Dash style={styles.orderDash} />
            <View style={styles.orderAdressBox}>
              <Icon name='map-marker-outline' size={21} color='#606060' />
              <Text style={styles.orderAdress}>{item.endPlace}</Text>
            </View>
          </View>
          <View style={styles.orderPriceBox}>
            <Text style={styles.orderPrice}>{item.price} </Text>
          </View>
        </View>
      </View>
    )
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 8}}>
          <FlatList
            renderItem={this.renderOrdersItem}
            keyExtractor={(item) => item.id}
            data={DATA} />
        </View>
        <View style={{ flex: 1 }}>
          <MyButton
            text='TƏQVİMDƏN SEÇ'
            color='#fff'
            backgroundColor='#7b2bfc'
            borderColor='#7b2bfc' />
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

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderScreen)
