import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import { LinhaNota } from "../components/Linha";

function Notas() {

  const location = useLocation()
  const cnpj = location.state.cnpj
  const ano = parseInt(location.state.ano)
  const mes = parseInt(location.state.mes)
  const nLinha = location.state.nLinha
  const [notas, setNotas] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotas() {
      const response = await api.get(`/nfe/mes?cnpj=${cnpj}&ano=${ano}&mes=${mes}&nLinha=${nLinha}`)
      setNotas(response.data)
    }
    fetchNotas()
    setIsLoading(false)
  }, [cnpj, ano, mes, nLinha])
  
  // console.log(notas)
  // console.log(cnpj, ano, mes)
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="py-5 mx-3">Notas fiscais</h2>
        <span className="py-5 mx-3 fs-3" id="dcpMetaData"></span>
      </div>

      {/* TABELA DE NOTAS */}
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Operação</th>
            <th>País</th>
            <th>CFOP</th>
            <th>NCM</th>
            <th>Mercadoria</th>
            <th>Valor</th>
            <th>NI</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
          {notas.map(nota => {
            return (
              <LinhaNota nota={nota} key={nota._id}/>
            )
          })}
        </tbody>
        )}
        
      </table>

      {/* OBSERVAÇÕES */}
      <div className="py-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Escreva as observações da análise"></textarea>
      </div>

      {/* BOTÕES */}
      <div id="acoesId" className="d-flex justify-content-end py-3">
        <button className="btn btn-primary mx-3">Salvar análise</button>
        <button className="btn btn-primary">Gerar relatório</button>
      </div>

    </div>
  )
}

export default Notas;
