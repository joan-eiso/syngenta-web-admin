import axios from "axios";

import { sessionEndpoint } from "./endpoints.util";
import { encodePayload } from "./jwt.util";

const GENERAL_REPORT_SQL = "SELECT t_predios.IDPredio AS 01_IDPredio, t_predios.IDProductor AS 02_IDProductor, t_productores.nombreProductor AS 03_nombreProductor, t_productores.direccionProductor AS 04_direccionProductor, t_productores.telefonoProductor AS 05_telefonoProductor, t_productores.emailProductor AS 06_emailProductor, t_productores.fechaRegistro AS 07_fechaRegistro, t_productores.identificacionProductor AS 08_identificacionProductor, t_predios.IDPais AS 09_IDPais, t_paises.pais AS 10_pais, t_predios.IDDepartamento AS 11_IDDepartamento, t_departamentos.departamento AS 12_departamento, t_predios.vereda AS 13_vereda, t_predios.predioLote AS 14_predioLote, t_predios.IDSubregion AS 15_IDSubregion, t_subregiones.subRegion AS 16_subRegion, t_subregiones.region AS 17_region, t_predios.hectareas AS 18_hectareas, t_predios.latitud AS 19_latitud, t_predios.longitud AS 20_longitud, SIGN( t_predios.latitud )* FLOOR( ABS( t_predios.latitud )) AS 21_latitudGrados, FLOOR(( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 ) AS 22_latitudMinutos, (( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 - FLOOR(( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 )) * 60 AS 23_latitudSegundos, SIGN( t_predios.longitud )* FLOOR( ABS( t_predios.longitud )) AS 24_longitudGrados, FLOOR(( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 ) AS 25_longitudMinutos, (( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 - FLOOR(( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 )) * 60 AS 26_longitudSegundos, t_predios.IDMunicipio AS 27_IDMunicipio, t_municipios.municipio AS 28_municipio, t_licencias.IDLicencia AS 29_IDLicencia, t_licencias.fechaLicencia AS 30_fechaLicencia, t_hibridos.IDHibrido AS 31_IDHibrido, t_hibridos.bolsas AS 32_bolsas, t_hibridos.hectareas AS 33_hectareasHibrido, t_hibridos.IDCultivar AS 34_IDCultivar, t_cultivares.cultivar AS 35_cultivar, t_hibridos.IDTecnologia AS 36_IDTecnologia, t_tecnologias.tecnologia AS 37_tecnologia, t_hibridos.IDCaracteriticaTecnologica AS 38_IDCaracteriticaTecnologica, t_caracteristicas_tecnologicas.caracteristicaTeconologica AS 39_caracteristicaTeconologica, t_hibridos.otroHibrido AS 40_otroHibrido, t_hibridos.observaciones AS 41_observaciones  FROM t_productores LEFT JOIN t_predios ON t_productores.IDProductor = t_predios.IDProductor LEFT JOIN t_licencias ON t_predios.IDPredio = t_licencias.IDPredio LEFT JOIN t_firmas ON t_licencias.IDLicencia = t_firmas.IDLicencia LEFT JOIN t_paises ON t_predios.IDPais = t_paises.IDPais LEFT JOIN t_subregiones ON t_predios.IDSubregion = t_subregiones.IDSubregion LEFT JOIN t_municipios ON t_predios.IDMunicipio = t_municipios.IDMunicipio LEFT JOIN t_hibridos ON t_licencias.IDLicencia = t_hibridos.IDLicencia LEFT JOIN t_cultivares ON t_hibridos.IDCultivar = t_cultivares.IDCultivar LEFT JOIN t_caracteristicas_tecnologicas ON t_hibridos.IDCaracteriticaTecnologica = t_caracteristicas_tecnologicas.IDCaracteriticaTecnologica LEFT JOIN t_tecnologias ON t_hibridos.IDTecnologia = t_tecnologias.IDTecnologia LEFT JOIN t_departamentos ON t_predios.IDDepartamento = t_departamentos.IDDepartamento";

const ICA_REPORT_SQL = "SELECT t_licencias.fechaLicencia AS 01_FechaLiciencia, t_productores.nombreProductor AS 02_NombreProductor, 'MAIZ' AS 03_Cultivo, t_cultivares.cultivar AS 04_Cultivar, t_tecnologias.tecnologia AS 05_Tecnologia, t_caracteristicas_tecnologicas.caracteristicaTeconologica AS 06_CaracteristicaTecnologia, t_predios.hectareas AS 07_Has, IF (t_tecnologias.IDTecnologia=1, 'NO', 'SI') AS 08_Refugio, t_departamentos.departamento AS 09_Departamento, t_municipios.municipio AS 10_Municipio, t_predios.vereda AS 11_Vereda, t_predios.predioLote AS 12_Predio, t_predios.latitud AS 13_Latitud, t_predios.longitud AS 14_Longitud, SIGN( t_predios.latitud )* FLOOR( ABS( t_predios.latitud )) 15_latitudGrados, FLOOR(( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 ) 16_latitudMinutos, (( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 - FLOOR(( ABS( t_predios.latitud ) - ( FLOOR( ABS( t_predios.latitud )))) * 60 )) * 60 17_latitudSegundos, SIGN( t_predios.longitud )* FLOOR( ABS( t_predios.longitud )) 18_longitudGrados, FLOOR(( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 ) 19_longitudMinutos, (( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 - FLOOR(( ABS( t_predios.longitud ) - ( FLOOR( ABS( t_predios.longitud )))) * 60 )) * 60 20_longitudSegundos  FROM t_productores LEFT JOIN t_predios ON t_productores.IDProductor = t_predios.IDProductor LEFT JOIN t_licencias ON t_predios.IDPredio = t_licencias.IDPredio LEFT JOIN t_firmas ON t_licencias.IDLicencia = t_firmas.IDLicencia LEFT JOIN t_paises ON t_predios.IDPais = t_paises.IDPais LEFT JOIN t_subregiones ON t_predios.IDSubregion = t_subregiones.IDSubregion LEFT JOIN t_municipios ON t_predios.IDMunicipio = t_municipios.IDMunicipio LEFT JOIN t_hibridos ON t_licencias.IDLicencia = t_hibridos.IDLicencia LEFT JOIN t_cultivares ON t_hibridos.IDCultivar = t_cultivares.IDCultivar LEFT JOIN t_caracteristicas_tecnologicas ON t_hibridos.IDCaracteriticaTecnologica = t_caracteristicas_tecnologicas.IDCaracteriticaTecnologica LEFT JOIN t_tecnologias ON t_hibridos.IDTecnologia = t_tecnologias.IDTecnologia LEFT JOIN t_departamentos ON t_predios.IDDepartamento = t_departamentos.IDDepartamento"


export const dataURIToBlob = (dataURI) => {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: "text/csv" });
  return blob;
}

export function downloadGeneralReport(distAuth, token) {
  let payload = {
    dist_auth: distAuth,
    sql_sentence: GENERAL_REPORT_SQL
  }
  let encodedPayload = encodePayload(payload, token);

  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "generate_sql_excel",
      data: encodedPayload,
    }
  });
}

export function downloadICAReport(distAuth, token) {
  let payload = {
    dist_auth: distAuth,
    sql_sentence: ICA_REPORT_SQL
  }
  let encodedPayload = encodePayload(payload, token);

  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "generate_sql_excel",
      data: encodedPayload,
    }
  });
}