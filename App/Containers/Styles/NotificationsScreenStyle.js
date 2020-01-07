import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  newsItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center'

  },
  newsImage: {
    width: 65,
    height: 65,
    marginHorizontal: 10
  },
  newsDate: {
    color: '#451E5D',
    fontSize: 10,
    paddingTop: 15,
    textAlign: 'right',
    alignSelf: 'stretch'
  },
  newsText: {
    color: '#606060',
    fontSize: 13
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  newsTextBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 15
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F52C55',
    padding: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
