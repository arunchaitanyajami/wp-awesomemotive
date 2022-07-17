import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useEffect, useState } from '@wordpress/element'
import { Notice } from '@wordpress/components'
import * as qs from 'query-string'
import Settings from './Component/Settings'
import Graph from './Component/Graph'
import Table from './Component/Table'
import deafultOptions from './deafultOptions'

export default () => {
  const { getTabIndex } = qs.parse(location.search)
  const [tabIndex, setTabIndex] = useState(
    getTabIndex ? parseInt(getTabIndex) : 0)
  const [isError, setIsEroor] = useState(false)
  const [message, setMessage] = useState('')
  const [data, setData] = useState({})

  /**
   * Set tab index, this will help preserve the current tab state when page is reloaded.
   * @param index
   */
  const changeTabIndex = (index) => {
    setTabIndex(index)

    let newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?page=awesome-motive&getTabIndex=' +
      index
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  /**
   * Fetch data from option table which pulled and stored from misuage.com endpoint.
   */
  const fetchMiUsageData = () => {
    const formData = new FormData()

    formData.append('action', 'all_data')
    formData.append('wpam_nonce', deafultOptions.wp_nonce)

    const params = new URLSearchParams(formData)

    fetch(deafultOptions.ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: params,
    }).then(response => {
      return response.json()
    }).then(response => {
      if ('object' !== typeof response) {
        return
      }

      if (!('status' in response)) {
        setIsEroor(true)
        setMessage('Object Malformed')
        return
      }

      if (200 !== response.status) {
        setIsEroor(true)
        setMessage(response.message)
        return
      }

      setData(response.data)

    }).catch(err => {
      setIsEroor(true)
      setMessage(err)
    })
  }

  useEffect(() => {
    fetchMiUsageData()
  }, [])

  /**
   * Provide error notice.
   *
   * @returns {JSX.Element}
   * @constructor
   */
  const ErrorNotice = ({ type }) => (
    <Notice status={type} isDismissible={true}>
      <p>
        An error occurred: <code>{message}</code>.
      </p>
    </Notice>
  )

  return (
    <div className={'awesomemotive-container'}>
      {isError && <ErrorNotice type={'error'}/>}
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => changeTabIndex(index)}
      >
        <TabList>
          <Tab>Settings</Tab>
          <Tab>Table</Tab>
          <Tab>Graph</Tab>
        </TabList>
        <TabPanel><Settings { ...data.settings }/></TabPanel>
        <TabPanel><Table { ...data.table }/></TabPanel>
        <TabPanel><Graph { ...data.graph } /></TabPanel>
      </Tabs>
    </div>
  )
};
