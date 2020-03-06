import { Dimensions, StyleSheet } from 'react-native'
let {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  adressContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    paddingTop: 15,
    paddingBottom: 10,
    width
    // backgroundColor: 'red'
  },
  dashBox: {
    alignItems: 'center',
    marginRight: 10
  },
  adressBox: {
    width: width * 0.85,
    paddingHorizontal: 10
  },
  adressTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  adressText: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 8,
    marginBottom: 15
  },
  actionBox: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  receiverFields: {
    paddingVertical: 10
  },
  minusBox: {
    paddingBottom: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  minusIcon: {
    marginTop: -15
  },
  minusText: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  iconBox: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 60,
    borderColor: '#00000055'
  }
})
