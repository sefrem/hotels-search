import React from "react";

export default class Search extends React.Component {

    render() {
        const { onChange, onSubmit } = this.props;
        const date = new Date();
        const minStartDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        const minEndDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`;
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
                  onChange={onChange}
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
                      onChange={onChange}
                      min={minStartDate}
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
                      onChange={onChange}
                      min={minEndDate}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Искать
              </button>
            </div>
          </div>
        </form>
      </div>
        )
    }
}