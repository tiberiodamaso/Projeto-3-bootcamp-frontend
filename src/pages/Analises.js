import { useState, useEffect } from "react";
import api from "../api/api";
import { exportacoes, receitas, insumos } from "../utils/montaDCP";
import Linha from "../components/Linha";

function Analises() {
  const [dcps, setDCPs] = useState([]);
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [dcpsTrimestre, setDcpsTrimestre] = useState([])
  // const [dcp1, setDcp1] = useState({});
  // const [dcp2, setDcp2] = useState({});
  // const [dcp3, setDcp3] = useState({});
  const [gomoExport, setGomoExport] = useState([]);
  const [meses, setMeses] = useState([]);
  const [gomoReceita, setGomoReceita] = useState([]);
  const [gomoInsumo, setGomoInsumo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }

  // Recupera as DCPs do banco
  async function handleSubmit(e) {
    e.preventDefault();
    const cnpjLimpo = e.target[0].value.replace(/\D/g, "");
    try {
      const response = await api.get(`/dcp/cnpj/${cnpjLimpo}`);
      setDCPs(response.data);
      setEmpresa(response.data[0].nome);
    } catch (error) {
      console.log(error);
    }
  }

  // Recupera DCPs do trimestre
  async function handleClick(ano, trimestre) {
    let dcpSection = document.querySelector("#dcpSection");
    let dcpMetaData = document.querySelector("#dcpMetaData");
    dcpSection.classList.remove("d-none");
    dcpMetaData.innerText = `${trimestre}/${ano}`;
    if (trimestre === 1) setMeses(['Jan', 'Fev', 'Mar'])
    if (trimestre === 2) setMeses(['Abr', 'Mai', 'Jun'])
    if (trimestre === 3) setMeses(['Jul', 'Ago', 'Set'])
    if (trimestre === 4) setMeses(['Out', 'Nov', 'Dez'])
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    const response = await api.get(
      `/dcp/all-dcp?cnpj=${cnpjLimpo}&ano=${ano}&trimestre=${trimestre}`
    );
    setDcpsTrimestre(response.data)
    // setDcp1(response.data[0]);
    // setDcp2(response.data[1]);
    // setDcp3(response.data[2]);


    const resposta = await api.get("/nfe/all-nfe", {
      params: { cnpj: cnpjLimpo, trim: trimestre, ano: ano },
    });
    setGomoReceita(receitas(resposta.data, ano, trimestre));
    setGomoInsumo(insumos(resposta.data, ano, trimestre));
    console.log(insumos(resposta.data, ano, trimestre));
    setGomoExport(exportacoes(resposta.data, ano, trimestre));
    setIsLoading(false);
  }

  // Estiliza a tabela quando clica em uma DCP
  function handleSelectedRow(id) {

    const table = document.getElementById("tableResult");
    const rows = table.getElementsByTagName("tr");
    const selectedRow = document.getElementById(id)
    for (let i = 0; i < rows.length; i++) {
      table.rows[i].classList.remove("bg-white");
      table.rows[i].classList.remove("bg-opacity-50");
    }
    selectedRow.classList.add("bg-white");
    selectedRow.classList.add("bg-opacity-50");  

  }


  // Checa se os valores declarados e calculados são divergentes
  function checkValues() {
    let declarado1 = document.querySelector('#declarado1')
    let calculado1 = document.querySelector('#calculado1')
    if (declarado1.innerText !== calculado1.innerText) calculado1.classList.add('text-danger')
  }

  // Checa se os valores declarados e calculados são divergentes
  function test(e) {
    const event = e
    console.log(e)
    let declarado1 = document.querySelector('#declarado1')
    let calculado1 = document.querySelector('#calculado1')
    if (declarado1.innerText !== calculado1.innerText) calculado1.classList.add('text-danger')
  }



  return (

    <div className='d-flex'>

      {/* SIDEBAR */}
      <div className="d-flex flex-column flex-shrink-0 px-3 vh-100 bg-dark bg-opacity-10" style={{ width: 305 }}>

        <form className='mt-5' onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              value={cnpj}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="CNPJ"
              aria-label="CNPJ"
              aria-describedby="cnpj"
            />
            <button className="input-group-text" id="cnpj" type="submit">
              OK
            </button>
          </div>
        </form>

        {dcps.length !== 0 && (
          <div>
            <h4 className='text-center fw-bold fs-6 border border-white bg-white bg-opacity-25 p-2 my-3'>{empresa}</h4>

            <table id="tableResult" className="table text-center table-hover">
              <thead>
                <tr className="border-bottom-0">
                  <th></th>
                  <th scope="col">Ano</th>
                  <th scope="col">Trimestre</th>
                </tr>
              </thead>
              <tbody>
                {dcps.map((dcp) => {
                  return (
                    <tr key={dcp._id} id={dcp._id} onClick={() => { handleClick(dcp.ano, dcp.trimestre); handleSelectedRow(dcp._id) }} style={{ cursor: "pointer" }}>
                      <td><i className="bi bi-file-earmark-text me-2"></i></td>
                      <td>{dcp.ano}</td>
                      <td>{dcp.trimestre}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        )}
      </div>

      {/* DCP E ANÁLISES */}
      <div className="container mx-5">
        {/* DCP */}
        <div className="d-none" id="dcpSection">
          <div className="d-flex justify-content-between">
            <h2 className="py-5 mx-3">Demonstrativo de Crédito Presumido</h2>
            <span className="py-5 mx-3 fs-3" id="dcpMetaData"></span>
          </div>
          <div className="accordion mx-3" id="accordionExample">

            {/* EXPORTAÇÃO DIRETA NO MÊS */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fs-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span className="col-8">Exportação direta no mês</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                          Linha
                        </th>
                        {meses.map((mes, i) => {
                          return (<th colSpan="2" key={i}>{mes}</th>)
                        })}
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
                    {!isLoading && (
                      <tbody className="table-group-divider">
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={1} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={2} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={3} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={4} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={5} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={6} />
                      <Linha dcpsTrimestre={dcpsTrimestre} gomo={gomoExport} nLinha={7} />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* MATÉRIAS PRIMAS E EMBALAGENS */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <span className="col-8">Receita Operacional Bruta</span>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                          Linha
                        </th>
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
                    {!isLoading && (
                      <tbody className="table-group-divider">
                        <tr>
                          <td>Linha 8</td>
                          <td></td>
                          <td>{gomoReceita[0].linha_8}</td>
                          <td></td>
                          <td>{gomoReceita[1].linha_8}</td>
                          <td></td>
                          <td>{gomoReceita[2].linha_8}</td>
                        </tr>
                        <tr>
                          <td>Linha 9</td>
                          <td></td>
                          <td>{gomoReceita[0].linha_8}</td>
                          <td></td>
                          <td>{gomoReceita[1].linha_9}</td>
                          <td></td>
                          <td>{gomoReceita[2].linha_9}</td>
                        </tr>
                        <tr>
                          <td>Linha 10</td>
                          <td></td>
                          <td>{gomoReceita[0].linha_10}</td>
                          <td></td>
                          <td>{gomoReceita[1].linha_10}</td>
                          <td></td>
                          <td>{gomoReceita[2].linha_10}</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* PRESTAÇÃO DE SERVIÇOS */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <span className="col-8">Matérias primas, embalagens</span>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                          Linha
                        </th>
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
                    {!isLoading && (
                      <tbody className="table-group-divider">
                        <tr>
                          <td>Linha 11</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_11}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_11}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_11}</td>
                        </tr>
                        <tr>
                          <td>Linha 12</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_12}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_12}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_12}</td>
                        </tr>
                        <tr>
                          <td>Linha 13</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_13}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_13}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_13}</td>
                        </tr>
                        <tr>
                          <td>Linha 14</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_14}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_14}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_14}</td>
                        </tr>
                        <tr>
                          <td>Linha 15</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_15}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_15}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_15}</td>
                        </tr>
                        <tr>
                          <td>Linha 16</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_16}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_16}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_16}</td>
                        </tr>
                        <tr>
                          <td>Linha 17</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_17}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_17}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_17}</td>
                        </tr>
                        <tr>
                          <td>Linha 18</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_18}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_18}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_18}</td>
                        </tr>
                        <tr>
                          <td>Linha 19</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_19}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_19}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_19}</td>
                        </tr>
                        <tr>
                          <td>Linha 20</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_20}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_20}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_20}</td>
                        </tr>
                        <tr>
                          <td>Linha 21</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_21}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_21}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_21}</td>
                        </tr>
                        <tr>
                          <td>Linha 22</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_22}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_22}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_22}</td>
                        </tr>
                        <tr>
                          <td>Linha 23</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_23}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_23}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_23}</td>
                        </tr>
                        <tr>
                          <td>Linha 24</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_24}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_24}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_24}</td>
                        </tr>
                        <tr>
                          <td>Linha 25</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_25}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_25}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_25}</td>
                        </tr>
                        <tr>
                          <td>Linha 26</td>
                          <td></td>
                          <td>{gomoInsumo[0].linha_26}</td>
                          <td></td>
                          <td>{gomoInsumo[1].linha_26}</td>
                          <td></td>
                          <td>{gomoInsumo[2].linha_26}</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <span className="col-8">Prestação de serviços</span>
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                          Linha
                        </th>
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
                    {!isLoading && (
                      <tbody className="table-group-divider">
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
                    )}
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ANALISES */}
        <div className="">
          <h2 className="py-5 mx-3">Análises</h2>
        </div>

        {/* BOTÕES */}
        <div className="d-flex justify-content-end py-5 mx-3">
          <button className="btn btn-primary mx-3">Salvar análise</button>
          <button className="btn btn-primary">Gerar relattório</button>
        </div>
      </div>
    </div>
  );
}

export default Analises;
