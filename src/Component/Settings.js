import { __experimentalInputControl as InputControl } from '@wordpress/components'
import { useState } from '@wordpress/element'

export default (props) => {
  const [value, setValue] = useState('')

  return (
    <div className={'awesomemotive-settings-container'}>
      <InputControl
        value={value}
        onChange={(nextValue) => setValue(nextValue ?? '')}
      />
    </div>
  )
}
