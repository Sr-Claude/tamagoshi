# 🐾 Tamagotchi Épico

Juego de mascota virtual interactivo con 3 personajes icónicos del mundo del cartoon: **Jake el Perro** (Hora de Aventura), **Miau** (Equipo Rocket de Pokémon) y **Coco** (Foster's Home for Imaginary Friends). Cuídalos, juega con ellos y evita que sus estadísticas lleguen a cero. ¡100% vanilla JS, sin librerías externas!

## 🎮 Demo

> Abre `index.html` directamente en el navegador — no necesita servidor.

## ✨ Características

- 🐶😺🧡 **3 mascotas únicas** con SVG dibujado a mano, frases propias y poderes especiales
- 📊 **5 estadísticas** animadas: Hambre, Felicidad, Energía, Limpieza y Salud
- 🎯 **Mini-juego de 15 segundos** — atrapa objetos que caen para subir la felicidad
- 🎵 **Sonidos procedurales** generados con Web Audio API (sin archivos de audio externos)
- ✨ **Efectos visuales**: confeti, burbujas de baño, ZZZ flotantes, monedas, huevos sorpresa, sparkles
- 🌞🌙 **Ciclo día/noche** visual que cambia cada ~2 minutos
- 💬 **Globo de diálogo** con frases urgentes cuando una estadística entra en peligro
- 💾 **LocalStorage**: guarda récord de edad y total de mascotas cuidadas
- 📱 **Responsive** — funciona en móvil y desktop
- 🚫 **Sin dependencias** — HTML + CSS + JS puro

## 🐾 Las Mascotas

| Mascota | Origen | Poder especial | Mini-juego |
|---|---|---|---|
| 🐶 **Jake el Perro** | Hora de Aventura | Se estira y contorsiona feliz | Atrapa huesos y estrellas |
| 😺 **Miau** | Pokémon — Equipo Rocket | Lluvia de monedas de oro | Atrapa monedas y diamantes |
| 🧡 **Coco** | Foster's Home | Pone huevos de colores | Atrapa huevos arcoíris |

## 🕹️ Cómo Jugar

1. Elige tu mascota en la pantalla de selección
2. Mantén las 5 barras en verde usando los botones de acción:
   - **🍔 Alimentar** — sube hambre + animación de comida volando
   - **🎮 Jugar** — abre el mini-juego, sube felicidad según puntuación
   - **💤 Dormir** — recupera energía (presiónalo de nuevo para despertar)
   - **🛁 Bañar** — sube limpieza con animación de burbujas
   - **💊 Medicina** — se activa solo cuando la salud baja de 30
3. Si la salud llega a 0, aparece la pantalla de Game Over

> Las barras bajan automáticamente. Si 2 o más estadísticas caen bajo 20 al mismo tiempo, la mascota enferma y la salud empieza a caer rápidamente.

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/tamagoshi.git
cd tamagoshi
# Abre index.html en el navegador, o usa un servidor local:
npx serve .
```

## 📁 Estructura

```
tamagoshi/
├── index.html   # 4 pantallas: selección, juego, mini-juego, game over
├── style.css    # Variables de tema, keyframes, SVG CSS, responsive
├── game.js      # Clase Pet, Audio Engine, mini-juego, efectos, LocalStorage
└── README.md
```

## 🛠️ Tecnologías

- **HTML5** semántico — sin lógica en el markup
- **CSS3** — variables, `@keyframes`, grid, `backdrop-filter`, `clip-path`
- **JavaScript ES2022** — clases con campos estáticos, `const`/`let`, arrow functions
- **Web Audio API** — 7 sonidos generados proceduralmente con osciladores
- **localStorage** — persistencia de récords entre sesiones

## 📝 Licencia

MIT — libre para usar, modificar y distribuir.
