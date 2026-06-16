class Tamagotchi {
    constructor(name) {
        this.name = name;
        this.stats = {
            health: 100,
            hunger: 100,
            happiness: 100,
            energy: 100
        };
        this.age = 0;
        this.isAlive = true;
        this.evolutionStage = 0; // 0: huevo, 1: bebé, 2: adulto
        this.petEmojis = ['🥚', '🐣', '🐥', '🐔'];
    }

    decreaseStats() {
        if (!this.isAlive) return;
        
        this.stats.hunger = Math.max(0, this.stats.hunger - 0.5);
        this.stats.happiness = Math.max(0, this.stats.happiness - 0.3);
        this.stats.energy = Math.max(0, this.stats.energy - 0.2);
        
        // Si el hambre está muy bajo, afecta la salud
        if (this.stats.hunger < 20) {
            this.stats.health = Math.max(0, this.stats.health - 0.8);
        }
        
        // Si la felicidad está muy baja, afecta la salud
        if (this.stats.happiness < 20) {
            this.stats.health = Math.max(0, this.stats.health - 0.5);
        }
        
        // Si la energía está muy baja, afecta la salud
        if (this.stats.energy < 10) {
            this.stats.health = Math.max(0, this.stats.health - 0.3);
        }
        
        this.checkDeath();
        this.updateEvolution();
    }

    feed() {
        if (!this.isAlive) return "¡Tu mascota ha muerto! 😢";
        this.stats.hunger = Math.min(100, this.stats.hunger + 20);
        this.stats.health = Math.min(100, this.stats.health + 5);
        return "¡Ñam ñam! ¡Delicioso! 🍔";
    }

    play() {
        if (!this.isAlive) return "¡Tu mascota ha muerto! 😢";
        if (this.stats.energy < 20) return "¡Está muy cansado para jugar! 😴";
        
        this.stats.happiness = Math.min(100, this.stats.happiness + 25);
        this.stats.energy = Math.max(0, this.stats.energy - 15);
        this.stats.hunger = Math.max(0, this.stats.hunger - 10);
        return "¡Qué divertido! ⚽";
    }

    sleep() {
        if (!this.isAlive) return "¡Tu mascota ha muerto! 😢";
        this.stats.energy = Math.min(100, this.stats.energy + 40);
        this.stats.health = Math.min(100, this.stats.health + 10);
        return "¡Zzz... Buenas noches! 😴";
    }

    heal() {
        if (!this.isAlive) return "¡Tu mascota ha muerto! 😢";
        this.stats.health = Math.min(100, this.stats.health + 30);
        return "¡Te sientes mucho mejor! 💊";
    }

    checkDeath() {
        if (this.stats.health <= 0) {
            this.isAlive = false;
            document.getElementById('pet').textContent = '💀';
            document.getElementById('message').textContent = '¡Tu mascota ha muerto! 😢 Reinicia el juego.';
        }
    }

    updateEvolution() {
        if (this.age < 50) {
            this.evolutionStage = 0;
        } else if (this.age < 150) {
            this.evolutionStage = 1;
        } else if (this.age < 300) {
            this.evolutionStage = 2;
        } else {
            this.evolutionStage = 3;
        }
        
        if (this.isAlive) {
            document.getElementById('pet').textContent = this.petEmojis[this.evolutionStage];
        }
        
        this.age++;
    }

    getStatus() {
        return {
            ...this.stats,
            name: this.name,
            age: this.age,
            isAlive: this.isAlive,
            evolutionStage: this.evolutionStage
        };
    }
}

// Inicializar el juego
let game = new Tamagotchi('Mascota');
let gameInterval;

function startGame() {
    const savedName = localStorage.getItem('tamagotchiName');
    if (savedName) {
        game.name = savedName;
    }
    
    document.getElementById('petName').textContent = game.name;
    updateDisplay();
    
    gameInterval = setInterval(() => {
        game.decreaseStats();
        updateDisplay();
    }, 5000);
}

function updateDisplay() {
    const status = game.getStatus();
    
    // Actualizar barras
    document.getElementById('healthBar').style.width = status.health + '%';
    document.getElementById('healthValue').textContent = Math.round(status.health);
    
    document.getElementById('hungerBar').style.width = status.hunger + '%';
    document.getElementById('hungerValue').textContent = Math.round(status.hunger);
    
    document.getElementById('happinessBar').style.width = status.happiness + '%';
    document.getElementById('happinessValue').textContent = Math.round(status.happiness);
    
    document.getElementById('energyBar').style.width = status.energy + '%';
    document.getElementById('energyValue').textContent = Math.round(status.energy);
    
    document.getElementById('petName').textContent = status.name;
    
    // Cambiar color de barras según nivel
    const bars = document.querySelectorAll('.stat-fill');
    bars.forEach(bar => {
        const width = parseFloat(bar.style.width);
        if (width < 20) bar.style.opacity = '0.6';
        else if (width < 50) bar.style.opacity = '0.8';
        else bar.style.opacity = '1';
    });
}

// Funciones de botones
function feed() {
    const message = game.feed();
    document.getElementById('message').textContent = message;
    updateDisplay();
}

function play() {
    const message = game.play();
    document.getElementById('message').textContent = message;
    updateDisplay();
}

function sleep() {
    const message = game.sleep();
    document.getElementById('message').textContent = message;
    updateDisplay();
}

function heal() {
    const message = game.heal();
    document.getElementById('message').textContent = message;
    updateDisplay();
}

function resetGame() {
    if (confirm('¿Estás seguro de que quieres reiniciar el juego?')) {
        clearInterval(gameInterval);
        game = new Tamagotchi(game.name);
        document.getElementById('message').textContent = '¡Nueva mascota! ¡Cuídala bien!';
        startGame();
    }
}

function changeName() {
    const newName = prompt('¿Cómo quieres llamar a tu mascota?', game.name);
    if (newName && newName.trim()) {
        game.name = newName.trim();
        localStorage.setItem('tamagotchiName', game.name);
        document.getElementById('petName').textContent = game.name;
        document.getElementById('message').textContent = `¡Tu mascota ahora se llama ${game.name}!`;
    }
}

// Iniciar el juego cuando se carga la página
window.onload = startGame;