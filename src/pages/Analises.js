import { useState, useEffect } from 'react'
import api from '../api/api'

function Analises() {

  const [dcps, setDCPs] = useState([])
  const [Cnpj, setCnpj] = useState("")

  function handleChange(e) {
    // Get only the numbers from the data input
    let data = e.target.value.replace(/\D/g, "");
    console.log(data)
    // Checking data length to define if it is cpf or cnpj
    if (data.length > 11) {
      // It's cnpj
      let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
        5,
        3
      )}/`;
      if (data.length > 12) {
        cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
      } else {
        cnpj += data.substr(8);
      }
      data = cnpj;
    } else {
      // It's cpf
      let cpf = "";
      let parts = Math.ceil(data.length / 3);
      for (let i = 0; i < parts; i++) {
        if (i === 3) {
          cpf += `-${data.substr(i * 3)}`;
          break;
        }
        cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
      }
      data = cpf;
    }
    setCnpj(data);
  };

  async function handleSubmit(e) {
    e.preventDefault()
    const CnpjLimpo = e.target[0].value.replace(/\D/g, "")
    console.log(CnpjLimpo)
    try {
      const response = await api.get(`/dcp/cnpj/${CnpjLimpo}`)
      setDCPs(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='d-flex'>
      {/* SIDEBAR */}
      <div className="d-flex flex-column flex-shrink-0 px-3 vh-100 bg-dark bg-opacity-10" style={{ width: 305 }}>
        <form className='mt-5' onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input type="text" value={Cnpj} onChange={handleChange} className="form-control form-control-lg" placeholder="CNPJ" aria-label="CNPJ" aria-describedby="cnpj" />
            <button className="input-group-text" id="cnpj" type="submit">OK</button>
          </div>
        </form>
        <div>
          {dcps.map(dcp => {
            return (
              <div key={dcp._id}>
                <i className="bi bi-file-earmark-text me-2"></i>
                <span>{dcp.Ano} / </span>
                <span>{dcp.Mes}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ANALISES */}
      <div className='w-100'>
        <h2 className='py-5 mx-5'>Análises</h2>
      </div>
    </div>
  );
}

export default Analises;