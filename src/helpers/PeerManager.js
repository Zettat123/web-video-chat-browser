/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/3
 */
import Peer from 'peerjs'
import peerServerConfig from 'app/peerServerConfig'

// eslint-disable-next-line max-len
// @see https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
// TODO: Resolve compatibility problems
navigator.mediaDevices.getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia

const defaultMediaConfig = { video: true, audio: true }

class WrappedPeer {
  constructor(userId) {
    this.peer = new Peer(userId, peerServerConfig)
    this.dataConnection = null
    this.mediaConnection = null
    this.stream = null
  }

  getMedia = (mediaConfig = defaultMediaConfig) =>
    navigator.mediaDevices
      .getUserMedia(mediaConfig)
      .then((stream) => {
        this.stream = stream
        return stream
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Failed to get local stream', err)
      })

  connectRemotePeer(remoteId) {
    this.dataConnection = this.peer.connect(remoteId)
  }

  sendRemotePeerData(data) {
    this.dataConnection.send(data)
  }

  receiveRemotePeerData(callback) {
    this.peer.on('connection', (dataConnection) => {
      dataConnection.on('data', callback)
    })
  }

  /**
   * callRemotePeer must be called after getMedia() or the stream would be null
   * @param  {string}   remoteId  Another peer's id
   * @param  {function} playStream Callback function.Its param is stream.
   */
  callRemotePeer(remoteId, playStream) {
    this.mediaConnection = this.peer.call(remoteId, this.stream)
    this.mediaConnection.on('stream', playStream)
  }

  answerRemotePeer() {
    return new Promise((resolve) => {
      this.peer.on('call', (mediaConnection) => {
        mediaConnection.answer(this.stream)
      })
      resolve()
    })
  }
}

export default WrappedPeer
