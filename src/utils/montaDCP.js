import trimestre from "./trimestre";

function somaNoMes(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes === mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function somaAteAnterior(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes < mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function somaAteMes(notas, criterios, ano, mes) {
  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota._id.cfop) &&
      nota._id.ano === ano &&
      nota._id.mes <= mes
    );
  });

  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.total.$numberDecimal);
  }, 0);

  return soma;
}

function desconsideradasNoMes(analises, criterios, ano, mes, nLinha) {
  const notas = [];
  analises.forEach((analise) => {
    const linha = analise[`desconsideradas_linha_${nLinha}`];
    linha.forEach((nota) => {
      notas.push(nota);
    });
  });

  const resultado = notas.filter((nota) => {
    return (
      criterios.includes(nota.cfop) && nota.ano === ano && nota.mes === mes
    );
  });
  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.valor);
  }, 0);
  return soma;
}

function desconsideradasAteMes(analises, criterios, ano, mes, nLinha) {
  const notas = [];
  analises.forEach((analise) => {
    const linha = analise[`desconsideradas_linha_${nLinha}`];
    linha.forEach((nota) => {
      notas.push(nota);
    });
  });

  const resultado = notas.filter((nota) => {
    return criterios.includes(nota.cfop) && nota.ano === ano && nota.mes <= mes;
  });
  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.valor);
  }, 0);
  return soma;
}

function desconsideradasAteAnterior(analises, criterios, ano, mes, nLinha) {
  const notas = [];
  analises.forEach((analise) => {
    const linha = analise[`desconsideradas_linha_${nLinha}`];
    linha.forEach((nota) => {
      notas.push(nota);
    });
  });

  const resultado = notas.filter((nota) => {
    return criterios.includes(nota.cfop) && nota.ano === ano && nota.mes < mes;
  });
  const soma = resultado.reduce((acumulador, valorAtual) => {
    return acumulador + Number(valorAtual.valor);
  }, 0);
  return soma;
}

function exportacoes(notas, analises, ano, trim) {
  const cfopExportacao = ["7101", "7105", "7127"];
  const cfopComercial = ["5501", "6501"];
  const todosCfop = ["7101", "7105", "7127", "5501", "6501"];
  const { lower, upper } = trimestre(trim);
  console.log("analises");

  desconsideradasNoMes(analises, cfopExportacao, 2020, 3, 4);
  const exportacoes = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_1:
        somaAteAnterior(notas, cfopExportacao, 2020, x) -
        desconsideradasAteAnterior(analises, cfopExportacao, ano, x, 4),
      linha_2:
        somaAteAnterior(notas, cfopComercial, 2020, x) -
        desconsideradasAteAnterior(analises, cfopComercial, ano, x, 5),
      linha_3:
        somaAteAnterior(notas, todosCfop, 2020, x) -
        desconsideradasAteAnterior(analises, cfopExportacao, ano, x, 4) -
        desconsideradasAteAnterior(analises, cfopComercial, ano, x, 5),
      linha_4:
        somaNoMes(notas, cfopExportacao, 2020, x) -
        desconsideradasNoMes(analises, cfopExportacao, 2020, x, 4),
      linha_5:
        somaNoMes(notas, cfopComercial, 2020, x) -
        desconsideradasNoMes(analises, cfopComercial, 2020, x, 5),
      linha_6:
        somaNoMes(notas, todosCfop, 2020, x) -
        desconsideradasNoMes(analises, cfopExportacao, 2020, x, 4) -
        desconsideradasNoMes(analises, cfopComercial, 2020, x, 5),
      linha_7:
        somaAteMes(notas, todosCfop, 2020, x) -
        desconsideradasAteMes(analises, cfopExportacao, 2020, x, 4) -
        desconsideradasAteMes(analises, cfopComercial, 2020, x, 5),
    };

    exportacoes[x - lower] = periodo;
  }
  // console.log(exportacoes);
  return exportacoes;
}

