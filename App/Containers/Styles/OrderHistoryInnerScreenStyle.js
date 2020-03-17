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
  },
  imgScroll: {
    height: 130,
    flex: 1,
    // backgroundColor: 'blue',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  sectionTitleBox: {
    paddingTop: 15,
    // backgroundColor: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 18,
    marginBottom: 5,
    paddingBottom: 5
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold'

  },
  orderDescriptionBox: {
    paddingHorizontal: 18,
    marginBottom: 15
  },
  orderDescription: {

  },
  sectionLine: {
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  sectionInlineLine: {
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginHorizontal: 18
  },
  img: {
    padding: 5,
    borderRadius: 15
  },
  receiverInfoBox: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 100
  },
  swipeBox: {
    position: 'absolute',
    bottom: 50,
    width,
    paddingHorizontal: 18
  },
  cashBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  cashValue: {
    fontSize: 25
  },
  cashMetod: {
    marginTop: 10
  },
  profileHeader: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 1
  },
  profileBody: {
    flex: 9,
    backgroundColor: '#fff',
    padding: 30
  },
  profileHeaderBodyText: {
    fontSize: 18,
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  profileHeaderBodyTextY: {
    fontSize: 17,
    color: '#606060',
    fontWeight: 'bold'
  },
  newsImage: {
    width: 50,
    height: 50,

  }
})
