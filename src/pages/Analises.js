import { useState, useEffect } from 'react'
import api from '../api/api'

function Analises() {
  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 p-3 vh-100 bg-dark bg-opacity-10" style={{ width: 305 }}>
        <form className='mt-5'>
          <div className="input-group mb-3">
            <input type="text" className="form-control form-control-lg" placeholder="CNPJ" aria-label="CNPJ" aria-describedby="basic-addon2" />
            <span className="input-group-text" id="basic-addon2">OK</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Analises;