import api from "../api/api";
import { useState, useEffect } from "react";
import { LinhaNota } from "./Linha";


function ModalNotas({info, showModal}) {
  const [notas, setNotas] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotas() {
      const response = await api.get(`/nfe/mes?cnpj=${info.cnpj}&ano=${info.ano}&mes=${info.mes}&nLinha=${info.nLinha}`)
      setNotas(response.data)
      setIsLoading(false)
    }
    fetchNotas()
    // console.log('useeffectmodal')
  }, [showModal])
  
  
  
  // console.log(notas)
  return (
    <div className="modal modal-xl" id="modalNotas" data-bs-backdrop="static">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          </div>
          <div className="modal-body">
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
                      <LinhaNota nota={nota} key={nota._id} />
                    )
                  })}
                </tbody>
              )}

            </table>
          </div>
          <div className="modal-footer">
            <button type="button" data-bs-dismiss="modal" className="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNotas;