// =======================================
// GALAXIA-ROSA
// Estrellas y fotografías en órbita
// =======================================

// 1. CONFIGURACIÓN DE LAS FOTOGRAFÍAS
// Después coloca tus imágenes en una carpeta
// llamada "fotos", junto a estos archivos.

const fotografias = [
  "fotos/foto.jpg",
  "fotos/foto2.jpg",
  "fotos/foto3.jpg",
  "fotos/foto4.jpg",
  "fotos/foto5.jpg",
  "fotos/foto6.jpg"
];

const contenedor = document.getElementById("fotos-orbitando");

// 2. CREAR LAS FOTOS ORBITANDO
fotografias.forEach((ruta, indice) => {
  const foto = document.createElement("div");
  foto.className = "foto-orbita";

  const imagen = document.createElement("img");
  imagen.src = ruta;
  imagen.alt = "Fotografía personal";

  // Si todavía no existe la foto, mostramos un aviso
  imagen.onerror = () => {
    imagen.alt = "Coloca tu fotografía en la carpeta fotos";
    foto.classList.add("foto-vacia");
  };

  foto.appendChild(imagen);
  contenedor.appendChild(foto);

  // Distribuir las fotos alrededor del corazón
  const angulo = (360 / fotografias.length) * indice;

  foto.style.setProperty("--angulo", `${angulo}deg`);
 const radio = contenedor.clientWidth *
  (indice % 2 === 0 ? 0.30 : 0.42);

foto.style.setProperty("--distancia", `${-radio}px`);
  foto.style.setProperty(
    "--duracion",
    `${24 + indice * 4}s`
  );
});

// 3. DIBUJAR LAS ESTRELLAS
const canvas = document.getElementById("estrellas");
const ctx = canvas.getContext("2d");

let ancho = 0;
let alto = 0;
let estrellas = [];

function ajustarPantalla() {
  const escala = Math.min(window.devicePixelRatio || 1, 2);

  ancho = window.innerWidth;
  alto = window.innerHeight;

  canvas.width = ancho * escala;
  canvas.height = alto * escala;
  canvas.style.width = `${ancho}px`;
  canvas.style.height = `${alto}px`;

  ctx.setTransform(escala, 0, 0, escala, 0, 0);

  estrellas = Array.from({ length: 180 }, () => ({
    x: Math.random() * ancho,
    y: Math.random() * alto,
    radio: Math.random() * 1.8 + 0.3,
    fase: Math.random() * Math.PI * 2,
    velocidad: Math.random() * 0.002 + 0.001
  }));
}

function dibujarEstrellas(tiempo) {
  ctx.clearRect(0, 0, ancho, alto);

  estrellas.forEach(estrella => {
    const brillo =
      0.3 +
      0.7 *
      (0.5 +
        0.5 *
        Math.sin(
          tiempo * estrella.velocidad + estrella.fase
        ));

    ctx.beginPath();
    ctx.arc(
      estrella.x,
      estrella.y,
      estrella.radio,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(255, 220, 246, ${brillo})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#ff72c6";
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(dibujarEstrellas);
}

window.addEventListener("resize", ajustarPantalla);

ajustarPantalla();
requestAnimationFrame(dibujarEstrellas);