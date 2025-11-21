emailjs.init("2gNifaOAhHQ-k8yX9");

document.addEventListener("DOMContentLoaded", function() {
    const datosExamen = JSON.parse(localStorage.getItem("examen") || "{}");
    for(const key in datosExamen){
        const elemento = document.querySelector(`[name="${key}"]`);
        if(elemento){
            if(elemento.type === "radio"){
                const radio = Array.from(document.getElementsByName(key))
                                   .find(r => r.value === datosExamen[key]);
                if(radio) radio.checked = true;
            } else {
                elemento.value = datosExamen[key];
            }
        }
    }

    document.querySelectorAll('#formExamen input').forEach(input => {
        input.addEventListener('change', () => {
            const datos = {};
            const form = document.getElementById("formExamen");
            Array.from(form.elements).forEach(el => {
                if(el.name){
                    if(el.type === "radio"){
                        const checked = Array.from(document.getElementsByName(el.name)).find(r => r.checked);
                        if(checked) datos[el.name] = checked.value;
                    } else {
                        datos[el.name] = el.value;
                    }
                }
            });
            localStorage.setItem("examen", JSON.stringify(datos));
        });
    });

    document.getElementById("enviarExamen").addEventListener("click", function(){
        const form = document.getElementById("formExamen");
        const preguntas = ["pregunta1","pregunta2","pregunta3","pregunta4","pregunta5"];

        for(let p of preguntas){
            const elemento = form.elements[p];
            if(elemento.type === "radio") {
                const checked = Array.from(form.elements[p]).some(r => r.checked);
                if(!checked){
                    alert("Por favor responde todas las preguntas antes de enviar.");
                    return;
                }
            } else {
                if(!elemento.value.trim()){
                    alert("Por favor responde todas las preguntas antes de enviar.");
                    return;
                }
            }
        }

        const inscripcion = JSON.parse(localStorage.getItem("inscripcion") || "{}");
        if(!inscripcion.nombre){
            alert("No se encontraron los datos de inscripción. Completa primero el formulario de inscripción.");
            window.location.href = "/proyecto_formularios/templates/inscripcion.html";
            return;
        }

        const datosEmail = {
            nombre: inscripcion.nombre,
            apellido: inscripcion.apellido,
            email: inscripcion.email,
            curso: inscripcion.cursos,
            pregunta1: Array.from(form.elements["pregunta1"]).find(r => r.checked).value,
            pregunta2: Array.from(form.elements["pregunta2"]).find(r => r.checked).value,
            pregunta3: form.elements["pregunta3"].value,
            pregunta4: Array.from(form.elements["pregunta4"]).find(r => r.checked).value,
            pregunta5: Array.from(form.elements["pregunta5"]).find(r => r.checked).value
        };

        emailjs.send('service_8vjmnd6', 'template_es5af0j', datosEmail)
        .then(() => {
            alert("Examen enviado con éxito!");
            form.reset();
            localStorage.removeItem("inscripcion");
            localStorage.removeItem("examen");
            window.location.href = "/proyecto_formularios/index.html";
        }, (error) => {
            alert("Ocurrió un error al enviar el examen. Intenta nuevamente.");
            console.log(error);
        });
    });
});

