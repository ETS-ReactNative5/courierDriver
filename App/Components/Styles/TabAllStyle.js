import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  gainInfoBox: {
    paddingVertical: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  gainIconBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  gainSumBox: {
    flex: 1,
    backgroundColor: '#27093D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gainSum: {
    color: '#fff',
    fontSize: 34
  }
})
