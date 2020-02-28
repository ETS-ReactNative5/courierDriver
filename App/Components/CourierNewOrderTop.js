import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/CourierNewOrderTopStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
export default class CourierNewOrderTop extends Component {
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
    const {drop_location, pickup_location, total_duration} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.minusBox}>
          <Icon style={styles.minusIcon} name='color-helper' color='#ddd' size={30} />
          <Text style={styles.minusText}>{total_duration} dəqiqə uzaqliqda.
          </Text>
        </View>
        <View style={styles.adressContainer}>
          <View style={styles.dashBox}>
            <Icon name='circle' color='#000080' size={20} />
            <Dash style={{ width: 1, height: 40, flexDirection: 'column' }} />
            <Icon name='circle' color='#C71585' size={20} />
          </View>
          <View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Pickup</Text>
              <Text style={styles.adressText}>{pickup_location}</Text>
            </View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Dropoff</Text>
              <Text style={styles.adressText}>{drop_location}</Text>
            </View>
          </View>
          <View style={styles.cancel}>
            <TouchableOpacity onPress={this.props.onPressCancel}>
              <Icon style={styles.nameBoxIcon} size={40} name='window-close' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
