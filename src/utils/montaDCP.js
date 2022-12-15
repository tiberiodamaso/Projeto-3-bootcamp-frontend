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
  // console.log("analises");

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

function insumos(dcps, notas, analises, ano, trim) {
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
  const linha_21 = [
    447419.19, 185205.52, 387730.4, 690341.63, 914071.04, 629105.17, 1168796.6,
    1189785.24, 1087094.16, 388384.57, 741469.81, 1622141.05,
  ];
  const linha_24 = [
    447419.19, 185205.52, 387730.4, 690341.63, 914071.04, 629105.17, 1168796.6,
    1189785.24, 1087094.16, 388384.57, 741469.81, 1403097.88,
  ];
  const linha_25 = [
    0, 447419.19, 632624.71, 1020355.11, 1710696.74, 2624767.78, 3252872.95,
    4422669.56, 5612454.8, 6699548.96, 7087933.53, 7829403.34,
  ];
  const linha_26 = [
    447419.19, 632624.71, 1020355.11, 1710696.74, 2624767.78, 3252872.95,
    4422669.56, 5612454.8, 6699548.96, 7087933.53, 7829403.34, 9232501.22,
  ];

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
      linha_18: dcps[x - lower].linha_18,
      linha_19: dcps[x - lower].linha_19,
      linha_20: dcps[x - lower].linha_20,
      linha_21: linha_21[x - 1],
      linha_22: dcps[x - lower].linha_22,
      linha_23: dcps[x - lower].linha_23,
      linha_24: linha_24[x - 1],
      linha_25: linha_25[x - 1],
      linha_26: linha_26[x - 1],
    };

    insumos[x - lower] = periodo;
  }
  // console.log(insumos);
  return insumos;
}

function combustiveis(dcps, trim) {
  const { lower, upper } = trimestre(trim);

  const gasolina = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_27: dcps[x - lower].linha_27,
      linha_28: dcps[x - lower].linha_28,
      linha_29: dcps[x - lower].linha_29,
      linha_30: dcps[x - lower].linha_30,
      linha_31: dcps[x - lower].linha_31,
      linha_32: dcps[x - lower].linha_32,
      linha_33: dcps[x - lower].linha_33,
      linha_34: dcps[x - lower].linha_34,
      linha_35: dcps[x - lower].linha_35,
      linha_36: dcps[x - lower].linha_36,
      linha_37: dcps[x - lower].linha_37,
      linha_38: dcps[x - lower].linha_38,
      linha_39: dcps[x - lower].linha_39,
      linha_40: dcps[x - lower].linha_40,
      linha_41: dcps[x - lower].linha_41,
      linha_42: dcps[x - lower].linha_42,
    };
    gasolina[x - lower] = periodo;
  }

  return gasolina;
}

function energia(dcps, trim) {
  const { lower, upper } = trimestre(trim);
  const energia = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_43: dcps[x - lower].linha_43,
      linha_44: dcps[x - lower].linha_44,
      linha_45: dcps[x - lower].linha_45,
      linha_46: dcps[x - lower].linha_46,
      linha_47: dcps[x - lower].linha_47,
      linha_48: dcps[x - lower].linha_48,
    };
    energia[x - lower] = periodo;
  }

  return energia;
}

function servicos(dcps, trim) {
  const { lower, upper } = trimestre(trim);
  const servicos = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_49: dcps[x - lower].linha_49,
      linha_50: dcps[x - lower].linha_50,
      linha_51: dcps[x - lower].linha_51,
      linha_52: dcps[x - lower].linha_52,
      linha_53: dcps[x - lower].linha_53,
      linha_54: dcps[x - lower].linha_54,
    };
    servicos[x - lower] = periodo;
  }

  return servicos;
}

function calculo(dcps, notas, analises, ano, trim) {
  const { lower, upper } = trimestre(trim);
  const linha_55 = [
    448361.38, 635685.9, 1025347.67, 1718328.04, 2637346.18, 3266451.35,
    4441746.81, 5637715.21, 6724809.37, 7121073.18, 7871195, 9274292.88,
  ];
  const linha_56 = [
    0.08672, 0.066083, 0.029519, 0.039195, 0.039376, 0.040463, 0.044059,
    0.049073, 0.048479, 0.047549, 0.045827, 0.044788,
  ];
  const linha_57 = [
    38881.9, 42008.03, 30267.24, 67349.87, 103848.14, 132170.42, 195698.92,
    276659.6, 326012.03, 338599.91, 360713.25, 415377.03,
  ];
  const calculo = [];
  for (let x = lower; x <= upper; x++) {
    const periodo = {
      linha_55: linha_55[x - 1],
      linha_56: linha_56[x - 1],
      linha_57: linha_57[x - 1],
      linha_58: dcps[x - lower].linha_58,
      linha_59: dcps[x - lower].linha_59,
      linha_60: dcps[x - lower].linha_60,
      linha_61: dcps[x - lower].linha_61,
      linha_62: dcps[x - lower].linha_62,
      linha_63: dcps[x - lower].linha_63,
      linha_64: dcps[x - lower].linha_64,
      linha_65: dcps[x - lower].linha_65,
      linha_66: dcps[x - lower].linha_66,
      linha_67: linha_57[x - 1],
      linha_68: dcps[x - lower].linha_68,
      linha_69: dcps[x - lower].linha_69,
      linha_70: dcps[x - lower].linha_70,
      linha_71: linha_57[x - 1],
      linha_72: dcps[x - lower].linha_72,
      linha_73: dcps[x - lower].linha_73,
    };
    calculo[x - lower] = periodo;
  }

  return calculo;
}

export {
  exportacoes,
  receitas,
  insumos,
  combustiveis,
  energia,
  servicos,
  calculo,
};
