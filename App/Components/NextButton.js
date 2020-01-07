import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/NextButtonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class NextButton extends Component {
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
    const {text, onPress, color, backgroundColor, width, borderColor, borderRadius, iconBackground} = this.props
    return (
      <TouchableOpacity
        style={[styles.container, {backgroundColor: backgroundColor, width: width, borderColor: borderColor, borderRadius: borderRadius}]}
        onPress={onPress}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <View style={[styles.iconWrapper, {backgroundColor: iconBackground}]}>
            <Icon style={styles.linkIcon} name='accusoft' size={25} color='#000' />
          </View>
          <View>
            <Text style={[styles.text, {color: color}]}>{text}</Text>
          </View>
        </View>
        <View style={[]}>
          <Icon style={styles.linkIcon} name='chevron-right' size={25} color='#686868' />
        </View>
      </TouchableOpacity>
    )
  }
}
