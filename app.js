window.addEventListener('load', () => {
    // Obtener el JSON desde localStorage
    let jList = localStorage.getItem("lista");
    if (jList !== null) {
        // Convertir el JSON en un objeto
        let oList = JSON.parse(jList);

//pruebas
        console.log("JSON obtenido de localStorage:", jList);
        console.log("Objeto convertido:", oList);
        //console.log(oList[0].done);
        //oList[0].done = true;
        //localStorage.setItem("lista", JSON.stringify(oList));


        // Mostrar el listado en la página
        
        const listadoElement = document.getElementById('listado');

        if (oList && Array.isArray(oList)) {
            oList.forEach((item, index) => {
                const li = document.createElement('li');
                const check = document.createElement('input');
                const br = document.createElement('br');
                
                // Asignacion de contenido y atributos a los elementos
                li.textContent = item.activitie;
                li.id = 'element' + index;

                check.type = 'checkbox';
                check.id = 'chkbox' + index; 
                check.checked = item.done;
        
                // Cambiar el color según el done
                if (item.done) {
                    li.style.color = 'gray';
                    li.style.textDecoration = 'line-through';
                } else {
                    li.style.color = 'black';
                }

                listadoElement.appendChild(li);
                listadoElement.appendChild(check);
                listadoElement.appendChild(br);
        
                
                check.addEventListener('change', function() {
                    // Actualizar el estado "done"
                    oList[index].done = this.checked; 
        
                    // Guardar la lista en localStorage
                    localStorage.setItem("lista", JSON.stringify(oList));
        
                    // Cambiar el color del texto según el estado
                    if (this.checked) {
                        li.style.color = 'gray';
                        li.style.textDecoration = 'line-through';
                    } else {
                        li.style.color = 'black';
                        li.style.textDecoration = 'none';
                    }
                });
            });
        } else {
            console.error("El dato no es un array o no existe.");
            listadoElement.innerHTML = "<li>No hay datos para mostrar.</li>";
        }
    } else {
        console.log("JSON vacío");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const textbox = document.getElementById('textbox');
    const value = document.getElementById('textbox').value;

    if (formulario && textbox) {
            formulario.addEventListener('submit', function(event) {
                event.preventDefault(); 

                // validacion campo vacio
                if (textbox.value.trim() === "") {
                    alert("El campo no puede estar vacío. Por favor, ingresa una tarea.");
                    return; // Detener la ejecución si el campo está vacío
                }

                // Obtener la lista actual del localStorage
                let oList = localStorage.getItem("lista");
                let lista = oList ? JSON.parse(oList) : []; // Si no hay datos, cres un array vacío
    
                // Crear un nuevo ítem y agregarlo a la lista
                const newItem = {
                    activitie: textbox.value,
                    done: false,
                    date: new Date()
                };
                lista.push(newItem);
    
                // Guardar la lista actualizada en localStorage
                localStorage.setItem("lista", JSON.stringify(lista));
    
                // Limpiar el campo de texto
                textbox.value = "";
    
                // Actualizar la lista en la página
                location.reload();
            });
    } else {
        console.error('No se encontró el formulario :(');
    }
});

function deleteAll() {
    localStorage.clear();
    location.reload();
}