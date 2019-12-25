import React from 'react';

class App extends React.Component {
  state = {}

  render() {
  return (
    <div className="container d-flex">
    <form className="w-50 m-auto">
      <div className="form-group row">
  <div className="col-10">
    <input className="form-control" type="text" placeholder="City" id="example-text-input" />
  </div>
</div>
    <div className="form-group row">
  <div className="col-6">
    <input className="form-control" type="date" placeholder="Start Date" id="date-input" />
  </div>
</div>
<div className="form-group row">
  <div className="col-6">
    <input className="form-control" type="date" placeholder="Start Date" id="date-input" />
  </div>
</div>
</form>
</div>
  )
}
}

export default App;
