export function parseMonth(monthId) {
  switch (monthId) {
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
    default:
      return "-";
  }
}

export function changeDateFormat(inputDate) {
  var splitDate = inputDate.split("-");
  if(splitDate.length === 0){
      return null;
  }
  var year = splitDate[0];
  var month = splitDate[1];
  var day = splitDate[2]; 
  return `${month}-${day}-${year}`;
}