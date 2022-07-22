import { createReduxStore, register } from '@wordpress/data'
import WpamEditorSettings from '../deafultOptions'
import { FETCH_FROM_API } from './Settings/controls'

const DEFAULT_STATE = {
  graph: {},
  table: {
    title: '',
    data: {
      headers: {},
      rows: {}
    }
  },
  settings: {
    ...WpamEditorSettings.settings
  },
  ...WpamEditorSettings.data,
}

const actions = {
  setData (data) {
    return {
      type: 'SET_DATA',
      data,
    }
  },

  fetchFromAPI () {
    return {
      type: 'FETCH_FROM_API',
    }
  },
}

const data = createReduxStore('awesomemotive/data', {
  reducer (state = DEFAULT_STATE, action) {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          ...action.data,
        }
    }

    return state
  },

  actions,

  selectors: {
    getData (state) {
      return state
    },
  },

  controls: {
    FETCH_FROM_API (action) { return FETCH_FROM_API({ ajaxActionName: 'all_data' }) },
  },

  resolvers: {
    * getData () {
      const data = yield actions.fetchFromAPI()
      return actions.setData({ ...data })
    },
  },
})

register(data)
