import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuLink from '../Components/MenuLink'

import {Images} from '../Themes'

class ProfileScreen extends Component {
  render () {
    console.log(this.props.navigation)
    return (
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderLeft}>
            <Image style={styles.newsImage} source={Images.profilImg} />
          </View>
          <View style={styles.profileHeaderBody}>
            <Text style={styles.profileHeaderBodyText}>ALİ HASANLİ</Text>
            <Text style={styles.profileHeaderBodyTextY}>Balans: 30.00 AZN</Text>
          </View>
        </View>
        <View style={styles.profileBody}>
          <MenuLink text='Hesab'
            onPress={() => this.props.navigation.navigate('AccountScreen')}
            icon='account-settings'
            color='#606060'
            size={25}
            fontSize={20}
          />
          <MenuLink text='Sənədlər'
            icon='file-document-box-multiple-outline'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Sifarişlər'
            onPress={() => this.props.navigation.navigate('AllOrderScreen')}
            icon='map-search-outline'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Bank hesabı'
            onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
            icon='bank'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Qazanc'
            onPress={() => this.props.navigation.navigate('GainScreen')}
            icon='cash-multiple'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Balans'
            icon='notification-clear-all'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Bildirişlər'
            onPress={() => this.props.navigation.navigate('NotificationsScreen')}
            icon='settings'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Dəstək'
            onPress={() => this.props.navigation.navigate('SupportScreen')}
            icon='percent'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Log out'
            icon='exit-to-app'
            color='#606060'
            size={25}
            fontSize={20} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
