import { useEffect, useState } from "react";

import api from "../api/api.js";

function ListaAnalises({ gomoExport, parentHandleClick, setCnpj }) {
  const [analises, setAnalises] = useState(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    async function get() {
      const response = await api.get("/analise/view");
      setAnalises(response.data);
    }
    get();
  }, [gomoExport, reload]);

  async function handleClickApagar(analise) {
    console.log(analise);
    try {
      await api.delete("/analise/delete-trimestre", { params: analise });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function formatarCnpj(cnpj) {
    let cnpjFormatado = `${cnpj.substr(0, 2)}.${cnpj.substr(
      2,
      3
    )}.${cnpj.substr(5, 3)}/`;
    if (cnpj.length > 12) {
      cnpjFormatado += `${cnpj.substr(8, 4)}-${cnpj.substr(12, 2)}`;
    } else {
      cnpjFormatado += cnpj.substr(8);
    }
    return cnpjFormatado;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>CNPJ</th>
          <th>Trimestre</th>
          <th>Última atualização</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {analises &&
          analises.map((analise, index) => (
            <tr key={index}>
              <td
                onClick={() => {
                  setCnpj(analise.cnpj);
                  parentHandleClick(analise.ano, analise.trimestre);
                }}
              >
                {formatarCnpj(analise.cnpj)}
              </td>
              <td
                onClick={() => {
                  setCnpj(analise.cnpj);
                  parentHandleClick(analise.ano, analise.trimestre);
                }}
              >{`${analise.trimestre} - ${analise.ano}`}</td>
              <td
                onClick={() => {
                  setCnpj(analise.cnpj);
                  parentHandleClick(analise.ano, analise.trimestre);
                }}
              >{`${new Date(analise.lastUpdate).getDate()}/${
                new Date(analise.lastUpdate).getMonth() + 1
              }/${new Date(analise.lastUpdate).getFullYear()}`}</td>
              <td>
                <i
                  onClick={() => handleClickApagar(analise)}
                  className="bi bi-file-earmark-x-fill text-danger"
                ></i>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ListaAnalises;
