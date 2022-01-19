import React from 'react';

export default function Message({ message, onDeleteMessage, onUpdateMessage }) {
  return (
    <div className="" style={{ display: 'flex' }}>
      <div className="" style={{ padding: '4px 8px', border: '0.625px solid rgba(0,0,0,0.5)' }}>
        <h5>{message._sender.nickname}</h5>
        <p style={{  }}>{message.message}</p>
      </div>
    </div>
  )
}