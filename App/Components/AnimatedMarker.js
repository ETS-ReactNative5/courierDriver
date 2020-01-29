import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Animated } from 'react-native'
import styles from './Styles/AnimatedMarkerStyle'

export default class AnimatedMarker extends Component {
  state = {
    animation: new Animated.Value(1)
  }

  componentDidMount () {
    this.startAnimation()
  }

  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animation, {
          toValue: 0.9,
          duration: 1000
        }),
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 1000
        })
      ])
    ).start()
  };
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
    const animatedStyles = {
      opacity: this.state.animation,
      transform: [{
        scale: this.state.animation
      }]
    }
    return (
      <Animated.View style={styles.markerWrap}>
        <Animated.View style={[styles.ring, animatedStyles]} />
        {/* <Animated.View style={[styles.marker, animatedStyles]} /> */}
      </Animated.View>
    )
  }
}
