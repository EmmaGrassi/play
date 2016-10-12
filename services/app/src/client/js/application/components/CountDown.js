import React from 'react'

@connect(
  (state) => { return state },
  (dispatch, props) => { return {} }
)
export default class CountdownTimer extends React.Component {
  getDefaultProps() {
    return {
      interval: 1000,
      formatFunc: null,
      tickCallback: null,
      completeCallback: null
    }
  }

  getInitialState() {
    // Normally an anti-pattern to use this.props in getInitialState,
    // but these are all initializations (not an anti-pattern).
    return {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null
    }
  }

  componentDidMount() {
    this.tick()
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId) }
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining})
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.isMounted()) {
      this.tick()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }

  tick() {
    var currentTime = Date.now()
    var dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0
    var interval = this.props.interval

    // correct for small variations in actual timeout time
    var timeRemainingInInterval = (interval - (dt % interval))
    var timeout = timeRemainingInInterval

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval
    }

    var timeRemaining = Math.max(this.state.timeRemaining - dt, 0)
    var countdownComplete = (this.state.prevTime && timeRemaining <= 0)

    if (this.isMounted()) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId) }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      })
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback() }
      return
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining)
    }
  }

  getFormattedTime(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds)
    }

    var totalSeconds = Math.round(milliseconds / 1000)

    var seconds = parseInt(totalSeconds % 60, 10)
    var minutes = parseInt(totalSeconds / 60, 10) % 60
    var hours = parseInt(totalSeconds / 3600, 10)

    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes
    hours = hours < 10 ? '0' + hours : hours

    return hours + ':' + minutes + ':' + seconds
  }

  render() {
    var timeRemaining = this.state.timeRemaining

    return (
      <div className='timer'>
        {this.getFormattedTime(timeRemaining)}
      </div>
    )
  }
}
