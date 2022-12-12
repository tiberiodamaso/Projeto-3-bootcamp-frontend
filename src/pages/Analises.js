import { useState, useEffect } from 'react'
import api from '../api/api'

function Analises() {

  const [dcps, setDCPs] = useState([])
  const [cnpj, setCnpj] = useState("")
  const [empresa, setEmpresa] = useState('')
  // const [dcpsTrimestre, setDcpsTrimestre] = useState([])
  const [dcp1, setDcp1] = useState({})
  const [dcp2, setDcp2] = useState({})
  const [dcp3, setDcp3] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Coloca a máscara no CNPJ
  function handleChange(e) {
    // Get only the numbers from the data input
    let data = e.target.value.replace(/\D/g, "");
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

  // Recupera as DCPs do banco
  async function handleSubmit(e) {
    e.preventDefault()
    const cnpjLimpo = e.target[0].value.replace(/\D/g, "")
    try {
      const response = await api.get(`/dcp/cnpj/${cnpjLimpo}`)
      setDCPs(response.data)
      setEmpresa(response.data[0].nome)
    } catch (error) {
      console.log(error)
    }
  }

  // 
  async function handleClick(ano, trimestre) {
    
    let dcpSection = document.querySelector('#dcpSection')
    const dcpsTrimestre = await dcps.filter(element => {
        return (element.ano === ano && element.trimestre === trimestre)
      })
    setDcp1(dcpsTrimestre[0])
    setDcp2(dcpsTrimestre[1])
    setDcp3(dcpsTrimestre[2])
    dcpSection.classList.toggle('d-none')
    setIsLoading(false)
  }
  
  return (
    <div className='d-flex'>
      {/* SIDEBAR */}
      <div className="d-flex flex-column flex-shrink-0 px-3 vh-100 bg-dark bg-opacity-10" style={{ width: 305 }}>
        <form className='mt-5' onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input type="text" value={cnpj} onChange={handleChange} className="form-control form-control-lg" placeholder="CNPJ" aria-label="CNPJ" aria-describedby="cnpj" />
            <button className="input-group-text" id="cnpj" type="submit">OK</button>
          </div>
        </form>
        <div>
          <h4 className='text-center'>{empresa}</h4>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Ano</th>
                <th scope="col">Trimestre</th>
              </tr>
            </thead>
            <tbody>
              {dcps.map(dcp => {
                return (
                  <tr key={dcp._id} onClick={() => handleClick(dcp.ano, dcp.trimestre)}>
                    <td><i className="bi bi-file-earmark-text me-2"></i>{dcp.ano}</td>
                    <td>{dcp.trimestre}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DCP E ANÁLISES */}
      <div className='container mx-5'>

        {/* DCP */}
        <div className='d-none' id='dcpSection'>
          <h2 className='pt-5 mx-3'>Demonstrativo de Crédito Presumido</h2>
          <div className='py-2 mx-3'>{cnpj}</div>
          <div className="accordion mx-3" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Exportação direta no mês
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <table className='table table-hover text-center'>
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ "verticalAlign": "middle" }}>Linha</th>
                        <th colSpan="2">Jan</th>
                        <th colSpan="2">Fev</th>
                        <th colSpan="2">Mar</th>
                      </tr>
                      <tr>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                      </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                      <tr>

                        <td>Linha 1</td>
                        <td>{dcp1.linha_1}</td>
                        <td></td>
                        <td>{dcp2.linha_1}</td>
                        <td></td>
                        <td>{dcp3.linha_1}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Linha 2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Linha 4</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Linha 5</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Linha 6</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Matérias primas, embalagens
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <table className='table table-hover text-center'>
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ "verticalAlign": "middle" }}>Linha</th>
                        <th colSpan="2">Jan</th>
                        <th colSpan="2">Fev</th>
                        <th colSpan="2">Mar</th>
                      </tr>
                      <tr>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                      </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Prestação de serviços
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <table className='table table-hover text-center'>
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ "verticalAlign": "middle" }}>Linha</th>
                        <th colSpan="2">Jan</th>
                        <th colSpan="2">Fev</th>
                        <th colSpan="2">Mar</th>
                      </tr>
                      <tr>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                        <th>Declarado</th>
                        <th>Calculado</th>
                      </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ANALISES */}
        <div className=''>
          <h2 className='py-5 mx-3'>Análises</h2>
        </div>

      </div>
    </div >
  );
}

export default Analises;