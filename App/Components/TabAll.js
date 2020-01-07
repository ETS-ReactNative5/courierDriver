import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, FlatList } from 'react-native'
import styles from './Styles/TabAllStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import Dash from 'react-native-dash'
import DATA from '../Fixtures/DATA'
export default class TabAll extends Component {
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

  renderOrdersItem = ({item}) => {
    return (
      <View style={styles.gainInfoBox}>
        <View style={styles.gainIconBox}>
          <Icon style={{marginRight: 10}} name='md-add' size={22} />
          <Text>2486282218</Text>
        </View>
        <Text> 28/08/19</Text>
        <Text> 8.90 AZN</Text>
      </View>
    )
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <FlatList
            renderItem={this.renderOrdersItem}
            keyExtractor={(item) => item.id}
            data={DATA} />
        </View>
        {/* <View style={styles.gainSumBox}> */}
        {/*  <Text style={styles.gainSum}>245.60 AZN</Text> */}
        {/* </View> */}
      </View>
    )
  }
}
