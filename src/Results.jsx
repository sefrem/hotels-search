import React from 'react'

export default class Results extends React.Component {
  render() {
    const { hotels } = this.props
    console.log(hotels)
    return (hotels && hotels.map(hotel => (
      <div className="card mb-3" style={{maxWidth: '540px'}} key={hotel.hotelId}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{hotel.hotelName}</h5>
            </div>
          </div>
          <div className="col-md-4">
            <img src={hotel.photo} className="card-img" alt="..." />
          </div>
        </div>
      </div>
    ))
    )
  }
}
