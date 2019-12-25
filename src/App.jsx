import React from 'react'

class App extends React.Component {
  state = {
    city: "",
    startDate: "",
    endDate: "",
    token: "6d5dccc795985c3f6b9bbe9c70c428dd"
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  onSumbit = () => {
    // https://support.travelpayouts.com/hc/ru/articles/115000343268-API-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%82%D0%B5%D0%BB%D0%B5%D0%B9?flash_digest=5ad0199ef52f645bb3dbed2ad94d5809250e16cd
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
              <button type="button" className="btn btn-primary">
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
