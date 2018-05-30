$(document).ready(function () {
    var lista = $("a[data-sortable-table]");
    var listaColId = [];
    //matriz[n][3], sendo 1 => id da coluna,2 => a[data-sortable-col],3 => a[data-sortable-table]
    for (i = 0; i < lista.length; i++) {
        listaColId.push([lista[i].id, lista[i].parentNode.cellIndex, lista[i].getAttribute("data-sortable-table"), lista[i].getAttribute("data-sortable-type")]);
    }

    for (i = 0; i < listaColId.length; i++) {
        addEventListener("click", sort(listaColId[i][2], listaColId[i][0], listaColId[i][1], listaColId[i][3]));
    }

    function sort(tab, col, num, type) {
        document.getElementById(col).onclick = function (e) {
            switch (type) {
                case "datetime":
                    var table, rows, switching, i, x, y, shouldSwitch, switches;
                    table = document.getElementById(tab);
                    switching = true;
                    while (switching) {
                        switching = false;
                        rows = table.getElementsByTagName("TR");
                        var rowsNum = [];//Contém os valores numéricos em nanosegundo da tabela toda
                        try {
                            var lim = rows.length;
                            for (i = 0; i < lim; i++) {
                                if (rows[i].parentNode.nodeName != "TFOOT") {
                                    var rowsChild = rows[i].children[num].innerHTML;
                                    //Verifica se tem mais um child dentro
                                    if (rows[i].children[num].children.length != 0) {
                                        rowsChild = rows[i].children[num].children[0].innerHTML;
                                    }
                                    //Converte a string para o formato mm-dd-yyyy hh:mm:ss que é o padrão do javascript Date();
                                    var ddmmyyyy = rowsChild;
                                    while (ddmmyyyy.includes(' ')) {
                                        ddmmyyyy = ddmmyyyy.replace(' ', '');
                                    }
                                    while (ddmmyyyy.includes('/')) {
                                        ddmmyyyy = ddmmyyyy.replace('/', '');
                                    }
                                    while (ddmmyyyy.includes(':')) {
                                        ddmmyyyy = ddmmyyyy.replace(':', '');
                                    }
                                    while (ddmmyyyy.includes('\n')) {
                                        ddmmyyyy = ddmmyyyy.replace('\n', '');
                                    }
                                    ddmmyyyy = ddmmyyyy.split('');
                                    var mmddyyyy = "";
                                    var d = "", m = "", y = "", h = "", min = "", s = "";
                                    for (var k = 0; k < ddmmyyyy.length; k++) {
                                        if (k < 2) {
                                            d += ddmmyyyy[k];
                                        }
                                        if (k >= 2 && k < 4) {
                                            m += ddmmyyyy[k];
                                        }
                                        if (k >= 4 && k < 8) {
                                            y += ddmmyyyy[k];
                                        }
                                        if (k >= 8 && k < 10) {
                                            h += ddmmyyyy[k];
                                        }
                                        if (k >= 10 && k < 12) {
                                            min += ddmmyyyy[k];
                                        }
                                        if (k >= 12 && k < 14) {
                                            s += ddmmyyyy[k];
                                        }
                                    }
                                    mmddyyyy = m + "/" + d + "/" + y + " " + h + ":" + min + ":" + s;
                                    //Converte a string para nanosegundos
                                    var val = new Date(mmddyyyy).getTime();
                                    rowsNum.push(val);
                                }
                            }
                            for (i = 1; i < (lim - 1) ; i++) {
                                shouldSwitch = false;
                                x = rowsNum[i];
                                y = rowsNum[i + 1];
                                if (parseFloat(x) > parseFloat(y)) {
                                    shouldSwitch = true;
                                    switches = 1;
                                    break;
                                }
                            }
                            if (shouldSwitch) {
                                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                switching = true;
                            }
                        } catch (Exception) {
                            console.log(Exception);
                        }
                    }
                    if (switches != 1) {//Se não aconteceu nenhum switch significa que é a ordenação reversa
                        switching = true;
                        try {
                            while (switching) {
                                switching = false;
                                rows = table.getElementsByTagName("TR");
                                var rowsNum = [];
                                var lim = rows.length;
                                for (i = 0; i < lim; i++) {
                                    if (rows[i].parentNode.nodeName != "TFOOT") {
                                        var rowsChild = rows[i].children[num].innerHTML;
                                        if (rows[i].children[num].children.length != 0) {
                                            rowsChild = rows[i].children[num].children[0].innerHTML;
                                        }
                                        //Converte a string para o formato mm-dd-yyyy hh:mm:ss que é o padrão do javascript Date();
                                        var ddmmyyyy = rowsChild;
                                        while (ddmmyyyy.includes(' ')) {
                                            ddmmyyyy = ddmmyyyy.replace(' ', '');
                                        }
                                        while (ddmmyyyy.includes('/')) {
                                            ddmmyyyy = ddmmyyyy.replace('/', '');
                                        }
                                        while (ddmmyyyy.includes(':')) {
                                            ddmmyyyy = ddmmyyyy.replace(':', '');
                                        }
                                        while (ddmmyyyy.includes('\n')) {
                                            ddmmyyyy = ddmmyyyy.replace('\n', '');
                                        }
                                        ddmmyyyy = ddmmyyyy.split('');
                                        var mmddyyyy = "";
                                        var d = "", m = "", y = "", h = "", min = "", s = "";
                                        for (var k = 0; k < ddmmyyyy.length; k++) {
                                            if (k < 2) {
                                                d += ddmmyyyy[k];
                                            }
                                            if (k >= 2 && k < 4) {
                                                m += ddmmyyyy[k];
                                            }
                                            if (k >= 4 && k < 8) {
                                                y += ddmmyyyy[k];
                                            }
                                            if (k >= 8 && k < 10) {
                                                h += ddmmyyyy[k];
                                            }
                                            if (k >= 10 && k < 12) {
                                                min += ddmmyyyy[k];
                                            }
                                            if (k >= 12 && k < 14) {
                                                s += ddmmyyyy[k];
                                            }
                                        }
                                        mmddyyyy = m + "/" + d + "/" + y + " " + h + ":" + min + ":" + s;
                                        //Converte a string para nanosegundos
                                        var val = new Date(mmddyyyy).getTime();
                                        rowsNum.push(val);
                                    }
                                }
                                for (i = 1; i < (lim - 1) ; i++) {
                                    shouldSwitch = false;
                                    x = rowsNum[i];
                                    y = rowsNum[i + 1];
                                    if (parseFloat(x) < parseFloat(y)) {
                                        shouldSwitch = true;
                                        switches = 1;
                                        break;
                                    }
                                }
                                if (shouldSwitch) {
                                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                    switching = true;
                                }
                            }
                        } catch (Exception) {
                            console.log(Exception);
                        }
                    }
                    break;
                case "number":
                    var table, rows, switching, i, x, y, shouldSwitch, switches;
                    table = document.getElementById(tab);
                    switching = true;
                    while (switching) {
                        switching = false;
                        rows = table.getElementsByTagName("TR");
                        var rowsNum = [];
                        try {
                            var lim = rows.length;
                            for (i = 0; i < lim; i++) {
                                if (rows[i].parentNode.nodeName != "TFOOT") {
                                    var rowsChild = rows[i].children[num].innerHTML;
                                    if (rows[i].children[num].children.length != 0) {
                                        rowsChild = rows[i].children[num].children[0].innerHTML;
                                    }
                                    var val = "";
                                    for (j = 0; j < rowsChild.length; j++) {
                                        if ((rowsChild[j] >= "0" && rowsChild[j] <= "9")) {
                                            val += rowsChild[j];
                                        }
                                    }
                                    rowsNum.push(val);
                                }
                            }
                            for (i = 1; i < (lim - 1) ; i++) {
                                shouldSwitch = false;
                                x = rowsNum[i];
                                y = rowsNum[i + 1];
                                if (parseFloat(x) > parseFloat(y)) {
                                    shouldSwitch = true;
                                    switches = 1;
                                    break;
                                }
                            }
                            if (shouldSwitch) {
                                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                switching = true;
                            }
                        } catch (Exception) {
                            console.log(Exception);
                        }
                    }
                    if (switches != 1) {//Se não aconteceu nenhum switch significa que é a ordenação reversa
                        switching = true;
                        try {
                            while (switching) {
                                switching = false;
                                rows = table.getElementsByTagName("TR");
                                var rowsNum = [];
                                var lim = rows.length;
                                for (i = 0; i < lim; i++) {
                                    if (rows[i].parentNode.nodeName != "TFOOT") {
                                        var rowsChild = rows[i].children[num].innerHTML;
                                        if (rows[i].children[num].children.length != 0) {
                                            rowsChild = rows[i].children[num].children[0].innerHTML;
                                        }
                                        var val = "";
                                        for (j = 0; j < rowsChild.length; j++) {
                                            if ((rowsChild[j] >= "0" && rowsChild[j] <= "9")) {
                                                val += rowsChild[j];
                                            }
                                        }
                                        rowsNum.push(val);
                                    }
                                }
                                for (i = 1; i < (lim - 1) ; i++) {
                                    shouldSwitch = false;
                                    x = rowsNum[i];
                                    y = rowsNum[i + 1];
                                    if (parseFloat(x) < parseFloat(y)) {
                                        shouldSwitch = true;
                                        switches = 1;
                                        break;
                                    }
                                }
                                if (shouldSwitch) {
                                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                    switching = true;
                                }
                            }
                        } catch (Exception) {
                            console.log(Exception);
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
                        var lim = rows.length;
                        try {
                            for (i = 1; i < (lim - 1) ; i++) {
                                if (rows[i].parentNode.nodeName != "TFOOT") {
                                    shouldSwitch = false;
                                    x = rows[i].getElementsByTagName("TD")[num];
                                    if (x.children.length != 0) {
                                        x = rows[i].getElementsByTagName("TD")[num].children[0];
                                    }
                                    y = rows[i + 1].getElementsByTagName("TD")[num];
                                    if (y.children.length != 0) {
                                        y = rows[i + 1].getElementsByTagName("TD")[num].children[0];
                                    }
                                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                                        shouldSwitch = true;
                                        switches = 1;
                                        break;
                                    }
                                }
                            }
                            if (shouldSwitch) {
                                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                switching = true;
                            }
                        } catch (Exception) {

                        }
                    }
                    if (switches != 1) {//Se não aconteceu nenhum switch significa que é a ordenação reversa
                        switching = true;
                        while (switching) {
                            switching = false;
                            rows = table.getElementsByTagName("TR");
                            var lim = rows.length;
                            try {
                                for (i = 1; i < (lim - 1) ; i++) {
                                    if (rows[i].parentNode.nodeName != "TFOOT") {
                                        shouldSwitch = false;
                                        x = rows[i].getElementsByTagName("TD")[num];
                                        if (x.children.length != 0) {
                                            x = rows[i].getElementsByTagName("TD")[num].children[0];
                                        }
                                        y = rows[i + 1].getElementsByTagName("TD")[num];
                                        if (y.children.length != 0) {
                                            y = rows[i + 1].getElementsByTagName("TD")[num].children[0];
                                        }
                                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                                            shouldSwitch = true;
                                            switches = 1;
                                            break;
                                        }
                                    }
                                }
                                if (shouldSwitch) {
                                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                    switching = true;
                                }
                            } catch (Exception) {

                            }
                        }
                    }
                    break;
            }
            return false;
        };
    }
});
