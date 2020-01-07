import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  tabButton: {
    color: '#451E5D'
  },
  gainSumBox: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gainSum: {
    color: '#000',
    fontSize: 34
  },
  btnBox: {
    marginTop: 20,
    width: '70%'
  },
  gainHint: {
    color: '#686868',
    fontSize: 18
  }
})
