import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import UserAvatar from 'react-native-user-avatar'
import MyButton from '../Components/MyButton'
import { AirbnbRating, Rating } from 'react-native-ratings'
class OrderScreen extends Component {
  onPress = () => {
    this.props.navigation.navigate('MenuScreen')
  }

  render () {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }} >
        <View style={styles.inner}>
          <View style={styles.close}>
            <TouchableOpacity onPress={this.onPress}>
              <Icon style={styles.closeIcon} size={30} name='window-close' />
            </TouchableOpacity>
          </View>
          <View style={styles.price}>
            <View style={styles.paymetnMethod}>
              <Icon style={styles.cashIcon} size={30} name='cash' />
              <Text>Nəğd</Text>
            </View>
            <Text> AZN</Text>
          </View>
          <View style={styles.ratingBox}>
            <UserAvatar size='100' name='Avishay Bar' />
            <Text style={styles.textPrimary}>Gedişiniz necə idi?</Text>
            <Text style={styles.textHint}>Sizin rəyiniz məxfidir.</Text>
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={5}
              size={50}
              />
            <View style={styles.textAreaBox}>
              <Icon style={styles.cashIcon} size={30} name='comment-text-outline' />
              <TextInput
                style={styles.textArea}
                placeholder='Şərh verin'
                multiline
                numberOfLines={1}
                onChangeText={(text) => this.setState({text})}
              />
            </View>
          </View>
          <View style={styles.btnBox}>
            <MyButton onPress={this.onPres}
              color='#fff'
              backgroundColor='#7B2BFC'
              borderColor='#7B2BFC'
              borderRadius={30}
              text='OK'
              />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
