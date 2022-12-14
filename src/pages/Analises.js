import { useState, useEffect } from "react";
import api from "../api/api";
import {
  exportacoes,
  receitas,
  insumos,
  combustiveis,
  energia,
  servicos,
  calculo,
} from "../utils/montaDCP";
import { LinhaDCP } from "../components/Linha";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RelatorioPDF from "../components/RelatorioPDF";
import ModalNotas from "../components/ModalNotas";
import ListaAnalises from "../components/ListaAnalises";
import { getObservacao, saveObservacao } from "../utils/observacao";

function Analises() {

  const [info, setInfo] = useState({ cnpj: "", ano: 0, mes: 0, nLinha: 0, parentHandleClick: handleClick, notasExcluidas: [] });
  const [showModal, setShowModal] = useState(true);
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
  const [gomoCalculo, setGomoCalculo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [observacao, setObservacao] = useState({ texto: "" });
  const [nfesDesconsideradas, setNfesDesconsideradas] = useState([]);

  function soma() {
    console.log('4')
  }
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
  async function handleClick(ano, trimestre, cnpjListaAnalises) {
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
    const cnpjLimpo = cnpjListaAnalises
      ? cnpjListaAnalises
      : cnpj.replace(/\D/g, "");

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
    setGomoInsumo(
      insumos(
        response.data,
        resposta.data,
        respostaAnalise.data,
        ano,
        trimestre
      )
    );
    setGomoExport(
      exportacoes(resposta.data, respostaAnalise.data, ano, trimestre)
    );
    setGomoCombustivel(combustiveis(response.data, trimestre));
    setGomoEnergia(energia(response.data, trimestre));
    setGomoServicos(servicos(response.data, trimestre));
    setGomoCalculo(
      calculo(
        response.data,
        resposta.data,
        respostaAnalise.data,
        ano,
        trimestre
      )
    );

    getObservacao(cnpjLimpo, ano, trimestre, setObservacao);

    // nfes
    const responseNfes = await api.get(`/analise/analise-atual?cnpj=${cnpjLimpo}&ano=${ano}&trimestre=${trimestre}`);
    setNfesDesconsideradas(responseNfes.data)
    
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

  // Campo observações da análise
  function handleObservacao(e) {
    setObservacao({ ...observacao, [e.target.name]: e.target.value });
  }

  // console.log(info)
  // console.log(showModal)
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
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={2}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={3}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={4}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={5}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={6}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoExport}
                          nLinha={7}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
                          gomo={gomoReceita}
                          nLinha={8}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoReceita}
                          nLinha={9}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoReceita}
                          nLinha={10}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
                          gomo={gomoInsumo}
                          nLinha={11}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={12}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={13}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={14}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={15}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={16}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={17}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={18}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={19}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={20}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={21}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={22}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={23}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={24}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={25}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoInsumo}
                          nLinha={26}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
                          gomo={gomoCombustivel}
                          nLinha={27}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={28}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={29}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={30}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={31}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={32}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={33}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={34}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={35}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={36}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={37}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={38}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={39}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={40}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={41}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCombustivel}
                          nLinha={42}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
                          gomo={gomoEnergia}
                          nLinha={43}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={44}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={45}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={46}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={47}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoEnergia}
                          nLinha={48}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
                          gomo={gomoServico}
                          nLinha={49}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={50}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={51}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={52}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={53}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoServico}
                          nLinha={54}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* CÁLCULO DO CRÉDITO PRESUMIDO  */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSeven">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="false"
                  aria-controls="collapseSeven"
                >
                  <span className="col-8">Cálculo do crédito presumido</span>
                </button>
              </h2>
              <div
                id="collapseSeven"
                className="accordion-collapse collapse"
                aria-labelledby="headingSeven"
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
                          gomo={gomoCalculo}
                          nLinha={55}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={56}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={57}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* VALORES UTILIZADOS DO CRÉDITO PRESUMIDO  */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingEight">
                <button
                  className="accordion-button fs-4 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEight"
                  aria-expanded="false"
                  aria-controls="collapseEight"
                >
                  <span className="col-8">
                    Valores utilizados do crédito presumido
                  </span>
                </button>
              </h2>
              <div
                id="collapseEight"
                className="accordion-collapse collapse"
                aria-labelledby="headingEight"
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
                          gomo={gomoCalculo}
                          nLinha={58}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={59}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={60}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={61}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={62}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={63}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={64}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={65}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={66}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={67}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={68}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={69}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={70}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={71}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={72}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
                        />
                        <LinhaDCP
                          dcpsTrimestre={dcpsTrimestre}
                          gomo={gomoCalculo}
                          nLinha={73}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          info={info}
                          setInfo={setInfo}
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
              value={observacao.texto}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              name="texto"
              placeholder="Escreva as observações da análise"
              onChange={handleObservacao}
            ></textarea>
          </div>

          {/* BOTÕES */}
          <div className="d-flex justify-content-end py-3">
            <button
              onClick={() => {
                saveObservacao(observacao);
              }}
              className="btn btn-primary mx-3"
            >
              Salvar análise
            </button>

            {!isLoading && (
              <PDFDownloadLink document={<RelatorioPDF
                empresa={empresa}
                trimestre={meses}
                dcpsTrimestre={dcpsTrimestre}
                gomoExport={gomoExport}
                gomoReceita={gomoReceita}
                gomoInsumo={gomoInsumo}
                gomoCombustivel={gomoCombustivel}
                gomoEnergia={gomoEnergia}
                gomoServico={gomoServico}

                observacao={observacao.texto}
                nfesDesconsideradas={nfesDesconsideradas} />} fileName="relatorio">
          {({loading}) => (loading ? <button className="btn btn-outline-primary">Carregando...</button>:<button className="btn btn-primary">Gerar relatório</button>)} 
        </PDFDownloadLink>
        )} 
        



          </div>
        </div>

        {/* ANALISES */}
        <div className="">
          <h2 className="py-5 mx-3">Análises</h2>
          <ListaAnalises
            gomoExport={gomoExport}
            parentHandleClick={handleClick}
            setCnpj={setCnpj}
          />
        </div>
      </div>

      {/* MODAL */}

      <ModalNotas showModal={showModal} setShowModal={setShowModal} info={info} setInfo={setInfo} />


    </div>
  );
}

export default Analises;
