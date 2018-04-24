$(document).ready(function(){
	var lista = $("a[data-sortable-table]");
	var listaColId = [];
	//matriz[n][3], sendo 1 => id da coluna,2 => a[data-sortable-col],3 => a[data-sortable-table]
	for(i=0;i<lista.length;i++){
		listaColId.push([lista[i].id,lista[i].parentNode.cellIndex,lista[i].getAttribute("data-sortable-table"),lista[i].getAttribute("data-sortable-type")]);
	}
	
	for(i=0;i<listaColId.length;i++){
		addEventListener("click",sort(listaColId[i][2],listaColId[i][0],listaColId[i][1],listaColId[i][3]));
	}
	
	function sort(tab,col,num,type){
		document.getElementById(col).onclick = function(e){
			switch(type){
				case "datetime":
					break;
				case "number":
					var table, rows, switching, i, x, y, shouldSwitch, switches;
					table = document.getElementById(tab);
					switching = true;
					while (switching) {
						switching = false;
						rows = table.getElementsByTagName("TR");
						var rowsNum = [];
						try{
							for(i=0;i<rows.length;i++){
								var rowsChild = rows[i].children[num].innerHTML;
								if(rows[i].children[num].children.length != 0){
									rowsChild = rows[i].children[num].children[0].innerHTML;
								}
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
						}catch(Exception){
							
						}
					}
					if(switches != 1){
						switching = true;
						try{
							while (switching) {
								switching = false;
								rows = table.getElementsByTagName("TR");
								var rowsNum = [];
								for(i=0;i<rows.length;i++){
									var rowsChild = rows[i].children[num].innerHTML;
									if(rows[i].children[num].children.length != 0){
										rowsChild = rows[i].children[num].children[0].innerHTML;
									}
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
						}catch(Exception){
							
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
						try{
							for (i = 1; i < (rows.length - 1); i++) {
							  shouldSwitch = false;
							  x = rows[i].getElementsByTagName("TD")[num];
							  if(x.children.length != 0){
								  x = rows[i].getElementsByTagName("TD")[num].children[0];
							  }
							  y = rows[i + 1].getElementsByTagName("TD")[num];
							  if(y.children.length != 0){
								  y = rows[i + 1].getElementsByTagName("TD")[num].children[0];
							  }
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
						}catch(Exception){
							
						}
					}
					if(switches != 1){
						switching = true;
						while (switching) {
							switching = false;
							rows = table.getElementsByTagName("TR");
							try{
								for (i = 1; i < (rows.length - 1); i++) {
								  shouldSwitch = false;
								  x = rows[i].getElementsByTagName("TD")[num];
								  if(x.children.length != 0){
									  x = rows[i].getElementsByTagName("TD")[num].children[0];
								  }
								  y = rows[i + 1].getElementsByTagName("TD")[num];
								  if(y.children.length != 0){
									  y = rows[i + 1].getElementsByTagName("TD")[num].children[0];
								  }
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
							}catch(Exception){
								
							}
						}
					}
					break;
			}
			return false;
		};
	}
});
