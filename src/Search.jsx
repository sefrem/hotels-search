import React from 'react'
import { Link } from 'react-router-dom'
import Input from './Input.js'

export default class Search extends React.Component {
  render() {
    const {
      onChange,
      onSubmit,
      errorCity,
      errorStartDate,
      errorEndDate,
    } = this.props

    const formatDate = date => {
      return +date < 10 ? `0${date}` : date //Добавляем 0 в начале номера месяца или числа, чтобы задать границы инпута дат
    }
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const minStartDate = `${date.getFullYear()}-${formatDate(
      month + 1
    )}-${formatDate(day)}`;
    return (
      <div className="container vw-100 vh-100 d-flex">
        <form className="m-auto">
          <div className="form-row">
            <h1 className="col-12 text-center">Поиск отелей</h1>
            <div className="col h-100 d-flex flex-column align-items-center ">
              <div className="col-md-8">
                <Input
                  type="text"
                  name="city"
                  placeholder="Город"
                  id="city"
                  onChange={onChange}
                  error={errorCity}
                />
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col">
                    <label htmlFor="startDate">Дата заезда</label>
                    <Input
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      id="startDate"
                      onChange={onChange}
                      min={minStartDate}
                      error={errorStartDate}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate">Дата выезда</label>
                    <Input
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      id="endDate"
                      onChange={onChange}
                      error={errorEndDate}
                    />
                  </div>
                </div>
              </div>
              <Link to="/results">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Искать
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
