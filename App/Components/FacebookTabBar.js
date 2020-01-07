import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwitchToggle from "react-native-switch-toggle";
import styles from './Styles/FacebookTabBarStyle'

export default class TabBar extends Component {
  icons = [];

  constructor(props) {
    super(props);
    this.state = {
      switchOn1: false,
      icons: [],
    };
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({value,}) {
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

  onPress1 = () => {
    this.setState({switchOn1: !this.state.switchOn1});
  };
  onPress2 = () => {
    this.setState({switchOn2: !this.state.switchOn2});
  };
  onPress3 = () => {
    this.setState({switchOn3: !this.state.switchOn3});
  };
  onPress4 = () => {
    this.setState({switchOn4: !this.state.switchOn4});
  };

  render() {
    return (
      <View style={[styles.tabs, this.props.style,]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
              name={tab}
              size={30}
              color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
              ref={(icon) => {
                this.icons[i] = icon;
              }}
            />
          </TouchableOpacity>;
        })}


        <SwitchToggle
          containerStyle={{
            marginTop: 7,
            marginRight:10,
            width: 38,
            height: 13,
            borderRadius: 13,
            backgroundColor: "#ccc",
            padding: 5
          }}
          circleStyle={{
            width: 13,
            height: 13,
            borderRadius: 13,
            backgroundColor: "white" // rgb(102,134,205)
          }}
          switchOn={this.state.switchOn1}
          onPress={this.onPress1}
          circleColorOff="white"
          circleColorOn="#3AE810"
          duration={500}
        />
      </View>
    )
  }
}
