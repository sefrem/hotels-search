import React from 'react'
import { Link } from 'react-router-dom'

export default class Results extends React.Component {
  render() {
    const { hotels, weather, city, startDate, endDate, isLoading } = this.props
    return (
      <div className="container d-flex justify-content-center border">
        {isLoading ? (
          <div className="spinner-border" role="status"></div>
        ) : (
          <div className="row mt-5">
            <Link to="/">Назад</Link>

            <div className="col md-6">
              <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row">
                  <div className="card-body d-flex justify-content-around">
                    <span className="col-6 card-text border p-1  text-center">
                      {city}
                    </span>
                    <span className="card-text border p-1">{startDate}</span>
                    <span className="card-text border p-1">{endDate}</span>
                  </div>
                </div>
              </div>

              {hotels.map(hotel => (
                <div
                  className="card mb-3"
                  style={{ maxWidth: '540px' }}
                  key={hotel.hotelId}
                >
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{hotel.hotelName}</h5>
                        <span>
                          Погода: {weather}
                          {'\u2103'}
                        </span>
                        <br />
                        <span className="font-italic font-weight-lighter">
                          <small>
                            средние данные на указаннный период за последние 10
                            лет
                          </small>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={hotel.photo}
                        className="card-img"
                        alt="фото отеля"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}
