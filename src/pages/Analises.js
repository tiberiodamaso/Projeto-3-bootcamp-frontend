import { useState, useEffect } from "react";
import api from "../api/api";
import {
  exportacoes,
  receitas,
  insumos,
  combustiveis,
  energia,
  servicos,
} from "../utils/montaDCP";
import { LinhaDCP } from "../components/Linha";

function Analises() {
  const [dcps, setDCPs] = useState([]);
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [dcpsTrimestre, setDcpsTrimestre] = useState([]);
  const [meses, setMeses] = useState([]);
  const [gomoExport, setGomoExport] = useState([]);
  const [gomoReceita, setGomoReceita] = useState([]);
  const [gomoInsumo, setGomoInsumo] = useState([]);
  const [gomoCombustivel, setGomoCombustivel] = useState([]);
  const [gomoEnergia, setGomoEnergia] = useState([]);
  const [gomoServico, setGomoServicos] = useState([]);
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

  // Recupera DCPs e nfes do trimestre
  async function handleClick(ano, trimestre) {
    let dcpSection = document.querySelector("#dcpSection");
    let dcpMetaData = document.querySelector("#dcpMetaData");
    let acoesId = document.querySelector("#acoesId");
    dcpSection.classList.remove("d-none");
    dcpMetaData.innerText = `${trimestre}/${ano}`;
    acoesId.classList.remove("d-none");
    if (trimestre === 1) setMeses(["Jan", "Fev", "Mar"]);
    if (trimestre === 2) setMeses(["Abr", "Mai", "Jun"]);
    if (trimestre === 3) setMeses(["Jul", "Ago", "Set"]);
    if (trimestre === 4) setMeses(["Out", "Nov", "Dez"]);
    const cnpjLimpo = cnpj.replace(/\D/g, "");

    // Recupera DCPs do trimestre
    const response = await api.get(
      `/dcp/all-dcp?cnpj=${cnpjLimpo}&ano=${ano}&trimestre=${trimestre}`
    );
    setDcpsTrimestre(response.data);

    // Recupera nfes do trimestre
    const resposta = await api.get("/nfe/all-nfe", {
      params: { cnpj: cnpjLimpo, trim: trimestre, ano: ano },
    });
    const respostaAnalise = await api.get("/analise/acumulado", {
      params: { cnpj: cnpjLimpo, trimestre: trimestre, ano: ano },
    });

    setGomoReceita(
      receitas(resposta.data, respostaAnalise.data, ano, trimestre)
    );
    setGomoInsumo(insumos(resposta.data, respostaAnalise.data, ano, trimestre));
    setGomoExport(
      exportacoes(resposta.data, respostaAnalise.data, ano, trimestre)
    );
    setGomoCombustivel(combustiveis(trimestre));
    setGomoEnergia(energia(trimestre));
    setGomoServicos(servicos(trimestre));
    setIsLoading(false);
  }

  // Estiliza a tabela de DCPs do banco quando clica em uma DCP
  function handleSelectedRow(id) {
    const table = document.getElementById("tableResult");
    const rows = table.getElementsByTagName("tr");
    const selectedRow = document.getElementById(id);
    for (let i = 0; i < rows.length; i++) {
      table.rows[i].classList.remove("bg-white");
      table.rows[i].classList.remove("bg-opacity-50");
    }
    selectedRow.classList.add("bg-white");
    selectedRow.classList.add("bg-opacity-50");
  }

  // Checa se os valores declarados e calculados são divergentes
  function checkValues() {
    let declarado1 = document.querySelector("#declarado1");
    let calculado1 = document.querySelector("#calculado1");
    if (declarado1.innerText !== calculado1.innerText)
      calculado1.classList.add("text-danger");
  }

  // Checa se os valores declarados e calculados são divergentes
  function test(e) {
    const event = e;
    console.log(e);
    let declarado1 = document.querySelector("#declarado1");
    let calculado1 = document.querySelector("#calculado1");
    if (declarado1.innerText !== calculado1.innerText)
      calculado1.classList.add("text-danger");
  }

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <div
        className="d-flex flex-column flex-shrink-0 px-3 vh-100 bg-dark bg-opacity-10"
        style={{ width: 305 }}
      >
        <form className="mt-5" onSubmit={handleSubmit}>
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
            <h4 className="text-center fw-bold fs-6 border border-white bg-white bg-opacity-25 p-2 my-3">
              {empresa}
            </h4>

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
                    <tr
                      key={dcp._id}
                      id={dcp._id}
                      onClick={() => {
                        handleClick(dcp.ano, dcp.trimestre);
                        handleSelectedRow(dcp._id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <i className="bi bi-file-earmark-text me-2"></i>
                      </td>
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
                          return (
                            <th colSpan="2" key={i}>
                              {mes}
                            </th>
                          );
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={1}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={2}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={3}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={4}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={5}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={6}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={7}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* RECEITA OPERACIONAL BRUTA */}
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
                  <span className="col-8">Receita operacional bruta</span>
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoReceita}
                          nLinha={8}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoReceita}
                          nLinha={9}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoReceita}
                          nLinha={10}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* MATÉRIAS PRIMAS E EMBALAGENS */}
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={11}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={12}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={13}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={14}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={15}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={16}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={17}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={18}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={19}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={20}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={21}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={22}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={23}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={24}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={25}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={26}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* COMBUSTIVEIS */}
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
                  <span className="col-8">Combustíveis</span>
                </button>
              </h2>
              <div
                id="collapseFour"
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={27}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={28}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={29}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={30}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={31}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={32}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={33}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={34}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={35}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={36}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={37}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={38}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={39}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={40}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={41}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={42}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* ENERGIA */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  <span className="col-8">Energia Elétrica</span>
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={43}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={44}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={45}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={46}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={47}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={48}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* PRESTAÇÃO DE SERVIÇOS  */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  <span className="col-8">Prestação de serviços</span>
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
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
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={49}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={50}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={51}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={52}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={53}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={54}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OBSERVAÇÕES */}
        <div id="acoesId" className="d-none mx-3 py-3">
          <div className="py-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Escreva as observações da análise"
            ></textarea>
          </div>

          {/* BOTÕES */}
          <div className="d-flex justify-content-end py-3">
            <button className="btn btn-primary mx-3">Salvar análise</button>
            <button className="btn btn-primary">Gerar relatório</button>
          </div>
        </div>

        {/* ANALISES */}
        <div className="">
          <h2 className="py-5 mx-3">Análises</h2>
        </div>
      </div>
    </div>
  );
}

export default Analises;
