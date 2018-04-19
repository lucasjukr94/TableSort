$(document).ready(function(){
	var lista = $("a[data-sortable-table]");
	var listaColId = [];
	//matriz[n][3], sendo 1 => id da coluna,2 => a[data-sortable-col],3 => a[data-sortable-table]
	for(i=0;i<lista.length;i++){
		listaColId.push([lista[i].id,lista[i].getAttribute("data-sortable-col"),lista[i].getAttribute("data-sortable-table")])
	}
	
	for(i=0;i<listaColId.length;i++){
		addEventListener("click",sort(listaColId[i][2],listaColId[i][0],listaColId[i][1]));
	}
	
	function sort(tab,col,num){
		document.getElementById(col).onclick = function(e){
			var table, rows, switching, i, x, y, shouldSwitch;
			table = document.getElementById(tab);
			switching = true;
			while (switching) {
				switching = false;
				rows = table.getElementsByTagName("TR");
				for (i = 1; i < (rows.length - 1); i++) {
				  shouldSwitch = false;
				  x = rows[i].getElementsByTagName("TD")[num];
				  y = rows[i + 1].getElementsByTagName("TD")[num];
				  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				  }
				}
				if (shouldSwitch) {
				  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				  switching = true;
				}
			}
			return false;
		};
	}
});
