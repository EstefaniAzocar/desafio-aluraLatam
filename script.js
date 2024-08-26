const textArea = document.querySelector(".texto");
const mensaje = document.querySelector(".mensaje");
const notification = document.querySelector("#notification");

// Función para encriptar el texto
function btnEncriptar() {
    if (validarTexto()) {
        const texto = textArea.value.trim();
        if (texto === "") {
            mostrarMensaje("El campo de texto está vacío. Por favor, ingresa un texto para encriptar.", "error");
            return;
        }
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        textArea.value = "";
        mensaje.style.backgroundImage = "none";
        mostrarMensaje("Texto encriptado exitosamente.", "success");
        mostrarBotonCopiar(); // Mostrar el botón de copiar
    }
}

// Función para desencriptar el texto
function btnDesencriptar() {
    const texto = textArea.value.trim();
    if (texto === "") {
        mostrarMensaje("El campo de texto está vacío. Por favor, ingresa un texto para desencriptar.", "error");
        return;
    }
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    mostrarMensaje("Texto desencriptado exitosamente.", "success");
    mostrarBotonCopiar(); // Mostrar el botón de copiar
}

// Función de validación que verifica solo letras minúsculas sin acentos ni caracteres especiales
function validarTexto() {
    var texto = textArea.value.trim();
    var regex = /^[a-z\s]+$/; // Solo permite letras minúsculas y espacios

    if (!regex.test(texto) && texto !== "") {
        mostrarMensaje("El texto solo debe contener letras minúsculas sin acentos ni caracteres especiales.", "error");
        return false;
    }

    return true;
}

// Función para copiar el texto al portapapeles
function copiarTexto() {
    const mensajeTexto = mensaje.value.trim();
    if (mensajeTexto === "") {
        mostrarMensaje("No hay texto para copiar. Encripta o desencripta un mensaje primero.", "error");
        return;
    }

    navigator.clipboard.writeText(mensajeTexto)
        .then(() => {
            mensaje.value = ""; // Limpiar el campo de mensaje
            mensaje.style.backgroundImage = "url('/img/Muñeco.png')"; // Volver a mostrar la imagen
            mostrarBotonCopiar(); // Ocultar el botón de copiar
            mostrarMensaje("Texto Copiado Exitosamente.", "success");
        })
        .catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
}

// Función para mostrar mensajes de notificación
function mostrarMensaje(texto, tipo) {
    notification.textContent = texto;
    notification.className = `notification ${tipo} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para encriptar el texto
function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

// Función para desencriptar el texto
function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

// Función para mostrar u ocultar el botón de copiar
function mostrarBotonCopiar() {
    const boton = document.querySelector(".boton");
    if (mensaje.value.trim() !== "") {
        boton.classList.add("show"); // Mostrar el botón si hay texto en el mensaje
    } else {
        boton.classList.remove("show"); // Ocultar el botón si el mensaje está vacío
    }
}

// Asegúrate de llamar a `mostrarBotonCopiar()` al iniciar la página si es necesario
mostrarBotonCopiar();
