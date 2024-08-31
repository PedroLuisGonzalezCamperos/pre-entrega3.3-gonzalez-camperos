//Este códico a continuación representa un inventario en el cual el usuario podrá armarlo desde cero y crear el inventario que desee, temdrá la opción de agregar productos con sus cantidades y precios y tendrá también la opción de guardar los inventarios creados, buscar inventarios creados previamente en la web y también tendrá la opción de eliminarlos.


//Esta función agregarProducto() es la que va colocando los rpoductos en la tabla de inventario
function agregarProducto() {
    let nombreP = document.getElementById("nombreProducto").value;
    let cantidadP = document.getElementById("cantidadProducto").value;
    let precioP = document.getElementById("precioProducto").value;

    if (nombreP === "" || cantidadP === "" || precioP === "") {
        document.getElementById("alerta1").textContent =
            "Debes llenar todos los campos";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta4").textContent = "";
        document.getElementById("alerta5").textContent = "";

    } else {
        document.getElementById("alerta1").textContent = "";
        //insertando fila

        let nFilas = document.getElementsByTagName("tr"); //será una coleccion de etiquetas tr
        let ultimaFila = document
            .getElementById("tablaInventario")
            .insertRow(nFilas.length - 1);
        let col1 = ultimaFila.insertCell(0);
        let col2 = ultimaFila.insertCell(1);
        let col3 = ultimaFila.insertCell(2);
        col1.innerHTML = nombreP;
        col2.innerHTML = cantidadP;
        col3.innerHTML = precioP;

        //reiniciar valores en los input

        document.getElementById("nombreProducto").value = "";
        document.getElementById("cantidadProducto").value = "";
        document.getElementById("precioProducto").value = "";
    }
}


//la función extraerDatos() crea un arreglo de objetos, donde cada objeto representa un producto del inventario
function extraerDatos() {
    // Seleccionar la tabla
    const tabla = document.getElementById("tablaInventario");
    const filas = tabla
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

    // Crear un array para guardar los productos
    let productos = [];

    // Recorrer cada fila y extraer los datos
    for (let i = 0; i < filas.length - 1; i++) {
        let celdas = filas[i].getElementsByTagName("td");

        let producto = {
            nombre: celdas[0].textContent,
            precio: celdas[1].textContent,
            disponibilidad: celdas[2].textContent,
        };

        // Agregar el producto al array
        productos.push(producto);
    }

    //EL local storage guarda string no objetos, para guardar objetos se utiliza JSON

    const inventario = document.getElementById("llaves");

    const inventarioF = inventario.value.trim();

    if (inventarioF === "") {
        document.getElementById("alerta2").textContent =
            "Debes ingresar un nombre.";
        document.getElementById("alerta1").textContent = ""
        document.getElementById("alerta3").textContent = ""
        document.getElementById("alerta4").textContent = ""
        document.getElementById("alerta5").textContent = ""
        return;
    }

    if (localStorage.getItem(inventarioF)) {
        document.getElementById("alerta2").textContent = `El nombre "${inventarioF}" ya existe.`;
        document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta4").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta5").textContent = "";
       
    } else {
        localStorage.setItem(inventarioF, JSON.stringify(productos));
        document
        document.getElementById("alerta2").textContent = inventarioF + "  ya se guardo en el navegador"
        document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta4").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta5").textContent = "";
    }

    //let lista = JSON.parse(localStorage.getItem("llaveProductos"))

    //console.log(lista);
}

inventario.value = "";


//La función buscandoInventario() indica según el nombre si el inventario solicitado existe y en este caso lo muestra como un string y en caso contrario indica que no existe.
function buscandoInventario() {
    let buscador = document.getElementById("buscador").value;

    if (localStorage.getItem(buscador)) {
        document.getElementById("alerta3").textContent = localStorage.getItem(buscador);

    } else {
        document.getElementById("alerta3").textContent =
            "El nombre no coincide con ningún inventario";
            document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta4").textContent = "";
        document.getElementById("alerta5").textContent = "";
    }

    if (buscador === "") {
        document.getElementById("alerta3").textContent =
            "debes introducir un nombre";
        document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta4").textContent = "";
        document.getElementById("alerta5").textContent = "";
    }
}

function eliminarInventario() {
    let eliminador = document.getElementById("eliminador").value;

    if (localStorage.getItem(eliminador)) {
        localStorage.removeItem(eliminador);

        document.getElementById("alerta4").textContent =
            "el  " + eliminador + "  fue eliminado del navegador";
            document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta5").textContent = "";



        document.getElementById("alerta3").textContent = "";
    } else {
        document.getElementById("alerta4").textContent =
            "El nombre no coincide con ningún inventario guardado en el navegador";
            document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta5").textContent = "";
    }

    if (eliminador === "") {
        document.getElementById("alerta4").textContent =
            "debes introducir un nombre";
        document.getElementById("alerta1").textContent = "";
        document.getElementById("alerta2").textContent = "";
        document.getElementById("alerta3").textContent = "";
        document.getElementById("alerta5").textContent = "";
    }
}

function eliminarUltimaFila() {
    let table = document.getElementsByTagName("tbody")[0]; //Importante el [0] indica cual tbody en específico se modificará
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 2);
    }
}
