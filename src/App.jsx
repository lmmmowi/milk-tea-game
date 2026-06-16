import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ClipboardList,
  BookOpen,
  Lightbulb,
  Music,
  RotateCcw,
  Sparkles,
  Star,
  Timer,
  Volume2,
  VolumeX,
} from "lucide-react";

const TARGET_CUPS = 6;

const bases = [
  { id: "strawberry", label: "Strawberry Milk", color: "#ff8faf" },
  { id: "oolong", label: "Oolong Milk", color: "#c8945a" },
  { id: "mango", label: "Mango Milk", color: "#ffc84d" },
  { id: "taro", label: "Taro Milk", color: "#b79be8" },
  { id: "grape", label: "Grape Milk", color: "#9d86df" },
  { id: "dragonfruit", label: "Dragon Fruit Milk", color: "#ff5f9f" },
  { id: "banana", label: "Banana Milk", color: "#ffe16a" },
];

const sweets = [
  { id: "light", label: "Less Sugar", color: "#b9e4ff" },
  { id: "half", label: "Half Sugar", color: "#ffd767" },
  { id: "full", label: "Full Sugar", color: "#ff9fb5" },
];

const toppings = [
  { id: "pearl", label: "Boba", color: "#4b352b" },
  { id: "pudding", label: "Pudding", color: "#ffcf65" },
  { id: "jelly", label: "Coconut Jelly", color: "#a7efd5" },
  { id: "cream", label: "Cream", color: "#fff4d6" },
  { id: "strawberryFruit", label: "Strawberry", color: "#ff8faf" },
  { id: "grapeFruit", label: "Grape", color: "#9d86df" },
  { id: "dragonfruitFruit", label: "Dragon Fruit", color: "#ff5f9f" },
  { id: "bananaFruit", label: "Banana", color: "#ffe16a" },
];

const decorations = {
  straws: [
    { id: "pink", label: "Pink Straw", color: "#ff7e9f" },
    { id: "blue", label: "Blue Straw", color: "#82b9ff" },
    { id: "yellow", label: "Yellow Straw", color: "#ffd767" },
  ],
  stickers: [
    { id: "rainbow", label: "Rainbow", color: "#fff0f6", mark: "🌈" },
    { id: "heart", label: "Heart", color: "#ffe5ec", mark: "♥" },
    { id: "star", label: "Star", color: "#fff4bf", mark: "★" },
    { id: "bow", label: "Bow", color: "#efe4ff", mark: "🎀" },
  ],
};

const rewardStickers = [
  { id: "rainbow", label: "Rainbow", mark: "🌈", color: "#fff0f6" },
  { id: "heart", label: "Heart", mark: "♥", color: "#ffe5ec" },
  { id: "star", label: "Star", mark: "★", color: "#fff4bf" },
  { id: "bow", label: "Bow", mark: "🎀", color: "#efe4ff" },
  { id: "sparkle", label: "Sparkle", mark: "✦", color: "#e9fbff" },
  { id: "flower", label: "Flower", mark: "✿", color: "#edfbea" },
];

const recipes = [
  {
    id: "berryPearl",
    name: "Strawberry Boba",
    base: "strawberry",
    sweet: "half",
    topping: "pearl",
  },
  {
    id: "mangoPudding",
    name: "Mango Pudding",
    base: "mango",
    sweet: "light",
    topping: "pudding",
  },
  {
    id: "oolongCream",
    name: "Oolong Cream",
    base: "oolong",
    sweet: "half",
    topping: "cream",
  },
  {
    id: "taroJelly",
    name: "Taro Jelly",
    base: "taro",
    sweet: "full",
    topping: "jelly",
  },
  {
    id: "grapeJelly",
    name: "Grape Jelly",
    base: "grape",
    sweet: "light",
    topping: "jelly",
  },
  {
    id: "dragonfruitCream",
    name: "Dragon Fruit Cream",
    base: "dragonfruit",
    sweet: "half",
    topping: "cream",
  },
  {
    id: "bananaPudding",
    name: "Banana Pudding",
    base: "banana",
    sweet: "full",
    topping: "pudding",
  },
  {
    id: "strawberryFruit",
    name: "Strawberry Bits",
    base: "strawberry",
    sweet: "full",
    topping: "strawberryFruit",
  },
  {
    id: "grapeFruit",
    name: "Grape Bits",
    base: "grape",
    sweet: "half",
    topping: "grapeFruit",
  },
  {
    id: "dragonfruitFruit",
    name: "Dragon Fruit Bits",
    base: "dragonfruit",
    sweet: "light",
    topping: "dragonfruitFruit",
  },
  {
    id: "bananaFruit",
    name: "Banana Bits",
    base: "banana",
    sweet: "half",
    topping: "bananaFruit",
  },
];

const animalSprite = (name) => `/assets/kenney/animal-pack-remastered/png-round-outline/${name}.png`;

const customers = [
  {
    name: "小兔米米",
    kind: "bunny",
    mood: "竖起耳朵等香香的奶茶。",
    color: "#fff2f6",
    sprite: animalSprite("rabbit"),
  },
  {
    name: "熊猫团团",
    kind: "panda",
    mood: "抱着小杯套，认真看今日菜单。",
    color: "#f0f0f0",
    sprite: animalSprite("panda"),
  },
  {
    name: "小熊豆豆",
    kind: "bear",
    mood: "抱着小围巾，正在看菜单。",
    color: "#d7b48a",
    sprite: animalSprite("bear"),
  },
  {
    name: "小狗可可",
    kind: "dog",
    mood: "开心地坐在柜台前等你。",
    color: "#ffd7a6",
    sprite: animalSprite("dog"),
  },
  {
    name: "小鸭啾啾",
    kind: "duck",
    mood: "踮着脚排队，想要一杯甜甜的。",
    color: "#ffe16a",
    sprite: animalSprite("duck"),
  },
  {
    name: "企鹅冰冰",
    kind: "penguin",
    mood: "从冰箱旁边探头，等一杯凉凉的。",
    color: "#dff8ff",
    sprite: animalSprite("penguin"),
  },
  {
    name: "小猴皮皮",
    kind: "monkey",
    mood: "拿着贴纸券，已经想好口味了。",
    color: "#d7a66f",
    sprite: animalSprite("monkey"),
  },
  {
    name: "小猪桃桃",
    kind: "pig",
    mood: "脸蛋红扑扑，想试试水果奶茶。",
    color: "#ffd5df",
    sprite: animalSprite("pig"),
  },
  {
    name: "猫头鹰悠悠",
    kind: "owl",
    mood: "圆圆眼睛盯着菜单牌看。",
    color: "#caa27a",
    sprite: animalSprite("owl"),
  },
  {
    name: "长颈鹿高高",
    kind: "giraffe",
    mood: "从队伍后面伸长脖子看柜台。",
    color: "#ffd38a",
    sprite: animalSprite("giraffe"),
  },
];

