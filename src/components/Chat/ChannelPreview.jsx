import React from 'react';

export default function ChannelPreview({ channel, onChannelLeave }) {
  return (
    <div style={{ display: 'flex', flexDirection:'column' }}>
      <div className="" style={{  }}>
        <h5>
          {channel.name
            || channel.members.map(c => c.nickname || c.userId).join(', ').slice(0, 10).concat('...')
          }
        </h5>
      </div>
    </div>
  );
}