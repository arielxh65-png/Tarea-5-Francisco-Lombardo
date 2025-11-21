window.onload = function() {
    let nombre = localStorage.getItem("nombre");
    let apellido = localStorage.getItem("apellido");

    while (!nombre) {
        nombre = prompt("¡Bienvenido! Por favor, ingresa tu nombre:");
    }
    while (!apellido) {
        apellido = prompt("Ahora ingresa tu apellido:");
    }

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);

    const bienvenidaDiv = document.getElementById("bienvenida");
    if (bienvenidaDiv) {
        bienvenidaDiv.innerHTML = `<h2>Hola ${nombre} ${apellido}, bienvenido al proyecto.</h2>`;
    }
};
