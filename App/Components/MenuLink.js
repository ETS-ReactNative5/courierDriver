import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native'
import styles from './Styles/MenuLinkStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class MenuLink extends Component {
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

  render() {
    const {text, onPress, color, backgroundColor, width, borderColor, size, fontSize, icon} = this.props
    return (
      <TouchableOpacity
        style={[styles.link, {backgroundColor: backgroundColor, width: width, borderColor: borderColor}]}
        onPress={onPress}>
        <Icon style={styles.linkIcon} name={icon} size={size} color={color}/>
        <Text style={[styles.linkText, {color: color, fontSize: fontSize}]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}
