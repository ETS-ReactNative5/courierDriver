import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/FacebookTabBarStyle'

export default class TabBar extends Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }


  render () {
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
              name={tab}
              size={30}
              color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
              ref={(icon) => { this.icons[i] = icon; }}
            />
          </TouchableOpacity>;
        })}
      </View>
    )
  }
}
