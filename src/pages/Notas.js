import { useState, useEffect } from "react";
import api from "../api/api";
import Linha from "../components/Linha";

function Analises() {

  return (

    <div className='d-flex'>

      {/* DCP E ANÁLISES */}
      <div className="container mx-5">
        {/* DCP */}
        <div className="d-none" id="dcpSection">
          <div className="d-flex justify-content-between">
            <h2 className="py-5 mx-3">Notas</h2>
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
