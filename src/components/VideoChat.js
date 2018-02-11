/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/3
 */
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ready } from 'actions/user'
import WrappedPeer from 'helpers/PeerManager'
import { selectUserId, selectIsReady } from 'selectors/user'
import propsToImmutable from 'hocs/propsToImmutable'

class VideoChat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      peer: null,
      remoteId: '',
    }
  }

  playStream = (stream) => {
    this.videoPlayer.srcObject = stream
  }

  createMyPeer = () => {
    const { userId, ready } = this.props

    const peer = new WrappedPeer(userId)

    this.setState({ peer }, () => {
      peer
        .getMedia()
        .then(() => peer.answerRemotePeer())
        .then(() => ready())
    })
  }

  startVideoChat = () => {
    const { peer, remoteId } = this.state

    peer.callRemotePeer(remoteId, this.playStream)
  }

  render() {
    const { remoteId } = this.state
    const { isReady } = this.props

    return (
      <div>
        <input
          type="text"
          placeholder="Input another id"
          value={remoteId}
          onChange={e => this.setState({ remoteId: e.target.value })}
        />
        <button disabled={isReady} onClick={() => this.createMyPeer()}>
          Ready
        </button>
        <button
          disabled={!isReady}
          onClick={() => {
            this.startVideoChat()
          }}
        >
          Start
        </button>
        <video autoPlay controls ref={player => (this.videoPlayer = player)} />
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      userId: selectUserId(state),
      isReady: selectIsReady(state),
    }),
    {
      ready,
    }
  ),
  propsToImmutable
)(VideoChat)
