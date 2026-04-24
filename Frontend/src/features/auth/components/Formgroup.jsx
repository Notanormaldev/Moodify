import React from 'react'

function Formgroup({label,placeholder,value,onChange}) {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input type='text' value={value} onChange={onChange} placeholder={placeholder} id={label} name={label} required/>
    </div>
  )
}

export default Formgroup
