import { useNavigate } from "react-router-dom";

function LinhaDCP({ dcpsTrimestre, gomo, nLinha }) {
  const navigate = useNavigate()
  const clicavel = [4, 5]
  const [dcp1, dcp2, dcp3] = dcpsTrimestre

  function getNotas(e) {
    // console.log(e)
    const cnpj = dcp1.cnpj
    const ano = dcp1.ano
    const mes = e.target.dataset.mes
    if (clicavel.includes(nLinha)) {
      navigate('/notas', {
        state: {
          cnpj: cnpj,
          ano: ano,
          mes: mes,
          nLinha: nLinha
        }
      })
    }
  }

  return (
    <tr>
      <td>Linha {nLinha}</td>
      <td>{dcp1[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td
        onClick={getNotas}
        className={`${Math.floor(dcp1[`linha_${nLinha}`]) !== Math.floor(gomo[0][`linha_${nLinha}`]) ? "text-danger" : ""}`}
        data-mes={dcp1.mes}
      >
        {gomo[0][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </td>
      <td>{dcp2[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td
        onClick={getNotas}
        className={`${Math.floor(dcp2[`linha_${nLinha}`]) !== Math.floor(gomo[1][`linha_${nLinha}`]) ? "text-danger" : ""}`}
        data-mes={dcp2.mes}
      >
        {gomo[1][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </td>
      <td>{dcp3[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td
        onClick={getNotas}
        className={`${Math.floor(dcp3[`linha_${nLinha}`]) !== Math.floor(gomo[2][`linha_${nLinha}`]) ? "text-danger" : ""}`}
        data-mes={dcp3.mes}
      >
        {gomo[2][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </td>
    </tr>
  );
}

function LinhaNota({ nota }) {
  return (
    <tr style={{verticalAlign: 'middle'}}>
      <td>{nota.operacao}</td>
      <td>{nota.pais}</td>
      <td>{nota.cfop}</td>
      <td>{nota.ncm}</td>
      <td>{nota.mercadoria}</td>
      <td>{nota.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td className="col-2">{nota.ni}</td>
      <td>{nota.nome}</td>
      <td><i className="bi bi-file-earmark-x-fill text-danger"></i></td>
    </tr>
  );
}

// export default LinhaNota;

export { LinhaDCP, LinhaNota };