import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  registerRequest: ['number','verification_id'],
  registerSuccess: ['payload'],
  registerFailure: null
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  number: null,
  verification_id: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const RegisterSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {number, verification_id}) =>
  state.merge({fetching: true, number, verification_id, payload: null})

// successful api lookup
export const success = (state, {number,verification_id}) => {
  return state.merge({fetching: false, error: null, number,verification_id})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure
})
