# 🐾 Tamagotchi Virtual

Un divertido juego de mascota virtual estilo Tamagotchi creado con HTML, CSS y JavaScript vanilla. ¡Cuida, alimenta y juega con tu mascota para mantenerla feliz y saludable!

## 🎮 Demo

Puedes jugar aquí: [Tamagotchi Virtual](https://[tu-usuario].github.io/[nombre-repo]/)

## ✨ Características

- 🐣 **Sistema de evolución**: Tu mascota crece con el tiempo (huevo → pollito → adulto)
- 📊 **4 estadísticas dinámicas**: Salud, Hambre, Felicidad y Energía
- ⚠️ **Sistema de muerte**: Si descuidas a tu mascota, puede morir
- 💾 **Persistencia de datos**: El nombre se guarda en localStorage
- 📱 **Diseño responsive**: Funciona perfectamente en móviles y desktop
- 🎨 **Animaciones CSS**: La mascota tiene animaciones divertidas
- 🎯 **Interfaz intuitiva**: Fácil de usar para todas las edades

## 🎯 Cómo Jugar

### Acciones disponibles:
- **🍔 Alimentar**: Aumenta el hambre y un poco la salud
- **⚽ Jugar**: Aumenta la felicidad pero consume energía y hambre
- **😴 Dormir**: Recupera energía y un poco de salud
- **💊 Curar**: Recupera salud cuando está enfermo

### Consejos:
- Mantén todas las estadísticas por encima de 0
- Si la energía está baja, la mascota no querrá jugar
- El hambre muy bajo afecta la salud
- ¡No dejes que la salud llegue a 0!

## 🚀 Instalación Local

1. Clona este repositorio:
```bash
git clone https://github.com/[tu-usuario]/[nombre-repo].git
Navega al directorio:

bash
cd [nombre-repo]
Abre index.html en tu navegador o usa un servidor local:

bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server
Abre http://localhost:8000 en tu navegador

📁 Estructura del Proyecto
text
tamagotchi-virtual/
│
├── index.html          # Estructura HTML del juego
├── style.css           # Estilos y animaciones CSS
├── game.js             # Lógica del juego en JavaScript
└── README.md           # Documentación
🛠️ Tecnologías Utilizadas
HTML5: Estructura semántica

CSS3:

Flexbox y Grid

Animaciones y transiciones

Degradados y sombras

Diseño responsive

JavaScript Vanilla:

Programación Orientada a Objetos

Manipulación del DOM

localStorage para persistencia

Intervalos y temporizadores

🎨 Personalización
Puedes personalizar el juego modificando:

Emojis de mascota: Cambia el array petEmojis en game.js

Colores: Modifica las variables CSS en style.css

Estadísticas: Ajusta los valores de incremento/decremento en los métodos

Velocidad: Cambia el intervalo del temporizador (actualmente 5000ms)

🤝 Contribuciones
Las contribuciones son bienvenidas. Puedes:

Hacer fork del repositorio

Crear una rama para tu feature (git checkout -b feature/NuevaCaracteristica)

Commit tus cambios (git commit -m 'Añadir nueva característica')

Push a la rama (git push origin feature/NuevaCaracteristica)

Abrir un Pull Request

🐛 Bugs Conocidos
El temporizador puede desincronizarse si la pestaña está en segundo plano

El localStorage puede no funcionar en algunos navegadores en modo incógnito

📝 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👤 Autor
Creado con ❤️ por Sr. Claude


🙏 Agradecimientos
Inspirado en los clásicos Tamagotchi de Bandai

Emojis proporcionados por Unicode

Comunidad de desarrolladores web

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub! ⭐
