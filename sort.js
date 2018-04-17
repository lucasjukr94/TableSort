$(document).ready(function(e){
	var TableLength = $("table[data-sortable-table]").length;
	var ColLength = $("a[data-sortable-col]").length;
	for(p=0;p<$("a[data-sortable-col]").length;p++){
		$(document).sort(p);
	}
});

(function($){
	$.fn.sort = function(col){
		document.getElementById($("a[data-sortable-table]")[col].id).onclick = function(e){
			var table, rows, switching, i, x, y, shouldSwitch;
			table = document.getElementById($("a[data-sortable-table]")[col].getAttribute("data-sortable-table"));
			switching = true;
			while (switching) {
				switching = false;
				rows = table.getElementsByTagName("TR");
				for (i = 1; i < (rows.length - 1); i++) {
				  shouldSwitch = false;
				  x = rows[i].getElementsByTagName("TD")[$("a[data-sortable-col]")[col].getAttribute("data-sortable-col")];
				  y = rows[i + 1].getElementsByTagName("TD")[$("a[data-sortable-col]")[col].getAttribute("data-sortable-col")];
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
})( jQuery );