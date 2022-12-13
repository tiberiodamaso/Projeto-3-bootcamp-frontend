import { Page, Text, View, Image, Font, Document, StyleSheet } from '@react-pdf/renderer';
import brasao from '../assets/brasao.png'


const data = [
	{
		"_id": "6395ce47440b1809157ecfd9",
		"cnpj": "48941274000136",
		"nome": "Agroindústria Henry Ltda",
		"ano": 2020,
		"mes": 1,
		"trimestre": 1,
		"linha_1": 0,
		"linha_2": 0,
		"linha_3": 0,
		"linha_4": 175375,
		"linha_5": 0,
		"linha_6": 175375,
		"linha_7": 175375,
		"linha_8": 0,
		"linha_9": 190962.2,
		"linha_10": 190962.2,
		"linha_11": 0,
		"linha_12": 701734.76,
		"linha_13": 701734.76,
		"linha_14": 0,
		"linha_15": 701734.76,
		"linha_16": 701734.76,
		"linha_17": 100,
		"linha_18": 388856.02,
		"linha_19": 608887.97,
		"linha_20": 0,
		"linha_21": 481702.81,
		"linha_22": 0,
		"linha_23": 0,
		"linha_24": 481702.81,
		"linha_25": 0,
		"linha_26": 481702.81,
		"linha_27": 0,
		"linha_28": 0,
		"linha_29": 0,
		"linha_30": 0,
		"linha_31": 0,
		"linha_32": 0,
		"linha_33": 0,
		"linha_34": 0,
		"linha_35": 0,
		"linha_36": 0,
		"linha_37": 0,
		"linha_38": 0,
		"linha_39": 0,
		"linha_40": 0,
		"linha_41": 0,
		"linha_42": 0,
		"linha_43": 942.19,
		"linha_44": 0,
		"linha_45": 0,
		"linha_46": 942.19,
		"linha_47": 0,
		"linha_48": 942.19,
		"linha_49": 0,
		"linha_50": 0,
		"linha_51": 0,
		"linha_52": 0,
		"linha_53": 0,
		"linha_54": 0,
		"linha_55": 482645,
		"linha_56": 0.17,
		"linha_57": 80893.23,
		"linha_58": 0,
		"linha_59": 0,
		"linha_60": 0,
		"linha_61": 0,
		"linha_62": 0,
		"linha_63": 0,
		"linha_64": 0,
		"linha_65": 0,
		"linha_66": 0,
		"linha_67": 80893.23,
		"linha_68": 0,
		"linha_69": 0,
		"linha_70": 0,
		"linha_71": 80893.23,
		"linha_72": 0,
		"linha_73": 0
	},
	{
		"_id": "6395ce47440b1809157ecfda",
		"cnpj": "48941274000136",
		"nome": "Agroindústria Henry Ltda",
		"ano": 2020,
		"mes": 2,
		"trimestre": 1,
		"linha_1": 175375,
		"linha_2": 0,
		"linha_3": 175375,
		"linha_4": 529064.95,
		"linha_5": 0,
		"linha_6": 529064.95,
		"linha_7": 704439.95,
		"linha_8": 190962.2,
		"linha_9": 551745.7,
		"linha_10": 742707.9,
		"linha_11": 701734.76,
		"linha_12": 199896.17,
		"linha_13": 901630.93,
		"linha_14": 701734.76,
		"linha_15": 199896.17,
		"linha_16": 901630.93,
		"linha_17": 100,
		"linha_18": 608887.97,
		"linha_19": 582035.85,
		"linha_20": 0,
		"linha_21": 226748.29,
		"linha_22": 0,
		"linha_23": 0,
		"linha_24": 226748.29,
		"linha_25": 481702.81,
		"linha_26": 708451.1,
		"linha_27": 0,
		"linha_28": 0,
		"linha_29": 0,
		"linha_30": 0,
		"linha_31": 0,
		"linha_32": 0,
		"linha_33": 0,
		"linha_34": 0,
		"linha_35": 0,
		"linha_36": 0,
		"linha_37": 0,
		"linha_38": 0,
		"linha_39": 0,
		"linha_40": 0,
		"linha_41": 0,
		"linha_42": 0,
		"linha_43": 2119,
		"linha_44": 0,
		"linha_45": 0,
		"linha_46": 2119,
		"linha_47": 942.19,
		"linha_48": 3061.19,
		"linha_49": 0,
		"linha_50": 0,
		"linha_51": 0,
		"linha_52": 0,
		"linha_53": 0,
		"linha_54": 0,
		"linha_55": 711512.29,
		"linha_56": 0.17,
		"linha_57": 123160.64,
		"linha_58": 0,
		"linha_59": 0,
		"linha_60": 0,
		"linha_61": 0,
		"linha_62": 0,
		"linha_63": 0,
		"linha_64": 0,
		"linha_65": 0,
		"linha_66": 0,
		"linha_67": 123160.64,
		"linha_68": 0,
		"linha_69": 0,
		"linha_70": 0,
		"linha_71": 123160.64,
		"linha_72": 0,
		"linha_73": 0
	},
	{
		"_id": "6395ce47440b1809157ecfdb",
		"cnpj": "48941274000136",
		"nome": "Agroindústria Henry Ltda",
		"ano": 2020,
		"mes": 3,
		"trimestre": 1,
		"linha_1": 704439.95,
		"linha_2": 0,
		"linha_3": 704439.95,
		"linha_4": 571878.61,
		"linha_5": 0,
		"linha_6": 571878.61,
		"linha_7": 1276318.56,
		"linha_8": 742707.9,
		"linha_9": 701096.47,
		"linha_10": 1443804.37,
		"linha_11": 901630.93,
		"linha_12": 554825.97,
		"linha_13": 1456456.9,
		"linha_14": 901630.93,
		"linha_15": 554825.97,
		"linha_16": 1456456.9,
		"linha_17": 100,
		"linha_18": 582035.85,
		"linha_19": 668810.98,
		"linha_20": 89034.36,
		"linha_21": 379016.48,
		"linha_22": 0,
		"linha_23": 0,
		"linha_24": 379016.48,
		"linha_25": 708451.1,
		"linha_26": 1087467.58,
		"linha_27": 0,
		"linha_28": 0,
		"linha_29": 0,
		"linha_30": 0,
		"linha_31": 0,
		"linha_32": 0,
		"linha_33": 0,
		"linha_34": 0,
		"linha_35": 0,
		"linha_36": 0,
		"linha_37": 0,
		"linha_38": 0,
		"linha_39": 0,
		"linha_40": 0,
		"linha_41": 0,
		"linha_42": 0,
		"linha_43": 1931.37,
		"linha_44": 0,
		"linha_45": 0,
		"linha_46": 1931.37,
		"linha_47": 3061.19,
		"linha_48": 4992.56,
		"linha_49": 0,
		"linha_50": 0,
		"linha_51": 0,
		"linha_52": 0,
		"linha_53": 0,
		"linha_54": 0,
		"linha_55": 1092460.14,
		"linha_56": 0.13,
		"linha_57": 144852.57,
		"linha_58": 0,
		"linha_59": 0,
		"linha_60": 0,
		"linha_61": 0,
		"linha_62": 0,
		"linha_63": 0,
		"linha_64": 0,
		"linha_65": 0,
		"linha_66": 0,
		"linha_67": 144852.57,
		"linha_68": 0,
		"linha_69": 0,
		"linha_70": 0,
		"linha_71": 144852.57,
		"linha_72": 0,
		"linha_73": 0
	}
]
const [dcp1, dcp2, dcp3] = data

