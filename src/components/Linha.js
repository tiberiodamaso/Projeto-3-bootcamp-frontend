import { useNavigate } from "react-router-dom";

function LinhaDCP({ dcpsTrimestre, gomo, nLinha }) {
  
  const descricoes = require('../utils/descricaolinhas.json');
  const navigate = useNavigate();
  const clicavel = [4, 5, 9]; // Linhas da DCP que são clicáveis
  const [dcp1, dcp2, dcp3] = dcpsTrimestre;

  // Recupera as notas fiscais referentes ao ano e mês do cnpj pesquisado
  function getNotas(e) {
    // console.log(e)
    const cnpj = dcp1.cnpj;
    const ano = dcp1.ano;
    const mes = e.target.dataset.mes;
    if (clicavel.includes(nLinha)) {
      navigate("/notas", {
        state: {
          cnpj: cnpj,
          ano: ano,
          mes: mes,
          nLinha: nLinha,
        },
      });
    }
  }

  // Coloca o cursor como pointer
  function cursorPointer(e){
    // console.log(e)
    if (clicavel.includes(parseInt(e.target.parentElement.dataset.linha))) {
      e.target.style.cursor = "pointer"
      e.target.classList.toggle("text-bg-info")
    }
  }

  // Remove Background
  function removeBg(e){
    if (clicavel.includes(parseInt(e.target.parentElement.dataset.linha))) {
      e.target.classList.toggle("text-bg-info")
    }
  }

  return (
    <tr id={`teste${nLinha}`} data-linha={nLinha}>
      <td data-toggle="tooltip" data-placement="right" title={descricoes[nLinha]}>Linha {nLinha}</td>
      <td>{dcp1[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td
        onClick={getNotas}
        className={`${
          Math.floor(dcp1[`linha_${nLinha}`]) !==
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
        onClick={getNotas}
        className={`${
          Math.floor(dcp2[`linha_${nLinha}`]) !==
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
        onClick={getNotas}
        className={`${
          Math.floor(dcp3[`linha_${nLinha}`]) !==
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

function LinhaNota({ nota }) {
  return (
    <tr style={{ verticalAlign: "middle" }}>
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
        <i className="bi bi-file-earmark-x-fill text-danger"></i>
      </td>
    </tr>
  );
}

// export default LinhaNota;

export { LinhaDCP, LinhaNota };
