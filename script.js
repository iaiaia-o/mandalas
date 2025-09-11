// ATENCIÓN: Ya está lista la URL correcta del backend en Render.
const BACKEND_URL = "https://mandalas-backend2.onrender.com/api/mandala";

// Esta función se llama al pulsar el botón "Generar Mandala IA"
function generarMandala() {
  const palabra = document.getElementById('word-input').value.trim();
  if (!palabra) {
    alert("Por favor, escribe una palabra para tu mandala.");
    return;
  }

  // Paleta de colores (puedes mejorar esto para que sea seleccionable por el usuario)
  const colores = ["#FF3B30", "#FF9500", "#FFCC02", "#34C759", "#007AFF"];

  fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ palabra, colores }),
  })
    .then(response => response.json())
    .then(data => {
      // Si el backend responde con la imagen generada
      if (data.image_url) {
        document.getElementById('mandala-img').src = data.image_url;
        document.getElementById('mandala-img').style.display = 'block';
      }
      // Si el backend responde con una frase motivadora
      if (data.frase) {
        document.getElementById('frase').textContent = data.frase;
      }
    })
    .catch(error => {
      alert("No se pudo generar el mandala. Intenta de nuevo.");
      console.error(error);
    });
}
