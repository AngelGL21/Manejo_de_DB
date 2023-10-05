document.addEventListener("DOMContentLoaded", function(){
    const userList = document.getElementById("userList");
    const contenidoInput = document.getElementById("contenidoInput");
    const publicarBtn = document.getElementById("publicarBtn");

    //Cargar la lista de usuarios
    fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((data) => {
        let userListHTML = "";
        const userList = document.getElementById("userList");

        //Recorrer los usuarios
        for (let i = 0; i < data.length; i++){
            const usuario = data[i];
            userListHTML += `<option value="${usuario.user_id}">${usuario.nombre}</option>`;
        }
        userList.innerHTML = userListHTML;
    })
    .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
    })

    publicarBtn.addEventListener("click", function(){
        const user_id = userList.value;
        const contenido = contenidoInput.value;

        if (!user_id || !contenido) {
            alert(
                "Por favor, seleccione un usuario y escriba contenido antes de publicar."
            );
            return;
        }
        //Insertar los datos 
        fetch("http://localhost:3000/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, contenido }),
        })
        .then((response) => response.json())
        .then((data) =>{
            alert("Publicación realizada con éxito.");
            contenidoInput.value = "";
        })
        .catch((error) => {
            console.error("Error al publicar:", error);
        });
    });
});

fetch("http://localhost:3000/usuarios_y_publicaciones")
    .then((response) => response.json())
    .then((data) => {
        const userPostList = document.getElementById("postp");
        let userPostHTML = "";
        
        for (let i = 0; i < data.length; i++){
            const item = data[i];
            userPostHTML += `
            <div class="user_post">
            <h3>${item["Nombre de Usuario"]}</h3>
            <p>${item["Publicación"]}</p>
            </div>
            `;
        }
        userPostList.innerHTML = userPostHTML;
    })
    .catch((error) => {
        console.error("Error al obtener la lista de usuarios y publicaciones:", error);
    });
