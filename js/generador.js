// Selección de Elementos
const textInput = document.querySelector('.text-input');
const botonGenerar = document.querySelector('.btn-generar');
const contenedorQr = document.querySelector('.qrcode');
const botonDescargar = document.querySelector('.btn-descargar');
const aviso = document.querySelector('.text-aviso');
let QR;

// Principal
botonGenerar.addEventListener('click', e => {
    e.preventDefault();

    const texto = textInput.value;

    if (!texto) {
        mostrarAviso('No has ingresado ningún texto.')
    } else {
        generarCodigoQr(texto);
        botonDescargar.style.display = 'block';
    }

});

botonDescargar.addEventListener('click', () => {
    descargarCodigoQr();
});

function generarCodigoQr(texto) {

    contenedorQr.innerHTML = "";

    QR = new QRious({
        value: texto,
        size: 228
    });

    contenedorQr.appendChild(QR.image)
}

function descargarCodigoQr() {
    if (QR) {
        const qrImageData = QR.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImageData;
        link.download = "codigo_qr.png";
        link.click();
    }
}

function mostrarAviso(mensaje) {
    aviso.style.color = "#61efff";
    aviso.style.background = 'none';
    aviso.style.fontWeight = '800';
    aviso.textContent = mensaje;
    aviso.style.display = 'block';
    contenedorQr.innerHTML = "";
    botonDescargar.style.display = 'none';
    
    setTimeout(() => {
        aviso.style.display = 'none';
    }, 3000);
}