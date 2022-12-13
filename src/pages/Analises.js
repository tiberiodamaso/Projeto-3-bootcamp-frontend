import { useState, useEffect } from "react";
import api from "../api/api";
import { exportacoes } from "../utils/montaDCP";

function Analises() {
  const [dcps, setDCPs] = useState([]);
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState("");
  // const [dcpsTrimestre, setDcpsTrimestre] = useState([])
  const [dcp1, setDcp1] = useState({});
  const [dcp2, setDcp2] = useState({});
  const [dcp3, setDcp3] = useState({});
  const [gomoExport, setGomoExport] = useState([]);
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

  //
  async function handleClick(ano, trimestre) {
    let dcpSection = document.querySelector("#dcpSection");
    let dcpMetaData = document.querySelector("#dcpMetaData");
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    const response = await api.get(
      `/dcp/all-dcp?cnpj=${cnpjLimpo}&ano=${ano}&trimestre=${trimestre}`
    );
    setDcp1(response.data[0]);
    setDcp2(response.data[1]);
    setDcp3(response.data[2]);
    dcpSection.classList.toggle("d-none");
    dcpMetaData.innerText = `${trimestre}/${ano}`;

    const resposta = await api.get("/nfe/all-nfe", {
      params: { cnpj: cnpjLimpo, trim: trimestre, ano: ano },
    });
    setGomoExport(exportacoes(resposta.data, ano, trimestre));

    setIsLoading(false);
  }

  function handleSelectedRow(id){
    
    const table = document.getElementById("tableResult");
    const rows = table.getElementsByTagName("tr");

    const selectedRow = document.getElementById(id)
    
    for (let i = 0; i < rows.length; i++) {
      table.rows[i].classList.remove("bg-white")
      table.rows[i].classList.remove("bg-opacity-50")
    }
    
    selectedRow.classList.add("bg-white")
    selectedRow.classList.add("bg-opacity-50")
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
                  <tr key={dcp._id} id={dcp._id} onClick={() => {handleClick(dcp.ano, dcp.trimestre); handleSelectedRow(dcp._id)} } style={{cursor: "pointer"}}>
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
            <h2 className="py-5 mx-3" id="dcpMetaData"></h2>
          </div>
          <div className="accordion mx-3" id="accordionExample">
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
                          <td>Linha 1</td>
                          <td>
                            {dcp1.linha_1.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_1}</td>
                          <td>
                            {dcp2.linha_1.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_1}</td>
                          <td>
                            {dcp3.linha_1.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_1}</td>
                        </tr>
                        <tr>
                          <td>Linha 2</td>
                          <td>
                            {dcp1.linha_2.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_2}</td>
                          <td>
                            {dcp2.linha_2.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_}2</td>
                          <td>
                            {dcp3.linha_2.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_2}</td>
                        </tr>
                        <tr>
                          <td>Linha 3</td>
                          <td>
                            {dcp1.linha_3.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_3}</td>
                          <td>
                            {dcp2.linha_3.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_3}</td>
                          <td>
                            {dcp3.linha_3.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_3}</td>
                        </tr>
                        <tr>
                          <td>Linha 4</td>
                          <td>
                            {dcp1.linha_4.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_4}</td>
                          <td>
                            {dcp2.linha_4.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_4}</td>
                          <td>
                            {dcp3.linha_4.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_4}</td>
                        </tr>
                        <tr>
                          <td>Linha 5</td>
                          <td>
                            {dcp1.linha_5.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_5}</td>
                          <td>
                            {dcp2.linha_5.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_5}</td>
                          <td>
                            {dcp3.linha_5.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_5}</td>
                        </tr>
                        <tr>
                          <td>Linha 6</td>
                          <td>
                            {dcp1.linha_6.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_6}</td>
                          <td>
                            {dcp2.linha_6.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_6}</td>
                          <td>
                            {dcp3.linha_6.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_6}</td>
                        </tr>
                        <tr>
                          <td>Linha 7</td>
                          <td>
                            {dcp1.linha_7.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[0].linha_7}</td>
                          <td>
                            {dcp2.linha_7.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[1].linha_7}</td>
                          <td>
                            {dcp3.linha_7.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{gomoExport[2].linha_7}</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
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
                  <span className="col-8">Matérias primas, embalagens</span>
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
                  </table>
                </div>
              </div>
            </div>
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
                  <span className="col-8">Prestação de serviços</span>
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
