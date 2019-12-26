import React from 'react'

class App extends React.Component {
  state = {
    city: 'Moscow',
    startDate: '2020-01-10',
    endDate: '2020-01-15',
    token: '6d5dccc795985c3f6b9bbe9c70c428dd',
    hotels: []
  }

  onChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  onSubmit = () => {
    const { city, startDate, endDate } = this.state;
    let hotelsList;
    let hotelsIds;
    let hotels = [];

     async function fetchHotels() {
       try {
       hotelsList = await (await fetch(
        `http://engine.hotellook.com/api/v2/cache.json?location=${city}&currency=rub&checkIn=${startDate}&checkOut=${endDate}&limit=10`
      )).json();
       hotelsIds = hotelsList.map(item => item.hotelId).join();
      let photos = await (await fetch(` https://yasen.hotellook.com/photos/hotel_photos?id=${hotelsIds}`)).json();
      console.log(photos)
      for(let [hotel, photo] of Object.entries(photos)){
         let picture = await fetch(`https://photo.hotellook.com/image_v2/limit/${photo[0]}/800/520.auto`, { mode: 'no-cors'});
        console.log([hotel, picture])

      }
    } catch(err) {
      console.log(err)
    }
      
      // let allPhotos = await fetch(`https://photo.hotellook.com/image_v2/limit/photo_id/800/520.auto`)
     
    }
    fetchHotels()
    // fetch(
    //   `http://engine.hotellook.com/api/v2/cache.json?location=${city}&currency=rub&checkIn=${startDate}&checkOut=${endDate}&limit=10`
    // ).then(response => response.json())
    // .then(data => data.map(item => {
    //  return hotelsIds.push(item.hotelId)
    // }))
    // .then(hotelsIds.join())
    // .then( fetch)
    
  }

  render() {
    return (
      <div className="container vw-100 vh-100 d-flex">
        <form className="m-auto">
          <div className="form-row">
            <h1 className="col-12 text-center">Поиск отелей</h1>
            <div className="col h-100 d-flex flex-column align-items-center ">
              <div className="form-group col-md-8">
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder="Город"
                  id="city"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-md-8">
                <div className="row">
                  <div className="col">
                    <label htmlFor="startDate">Дата заезда</label>
                    <input
                      className="form-control"
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      id="startDate"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate">Дата выезда</label>
                    <input
                      className="form-control"
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      id="endDate"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
                Искать
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default App
