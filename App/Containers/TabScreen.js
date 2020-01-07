import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import FacebookTabBar from '../Components/FacebookTabBar';
import {connect} from 'react-redux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import RatingsScreen from './RatingsScreen';

// Styles
import styles from './Styles/TabScreenStyle'

class TabScreen extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{marginTop: 40, }}
        initialPage={1}
        renderTabBar={() => <FacebookTabBar />}
      >
        <ScrollView tabLabel="ios-person" style={styles.tabView}>
          <View style={styles.map}>
            <ProfileScreen navigation={this.props.navigation} />
          </View>

        </ScrollView>
        <ScrollView tabLabel="ios-map" style={styles.tabView}>
          <View style={styles.map}>
            <MapScreen />
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-star" style={styles.tabView}>
          <View style={styles.map}>
            <RatingsScreen/>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-list" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TabScreen)
