import { __ } from '@wordpress/i18n'
import * as defaultOptions from '../deafultOptions'

export default ({ tableData, settings }) => {
  const { table } = tableData
  const { data, title } = table
  const { headers, rows } = data
  const { data: { human_date, num_rows, emails } } = settings

  const convertToDate = (timeStamp) => {
    if (!human_date) {
      return timeStamp
    }

    return new Date(timeStamp * 1000).toGMTString()
  }

  return <div className={'awesomemotive-settings-container-fluid'}>
    { table && Object.keys(rows).length > 0 &&
      (
        <div className={'awesomemotive-container-table'}>
          <table cellSpacing={0} cellPadding={0}>
          {title && ( <caption>{__( title, defaultOptions.text_domain )}</caption> )}
          <thead>
            {Object.keys(headers).length > 0 && (
              <tr>
                {Object.keys(headers).map((value, c) => {
                  return <td key={value}>{ __( headers[value], defaultOptions.text_domain ) }</td>
                })}
              </tr>
            )}
          </thead>

          { Object.keys(rows).length > 0 && (
            <tbody>
              {Object.keys(rows.slice(0, num_rows)).map((value, c) => {
                let date = convertToDate(rows[value].date)
                return <tr key={value}>
                  <td>{rows[value].id}</td>
                  <td>{rows[value].url}</td>
                  <td>{rows[value].title}</td>
                  <td>{rows[value].pageviews}</td>
                  <td>{date}</td>
                </tr>
              })}
            </tbody>
          )}
        </table>
        </div>
      )
    }
    <div className={'awesomemotive-container-list'}>
      <h2>{__( 'Emails', defaultOptions.text_domain )}</h2>
    </div>
    <div className={ 'awesomemotive-container-list' }>
      { Object.keys(emails).length > 0 && (
        <ul>
          {Object.keys(emails).map((value, c) => {
            return <li key={value} >{ emails[value] }</li>
          })}
        </ul>
      ) }
    </div>
  </div>
};
