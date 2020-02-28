import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  close: {
    paddingHorizontal: width * 0.05
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
    borderBottomWidth: 1

  },
  paymetnMethod: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cashIcon: {
    marginRight: width * 0.05
  },
  ratingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  textPrimary: {
    color: '#000',
    fontSize: width * 0.08,
    padding: width * 0.05
  },
  textHint: {
    color: '#000',
    fontSize: width * 0.04
  },
  textAreaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    paddingTop: height * 0.15,
    paddingBottom: height * 0.005,
    borderBottomWidth: 1,
  },
  textArea: {
    width: '100%'
  },
  inner: {
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'flex-end'
  },
  btnBox: {
    marginHorizontal: 20

  }
})
