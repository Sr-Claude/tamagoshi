/* ═══════════════════════════════════════════════════════
   TAMAGOTCHI ÉPICO — game.js
   Vanilla JS puro · Web Audio API · LocalStorage
   ═══════════════════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────────────────
//  AUDIO ENGINE (Web Audio API — sin archivos externos)
// ──────────────────────────────────────────────────────
const Audio = (() => {
    let ctx = null;
    const init = () => {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    };

    const tone = (freq, type, start, dur, vol = 0.18) => {
        init();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime + start);
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        o.start(ctx.currentTime + start);
        o.stop(ctx.currentTime + start + dur + 0.05);
    };

    return {
        feed() {
            tone(330, 'sine', 0,    0.12);
            tone(440, 'sine', 0.12, 0.12);
            tone(550, 'sine', 0.24, 0.18);
        },
        play() {
            [523, 587, 659, 784].forEach((f, i) => tone(f, 'square', i * 0.1, 0.12, 0.12));
        },
        sleep() {
            tone(220, 'sine', 0,   0.4, 0.1);
            tone(196, 'sine', 0.4, 0.4, 0.1);
        },
        bath() {
            [330, 370, 415, 370, 330].forEach((f, i) => tone(f, 'sine', i * 0.08, 0.1, 0.1));
        },
        medicine() {
            tone(440, 'sawtooth', 0,    0.08, 0.08);
            tone(880, 'sine',     0.1,  0.25, 0.12);
        },
        alert() {
            tone(200, 'sawtooth', 0,   0.15, 0.12);
            tone(180, 'sawtooth', 0.2, 0.15, 0.12);
        },
        celebrate() {
            const melody = [523,659,784,1047,784,1047,1319];
            melody.forEach((f, i) => tone(f, 'sine', i * 0.1, 0.12, 0.15));
        },
        catch() {
            tone(880, 'sine', 0, 0.1, 0.12);
            tone(1100,'sine', 0.08, 0.1, 0.1);
        },
        gameover() {
            [330, 294, 262, 220].forEach((f, i) => tone(f, 'sawtooth', i * 0.3, 0.35, 0.1));
        }
    };
})();

// ──────────────────────────────────────────────────────
//  SVG DE LAS MASCOTAS
// ──────────────────────────────────────────────────────
const PET_SVGS = {
    jake: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
        <ellipse id="jbody" cx="60" cy="90" rx="35" ry="30" fill="#F4D03F"/>
        <ellipse cx="60" cy="52" rx="32" ry="28" fill="#F4D03F"/>
        <ellipse cx="32" cy="35" rx="10" ry="18" fill="#F4D03F" transform="rotate(-15 32 35)"/>
        <ellipse cx="88" cy="35" rx="10" ry="18" fill="#F4D03F" transform="rotate(15 88 35)"/>
        <ellipse cx="32" cy="35" rx="6" ry="12" fill="#E8C43D" transform="rotate(-15 32 35)"/>
        <ellipse cx="88" cy="35" rx="6" ry="12" fill="#E8C43D" transform="rotate(15 88 35)"/>
        <circle cx="47" cy="48" r="9" fill="white"/>
        <circle cx="73" cy="48" r="9" fill="white"/>
        <circle id="je1" cx="49" cy="49" r="5" fill="#222"/>
        <circle id="je2" cx="75" cy="49" r="5" fill="#222"/>
        <circle cx="51" cy="47" r="2" fill="white"/>
        <circle cx="77" cy="47" r="2" fill="white"/>
        <ellipse cx="60" cy="60" rx="5" ry="3" fill="#222"/>
        <path id="jmouth" d="M 50 65 Q 60 73 70 65" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <rect id="jlegL" x="30" y="112" width="16" height="22" rx="8" fill="#F4D03F"/>
        <rect id="jlegR" x="74" y="112" width="16" height="22" rx="8" fill="#F4D03F"/>
        <path d="M 90 85 Q 115 70 108 55" stroke="#F4D03F" stroke-width="10" fill="none" stroke-linecap="round"/>
    </svg>`,

    miau: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="95" rx="30" ry="28" fill="#F5E6C8"/>
        <ellipse cx="60" cy="55" rx="30" ry="28" fill="#F5E6C8"/>
        <polygon points="35,32 28,8 48,22" fill="#F5E6C8"/>
        <polygon points="85,32 92,8 72,22" fill="#F5E6C8"/>
        <polygon points="37,30 32,14 46,23" fill="#FFB7C5"/>
        <polygon points="83,30 88,14 74,23" fill="#FFB7C5"/>
        <circle cx="60" cy="34" r="9" fill="#FFD700"/>
        <circle cx="60" cy="34" r="7" fill="#FFC200"/>
        <text x="60" y="38" text-anchor="middle" font-size="8" fill="#B8860B" font-weight="bold">$</text>
        <ellipse cx="46" cy="52" rx="9" ry="10" fill="#2c5f2e"/>
        <ellipse cx="74" cy="52" rx="9" ry="10" fill="#2c5f2e"/>
        <ellipse cx="46" cy="53" rx="4" ry="7" fill="#111"/>
        <ellipse cx="74" cy="53" rx="4" ry="7" fill="#111"/>
        <circle cx="48" cy="49" r="2.5" fill="white"/>
        <circle cx="76" cy="49" r="2.5" fill="white"/>
        <polygon points="60,62 56,67 64,67" fill="#FF8FA3"/>
        <line x1="20" y1="63" x2="50" y2="65" stroke="#888" stroke-width="1.5"/>
        <line x1="20" y1="68" x2="50" y2="68" stroke="#888" stroke-width="1.5"/>
        <line x1="70" y1="65" x2="100" y2="63" stroke="#888" stroke-width="1.5"/>
        <line x1="70" y1="68" x2="100" y2="68" stroke="#888" stroke-width="1.5"/>
        <path id="mmouth" d="M 53 70 Q 60 76 67 70" stroke="#888" stroke-width="2" fill="none"/>
        <ellipse cx="40" cy="118" rx="12" ry="10" fill="#F5E6C8"/>
        <ellipse cx="80" cy="118" rx="12" ry="10" fill="#F5E6C8"/>
        <path d="M 88 90 Q 118 75 112 50 Q 108 30 95 35" stroke="#F5E6C8" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M 88 90 Q 118 75 112 50 Q 108 30 95 35" stroke="#DDD" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="6,8"/>
    </svg>`,

    coco: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <rect cx="50" y="95" x="50" width="20" height="45" rx="10" fill="#8B6914"/>
        <ellipse cx="25" cy="80" rx="28" ry="10" fill="#2ECC40" transform="rotate(-30 25 80)"/>
        <ellipse cx="95" cy="80" rx="28" ry="10" fill="#2ECC40" transform="rotate(30 95 80)"/>
        <ellipse cx="35" cy="65" rx="25" ry="8" fill="#27AE60" transform="rotate(-50 35 65)"/>
        <ellipse cx="85" cy="65" rx="25" ry="8" fill="#27AE60" transform="rotate(50 85 65)"/>
        <ellipse cx="60" cy="88" rx="22" ry="18" fill="#FF6B35"/>
        <ellipse cx="60" cy="62" rx="24" ry="22" fill="#FF6B35"/>
        <polygon points="60,72 45,68 60,80" fill="#FFD700"/>
        <circle cx="48" cy="57" r="11" fill="white"/>
        <circle cx="72" cy="57" r="11" fill="white"/>
        <circle cx="48" cy="57" r="7" fill="#1a1a2e"/>
        <circle cx="72" cy="57" r="7" fill="#1a1a2e"/>
        <circle cx="50" cy="54" r="3" fill="white"/>
        <circle cx="74" cy="54" r="3" fill="white"/>
        <ellipse cx="50" cy="42" rx="7" ry="12" fill="#E74C3C" transform="rotate(-20 50 42)"/>
        <ellipse cx="60" cy="38" rx="7" ry="14" fill="#9B59B6"/>
        <ellipse cx="70" cy="42" rx="7" ry="12" fill="#3498DB" transform="rotate(20 70 42)"/>
        <line x1="50" y1="106" x2="40" y2="125" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="70" y1="106" x2="80" y2="125" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="40" y1="125" x2="28" y2="130" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="40" y1="125" x2="38" y2="135" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="80" y1="125" x2="92" y2="130" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="80" y1="125" x2="82" y2="135" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
    </svg>`
};

// ──────────────────────────────────────────────────────
//  CLASES DE MASCOTA
// ──────────────────────────────────────────────────────
class Pet {
    constructor(type) {
        this.type = type;
        const cfg = Pet.CONFIG[type];
        Object.assign(this, cfg);
        this.stats = { hunger: 100, happiness: 100, energy: 100, clean: 100, health: 100 };
        this.age = 0;         // en ticks (un tick = 30s aprox)
        this.isSick = false;
        this.isSleeping = false;
        this.isAlive = true;
    }

    static CONFIG = {
        jake: {
            name: 'Jake el Perro',
            emoji: '🐶',
            items: ['⭐','🦴','🍖','💛'],
            phrases: {
                hunger:   '¡Matemáticas! ¡Tengo hambre!',
                happy:    '¡ALGEBRAICO! ¡Esto es lo máximo!',
                sick:     'Estoy hecho de... mantequilla de maní... 😵',
                sleep:    'Zzzz... stretching dreams...',
                feed:     '¡Ñam Ñam! ¡Matematiquísimo!',
                play:     '¡Hora de aventura, baby!',
                bath:     '¡Jabón algebraico!',
                idle:     ['¡Algebraico!', '¡Hora de aventura!', '¡Soy Jake el Perro!', '¡Me puedo estirar!']
            },
            themeHappy: 'theme-jake',
            themeSad:   'theme-jake-sad',
            minigameTitle: '¡Atrapa los huesos!'
        },
        miau: {
            name: 'Miau',
            emoji: '😺',
            items: ['💰','⭐','💎','🌟'],
            phrases: {
                hunger:   '¡Miau quiere comer! ¡Ahora!',
                happy:    '¡El Equipo Rocket va a triunfar hoy!',
                sick:     '¡Miau se siente muy mal... 🤒',
                sleep:    '...Soñando con monedas de oro...',
                feed:     '¡Purrrr... Delicioso!',
                play:     '¡Prepárense para el terror!',
                bath:     '¡Miau odia el agua! ¡Pero ok!',
                idle:     ['¡Miau!', '¡Dinero, dinero!', '¡Team Rocket!', '¡Payday!']
            },
            themeHappy: 'theme-miau',
            themeSad:   'theme-miau-sad',
            minigameTitle: '¡Atrapa las monedas!'
        },
        coco: {
            name: 'Coco',
            emoji: '🧡',
            items: ['🥚','🌈','🌸','⭐'],
            phrases: {
                hunger:   '¡Coco, Coco, Coco! (¡tengo hambre!)',
                happy:    '¡Co-co-co-co-COOO! 🎉',
                sick:     'Cooooo... (triste) 😢',
                sleep:    'Co... co... coo... zzz',
                feed:     '¡COCO! 🥚 ¡Coco, Coco!',
                play:     '¡Co-Co-Co-COCOO!',
                bath:     '¡Coco, Coco! (splash)',
                idle:     ['¡Coco!', '¡COCOO!', '¡Coco, Coco, Coco!', '¡Co-co-co!']
            },
            themeHappy: 'theme-coco',
            themeSad:   'theme-coco-sad',
            minigameTitle: '¡Atrapa los huevos!'
        }
    };

    tick() {
        if (!this.isAlive) return;
        if (this.isSleeping) {
            this.stats.energy = Math.min(100, this.stats.energy + 8);
            this.stats.health = Math.min(100, this.stats.health + 1);
            this.age++;
            return;
        }
        this.age++;
        this.stats.hunger    = Math.max(0, this.stats.hunger    - 3);
        this.stats.happiness = Math.max(0, this.stats.happiness - 2);
        this.stats.energy    = Math.max(0, this.stats.energy    - 2.5);
        this.stats.clean     = Math.max(0, this.stats.clean     - 1.5);

        const danger = [this.stats.hunger, this.stats.happiness, this.stats.energy, this.stats.clean]
            .filter(v => v < 20).length;

        if (danger >= 2) {
            this.isSick = true;
            this.stats.health = Math.max(0, this.stats.health - 3);
        } else if (!this.isSick && danger === 0) {
            this.stats.health = Math.min(100, this.stats.health + 0.5);
        }

        if (this.stats.health <= 0) this.die();
    }

    die() {
        this.isAlive = false;
        this.isSick = false;
    }

    feed()   { this.stats.hunger    = Math.min(100, this.stats.hunger    + 28); this.stats.energy = Math.max(0, this.stats.energy - 3); }
    doPlay(pts) {
        const bonus = Math.min(40, 10 + Math.floor(pts / 2));
        this.stats.happiness = Math.min(100, this.stats.happiness + bonus);
        this.stats.energy    = Math.max(0, this.stats.energy    - 18);
        this.stats.hunger    = Math.max(0, this.stats.hunger    - 10);
        return bonus;
    }
    sleep()  { this.isSleeping = true; }
    wakeUp() { this.isSleeping = false; }
    bath()   { this.stats.clean     = Math.min(100, this.stats.clean     + 35); }
    medicine() {
        this.isSick = false;
        this.stats.health = Math.min(100, this.stats.health + 40);
    }

    getMood() {
        const avg = (this.stats.hunger + this.stats.happiness + this.stats.energy + this.stats.clean) / 4;
        if (!this.isAlive)    return 'dead';
        if (this.isSleeping)  return 'sleep';
        if (this.isSick)      return 'sick';
        if (avg >= 75)        return 'happy';
        if (avg >= 45)        return 'neutral';
        return 'sad';
    }

    getIdlePhrase() {
        const mood = this.getMood();
        if (mood === 'dead')    return '...';
        if (mood === 'sleep')   return this.phrases.sleep;
        if (mood === 'sick')    return this.phrases.sick;
        if (mood === 'happy')   return this.phrases.happy;
        const arr = this.phrases.idle;
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

// ──────────────────────────────────────────────────────
//  ESTADO GLOBAL
// ──────────────────────────────────────────────────────
let pet = null;
let tickInterval  = null;
let bubbleTimeout = null;
let sleepTimeout  = null;
let dayNight      = 'day';   // 'day' | 'night'
let dayNightTick  = 0;

const TICK_MS = 8000;         // un tick cada 8 segundos
const DAY_NIGHT_TICKS = 15;  // cambia día/noche cada 15 ticks (~2 min)

// ──────────────────────────────────────────────────────
//  NAVEGACIÓN DE PANTALLAS
// ──────────────────────────────────────────────────────
function showScreen(id) {
    document.querySelectorAll('.screen-container').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ──────────────────────────────────────────────────────
//  PANTALLA SELECCIÓN — partículas de fondo
// ──────────────────────────────────────────────────────
function initSelectParticles() {
    const el = document.getElementById('selectParticles');
    el.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'bg-star';
        const size = Math.random() * 4 + 1;
        s.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation-duration:${Math.random()*3+1.5}s;
            animation-delay:${Math.random()*3}s;
        `;
        el.appendChild(s);
    }
}

// ──────────────────────────────────────────────────────
//  SELECCIÓN DE MASCOTA
// ──────────────────────────────────────────────────────
function selectPet(type) {
    pet = new Pet(type);

    // Inyectar SVG
    document.getElementById('petContainer').innerHTML = PET_SVGS[type];
    document.getElementById('petNameDisplay').textContent = pet.name;

    // Registrar mascota
    const count = (parseInt(localStorage.getItem('petsCount') || '0')) + 1;
    localStorage.setItem('petsCount', count);

    showScreen('screen-game');
    Audio.play();

    startGameLoop();
    updateUI();
    scheduleNextBubble();
    initBgParticles();
}

function goToSelect() {
    stopGameLoop();
    showScreen('screen-select');
}

// ──────────────────────────────────────────────────────
//  LOOP DEL JUEGO
// ──────────────────────────────────────────────────────
function startGameLoop() {
    stopGameLoop();
    tickInterval = setInterval(gameTick, TICK_MS);
}

function stopGameLoop() {
    if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
}

function gameTick() {
    if (!pet || !pet.isAlive) return;

    pet.tick();
    dayNightTick++;

    if (dayNightTick >= DAY_NIGHT_TICKS) {
        dayNightTick = 0;
        dayNight = dayNight === 'day' ? 'night' : 'day';
        document.getElementById('dayNightIndicator').textContent = dayNight === 'day' ? '🌞' : '🌙';
    }

    // Alerta si stats críticas
    const { hunger, happiness, energy, clean, health } = pet.stats;
    if (health < 30 || hunger < 15 || happiness < 15 || energy < 10) {
        Audio.alert();
    }

    if (!pet.isAlive) {
        triggerGameOver();
        return;
    }

    updateUI();
}

// ──────────────────────────────────────────────────────
//  ACTUALIZAR UI
// ──────────────────────────────────────────────────────
function updateUI() {
    if (!pet) return;

    const { hunger, happiness, energy, clean, health } = pet.stats;

    setBar('hungerBar',    'hungerVal',    hunger);
    setBar('happinessBar', 'happinessVal', happiness);
    setBar('energyBar',    'energyVal',    energy);
    setBar('cleanBar',     'cleanVal',     clean);
    setBar('healthBar',    'healthVal',    health);

    // Botón medicina: solo activo si salud < 30
    const medBtn = document.getElementById('btnMedicine');
    medBtn.disabled = health >= 30;

    // Botones bloqueados si duerme
    ['btnFeed','btnPlay','btnBath'].forEach(id => {
        document.getElementById(id).disabled = pet.isSleeping;
    });

    // Cambiar etiqueta del botón dormir
    const sleepBtn = document.getElementById('btnSleep');
    sleepBtn.querySelector('.btn-icon').textContent  = pet.isSleeping ? '☀️' : '💤';
    sleepBtn.querySelector('.btn-label').textContent = pet.isSleeping ? 'Despertar' : 'Dormir';

    // Edad
    document.getElementById('ageDisplay').textContent = Math.floor(pet.age / 4);

    // Récords
    const record = parseInt(localStorage.getItem('recordAge') || '0');
    const currentAge = Math.floor(pet.age / 4);
    if (currentAge > record) localStorage.setItem('recordAge', currentAge);
    document.getElementById('recordAge').textContent = Math.max(record, currentAge);
    document.getElementById('petsCount').textContent = localStorage.getItem('petsCount') || '1';

    // Animación de la mascota según humor
    applyPetAnimation();

    // Fondo según humor y día/noche
    updateBackground();

    // Sparkles si muy feliz
    const sparkle = document.getElementById('sparkleRing');
    sparkle.classList.toggle('active', happiness >= 85 && !pet.isSleeping);
}

function setBar(barId, valId, value) {
    const bar = document.getElementById(barId);
    const val = document.getElementById(valId);
    bar.style.width = Math.max(0, value) + '%';
    val.textContent = Math.round(value);
    bar.className = 'stat-bar-fill ' +
        (value >= 50 ? 'bar-high' : value >= 25 ? 'bar-mid' : 'bar-low');
}

function applyPetAnimation() {
    const container = document.getElementById('petContainer');
    container.className = 'pet-container';
    const mood = pet.getMood();
    if (mood === 'sleep')   container.classList.add('pet-anim-sleep');
    else if (mood === 'sick')    container.classList.add('pet-anim-sick');
    else if (mood === 'happy')   container.classList.add('pet-anim-happy');
    else                         container.classList.add('pet-anim-idle');
}

function updateBackground() {
    const bg = document.getElementById('gameBg');
    bg.className = 'game-bg';
    if (dayNight === 'night') {
        bg.classList.add('theme-night');
        return;
    }
    const mood = pet.getMood();
    if (mood === 'happy' || mood === 'neutral') {
        bg.classList.add(pet.themeHappy);
    } else {
        bg.classList.add(pet.themeSad);
    }
}

// ──────────────────────────────────────────────────────
//  GLOBO DE DIÁLOGO PERIÓDICO
// ──────────────────────────────────────────────────────
function showBubble(text) {
    const bubble = document.getElementById('speechBubble');
    const span   = document.getElementById('speechText');
    bubble.style.opacity = '0';
    setTimeout(() => {
        span.textContent = text;
        bubble.style.opacity = '1';
    }, 200);
    setTimeout(() => { bubble.style.opacity = '0'; }, 3500);
}

function scheduleNextBubble() {
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    const delay = 5000 + Math.random() * 6000;
    bubbleTimeout = setTimeout(() => {
        if (pet && pet.isAlive) {
            // Alerta si estadística crítica
            const { hunger, happiness, energy, clean } = pet.stats;
            let urgentPhrase = null;
            if (hunger < 20)    urgentPhrase = pet.phrases.hunger;
            else if (happiness < 20) urgentPhrase = '¡Estoy aburrido! 😒';
            else if (energy < 15)    urgentPhrase = '¡Necesito dormir! 😴';
            else if (clean < 15)     urgentPhrase = '¡Estoy sucio! 🧼';

            showBubble(urgentPhrase || pet.getIdlePhrase());
            scheduleNextBubble();
        }
    }, delay);
}

// ──────────────────────────────────────────────────────
//  ACCIONES DE BOTONES
// ──────────────────────────────────────────────────────
function actionFeed() {
    if (!pet || !pet.isAlive || pet.isSleeping) return;
    pet.feed();
    Audio.feed();
    showBubble(pet.phrases.feed);
    spawnFoodFly();
    // Especial Miau: monedas
    if (pet.type === 'miau') spawnCoins(3);
    updateUI();
}

function actionPlay() {
    if (!pet || !pet.isAlive || pet.isSleeping) return;
    if (pet.stats.energy < 20) { showBubble('¡Estoy muy cansado! 😴'); return; }
    Audio.play();
    showBubble(pet.phrases.play);
    startMinigame();
}

function actionSleep() {
    if (!pet || !pet.isAlive) return;
    if (pet.isSleeping) {
        pet.wakeUp();
        showBubble('¡Buenos días! ☀️');
        updateUI();
        return;
    }
    pet.sleep();
    Audio.sleep();
    showBubble(pet.phrases.sleep);
    spawnZzz();
    updateUI();
    // Auto-despertar tras 12 segundos
    if (sleepTimeout) clearTimeout(sleepTimeout);
    sleepTimeout = setTimeout(() => {
        if (pet && pet.isSleeping) {
            pet.wakeUp();
            showBubble('¡Zzz... me desperté! 🌞');
            updateUI();
        }
    }, 12000);
}

function actionBath() {
    if (!pet || !pet.isAlive || pet.isSleeping) return;
    pet.bath();
    Audio.bath();
    showBubble(pet.phrases.bath);
    spawnBubbles();
    updateUI();
}

function actionMedicine() {
    if (!pet || !pet.isAlive || pet.stats.health >= 30) return;
    pet.medicine();
    Audio.medicine();
    showBubble('¡Me siento mejor! 💊✨');
    updateUI();
}

// ──────────────────────────────────────────────────────
//  EFECTOS VISUALES
// ──────────────────────────────────────────────────────
function spawnZzz() {
    const container = document.getElementById('zzzContainer');
    container.innerHTML = '';
    const letters = ['Z','Z','z','Z','z','z'];
    letters.forEach((l, i) => {
        const el = document.createElement('div');
        el.className = 'zzz';
        el.textContent = l;
        el.style.cssText = `
            left: ${45 + i * 5}%;
            top:  ${60 - i * 8}%;
            animation-delay: ${i * 0.4}s;
            animation-duration: ${2.5 + i * 0.3}s;
            font-size: ${0.9 + i * 0.15}rem;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), (2.5 + i * 0.3 + i * 0.4) * 1000 + 500);
    });
}

function spawnBubbles() {
    const container = document.getElementById('bubblesContainer');
    for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'bubble';
        const size = Math.random() * 30 + 10;
        const dur  = Math.random() * 1.5 + 1;
        el.style.cssText = `
            width: ${size}px; height: ${size}px;
            left:  ${20 + Math.random() * 60}%;
            top:   ${50 + Math.random() * 30}%;
            animation-name: bubbleRise;
            animation-duration: ${dur}s;
            animation-delay: ${Math.random() * 0.8}s;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), (dur + 0.8) * 1000 + 200);
    }
}

function spawnConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B6B','#FFD166','#06D6A0','#118AB2','#C77DFF','#FFB7C5'];
    for (let i = 0; i < 40; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        const dur = Math.random() * 2 + 1.5;
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            top:  ${-10 - Math.random() * 10}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width:  ${Math.random() * 10 + 6}px;
            height: ${Math.random() * 10 + 6}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation-duration: ${dur}s;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), (dur + 0.5) * 1000 + 200);
    }
}

function spawnFoodFly() {
    const container = document.getElementById('foodFlyContainer');
    const foods = ['🍔','🍕','🌮','🍩','🍦','🍎'];
    for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.className = 'food-fly';
        el.textContent = foods[Math.floor(Math.random() * foods.length)];
        el.style.cssText = `
            left: ${30 + Math.random() * 40}%;
            top:  ${55 + Math.random() * 20}%;
            animation-delay: ${i * 0.15}s;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }
}

function spawnCoins(n) {
    const container = document.getElementById('foodFlyContainer');
    for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'coin-fly';
        el.textContent = '💰';
        el.style.cssText = `
            left: ${30 + Math.random() * 40}%;
            top:  ${60 + Math.random() * 15}%;
            animation-delay: ${i * 0.2}s;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    }
}

function spawnEggs(n) {
    const container = document.getElementById('foodFlyContainer');
    const eggEmojis = ['🥚','🌈','🌸','🌻'];
    for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'egg-pop';
        el.textContent = eggEmojis[Math.floor(Math.random() * eggEmojis.length)];
        el.style.cssText = `
            left: ${25 + Math.random() * 50}%;
            top:  ${55 + Math.random() * 20}%;
            animation-delay: ${i * 0.25}s;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), 1600);
    }
}

// ──────────────────────────────────────────────────────
//  PARTÍCULAS DE FONDO (juego)
// ──────────────────────────────────────────────────────
function initBgParticles() {
    const el = document.getElementById('bgParticles');
    el.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const s = document.createElement('div');
        s.className = 'bg-star';
        const size = Math.random() * 5 + 2;
        s.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation-duration:${Math.random()*4+2}s;
            animation-delay:${Math.random()*4}s;
        `;
        el.appendChild(s);
    }
}

// ──────────────────────────────────────────────────────
//  GAME OVER
// ──────────────────────────────────────────────────────
function triggerGameOver() {
    stopGameLoop();
    Audio.gameover();

    const age = Math.floor((pet ? pet.age : 0) / 4);
    const record = Math.max(age, parseInt(localStorage.getItem('recordAge') || '0'));
    localStorage.setItem('recordAge', record);

    document.getElementById('gameoverPet').textContent = pet ? pet.emoji : '😢';
    document.getElementById('gameoverMsg').textContent =
        `${pet ? pet.name : 'Tu mascota'} nos ha dejado... 💔`;
    document.getElementById('goAge').textContent    = age;
    document.getElementById('goRecord').textContent = record;

    showScreen('screen-gameover');
}

// ──────────────────────────────────────────────────────
//  MINI-JUEGO
// ──────────────────────────────────────────────────────
let mgScore     = 0;
let mgTimer     = 15;
let mgRunning   = false;
let mgInterval  = null;
let mgSpawner   = null;
let mgObjects   = [];

function startMinigame() {
    mgScore    = 0;
    mgTimer    = 15;
    mgRunning  = true;
    mgObjects  = [];

    document.getElementById('mgScore').textContent   = 0;
    document.getElementById('mgTimer').textContent   = 15;
    document.getElementById('minigameTitle').textContent = pet.minigameTitle;
    document.getElementById('minigameResult').style.display = 'none';
    document.getElementById('minigameField').innerHTML = '';

    showScreen('screen-minigame');

    // Temporizador
    mgInterval = setInterval(() => {
        mgTimer--;
        document.getElementById('mgTimer').textContent = mgTimer;
        if (mgTimer <= 0) finishMinigame();
    }, 1000);

    // Spawner de objetos
    mgSpawner = setInterval(() => { if (mgRunning) spawnMgObject(); }, 700);

    // Primeros objetos inmediatos
    setTimeout(spawnMgObject, 100);
    setTimeout(spawnMgObject, 400);
}

function spawnMgObject() {
    if (!mgRunning) return;
    const field = document.getElementById('minigameField');
    const items = pet.items;
    const item  = items[Math.floor(Math.random() * items.length)];

    const el = document.createElement('div');
    el.className    = 'falling-obj';
    el.textContent  = item;
    const leftPct   = 5 + Math.random() * 85;
    const fallDur   = 2.0 + Math.random() * 2.0;
    el.style.cssText = `
        left: ${leftPct}%;
        top: -60px;
        transition: top ${fallDur}s linear;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-name: wobbleFall;
    `;

    el.addEventListener('click', (e) => { if (mgRunning) catchObject(el, e); });
    el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (mgRunning) catchObject(el, e.touches[0]);
    }, { passive: false });

    field.appendChild(el);
    mgObjects.push(el);

    // Animar caída
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { el.style.top = '105%'; });
    });

    // Eliminar si no atrapado
    setTimeout(() => { if (el.parentNode) el.remove(); }, fallDur * 1000 + 200);
}

function catchObject(el, eventPos) {
    if (!el.parentNode) return;
    mgScore++;
    document.getElementById('mgScore').textContent = mgScore;
    Audio.catch();

    // Pop visual en el lugar del click
    const field    = document.getElementById('minigameField');
    const fieldRect = field.getBoundingClientRect();
    const pop      = document.createElement('div');
    pop.className  = 'catch-pop';
    pop.textContent = '+1 ⭐';
    const cx = (eventPos.clientX - fieldRect.left);
    const cy = (eventPos.clientY - fieldRect.top);
    pop.style.cssText = `left:${cx}px; top:${cy}px; transform:translate(-50%,-50%);`;
    field.appendChild(pop);
    setTimeout(() => pop.remove(), 700);

    el.remove();
}

function finishMinigame() {
    mgRunning = false;
    clearInterval(mgInterval);
    clearInterval(mgSpawner);

    // Limpiar objetos
    document.getElementById('minigameField').innerHTML = '';

    const bonus = pet.doPlay(mgScore);
    Audio.celebrate();

    // Efectos especiales por mascota
    if (pet.type === 'miau') spawnCoins(6);
    else if (pet.type === 'coco') spawnEggs(5);
    else spawnConfetti();

    showBubble(pet.phrases.happy);

    const titles = ['¡Increíble!', '¡Genial!', '¡Imparable!', '¡Épico!'];
    document.getElementById('resultPet').textContent     = pet.emoji;
    document.getElementById('resultTitle').textContent   = mgScore > 8 ? titles[0] : mgScore > 4 ? titles[1] : '¡Bien hecho!';
    document.getElementById('resultScore').textContent   = mgScore;
    document.getElementById('resultHappiness').textContent = bonus;
    document.getElementById('minigameResult').style.display = 'flex';

    updateUI();
}

function endMinigame() {
    showScreen('screen-game');
    updateUI();
}

// ──────────────────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
    initSelectParticles();
    showScreen('screen-select');
});
