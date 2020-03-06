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
import { AirbnbRating } from 'react-native-ratings'
import API from '../Services/Api'
class OrderScreen extends Component {
  constructor (props) {
    super(props)
    // AirBnB's Office, and Apple Park
    this.state = {
      error: null,
      rating: 5,
      customer: {
        first_name: '',
        last_name: ''
      }
    }
  }
  componentDidMount (): void {
    this.setState({
      customer: {
        first_name: this.props.order.customer.first_name,
        last_name: this.props.order.customer.last_name
      },
      customerId: this.props.order.customer.id,
      orderId: this.props.order.id
    })
  }
  onPressRating = () => {
    console.log(this.props.fetching)
    let customerId = this.state.customerId
    let orderId = this.state.orderId
    let rating = this.state.rating
    let body = {
      customer_id: customerId,
      order_id: orderId,
      rating: rating
    }
    console.log(body)

    this.postRating(body)
  }
  postRating = async (param) => {
    console.log(param)
    const api = API.create()

    const rating = await api.postRating(param)
    console.log(rating)
    if (rating.status === 201) {
      this.props.navigation.navigate('MenuScreen')
    } else {
      this.setState({
        error: rating.status,
        loading: false

      })
    }
  }
  ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating)
    let self = this
    self.setState({
      rating: rating
    })
    console.log(self.state.rating)
  }
  onPress = () => {
    this.props.navigation.navigate('MenuScreen')
  }
  render () {
    const name = this.state.customer.first_name + ' ' + this.state.customer.last_name
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
            <UserAvatar size='100' name={name} />
            <Text style={styles.textPrimary}>Gedişiniz necə idi?</Text>
            <Text style={styles.textHint}>Sizin rəyiniz məxfidir.</Text>
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={5}
              size={50}
              onFinishRating={this.ratingCompleted}
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

            <MyButton onPress={this.onPressRating}
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