function receitas(notas, analises, ano, trim) {
  const cfopReceitaBruta = [
    "5101",
    "5102",
    "5103",
    "5105",
    "5109",
    "5111",
    "5113",
    "5116",
    "5118",
    "5122",
    "5124",
    "5125",
    "5403",
    "5405",
    "5656",
    "5501",
    "6101",
    "6102",
    "6103",
    "6105",
    "6107",
    "6108",
    "6109",
    "6111",
    "6113",
    "6116",
    "6118",
    "6122",
    "6124",
    "6125",
    "6401",
    "6403",
    "6405",
    "6501",
    "7101",
    "7105",
    "7127",
  ];
  const { lower, upper } = trimestre(trim);

  const receitas = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_8:
        somaAteAnterior(notas, cfopReceitaBruta, 2020, x) -
        desconsideradasAteAnterior(analises, cfopReceitaBruta, 2020, x, 9),
      linha_9:
        somaNoMes(notas, cfopReceitaBruta, 2020, x) -
        desconsideradasNoMes(analises, cfopReceitaBruta, 2020, x, 9),
      linha_10:
        somaAteMes(notas, cfopReceitaBruta, 2020, x) -
        desconsideradasAteMes(analises, cfopReceitaBruta, 2020, x, 9),
    };
    receitas[x - lower] = periodo;
  }

  return receitas;
}

function insumos(notas, analises, ano, trim) {
  const cfopInsumos = [
    "1101",
    "1111",
    "1116",
    "1120",
    "1122",
    "2101",
    "2111",
    "2116",
    "2120",
    "2122",
  ];
  const cfopCompraTotal = [
    "1101",
    "1102",
    "1111",
    "1113",
    "1116",
    "1117",
    "1118",
    "1120",
    "1121",
    "1122",
    "2101",
    "2102",
    "2111",
    "2113",
    "2116",
    "2117",
    "2118",
    "2120",
    "2121",
    "2122",
  ];
  const { lower, upper } = trimestre(trim);

  const insumos = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_11:
        somaAteAnterior(notas, cfopInsumos, 2020, x) -
        desconsideradasAteAnterior(analises, cfopInsumos, 2020, x, 12),
      linha_12:
        somaNoMes(notas, cfopInsumos, 2020, x) -
        desconsideradasNoMes(analises, cfopInsumos, 2020, x, 12),
      linha_13:
        somaAteMes(notas, cfopInsumos, 2020, x) -
        desconsideradasAteMes(analises, cfopInsumos, 2020, x, 12),
      linha_14:
        somaAteAnterior(notas, cfopCompraTotal, 2020, x) -
        desconsideradasAteAnterior(analises, cfopCompraTotal, 2020, x, 15),
      linha_15:
        somaNoMes(notas, cfopCompraTotal, 2020, x) -
        desconsideradasNoMes(analises, cfopCompraTotal, 2020, x, 15),
      linha_16:
        somaAteMes(notas, cfopCompraTotal, 2020, x) -
        desconsideradasAteMes(analises, cfopCompraTotal, 2020, x, 15),
      linha_17:
        (somaAteMes(notas, cfopInsumos, 2020, x) /
          somaAteMes(notas, cfopCompraTotal, 2020, x)) *
        100,
      linha_18: 0,
      linha_19: 0,
      linha_20: 0,
      linha_21: 0,
      linha_22: 0,
      linha_23: 0,
      linha_24: 0,
      linha_25: 0,
      linha_26: 0,
    };

    insumos[x - lower] = periodo;
  }
  // console.log(insumos);
  return insumos;
}

function combustiveis(trim) {
  const { lower, upper } = trimestre(trim);
  const gasolina = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_27: 0,
      linha_28: 0,
      linha_29: 0,
      linha_30: 0,
      linha_31: 0,
      linha_32: 0,
      linha_33: 0,
      linha_34: 0,
      linha_35: 0,
      linha_36: 0,
      linha_37: 0,
      linha_38: 0,
      linha_39: 0,
      linha_40: 0,
      linha_41: 0,
      linha_42: 0,
    };
    gasolina[x - lower] = periodo;
  }

  return gasolina;
}

function energia(trim) {
  const { lower, upper } = trimestre(trim);
  const energia = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_43: 0,
      linha_44: 0,
      linha_45: 0,
      linha_46: 0,
      linha_47: 0,
      linha_48: 0,
    };
    energia[x - lower] = periodo;
  }

  return energia;
}

function servicos(trim) {
  const { lower, upper } = trimestre(trim);
  const servicos = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_49: 0,
      linha_50: 0,
      linha_51: 0,
      linha_52: 0,
      linha_53: 0,
      linha_54: 0,
    };
    servicos[x - lower] = periodo;
  }

  return servicos;
}

export { exportacoes, receitas, insumos, combustiveis, energia, servicos };
