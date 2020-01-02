import React from 'react'
import Search from './Search'
import Results from './Results'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    city: '',
    startDate: '',
    endDate: '',
    weatherApiKey: 'RXPJPCJF9LJIDURNR9AVME6W5',
    hotels: [],
    weather: '',
    isLoading: false,
    errors: {
      city: '',
      startDate: '',
      endDate: '',
    },
  }

  onChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: '',
      },
    }))
  }

  onSubmit = e => {
    const errors = this.validation()
    if (Object.keys(errors).length) {
      e.preventDefault()
      this.setState({
        errors: errors,
      })
    } else {
      this.fetchHotels()
    }
  }

  fetchHotels = async () => {
    const { city, startDate, endDate } = this.state
    let hotelsMap = new Map()
    let hotelsIds = []
    try {
      this.setState({
        isLoading: true,
      })

      let hotelsList = await //Получаем объект - список отелей
      (
        await fetch(
          `http://engine.hotellook.com/api/v2/cache.json?location=${city}&currency=rub&checkIn=${startDate}&checkOut=${endDate}&limit=10`
        )
      ).json()
      hotelsList.map(item => hotelsMap.set(item.hotelId, item)) //Делаем объект Map, где ключи - id отелей, значения - объект с данными отелей

      for (let [key] of hotelsMap) {
        hotelsIds.push(key)
      }

      let hotelsString = hotelsIds.join()
      let photos = await //Получаем объект с фото всех отелей в формате - ключ - id отеля, значение - массив фото отеля
      (
        await fetch(
          `https://yasen.hotellook.com/photos/hotel_photos?id=${hotelsString}`
        )
      ).json()

      for (let [hotel, photo] of Object.entries(photos)) {
        //Берем первое фото из каждого массива и добавляем новый ключ 'photo' со значением - "url фото отеля" в наш объект Map.
        let url = `https://photo.hotellook.com/image_v2/limit/${photo[0]}/800/520.auto`
        Object.defineProperty(hotelsMap.get(parseInt(hotel)), 'photo', {
          value: url,
          writable: true,
          enumerable: true,
        })
      }
      this.setState({
        hotels: [...hotelsMap.values()],
        isLoading: false,
      })
      this.getWeather()
    } catch (err) {
      console.log(err.message)
    }
  }

  getWeather = async () => {
    try {
      const { lat, lon } = this.state.hotels[0].location.geo
      const { weatherApiKey, startDate, endDate } = this.state

      let weather = await (
        await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/historysummary?goal=historysummary&aggregateHours=24&startDateTime=${startDate}&endDateTime=${endDate}&collectStationContributions=false&maxStations=-1&maxDistance=-1&minYear=2010&maxYear=2019&chronoUnit=months&breakBy=self&dailySummaries=true&shortColumnNames=false&sendAsDatasource=false&allowAsynch=false&contentType=json&unitGroup=uk&key=${weatherApiKey}&locations=${lat},${lon}`
        )
      ).json()
      this.setState({
        weather:
          weather.locations[Object.keys(weather.locations)[0]].values[0].temp,
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  validation = () => {
    const errors = {}
    const { city, startDate, endDate } = this.state

    if (city.length === 0) {
      errors.city = 'Введите город'
    }
    if (startDate.length === 0) {
      errors.startDate = 'Выберите дату заезда'
    }
    if (endDate.length === 0) {
      errors.endDate = 'Выберите дату выезда'
    } else if (new Date(startDate) >= new Date(endDate)) {
      errors.endDate = 'Выезд должен быть позже въезда'
    }

    return errors
  }

  render() {
    const {
      startDate,
      endDate,
      hotels,
      weather,
      city,
      errors,
      isLoading,
    } = this.state
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={props => (
            <Search
              {...props}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              startDate={startDate}
              errorCity={errors.city}
              errorStartDate={errors.startDate}
              errorEndDate={errors.endDate}
            />
          )}
        />
        <Route
          path="/results"
          render={props => (
            <Results
              {...props}
              city={city}
              startDate={startDate}
              endDate={endDate}
              hotels={hotels}
              weather={weather}
              isLoading={isLoading}
            />
          )}
        />
      </BrowserRouter>
    )
  }
}

export default App