function makeInitialCustomerQueue() {
  return customers.slice(0, 4);
}

function pickNextCustomerForQueue(queue) {
  const queuedNames = new Set(queue.map((item) => item.name));
  const pool = customers.filter((item) => !queuedNames.has(item.name));

  return pool[Math.floor(Math.random() * pool.length)] ?? customers[0];
}

const emptySelection = {
  base: null,
  sweet: null,
  topping: null,
};

const defaultDecoration = {
  straw: "pink",
  sticker: "rainbow",
};

const defaultFeedback = {
  text: "Look at the ticket and make the drink.",
  type: "",
};

let audioContext;
let backgroundMusic;
let speechRetryTimer;
let orderAudio;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  return audioContext;
}

function playMusicNote(context, frequency, when, duration, volume) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(when);
  oscillator.stop(when + duration + 0.04);
}

function startBackgroundMusic(enabled) {
  if (!enabled || backgroundMusic?.running) return;

  const context = getAudioContext();
  if (!context) return;

  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 587.33];
  const bass = [261.63, 261.63, 293.66, 293.66, 349.23, 349.23, 392, 392];

  backgroundMusic = {
    running: true,
    step: backgroundMusic?.step ?? 0,
    timer: null,
  };

  const tick = () => {
    if (!backgroundMusic?.running) return;

    const now = context.currentTime;
    const step = backgroundMusic.step;
    playMusicNote(context, melody[step % melody.length], now, 0.18, 0.045);

    if (step % 4 === 0) {
      playMusicNote(context, bass[Math.floor(step / 4) % bass.length], now, 0.34, 0.026);
    }

    backgroundMusic.step += 1;
    backgroundMusic.timer = window.setTimeout(tick, 220);
  };

  tick();
}

function stopBackgroundMusic() {
  if (!backgroundMusic) return;

  backgroundMusic.running = false;
  window.clearTimeout(backgroundMusic.timer);
}

function playTone(kind, enabled) {
  if (!enabled) return;

  const context = getAudioContext();
  if (!context) return;
  
  const patterns = {
    select: [
      [740, 0, 0.07],
      [932, 0.05, 0.06],
    ],
    good: [
      [523, 0, 0.08],
      [659, 0.07, 0.08],
      [784, 0.14, 0.1],
      [1046, 0.22, 0.16],
    ],
    try: [
      [230, 0, 0.1],
      [180, 0.1, 0.12],
    ],
    hint: [
      [740, 0, 0.07],
      [988, 0.07, 0.09],
    ],
    reset: [[392, 0, 0.08]],
    timeout: [
      [330, 0, 0.09],
      [294, 0.1, 0.12],
    ],
  };

  const now = context.currentTime;
  const notes = patterns[kind] ?? patterns.select;
  const volume = kind === "good" ? 0.22 : kind === "try" ? 0.18 : 0.16;
  const wave = kind === "try" || kind === "timeout" ? "square" : "triangle";

  notes.forEach(([frequency, delay, duration]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, now + delay);
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.exponentialRampToValueAtTime(volume, now + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now + delay);
    oscillator.stop(now + delay + duration + 0.03);
  });
}

function pickRandom(items, avoidKey) {
  const pool = items.filter((item) => item.id !== avoidKey && item.name !== avoidKey);
  return pool[Math.floor(Math.random() * pool.length)] || items[0];
}

function findOption(list, id) {
  return list.find((item) => item.id === id);
}

function findNextGroup(selection, recipe) {
  if (selection.base !== recipe.base) return "base";
  if (selection.sweet !== recipe.sweet) return "sweet";
  if (selection.topping !== recipe.topping) return "topping";
  return null;
}

function makeOrderParts(recipe) {
  const base = findOption(bases, recipe.base);
  const sweet = findOption(sweets, recipe.sweet);
  const topping = findOption(toppings, recipe.topping);

  return [
    { ...base, prefix: "Base" },
    { ...sweet, prefix: "Sweetness" },
    { ...topping, prefix: "Topping" },
  ];
}

function makeOrderSpeech(recipe) {
  const parts = makeOrderParts(recipe);
  return `${recipe.name}. ${parts.map((part) => part.label).join(", ")}.`;
}

function pickEnglishVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  const preferredNames = [
    "Samantha",
    "Google US English",
    "Microsoft Jenny",
    "Microsoft Aria",
    "Microsoft Zira",
    "Alex",
  ];

  return (
    preferredNames
      .map((name) => voices.find((voice) => voice.name.includes(name)))
      .find(Boolean) ||
    voices.find((voice) => voice.lang === "en-US" && voice.localService) ||
    voices.find((voice) => voice.lang.startsWith("en"))
  );
}

function speakEnglish(text, enabled = true, retry = true) {
  if (!enabled || typeof window === "undefined" || !window.speechSynthesis) return;

  const synth = window.speechSynthesis;
  window.clearTimeout(speechRetryTimer);
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickEnglishVoice();

  if (voice) {
    utterance.voice = voice;
  }

  utterance.lang = "en-US";
  utterance.rate = 0.74;
  utterance.pitch = 1;
  utterance.volume = 0.9;
  synth.speak(utterance);

  if (retry) {
    speechRetryTimer = window.setTimeout(() => {
      if (!synth.speaking && !synth.pending) {
        speakEnglish(text, enabled, false);
      }
    }, 350);
  }
}

