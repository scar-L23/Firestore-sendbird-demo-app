import React from 'react';
import {
  SendBirdProvider,
  ChannelList,
  Channel,
  ChannelSettings,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import ChannelPreview from './ChannelPreview';
import Message from './Message';

import "./index.css";

export default function SendBirdWrapper({ userId, nickname }) {
  const [showSettings, setShowSettings] = React.useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState(null);

  return (
    <div style={{ height: '100vh' }}>
      <SendBirdProvider
        appId={process.env.REACT_APP_SENDBIRD_APP_ID}
        userId={userId}
        nickname={nickname}
      >
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <ChannelList
              renderChannelPreview={ChannelPreview}
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </div>
          <div className="sendbird-app__conversation-wrap">
            <Channel
              renderChatItem={Message}
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => { setShowSettings(true); }}
            />
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}