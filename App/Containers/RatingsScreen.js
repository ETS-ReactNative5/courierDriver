import React, { Component } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import { Rating } from 'react-native-ratings'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RatingsScreenStyle'
import { Text } from "native-base"
import news from '../Fixtures/news'

class RatingsScreen extends Component {
  renderRatingItem = ({item, index}) => {
    return (
      <View style={styles.ratingItemContainer}>
        <Rating
          type='custom'
          readonly={true}
          startingValue={item.bal}
          imageSize={20} />
        <Text style={styles.ratingDate} >{item.date}</Text>
        <Text style={styles.ratingBal}>{item.bal}</Text>
      </View>
    )
  };
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.ratingBox}>
          <Rating
            type='custom'
            showRating
            readonly={true}
            tintColor='#451E5D'
          />
        </View>
        <View style={styles.userLikesContainer}>
          <FlatList
            renderItem={this.renderRatingItem}
            keyExtractor={(item) => item.id}
            data={news} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RatingsScreen)
