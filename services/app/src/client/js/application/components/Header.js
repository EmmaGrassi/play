import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div
          className="col-md-6 offset-md-3"
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            height: '400px',
            background: 'url(/images/svg/sytac-hexagon-long.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            //backgroundSize: '200px 200px',
          }}
        >
          &nbsp;
        </div>
      </div>
    )
  }
}
