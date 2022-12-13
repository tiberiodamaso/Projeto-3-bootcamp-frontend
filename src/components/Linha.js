import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Linha({ dcpsTrimestre, gomo, nLinha }) {
  const navigate = useNavigate()
  const clicavel = [4, 5]
  const [dcp1, dcp2, dcp3] = dcpsTrimestre
  function getNotas() {
    if (clicavel.includes(nLinha)) {
      navigate('/') 
    }
  }

  return (
    <tr>
      <td>Linha {nLinha}</td>
      <td>{dcp1[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td onClick={getNotas} className={`${Math.floor(dcp1[`linha_${nLinha}`]) !== Math.floor(gomo[0][`linha_${nLinha}`]) ? "text-danger" : ""}`}>{gomo[0][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td>{dcp2[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td onClick={getNotas} className={`${Math.floor(dcp2[`linha_${nLinha}`]) !== Math.floor(gomo[1][`linha_${nLinha}`]) ? "text-danger" : ""}`}>{gomo[1][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td>{dcp3[`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td onClick={getNotas} className={`${Math.floor(dcp3[`linha_${nLinha}`]) !== Math.floor(gomo[2][`linha_${nLinha}`]) ? "text-danger" : ""}`}>{gomo[2][`linha_${nLinha}`].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    </tr>
  );
}

export default Linha;