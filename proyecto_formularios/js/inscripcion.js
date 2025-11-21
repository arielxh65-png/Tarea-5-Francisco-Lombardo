document.addEventListener("DOMContentLoaded", function() {
    // Cargar datos guardados
    const datos = JSON.parse(localStorage.getItem("inscripcion") || "{}");
    if(datos.nombre) document.getElementById("nombre").value = datos.nombre;
    if(datos.apellido) document.getElementById("apellido").value = datos.apellido;
    if(datos.email) document.getElementById("email").value = datos.email;

    const cursos = datos.cursos ? datos.cursos.split(", ") : [];
    cursos.forEach(c => {
        const checkbox = Array.from(document.querySelectorAll('input[name="curso"]'))
                              .find(cb => cb.value === c);
        if(checkbox) checkbox.checked = true;
    });

    // Guardar datos en tiempo real
    const guardarDatos = () => {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const cursos = Array.from(document.querySelectorAll('input[name="curso"]:checked'))
                             .map(cb => cb.value)
                             .join(', ');
        localStorage.setItem("inscripcion", JSON.stringify({nombre, apellido, email, cursos}));
    };

    document.getElementById("nombre").addEventListener("input", guardarDatos);
    document.getElementById("apellido").addEventListener("input", guardarDatos);
    document.getElementById("email").addEventListener("input", guardarDatos);
    document.querySelectorAll('input[name="curso"]').forEach(cb => cb.addEventListener("change", guardarDatos));

    // Manejar envío del formulario
    document.getElementById("formInscripcion").addEventListener("submit", function(e){
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const cursos = Array.from(document.querySelectorAll('input[name="curso"]:checked'))
                             .map(cb => cb.value)
                             .join(', ');

        if(!nombre || !apellido || !email){
            alert("Por favor completa todos los campos antes de continuar.");
            return;
        }

        localStorage.setItem("inscripcion", JSON.stringify({nombre, apellido, email, cursos}));
        window.location.href = "examen.html";
    });
});