const gomoExport = [
    {"linha_1":0,"linha_2":0,"linha_3":0,"linha_4":175375,"linha_5":0,"linha_6":175375,"linha_7":175375},
    {"linha_1":175375,"linha_2":0,"linha_3":175375,"linha_4":529064.95,"linha_5":0,"linha_6":529064.95,"linha_7":704439.95},
    {"linha_1":704439.95,"linha_2":0,"linha_3":704439.95,"linha_4":571878.61,"linha_5":0,"linha_6":571878.61,"linha_7":1276318.56}
]



Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 1,
        marginLeft: 16,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Oswald'
      },
    subject: {
        fontWeight: 'bold',
        marginLeft: 16,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Oswald',
        borderBottom: 1
      },
    text: {
        margin: 16,
        fontSize: 10,
        textAlign: 'justify',
        //fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 5,
        marginHorizontal: 200,
    }
});


function RelatorioPDF() {    
      
      const tableStyle = {
        display: "table",
        width: "auto",
        margin: 16
      };
      
      const tableRowStyle = {
        flexDirection: "row"
      };
      
      const firstTableColHeaderStyle = {
        width: "10%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderBottomColor: "#000000",
        borderWidth: 0,
        backgroundColor: "#FFFFFF"
      };
      
      const tableColHeaderStyle = {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderBottomColor: "#000000",
        borderWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: "#FFFFFF"
      };
      
      const firstTableColStyle = {
        width: "10%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderWidth: 0,
        borderTopWidth: 0
      };
      
      const tableColStyle = {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
      };
      
      const tableCellHeaderStyle = {
        textAlign: "center",
        margin: 4,
        fontSize: 10,
        fontWeight: "bold"
      };
      
      const tableCellStyle = {
        textAlign: "center",
        margin: 5,
        fontSize: 9
      };

    
    const createTableTrimestre = ()=>{
        return (
            <View style={tableRowStyle} fixed>

    
            <View style={firstTableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>2020</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}></Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Jan</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}></Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Fev</Text>
            </View>
            
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}></Text>
            </View>
            
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Mar</Text>
            </View>
    
            

            </View>

        )
    }
    
    
    
    
    
    const createTableHeader = () => {
        return (

           
          <View style={tableRowStyle} fixed>
    
            <View style={firstTableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Linha</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Declarado</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Calculado</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Declarado</Text>
            </View>
    
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Calculado</Text>
            </View>
            
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Declarado</Text>
            </View>
            
            <View style={tableColHeaderStyle}>
              <Text style={tableCellHeaderStyle}>Calculado</Text>
            </View>

          </View>
        );
      };
    
    const createTableRow = (linha, dec1, cal1, dec2, cal2, dec3, cal3) => {
        return (
          <View style={tableRowStyle}>
    
            <View style={firstTableColStyle}>
              <Text style={tableCellStyle}>{linha}</Text>
            </View>
    
            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{dec1}</Text>
            </View>
    
            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{cal1}</Text>
            </View>
    
            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{dec2}</Text>
            </View>
    
            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{cal2}</Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{dec3}</Text>
            </View>

            <View style={tableColStyle}>
              <Text style={tableCellStyle}>{cal3}</Text>
            </View>
    
          </View>
        );
      };

    return ( 
        <Document>
            <Page size="A4" style={styles.body}>
            <Text style={styles.header} fixed>
                - Criado pelo aplicativo Análise de DCP -
            </Text>

            <Image
                style={styles.image}
                src={brasao}
            />

            <Text style={styles.title}>Análise de DCP</Text>
            
            <Text style={styles.subtitle}>
                48.941.274/0001-36 - Agroindústria Henry Ltda
            </Text>
            <Text style={styles.subtitle}>
                Ano: 2020
            </Text>
            <Text style={styles.subtitle}>
                Trimestre: 1                
            </Text>

            <Text style={styles.text}>
            
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            </Text>

           
            <Text style={styles.subtitle}>Exportação Direta no Mês</Text>
            <View style={tableStyle}>
            {createTableTrimestre()}
            {createTableHeader()}
                    

            {createTableRow(1, dcp1['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_1'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(2, dcp1['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_2'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(3, dcp1['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_3'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(4, dcp1['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_4'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(5, dcp1['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_5'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(6, dcp1['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_6'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
            {createTableRow(7, dcp1['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[0]['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp2['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[1]['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), dcp3['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), gomoExport[2]['linha_7'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
           
            
            </View>


            </Page>
        </Document>
     );
};

export default RelatorioPDF;