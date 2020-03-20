import {createStackNavigator, createAppContainer} from 'react-navigation'
import TestScreen from '../Containers/TestScreen'
import GainScreen from '../Containers/GainScreen'
import PaymentMethodScreen from '../Containers/PaymentMethodScreen'
import AllOrderScreen from '../Containers/AllOrderScreen'
import OrderScreen from '../Containers/OrderScreen'
import RatingsScreen from '../Containers/RatingsScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import MapScreen from '../Containers/MapScreen'
import TabScreen from '../Containers/TabScreen'
import PhoneValidateScreen from '../Containers/PhoneValidateScreen'
import PhoneValidateInputScreen from '../Containers/PhoneValidateInputScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import FirstScreen from '../Containers/FirstScreen'
import PlacesScreen from '../Containers/PlacesScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import MenuScreen from '../Containers/MenuScreen'
import AccountScreen from '../Containers/AccountScreen'
import AddCrediCardScreen from '../Containers/AddCrediCardScreen'
import NotificationsScreen from '../Containers/NotificationsScreen'
import SupportScreen from '../Containers/SupportScreen'
import ReplenishMethodScreen from '../Containers/ReplenishMethodScreen'
import DriverNewOrderScreen from '../Containers/DriverNewOrderScreen'
import DriverRadiusScreen from '../Containers/DriverRadiusScreen'
import CourierGoToClientScreen from '../Containers/CourierGoToClientScreen'
import CourierGoToAdressScreen from '../Containers/CourierGoToAdressScreen'
import BalansScreen from '../Containers/BalansScreen'
import PaymentAmountScreen from '../Containers/PaymentAmountScreen'
import OrderHistoryInnerScreen from '../Containers/OrderHistoryInnerScreen'
import AppIntroSliderScreen from '../Containers/AppIntroSliderScreen'

import I18n from '../I18n'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  AppIntroSliderScreen: {
    screen: AppIntroSliderScreen,
    navigationOptions: {
      header: null
    }
  },
  OrderHistoryInnerScreen: {
    screen: OrderHistoryInnerScreen,
    navigationOptions: {
      // title: I18n.t('Balansi artir'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  PaymentAmountScreen: {
    screen: PaymentAmountScreen,
    navigationOptions: {
      title: I18n.t('Balansi artir'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  BalansScreen: {
    screen: BalansScreen,
    navigationOptions: {
      title: I18n.t('Balans'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  CourierGoToAdressScreen: {
    screen: CourierGoToAdressScreen,
    navigationOptions: {
      header: null
    }
  },
  CourierGoToClientScreen: {
    screen: CourierGoToClientScreen,
    navigationOptions: {
      header: null
    }
  },
  DriverRadiusScreen: {
    screen: DriverRadiusScreen,
    navigationOptions: {
      header: null
    }
  },
  DriverNewOrderScreen: {
    screen: DriverNewOrderScreen,
    navigationOptions: {
      title: I18n.t('ReplenishMethodScreen'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  ReplenishMethodScreen: {
    screen: ReplenishMethodScreen,
    navigationOptions: {
      title: I18n.t('ReplenishMethodScreen'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  SupportScreen: {
    screen: SupportScreen,
    navigationOptions: {
      title: I18n.t('Dəstək'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  NotificationsScreen: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: I18n.t('NotificationsScreen'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  AddCrediCardScreen: {
    screen: AddCrediCardScreen,
    navigationOptions: {
      // title: I18n.t('AddCrediCardScreen'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  AccountScreen: {
    screen: AccountScreen,
    navigationOptions: {
      title: I18n.t('Hesab'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: {
      header: null
    }
  },
  GainScreen: {
    screen: GainScreen,
    navigationOptions: {
      title: I18n.t('Qazanc'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  PaymentMethodScreen: {
    screen: PaymentMethodScreen,
    navigationOptions: {
      // title: I18n.t('Profilim'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  AllOrderScreen: {screen: AllOrderScreen,
    navigationOptions: {
      title: I18n.t('Sifarişlər'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: {
      header: null
    }
  },
  RatingsScreen: {screen: RatingsScreen},
  ProfileScreen: {screen: ProfileScreen},
  MapScreen: {screen: MapScreen},
  TabScreen: {screen: TabScreen, navigationOptions: {header: null}},
  PhoneValidateScreen: {screen: PhoneValidateScreen,
    navigationOptions: {
      // title: I18n.t('register'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  PhoneValidateInputScreen: {screen: PhoneValidateInputScreen,
    navigationOptions: {
      title: I18n.t('Qeydiyyat'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  LoginScreen: {screen: LoginScreen,
    navigationOptions: {
      title: I18n.t('Daxil ol'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  RegisterScreen: {screen: RegisterScreen,
    navigationOptions: {
      // title: I18n.t('register'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  PlacesScreen: {screen: PlacesScreen,
    navigationOptions: {
      title: I18n.t('register'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }},
  FirstScreen: {screen: FirstScreen, navigationOptions: {header: null}},
  TestScreen: {screen: TestScreen, navigationOptions: {header: null}},
  LaunchScreen: {screen: LaunchScreen}
}, {
  // Default config for all screens

  initialRouteName: 'AppIntroSliderScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
