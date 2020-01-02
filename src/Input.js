import React from 'react'

const Input = props => {
  const { id, type, name, value, onChange, placeholder, error, min } = props
  return (
    <div className="form-group">
      <input
        id={id}
        type={type}
        className={error ? 'form-control border-danger' : 'form-control'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
      />
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
    </div>
  )
}

export default Input