function playOrderVoice(recipe, enabled = true) {
  if (!enabled || typeof window === "undefined") return;

  orderAudio?.pause();
  orderAudio = new Audio(`/audio/orders/${recipe.id}.m4a`);
  orderAudio.volume = 0.95;

  const fallback = () => speakEnglish(makeOrderSpeech(recipe), enabled);
  orderAudio.addEventListener("error", fallback, { once: true });

  const playPromise = orderAudio.play();
  if (playPromise) {
    playPromise.catch(fallback);
  }
}

function IngredientIcon({ id }) {
  if (id === "strawberry" || id === "strawberryFruit") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 12 C14 12 10 20 14 30 C18 41 30 41 34 30 C38 20 34 12 24 12 Z" fill="#ff5c86" stroke="#24323f" strokeWidth="3" />
        <path d="M18 13 L14 7 M24 12 L24 6 M30 13 L35 8" stroke="#2e9c73" strokeWidth="4" strokeLinecap="round" />
        <circle cx="20" cy="23" r="1.8" fill="#fff7ca" />
        <circle cx="27" cy="21" r="1.8" fill="#fff7ca" />
        <circle cx="24" cy="30" r="1.8" fill="#fff7ca" />
      </svg>
    );
  }

  if (id === "oolong") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 20 H33 V31 C33 36 29 39 23 39 C17 39 13 36 13 31 Z" fill="#c8945a" stroke="#24323f" strokeWidth="3" />
        <path d="M33 22 H38 C42 22 42 30 35 30 H33" fill="none" stroke="#24323f" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 13 C20 8 25 8 27 13 C23 15 20 15 17 13 Z" fill="#66bd74" stroke="#24323f" strokeWidth="2" />
        <path d="M25 14 C29 9 35 10 37 15 C33 18 29 18 25 14 Z" fill="#85d887" stroke="#24323f" strokeWidth="2" />
      </svg>
    );
  }

  if (id === "mango") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 11 C30 6 39 16 35 29 C31 42 16 41 12 30 C9 22 11 15 18 11 Z" fill="#ffc84d" stroke="#24323f" strokeWidth="3" />
        <path d="M27 12 C31 7 37 8 40 13 C36 16 31 16 27 12 Z" fill="#6bc36d" stroke="#24323f" strokeWidth="2" />
        <path d="M18 17 C16 24 18 31 25 36" fill="none" stroke="#ff9f45" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "taro") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="27" rx="15" ry="13" fill="#b79be8" stroke="#24323f" strokeWidth="3" />
        <path d="M17 14 C21 8 29 8 33 14" fill="none" stroke="#6fc17e" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 25 H30 M17 31 H27" stroke="#7d64ba" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "grape" || id === "grapeFruit") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M25 12 C29 8 35 9 38 14 C34 17 29 17 25 12 Z" fill="#74c978" stroke="#24323f" strokeWidth="2" />
        {[ [20,18], [28,18], [16,26], [24,26], [32,26], [20,34], [28,34] ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#9d86df" stroke="#24323f" strokeWidth="2" />
        ))}
      </svg>
    );
  }

  if (id === "dragonfruit" || id === "dragonfruitFruit") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M16 13 L10 21 L15 20 L10 31 L17 28 L19 38 L24 31 L30 38 L31 28 L38 31 L33 20 L38 21 L32 13 Z" fill="#ff5f9f" stroke="#24323f" strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="24" cy="25" rx="11" ry="12" fill="#fffdf7" stroke="#24323f" strokeWidth="2" />
        <circle cx="21" cy="22" r="1.6" fill="#24323f" />
        <circle cx="27" cy="26" r="1.6" fill="#24323f" />
        <circle cx="22" cy="30" r="1.6" fill="#24323f" />
      </svg>
    );
  }

  if (id === "banana" || id === "bananaFruit") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 16 C19 34 32 37 40 23 C35 42 18 43 9 20 Z" fill="#ffe16a" stroke="#24323f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M12 16 L8 13 M39 23 L43 21" stroke="#8a6730" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "light" || id === "half" || id === "full") {
    const cubes = id === "light" ? [[19, 24]] : id === "half" ? [[16, 25], [27, 22]] : [[13, 28], [24, 22], [32, 30]];
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 16 C17 11 31 11 37 16" fill="none" stroke="#82b9ff" strokeWidth="4" strokeLinecap="round" />
        {cubes.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="2" fill="#fffdf7" stroke="#24323f" strokeWidth="2" transform={`rotate(-8 ${x + 5} ${y + 5})`} />
        ))}
      </svg>
    );
  }

  if (id === "pearl") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        {[ [18,18], [29,18], [14,29], [25,30], [35,28] ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#4b352b" stroke="#24323f" strokeWidth="2" />
        ))}
        <circle cx="16" cy="16" r="2" fill="#fff7e5" opacity=".8" />
      </svg>
    );
  }

  if (id === "pudding") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 18 H33 L31 34 Q30 39 24 39 Q18 39 17 34 Z" fill="#ffcf65" stroke="#24323f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M16 18 C17 10 31 10 32 18 Z" fill="#fff4b8" stroke="#24323f" strokeWidth="3" />
        <path d="M20 23 H28" stroke="#d28b28" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "jelly") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="12" y="14" width="13" height="13" rx="3" fill="#a7efd5" stroke="#24323f" strokeWidth="3" transform="rotate(-8 18.5 20.5)" />
        <rect x="24" y="23" width="13" height="13" rx="3" fill="#89d7ff" stroke="#24323f" strokeWidth="3" transform="rotate(8 30.5 29.5)" />
        <path d="M17 18 L21 16 M29 27 L33 25" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "cream") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 32 C10 25 16 21 22 23 C20 17 27 13 31 20 C38 20 40 31 32 34 H18 C17 34 16 33 15 32 Z" fill="#fff4d6" stroke="#24323f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M20 29 C23 26 28 27 30 30" fill="none" stroke="#e0b96f" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="#fffdf7" stroke="#24323f" strokeWidth="3" />
    </svg>
  );
}

