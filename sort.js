$(document).ready(function(){
	var lista = $("a[data-sortable-table]");
	var listaColId = [];
	//matriz[n][3], sendo 1 => id da coluna,2 => a[data-sortable-col],3 => a[data-sortable-table]
	for(i=0;i<lista.length;i++){
		listaColId.push([lista[i].id,lista[i].getAttribute("data-sortable-col"),lista[i].getAttribute("data-sortable-table"),lista[i].getAttribute("data-sortable-type")])
	}
	
	for(i=0;i<listaColId.length;i++){
		addEventListener("click",sort(listaColId[i][2],listaColId[i][0],listaColId[i][1],listaColId[i][3]));
	}
	
	function sort(tab,col,num,type){
		document.getElementById(col).onclick = function(e){
			switch(type){
				case "number":
					var table, rows, switching, i, x, y, shouldSwitch, switches;
					table = document.getElementById(tab);
					switching = true;
					while (switching) {
						switching = false;
						rows = table.getElementsByTagName("TR");
						var rowsNum = [];
						for(i=0;i<rows.length;i++){
							var rowsChild = rows[i].children[num].innerHTML;
							var val = "";
							for(j=0;j<rowsChild.length;j++){
							    if((rowsChild[j]>="0" && rowsChild[j]<="9")){
									val+=rowsChild[j];
								}
						    }
							rowsNum.push(val);
						}
						for (i = 1; i < (rows.length - 1); i++) {
						  shouldSwitch = false;
						  x = rowsNum[i];
						  y = rowsNum[i + 1];
						  if (parseFloat(x) > parseFloat(y)) {
							shouldSwitch= true;
							switches=1;
							break;
						  }
						}
						if (shouldSwitch) {
						  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
						  switching = true;
						}
					}
					if(switches != 1){
						switching = true;
						while (switching) {
							switching = false;
							rows = table.getElementsByTagName("TR");
							var rowsNum = [];
							for(i=0;i<rows.length;i++){
								var rowsChild = rows[i].children[num].innerHTML;
								var val = "";
								for(j=0;j<rowsChild.length;j++){
									if((rowsChild[j]>="0" && rowsChild[j]<="9")){
										val+=rowsChild[j];
									}
								}
								rowsNum.push(val);
							}
							for (i = 1; i < (rows.length - 1); i++) {
							  shouldSwitch = false;
							  x = rowsNum[i];
							  y = rowsNum[i + 1];
							  if (parseFloat(x) < parseFloat(y)) {
								shouldSwitch= true;
								switches=1;
								break;
							  }
							}
							if (shouldSwitch) {
							  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
							  switching = true;
							}
						}
					}
					break;
				default:
					var table, rows, switching, i, x, y, shouldSwitch, switches;
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
							switches=1;
							break;
						  }
						}
						if (shouldSwitch) {
						  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
						  switching = true;
						}
					}
					if(switches != 1){
						switching = true;
						while (switching) {
							switching = false;
							rows = table.getElementsByTagName("TR");
							for (i = 1; i < (rows.length - 1); i++) {
							  shouldSwitch = false;
							  x = rows[i].getElementsByTagName("TD")[num];
							  y = rows[i + 1].getElementsByTagName("TD")[num];
							  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
								shouldSwitch= true;
								switches=1;
								break;
							  }
							}
							if (shouldSwitch) {
							  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
							  switching = true;
							}
						}
					}
					break;
			}
			return false;
		};
	}
});
