import { Modal } from 'bootstrap';
import api from '../api/api';

function LinhaDCP({ dcpsTrimestre, gomo, nLinha, setShowModal, showModal, info, setInfo }) {

  const descricoes = require('../utils/descricaolinhas.json');
  const clicavel = [4, 5, 9, 12, 15]; // Linhas da DCP que são clicáveis
  const [dcp1, dcp2, dcp3] = dcpsTrimestre;

  // Recupera as notas fiscais referentes ao ano e mês do cnpj pesquisado
  function handleModal(e) {
    if (clicavel.includes(nLinha)) {
      const modalNotas = new Modal("#modalNotas")
      modalNotas.show()
  
      setInfo({...info,
        cnpj: dcp1.cnpj,
        ano: dcp1.ano,
        mes: e.target.dataset.mes,
        nLinha: nLinha,
        notasExcluidas: []
      })
      setShowModal(!showModal)
    }
  }

  // Coloca o cursor como pointer
  function cursorPointer(e) {
    // console.log(e)
    if (clicavel.includes(parseInt(e.target.parentElement.dataset.linha))) {
      e.target.style.cursor = "pointer"
      e.target.classList.toggle("text-bg-info")
      // e.target.setAttribute("data-bs-toggle", "modal")
      // e.target.setAttribute("data-bs-target", "modalNotas")
      // console.log(e.target)
    }
  }

  // Remove Background
  function removeBg(e) {
    if (clicavel.includes(parseInt(e.target.parentElement.dataset.linha))) {
      e.target.classList.toggle("text-bg-info")
    }
  }

  return (
    <tr id={`teste${nLinha}`} data-linha={nLinha}>
      <td data-toggle="tooltip" data-placement="right" title={descricoes[nLinha]}>Linha {nLinha}</td>
      <td>{dcp1[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td
        onClick={handleModal}
        className={`${Math.floor(dcp1[`linha_${nLinha}`]) !==
          Math.floor(gomo[0][`linha_${nLinha}`])
          ? "text-danger"
          : ""
          }`}
        data-mes={dcp1.mes}
        onMouseOver={cursorPointer}
        onMouseOut={removeBg}
      >
        {gomo[0][`linha_${nLinha}`].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td>
        {dcp2[`linha_${nLinha}`].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td
        onClick={handleModal}
        className={`${Math.floor(dcp2[`linha_${nLinha}`]) !==
          Math.floor(gomo[1][`linha_${nLinha}`])
          ? "text-danger"
          : ""
          }`}
        data-mes={dcp2.mes}
        onMouseOver={cursorPointer}
        onMouseOut={removeBg}
      >
        {gomo[1][`linha_${nLinha}`].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td>
        {dcp3[`linha_${nLinha}`].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td
        onClick={handleModal}
        className={`${Math.floor(dcp3[`linha_${nLinha}`]) !==
          Math.floor(gomo[2][`linha_${nLinha}`])
          ? "text-danger"
          : ""
          }`}
        data-mes={dcp3.mes}
        onMouseOver={cursorPointer}
        onMouseOut={removeBg}
      >
        {gomo[2][`linha_${nLinha}`].toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
    </tr>
  );
}

function LinhaNota({ nota, info }) {

  function handleNota(e) {
    e.target.parentElement.parentElement.classList.toggle("text-decoration-line-through")
  }
  console.log(info)
  return (
    
    <tr style={{ verticalAlign: "middle" }} className={`${info.notasExcluidas.includes(nota._id) ? "text-decoration-line-through" : ""}`} data-id={nota._id}>
      <td>{nota.operacao}</td>
      <td>{nota.pais}</td>
      <td>{nota.cfop}</td>
      <td>{nota.ncm}</td>
      <td>{nota.mercadoria}</td>
      <td>
        {nota.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td className="col-2">{nota.ni}</td>
      <td>{nota.nome}</td>
      <td>
        <i className="bi bi-file-earmark-x-fill text-danger" onClick={handleNota}></i>
      </td>
    </tr>
  );
}

export { LinhaDCP, LinhaNota };