function CupMark({ id }) {
  if (!id) {
    return (
      <g opacity=".35">
        <circle cx="110" cy="156" r="15" fill="#fffdf7" stroke="#24323f" strokeWidth="5" />
      </g>
    );
  }

  if (id === "strawberry") {
    return (
      <g transform="translate(110 160) scale(0.78)">
        <path d="M0 -18 C-15 -18 -20 -6 -14 8 C-8 24 8 24 14 8 C20 -6 15 -18 0 -18 Z" fill="#ff5c86" stroke="#24323f" strokeWidth="4" />
        <path d="M-9 -18 L-13 -27 M0 -18 L0 -28 M9 -18 L14 -26" stroke="#2e9c73" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-5" cy="-5" r="2.2" fill="#fff7ca" />
        <circle cx="6" cy="-7" r="2.2" fill="#fff7ca" />
        <circle cx="0" cy="6" r="2.2" fill="#fff7ca" />
      </g>
    );
  }

  if (id === "oolong") {
    return (
      <g transform="translate(110 160) scale(0.82)">
        <path d="M-15 -4 H14 V13 C14 22 7 27 -1 27 C-9 27 -15 22 -15 13 Z" fill="#c8945a" stroke="#24323f" strokeWidth="4" />
        <path d="M14 0 H22 C29 0 29 12 17 13" fill="none" stroke="#24323f" strokeWidth="4" strokeLinecap="round" />
        <path d="M-8 -13 C-4 -23 8 -22 12 -13 C4 -9 -2 -9 -8 -13 Z" fill="#6fc17e" stroke="#24323f" strokeWidth="3" />
      </g>
    );
  }

  if (id === "mango") {
    return (
      <g transform="translate(110 160) scale(0.82)">
        <path d="M-7 -22 C12 -28 25 -10 18 10 C10 31 -13 28 -20 10 C-25 -3 -19 -16 -7 -22 Z" fill="#ffc84d" stroke="#24323f" strokeWidth="4" />
        <path d="M7 -21 C13 -29 24 -27 29 -18 C22 -14 14 -15 7 -21 Z" fill="#6bc36d" stroke="#24323f" strokeWidth="3" />
      </g>
    );
  }

  if (id === "taro") {
    return (
      <g transform="translate(110 160) scale(0.9)">
        <ellipse cx="0" cy="4" rx="18" ry="15" fill="#b79be8" stroke="#24323f" strokeWidth="4" />
        <path d="M-9 -12 C-4 -22 8 -21 13 -12" fill="none" stroke="#6fc17e" strokeWidth="5" strokeLinecap="round" />
        <path d="M-9 2 H9 M-8 9 H6" stroke="#7d64ba" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }

  if (id === "grape") {
    return (
      <g transform="translate(110 160) scale(0.78)">
        <path d="M2 -24 C8 -32 19 -29 24 -20 C17 -15 9 -16 2 -24 Z" fill="#74c978" stroke="#24323f" strokeWidth="3" />
        {[[-8, -12], [7, -12], [-15, 3], [0, 3], [15, 3], [-8, 18], [7, 18]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill="#9d86df" stroke="#24323f" strokeWidth="3" />
        ))}
      </g>
    );
  }

  if (id === "dragonfruit") {
    return (
      <g transform="translate(110 160) scale(0.82)">
        <path d="M-13 -21 L-23 -7 L-16 -8 L-23 10 L-12 5 L-8 24 L0 12 L10 24 L12 5 L23 10 L16 -8 L23 -7 L13 -21 Z" fill="#ff5f9f" stroke="#24323f" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="0" cy="1" rx="15" ry="17" fill="#fffdf7" stroke="#24323f" strokeWidth="3" />
        <circle cx="-5" cy="-4" r="2" fill="#24323f" />
        <circle cx="6" cy="2" r="2" fill="#24323f" />
        <circle cx="-2" cy="9" r="2" fill="#24323f" />
      </g>
    );
  }

  if (id === "banana") {
    return (
      <g transform="translate(110 160) scale(0.9)">
        <path d="M-18 -13 C-6 19 15 23 27 -3 C19 30 -12 31 -25 -8 Z" fill="#ffe16a" stroke="#24323f" strokeWidth="4" strokeLinejoin="round" />
        <path d="M-18 -13 L-25 -19 M27 -3 L33 -8" stroke="#8a6730" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g opacity=".35">
      <circle cx="110" cy="156" r="15" fill="#fffdf7" stroke="#24323f" strokeWidth="5" />
    </g>
  );
}

function CustomerAvatar({ customer }) {
  if (customer.sprite) {
    return <img className="customer-sprite" src={customer.sprite} alt={customer.name} draggable="false" />;
  }

  const dark = "#24323f";
  const blush = "#ff9fb5";
  const main = customer.color;

  if (customer.kind === "bunny") {
    return (
      <svg viewBox="0 0 180 180" role="img" aria-label="小兔顾客">
        <ellipse cx="63" cy="56" rx="20" ry="48" fill={main} stroke={dark} strokeWidth="5" transform="rotate(-12 63 56)" />
        <ellipse cx="117" cy="56" rx="20" ry="48" fill={main} stroke={dark} strokeWidth="5" transform="rotate(12 117 56)" />
        <ellipse cx="90" cy="102" rx="60" ry="52" fill={main} stroke={dark} strokeWidth="5" />
        <circle cx="68" cy="101" r="6" fill={dark} />
        <circle cx="112" cy="101" r="6" fill={dark} />
        <path d="M84 118 Q90 124 96 118" fill="none" stroke={dark} strokeWidth="5" strokeLinecap="round" />
        <circle cx="52" cy="116" r="8" fill={blush} opacity=".75" />
        <circle cx="128" cy="116" r="8" fill={blush} opacity=".75" />
      </svg>
    );
  }

  if (customer.kind === "cat") {
    return (
      <svg viewBox="0 0 180 180" role="img" aria-label="小猫顾客">
        <path d="M42 72 L55 30 L86 58 L119 30 L138 72 Z" fill={main} stroke={dark} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="90" cy="105" rx="60" ry="52" fill={main} stroke={dark} strokeWidth="5" />
        <circle cx="69" cy="101" r="6" fill={dark} />
        <circle cx="111" cy="101" r="6" fill={dark} />
        <path d="M82 116 Q90 122 98 116" fill="none" stroke={dark} strokeWidth="5" strokeLinecap="round" />
        <path d="M45 116 H68 M112 116 H135" stroke={dark} strokeWidth="4" strokeLinecap="round" />
        <circle cx="54" cy="126" r="7" fill={blush} opacity=".75" />
        <circle cx="126" cy="126" r="7" fill={blush} opacity=".75" />
      </svg>
    );
  }

  if (customer.kind === "dog") {
    return (
      <svg viewBox="0 0 180 180" role="img" aria-label="小狗顾客">
        <ellipse cx="47" cy="82" rx="20" ry="38" fill="#c8844e" stroke={dark} strokeWidth="5" transform="rotate(18 47 82)" />
        <ellipse cx="133" cy="82" rx="20" ry="38" fill="#c8844e" stroke={dark} strokeWidth="5" transform="rotate(-18 133 82)" />
        <ellipse cx="90" cy="103" rx="58" ry="54" fill={main} stroke={dark} strokeWidth="5" />
        <circle cx="69" cy="100" r="6" fill={dark} />
        <circle cx="111" cy="100" r="6" fill={dark} />
        <ellipse cx="90" cy="119" rx="17" ry="12" fill="#fff7e5" stroke={dark} strokeWidth="4" />
        <path d="M84 120 Q90 127 96 120" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
        <circle cx="53" cy="119" r="7" fill={blush} opacity=".75" />
        <circle cx="127" cy="119" r="7" fill={blush} opacity=".75" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 180 180" role="img" aria-label="小熊顾客">
      <circle cx="54" cy="62" r="25" fill={main} stroke={dark} strokeWidth="5" />
      <circle cx="126" cy="62" r="25" fill={main} stroke={dark} strokeWidth="5" />
      <ellipse cx="90" cy="103" rx="62" ry="56" fill={main} stroke={dark} strokeWidth="5" />
      <circle cx="69" cy="100" r="6" fill={dark} />
      <circle cx="111" cy="100" r="6" fill={dark} />
      <ellipse cx="90" cy="119" rx="20" ry="14" fill="#fff3d8" stroke={dark} strokeWidth="4" />
      <path d="M83 120 Q90 127 97 120" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
      <circle cx="52" cy="120" r="8" fill={blush} opacity=".72" />
      <circle cx="128" cy="120" r="8" fill={blush} opacity=".72" />
    </svg>
  );
}

function MilkTeaCup({ selected, decoration = defaultDecoration }) {
  const base = findOption(bases, selected.base);
  const sweet = findOption(sweets, selected.sweet);
  const topping = findOption(toppings, selected.topping);
  const straw = findOption(decorations.straws, decoration.straw);
  const sticker = findOption(decorations.stickers, decoration.sticker);
  const drinkColor = base?.color || "#e8f7f2";
  const strawColor = straw?.color || sweet?.color || "#82b9ff";
  const toppingColor = topping?.color || "#ffffff";

  return (
    <svg viewBox="0 0 220 280" role="img" aria-label="正在制作的奶茶">
      <path d="M127 20 L154 132" stroke={strawColor} strokeWidth="13" strokeLinecap="round" />
      <path d="M48 79 H172 L155 244 Q153 260 137 260 H83 Q67 260 65 244 Z" fill="#ffffff" stroke="#24323f" strokeWidth="7" strokeLinejoin="round" />
      <path d="M61 111 H159 L146 231 Q145 242 134 242 H86 Q75 242 74 231 Z" fill={drinkColor} opacity=".88" />
      <path d="M64 111 H156" stroke="#24323f" strokeWidth="5" strokeLinecap="round" opacity=".16" />
      <circle cx="89" cy="216" r="9" fill={toppingColor} stroke="#24323f" strokeWidth="3" opacity={topping ? 1 : 0.18} />
      <circle cx="112" cy="225" r="9" fill={toppingColor} stroke="#24323f" strokeWidth="3" opacity={topping ? 1 : 0.18} />
      <circle cx="132" cy="207" r="9" fill={toppingColor} stroke="#24323f" strokeWidth="3" opacity={topping ? 1 : 0.18} />
      <path d="M76 78 Q110 58 144 78" fill="none" stroke="#24323f" strokeWidth="7" strokeLinecap="round" />
      <CupMark id={base?.id} />
      {sticker && (
        <g transform="translate(110 155)">
          <circle r="23" fill={sticker.color} stroke="#24323f" strokeWidth="5" />
          <text y="9" textAnchor="middle" fontSize="28" fontWeight="900" fill="#e25378">
            {sticker.mark}
          </text>
        </g>
      )}
    </svg>
  );
}

function ChoiceGroup({ title, step, group, items, selectedId, onChoose, columns = 4, hintId, correctId }) {
  return (
    <section className="choice-group" aria-labelledby={`${group}Title`}>
      <div className="choice-title">
        <span className="step-dot">{step}</span>
        <h3 id={`${group}Title`}>{title}</h3>
      </div>
      <div className={`choice-grid columns-${columns}`}>
        {items.map((item) => {
          const isCorrect = selectedId === item.id && correctId === item.id;
          return (
            <button
              className={`choice-button ${selectedId === item.id ? "is-selected" : ""} ${hintId === item.id ? "is-hint" : ""} ${isCorrect ? "is-correct" : ""}`}
              type="button"
              key={item.id}
              aria-pressed={selectedId === item.id}
              onClick={() => onChoose(group, item.id)}
            >
              <span className="choice-swatch" style={{ "--swatch": item.color }}>
                <IngredientIcon id={item.id} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DecorationIcon({ item }) {
  return (
    <span className="decoration-mark" aria-hidden="true">
      {item.mark ?? "●"}
    </span>
  );
}

function DecorationGroup({ title, items, selectedId, onChoose }) {
  return (
    <section className="decoration-group">
      <h3>{title}</h3>
      <div className="decoration-grid">
        {items.map((item) => (
          <button
            className={`decoration-button ${selectedId === item.id ? "is-selected" : ""}`}
            type="button"
            key={item.id}
            aria-pressed={selectedId === item.id}
            onClick={() => onChoose(item.id)}
          >
            <span className="decoration-swatch" style={{ "--swatch": item.color }}>
              <DecorationIcon item={item} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function StickerShelf({ stickers }) {
  if (!stickers.length) return null;

  return (
    <section className="sticker-shelf" aria-label="贴纸奖励">
      <span className="score-label">
        <Sparkles size={16} strokeWidth={3} />
        Stickers
      </span>
      <div>
        {stickers.map((sticker, index) => (
          <span className="reward-sticker" style={{ "--sticker-bg": sticker.color }} key={`${sticker.id}-${index}`} title={sticker.label}>
            {sticker.mark}
          </span>
        ))}
      </div>
    </section>
  );
}

function OrderTicket({ order, patience, onSpeak }) {
  const parts = makeOrderParts(order);

  return (
    <article className="ticket" aria-label="顾客小票">
      <div className="ticket-pin" aria-hidden="true">
        <ClipboardList size={15} strokeWidth={3} />
      </div>
      <div className="ticket-heading">
        <p className="small-label">Order Ticket</p>
        <button className="listen-button" type="button" aria-label="Listen to order" onClick={onSpeak}>
          <Volume2 size={16} strokeWidth={3} />
          Listen
        </button>
      </div>
      <h3>{order.name}</h3>
      <ul className="order-parts">
        {parts.map((part) => (
          <li key={part.prefix}>
            <span className="part-icon" style={{ "--icon-bg": part.color }}>
              <IngredientIcon id={part.id} />
            </span>
            <span>
              <strong>{part.prefix}</strong>
              {part.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="patience">
        <span>
          <Timer size={16} strokeWidth={3} />
          Happy Timer
        </span>
        <div className="patience-track">
          <div className="patience-fill" style={{ width: `${patience}%` }} />
        </div>
      </div>
    </article>
  );
}

function ShopStage({ queue, order, patience, selected, decoration, onSpeak }) {
  const patienceState = patience > 55 ? "happy" : patience > 24 ? "waiting" : "urgent";

  return (
    <section className="shop-stage" aria-label="2D 奶茶店场景">
      <div className="stage-sky" aria-hidden="true">
        <span className="cloud cloud-one" />
        <span className="cloud cloud-two" />
        <span className="sun-dot" />
      </div>

      <div className="shopfront" aria-hidden="true">
        <div className="shop-sign">
          <Sparkles size={18} strokeWidth={3} />
          Rainbow Tea
        </div>
        <div className="shop-window">
          <span />
          <span />
          <span />
        </div>
        <div className="shop-door" />
      </div>

      <div className="counter-area">
        <div className="barista-side" aria-hidden="true">
          <div className="counter-machine">
            <span className="machine-face" />
            <span className="machine-light" />
          </div>
          <div className="counter-cup">
            <MilkTeaCup selected={selected} decoration={decoration} />
          </div>
        </div>

        <div className="customer-line" aria-label="小动物排队">
          {queue.map((queuedCustomer, index) => (
            <div
              className={`line-customer ${index === 0 ? "is-current" : ""}`}
              style={{ "--queue-index": index }}
              key={queuedCustomer.name}
            >
              {index === 0 && (
                <div className={`order-bubble is-${patienceState}`}>
                  <button className="bubble-listen" type="button" aria-label="Listen to order" onClick={onSpeak}>
                    <Volume2 size={14} strokeWidth={3} />
                  </button>
                  <strong>{order.name}</strong>
                  <span>{queuedCustomer.mood}</span>
                </div>
              )}
              <div className="stage-avatar" aria-hidden="true">
                <CustomerAvatar customer={queuedCustomer} />
              </div>
              <span className="line-name">{queuedCustomer.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stage-floor" aria-hidden="true">
        <span className="floor-heart">♥</span>
        <span className="floor-star">★</span>
        <span className="floor-dot" />
      </div>
    </section>
  );
}

function RecipeBook() {
  return (
    <section className="recipe-book" aria-label="Recipe Book">
      <div className="section-heading">
        <h2>Recipe Book</h2>
        <p>Match the three words on the ticket.</p>
      </div>
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <h3>{recipe.name}</h3>
            <ul>
              {makeOrderParts(recipe).map((part) => (
                <li key={part.prefix}>
                  <span className="recipe-icon" style={{ "--icon-bg": part.color }}>
                    <IngredientIcon id={part.id} />
                  </span>
                  {part.label}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [score, setScore] = useState(0);
  const [served, setServed] = useState(0);
  const [order, setOrder] = useState(() => pickRandom(recipes));
  const [customerQueue, setCustomerQueue] = useState(() => makeInitialCustomerQueue());
  const [selected, setSelected] = useState(emptySelection);
  const [patience, setPatience] = useState(100);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [cupPulse, setCupPulse] = useState(0);
  const [scorePulse, setScorePulse] = useState(0);
  const [burst, setBurst] = useState(0);
  const [hintGroup, setHintGroup] = useState(null);
  const [decorating, setDecorating] = useState(false);
  const [decoration, setDecoration] = useState(defaultDecoration);
  const [stickers, setStickers] = useState([]);
  const [audioStarted, setAudioStarted] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const spokenOrderRef = useRef(null);

  const selectedLabel = useMemo(() => {
    const labels = [
      findOption(bases, selected.base)?.label,
      findOption(sweets, selected.sweet)?.label,
      findOption(toppings, selected.topping)?.label,
    ].filter(Boolean);

    return labels.length ? labels.join(" + ") : "Choose a base";
  }, [selected]);

  const nextOrder = useCallback((message) => {
    setSelected({ ...emptySelection });
    setOrder((current) => pickRandom(recipes, current?.id));
    setCustomerQueue((currentQueue) => {
      const remainingQueue = currentQueue.slice(1);
      return [...remainingQueue, pickNextCustomerForQueue(remainingQueue)];
    });
    setPatience(100);
    setFeedback(message ?? defaultFeedback);
    setHintGroup(null);
    setDecorating(false);
    setDecoration({ ...defaultDecoration });
  }, []);

  useEffect(() => {
    if (finished) return undefined;

    const timerId = window.setInterval(() => {
      setPatience((current) => Math.max(0, current - 1));
    }, 360);

    return () => window.clearInterval(timerId);
  }, [order.id, finished]);

  useEffect(() => {
    if (finished || patience !== 0) return undefined;

    setFeedback({
      text: "This friend went back to the menu. Next customer!",
      type: "try",
    });
    playTone("timeout", sfxOn);

    const timeoutId = window.setTimeout(() => nextOrder(), 700);
    return () => window.clearTimeout(timeoutId);
  }, [finished, nextOrder, patience, sfxOn]);

  useEffect(() => {
    if (!musicOn) {
      stopBackgroundMusic();
    }
  }, [musicOn]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return undefined;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    if (audioStarted && !finished && spokenOrderRef.current !== order.id) {
      spokenOrderRef.current = order.id;
      playOrderVoice(order, sfxOn);
    }
  }, [audioStarted, finished, order.id, sfxOn]);

  useEffect(() => () => stopBackgroundMusic(), []);

  const startAudio = () => {
    setAudioStarted(true);
    spokenOrderRef.current = order.id;
    playOrderVoice(order, sfxOn);
    startBackgroundMusic(musicOn);
  };

  const choosePart = (group, id) => {
    setAudioStarted(true);
    startBackgroundMusic(musicOn);
    setSelected((current) => ({ ...current, [group]: id }));
    setHintGroup(null);
    setCupPulse((current) => current + 1);

    if (id === order[group]) {
      setFeedback({
        text: `Yes! ${findOption(group === "base" ? bases : group === "sweet" ? sweets : toppings, id)?.label} is right.`,
        type: "good",
      });
      playTone("hint", sfxOn);
      return;
    }

    setFeedback({
      text: "Try again. Listen or tap Hint.",
      type: "try",
    });
    playTone("try", sfxOn);
  };

  const resetSelection = () => {
    setAudioStarted(true);
    startBackgroundMusic(musicOn);
    setSelected({ ...emptySelection });
    setHintGroup(null);
    setDecorating(false);
    setDecoration({ ...defaultDecoration });
    setCupPulse((current) => current + 1);
    setFeedback({
      text: "Cup cleared. Choose again.",
      type: "",
    });
    playTone("reset", sfxOn);
  };

  const showHint = () => {
    setAudioStarted(true);
    const nextGroup = findNextGroup(selected, order) ?? "base";
    setHintGroup(nextGroup);
    const nextItem = findOption(nextGroup === "base" ? bases : nextGroup === "sweet" ? sweets : toppings, order[nextGroup]);
    setFeedback({
      text: `Look for ${nextItem?.label}.`,
      type: "good",
    });
    speakEnglish(`Choose ${nextItem?.label}.`, sfxOn);
    startBackgroundMusic(musicOn);
    playTone("hint", sfxOn);
  };

  const speakOrder = () => {
    setAudioStarted(true);
    spokenOrderRef.current = order.id;
    playOrderVoice(order, sfxOn);
    startBackgroundMusic(musicOn);
  };

  const serveDrink = () => {
    setAudioStarted(true);
    startBackgroundMusic(musicOn);
    const isComplete = selected.base && selected.sweet && selected.topping;

    if (!isComplete) {
      setCupPulse((current) => current + 1);
      setFeedback({
        text: "One step is missing: Base, Sweetness, and Topping.",
        type: "try",
      });
      playTone("try", sfxOn);
      return;
    }

    const matched =
      selected.base === order.base &&
      selected.sweet === order.sweet &&
      selected.topping === order.topping;

    if (!matched) {
      setCupPulse((current) => current + 1);
      setFeedback({
        text: "Almost! Check the three words on the ticket.",
        type: "try",
      });
      playTone("try", sfxOn);
      return;
    }

    const bonus = patience > 55 ? 3 : 1;

    setDecorating(true);
    setHintGroup(null);
    setFeedback({
      text: `Great recipe! Decorate the cup for +${10 + bonus} stars.`,
      type: "good",
    });
    playTone("good", sfxOn);
  };

  const chooseDecoration = (group, id) => {
    setAudioStarted(true);
    startBackgroundMusic(musicOn);
    setDecoration((current) => ({ ...current, [group]: id }));
    setCupPulse((current) => current + 1);
    setFeedback({
      text: "Cute choice!",
      type: "good",
    });
    playTone("select", sfxOn);
  };

  const finishCup = () => {
    setAudioStarted(true);
    startBackgroundMusic(musicOn);
    const bonus = patience > 55 ? 3 : 1;
    const nextServed = served + 1;
    const reward = pickRandom(rewardStickers);

    setScore((current) => current + 10 + bonus);
    setServed(nextServed);
    setStickers((current) => [...current, reward]);
    setScorePulse((current) => current + 1);
    setBurst((current) => current + 1);
    setDecorating(false);
    setFeedback({
      text: `Served! You got a ${reward.label} sticker.`,
      type: "good",
    });
    playTone("good", sfxOn);

    if (nextServed >= TARGET_CUPS) {
      setFinished(true);
      return;
    }

    window.setTimeout(() => nextOrder(), 900);
  };

  const restartGame = () => {
    setScore(0);
    setServed(0);
    setStickers([]);
    setHintGroup(null);
    setDecorating(false);
    setDecoration({ ...defaultDecoration });
    setSelected({ ...emptySelection });
    setOrder(pickRandom(recipes));
    setCustomerQueue(makeInitialCustomerQueue());
    setPatience(100);
    setFinished(false);
    setAudioStarted(false);
    spokenOrderRef.current = null;
    setFeedback({
      text: "New round. Read the ticket and make the drink.",
      type: "",
    });
  };

  return (
    <main className="game-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">幼儿园小店员练习</p>
          <h1>🌈彩虹奶茶店</h1>
        </div>
        <div className="top-actions">
          <button
            className={`sound-toggle ${musicOn ? "is-on" : ""}`}
            type="button"
            aria-label={musicOn ? "关闭音乐" : "打开音乐"}
            onClick={() => {
              const next = !musicOn;
              setMusicOn(next);
              if (next) {
                startBackgroundMusic(true);
              } else {
                stopBackgroundMusic();
              }
            }}
          >
            <Music size={18} strokeWidth={3} />
            <span>{musicOn ? "Music On" : "Music Off"}</span>
          </button>
          <button
            className={`sound-toggle ${sfxOn ? "is-on" : ""}`}
            type="button"
            aria-label={sfxOn ? "关闭音效" : "打开音效"}
            onClick={() => {
              startBackgroundMusic(musicOn);
              setSfxOn((current) => !current);
            }}
          >
            {sfxOn ? <Volume2 size={18} strokeWidth={3} /> : <VolumeX size={18} strokeWidth={3} />}
            <span>{sfxOn ? "SFX On" : "SFX Off"}</span>
          </button>
          <button className="sound-toggle" type="button" aria-label="打开配方书" onClick={() => setRecipeOpen(true)}>
            <BookOpen size={18} strokeWidth={3} />
            <span>Recipe</span>
          </button>
          <section className="scoreboard" aria-label="游戏分数">
            <div>
              <span className="score-label">
                <Star size={16} fill="currentColor" strokeWidth={3} />
                星星
              </span>
              <strong className="score-pop" key={`score-${scorePulse}`}>
                {score}
              </strong>
            </div>
            <div>
              <span className="score-label">
                <Sparkles size={16} strokeWidth={3} />
                完成
              </span>
              <strong>
                {served}/{TARGET_CUPS}
              </strong>
            </div>
          </section>
          <StickerShelf stickers={stickers} />
        </div>
      </header>

      <section className="shop-scene" aria-label="奶茶店柜台">
        <div className="awning" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="shop-floor">
          <section className="customer-zone">
            <ShopStage
              queue={customerQueue}
              order={order}
              patience={patience}
              selected={selected}
              decoration={decoration}
              onSpeak={speakOrder}
            />

            <OrderTicket order={order} patience={patience} onSpeak={speakOrder} key={order.id} />
          </section>

          <section className="workbench" aria-label="制作奶茶">
            <div className="cup-preview">
              <div className="cup-art" aria-hidden="true" key={`cup-${cupPulse}`}>
                <MilkTeaCup selected={selected} decoration={decoration} />
              </div>
              <p>{selectedLabel}</p>
            </div>

            <div className="maker-panel">
              {decorating ? (
                <>
                  <div className="decorate-banner">
                    <Sparkles size={19} strokeWidth={3} />
                    Decorate your drink
                  </div>
                  <DecorationGroup title="Straw" items={decorations.straws} selectedId={decoration.straw} onChoose={(id) => chooseDecoration("straw", id)} />
                  <DecorationGroup title="Cup Sticker" items={decorations.stickers} selectedId={decoration.sticker} onChoose={(id) => chooseDecoration("sticker", id)} />
                  <div className="actions">
                    <button className="primary-action" type="button" onClick={finishCup}>
                      <Check size={20} strokeWidth={3} />
                      Done
                    </button>
                    <button className="icon-action" type="button" aria-label="重新选择" onClick={resetSelection}>
                      <RotateCcw size={21} strokeWidth={3} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <ChoiceGroup
                    title="Base"
                    step="1"
                    group="base"
                    items={bases}
                    selectedId={selected.base}
                    onChoose={choosePart}
                    hintId={hintGroup === "base" ? order.base : null}
                    correctId={order.base}
                  />
                  <ChoiceGroup
                    title="Sweetness"
                    step="2"
                    group="sweet"
                    items={sweets}
                    selectedId={selected.sweet}
                    onChoose={choosePart}
                    columns={3}
                    hintId={hintGroup === "sweet" ? order.sweet : null}
                    correctId={order.sweet}
                  />
                  <ChoiceGroup
                    title="Topping"
                    step="3"
                    group="topping"
                    items={toppings}
                    selectedId={selected.topping}
                    onChoose={choosePart}
                    hintId={hintGroup === "topping" ? order.topping : null}
                    correctId={order.topping}
                  />

                  <div className="actions">
                    <button className="primary-action" type="button" onClick={serveDrink}>
                      <Check size={20} strokeWidth={3} />
                      Serve
                    </button>
                    <button className="soft-action" type="button" onClick={showHint}>
                      <Lightbulb size={19} strokeWidth={3} />
                      Hint
                    </button>
                    <button className="icon-action" type="button" aria-label="重新选择" onClick={resetSelection}>
                      <RotateCcw size={21} strokeWidth={3} />
                    </button>
                  </div>
                </>
              )}
              <p className={`feedback ${feedback.type}`} role="status" aria-live="polite" key={`${feedback.type}-${feedback.text}`}>
                {feedback.text}
              </p>
            </div>
            {burst > 0 && (
              <div className="success-effect" aria-hidden="true" key={`burst-${burst}`}>
                <div className="success-ring" />
                <div className="success-badge">Great!</div>
                <div className="star-burst">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div className="confetti-burst">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </section>
        </div>
      </section>

      {finished && (
        <div className="finish-layer" role="presentation">
          <section className="finish-dialog" role="dialog" aria-modal="true" aria-labelledby="finishTitle">
            <div className="finish-art" aria-hidden="true">
              <Star fill="currentColor" size={38} />
            </div>
            <h2 id="finishTitle">午茶时间完成</h2>
            <p>
              你帮小顾客做好了 {served} 杯奶茶，收集了 {score} 颗星星。
            </p>
            <StickerShelf stickers={stickers} />
            <button className="primary-action" type="button" onClick={restartGame}>
              <RotateCcw size={19} strokeWidth={3} />
              再开一局
            </button>
          </section>
        </div>
      )}

      {recipeOpen && (
        <div className="recipe-layer" role="presentation">
          <section className="recipe-dialog" role="dialog" aria-modal="true" aria-labelledby="recipeTitle">
            <div className="recipe-dialog-heading">
              <h2 id="recipeTitle">Recipe Book</h2>
              <button className="icon-action" type="button" aria-label="关闭配方书" onClick={() => setRecipeOpen(false)}>
                ×
              </button>
            </div>
            <RecipeBook />
          </section>
        </div>
      )}

      {!audioStarted && !finished && (
        <div className="start-layer" role="presentation">
          <section className="start-dialog" role="dialog" aria-modal="true" aria-labelledby="startTitle">
            <div className="finish-art" aria-hidden="true">
              <Music size={36} strokeWidth={3} />
            </div>
            <h2 id="startTitle">准备开店</h2>
            <p>点一下开始营业，音乐和顾客点单语音就会响起。</p>
            <button className="primary-action" type="button" onClick={startAudio}>
              <Volume2 size={19} strokeWidth={3} />
              开始营业
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
