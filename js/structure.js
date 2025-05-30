import ConnectTo from './connectTo.js';
const serv = new ConnectTo();

window.addEventListener('load', async (e) => {

    let userData = localStorage.getItem("userActive");
    let id_u = JSON.parse(userData).user.id_user;
    let userlist;
    try {
        const response = await fetch('http://' + serv.ip + ':3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_u })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error al rescatar las tareas');

        userlist = data;
    } catch {
    }
    //console.log(userlist);
    // Obtener el JSON desde localStorage
    //let jList = localStorage.getItem("lista");
    let jList = userlist;
    if (jList !== null) {
        // Convertir el JSON en un objeto
        let oList = jList;

        const listadoElement = document.getElementById('listado');

        if (oList && Array.isArray(oList)) {
            oList.forEach((item, index) => {
                const li = document.createElement('li');
                const check = document.createElement('input');
                const br = document.createElement('br');
                const ico = document.createElement('img');


                li.textContent = item.tarea;
                li.id = 'element' + index;

                check.type = 'checkbox';
                check.id = 'chkbox' + index;
                check.checked = item.done;

                ico.src = './../ico/trash.png';
                ico.id = index;
                ico.style.height = '18px';
                ico.style.width = '18px';
                ico.addEventListener('click', function () {
                    //let jList = localStorage.getItem("lista");
                    if (oList !== null) {
                        let aux = 0;
                        //let oList = JSON.parse(jList);
                        oList.forEach((itemx) => {
                            if (aux == ico.id) {
                                let id_t = itemx.id_t;
                                //itemx.eraseLogic = true;
                                //console.log(id_t)
                                try {
                                    const response = fetch('http://' + serv.ip + ':3000/eraseLogic', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ id_t })
                                    });

                                    const data = response.json();

                                    if (!response.ok) throw new Error(data.error || 'Error al encontrar tarea');

                                    userlist = data;
                                } catch {
                                }
                            }
                            aux++;
                            //localStorage.setItem("lista", JSON.stringify(oList));

                        });
                        //console.log("outForeach");
                    } else {
                        console.log("Json no vacío")
                    }
                    setTimeout(function () {
                        location.reload();
                    }, 100);
                });


                // Cambiar el color según el done
                if (item.done) {
                    li.style.color = 'gray';
                    li.style.textDecoration = 'line-through';
                } else {
                    li.style.color = 'black';
                }

                listadoElement.appendChild(li);
                listadoElement.appendChild(check);
                listadoElement.appendChild(ico);
                listadoElement.appendChild(br);

                //console.log(item);
                if (item.erase_logic == true) {

                    li.style.visibility = 'hidden';
                    check.style.visibility = 'hidden';
                    br.style.visibility = 'hidden';
                    ico.style.visibility = 'hidden';
                    li.remove();
                    check.remove();
                    br.remove();
                    ico.remove();

                }

                check.addEventListener('change', function () {
                    // Actualizar el estado "done"
                    oList[index].done = this.checked;

                    // Guardar la lista en localStorage
                    localStorage.setItem("lista", JSON.stringify(oList));

                    // Cambiar el color del texto según el estado
                    if (this.checked) {
                        li.style.color = 'gray';
                        li.style.textDecoration = 'line-through';

                        let done = this.checked;
                        let id_t = oList[index].id_t;
                        try {
                            const response = fetch('http://' + serv.ip + ':3000/done', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ done, id_t })
                            });

                            const data = response.json();

                            if (!response.ok) throw new Error(data.error || 'Error al encontrar tarea');

                            userlist = data;
                        } catch {
                        }

                    } else {
                        li.style.color = 'black';
                        li.style.textDecoration = 'none';

                        let done = this.checked;
                        let id_t = oList[index].id_t;
                        try {
                            const response = fetch('http://' + serv.ip + ':3000/done', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ done, id_t })
                            });

                            const data = response.json();

                            if (!response.ok) throw new Error(data.error || 'Error al encontrar tarea');

                            userlist = data;
                        } catch {
                        }
                    }
                });
            });
        } else {
            console.error("El dato no es un array o no existe.");
            listadoElement.innerHTML = "<li>No hay datos para mostrar.</li>";
        }
    } else {
        console.log("lista vacía");
    }

    chargeuser();
});

document.addEventListener('DOMContentLoaded', function () {

    let userData = localStorage.getItem("userActive");
    let id_u = JSON.parse(userData).user.id_user;

    const formulario = document.getElementById('formulario');
    const textbox = document.getElementById('textbox');

    if (formulario && textbox) {
        formulario.addEventListener('submit', async function (event) {
            event.preventDefault();

            // validacion campo vacio
            if (textbox.value.trim() === "") {
                alert("El campo no puede estar vacío. Por favor, ingresa una tarea.");
                return; // Detener la ejecución si el campo está vacío
            }
            console.log('???');

            console.log(textbox.value);
            console.log(id_u);
            let task = textbox.value;
            let tasks;
            try {
                const response = await fetch('http://'+ serv.ip +':3000/newTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task, id_u })
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Error al rescatar las tareas');

                tasks = data;
            } catch {
            }

            //console.log(tasks);

            // Obtener la lista actual del localStorage
            // let oList = localStorage.getItem("lista");
            // let lista = oList ? JSON.parse(oList) : []; // Si no hay datos, cres un array vacío

            // // Crear un nuevo ítem y agregarlo a la lista
            // const newItem = {
            //     id_t: null,
            //     activitie: textbox.value,
            //     done: false,
            //     eraseLogic: false,
            //     id_user: id_u
            // };
            // lista.push(newItem);

            // // Guardar la lista actualizada en localStorage
            // localStorage.setItem("lista", JSON.stringify(lista));

            // Limpiar el campo de texto
            textbox.value = "";

            // Actualizar la lista en la página
            location.reload();
        });
    } else {
        console.error('No se encontró el formulario :(');
    }
});

function chargeuser() {
    let userData = localStorage.getItem("userActive");
    let p = document.getElementById("username");
    p.textContent = "Hola " + JSON.parse(userData).user.nombre;
}

//en desuso, posible uso en un futuro :(
function deleteAll() {
    localStorage.clear();
    location.reload();
}
