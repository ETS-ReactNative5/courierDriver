import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  ratingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#451E5D'
  },
  rating: {
    backgroundColor: '#451E5D'
  },
  userLikesContainer: {
    flex: 3,
    paddingHorizontal: width * 0.04
  },
  ratingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.01
  },
  ratingBal: {
    fontSize: 18,
    color: '#606060'
  },
  ratingDate: {
    fontSize: 14,
    color: '#606060'
  }

})
