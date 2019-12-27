import React from 'react';
import Search from "./Search";
import Results from "./Results";

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
    const { city, startDate, endDate } = this.state

    const fetchHotels = async () => {
      let hotelsMap = new Map();
      let hotelsIds = []
      try {
        let hotelsList = await (
          await fetch(
            `http://engine.hotellook.com/api/v2/cache.json?location=${city}&currency=rub&checkIn=${startDate}&checkOut=${endDate}&limit=10`
          )
        ).json()
        hotelsList.map(item => hotelsMap.set(item.hotelId, item))

        for (let [key] of hotelsMap) {
          hotelsIds.push(key)
        }

        let hotelsString = hotelsIds.join()
        let photos = await (
          await fetch(
            ` https://yasen.hotellook.com/photos/hotel_photos?id=${hotelsString}`
          )
        ).json()

        for (let [hotel, photo] of Object.entries(photos)) {
          let url = `https://photo.hotellook.com/image_v2/limit/${photo[0]}/800/520.auto`
          Object.defineProperty(hotelsMap.get(parseInt(hotel)), 'photo', {
            value: url,
            writable: true,
            enumerable: true
          })
        }
        this.setState({
          hotels: [...hotelsMap.values()],
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchHotels()
  }

  render() {
    const { startDate, endDate, hotels } = this.state;
    return (
      <div className="container">
      <Search 
        onChange={this.Onchange}
        onSubmit={this.onSubmit}
      />
      <Results 
        startDate={startDate}
        endDate={endDate}
        hotels={hotels}
      />
      </div>
    )
  }
}

export default App
