import React, { useState, useCallback } from 'react'
import { useLongPress } from 'use-long-press'
import Chip from '@material-ui/core/Chip'

const LongPressChip = (props) => {
  const longPress = useLongPress(() => props.longPress(props.item), {
    onCancel: (event) =>
      event.type === 'mouseup' && props.shortPress(props.item),
    captureEvent: true,
    threshold: 500,
  })

  return (
    <Chip
      label={props.item}
      //clickable
      variant="outlined"
      style={{
        margin: '4px',
        backgroundColor: props.background,
        borderColor: props.border,
      }}
      {...longPress}
    />
  )
}

export default LongPressChip
