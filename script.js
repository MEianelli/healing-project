/// <reference path="./p5.global-mode.d.ts" />;
import { data } from './data.js';
const { boss, healthBars, player } = data;

const bossSpellList = document.querySelector('.spell-list');
const healthBarsContainer = document.querySelector('.health-container');
const timeLine = document.querySelector('.timeline-container');
const sliderBar = document.querySelector('.slider');
let spellSliders;
let healthBarsDivs;
let animationRun = true;
let mouseIsPressed = false;
let globalTimer = 0;
let mouseTimer = 0;

window.onload = function () {
  createBossSpellList(boss);
  createHealthBars();
  createBossSpellSliders(boss);
  calculatePixelsPerFrame(boss);
  calculateHealthPerPixel();
  spellSliders = document.querySelectorAll('.spell-slider');
  healthBarsDivs = document.querySelectorAll('.health-bar');
  //startAnimation();
};

async function startAnimation() {
  globalTimer += 1;

  updateBossSpellsPosition(boss);
  updateBossSpellsDivs(spellSliders, boss);

  await calculateDamage();
  await updateDamage();
  await applyDamage();
  await updateHealthDivs();

  castingSpell();

  if (animationRun) {
    setTimeout(() => {
      startAnimation();
    }, 16.67);
  }
}

function updateDivColor(div) {
  const percent = div.style.width;
  const percentToint = +percent.slice(0, percent.length - 1);
  if (percentToint < 33) div.style.backgroundColor = 'rgb(254, 0, 0)';
  else if (percentToint < 66) div.style.backgroundColor = 'rgb(254, 196, 0)';
  else div.style.backgroundColor = 'rgb(0, 216, 143)';
}

async function updateHealthDivs() {
  healthBarsDivs.forEach((div, index) => {
    const delta = healthBars[index].maxHealth - healthBars[index].currentHealth;
    const percentHealth = delta / healthBars[index].maxHealth;
    const percent = (1 - percentHealth) * 100;
    div.style.width = `${percent}%`;
    updateDivColor(div);
  });
}

async function applyDamage() {
  healthBars.forEach(bar => {
    const {
      damage: { totalDmg },
    } = bar;
    bar['currentHealth'] -= totalDmg;
  });
}

async function calculateDamage() {
  const arrayTargets = [];
  const target1 = Math.floor(Math.random() * healthBars.length);
  const target2 = Math.floor(Math.random() * healthBars.length);
  const target3 = Math.floor(Math.random() * healthBars.length);
  arrayTargets.push(target1, target2, target3);
  arrayTargets.forEach(target => {
    const dmg = Math.floor(Math.random() * 100);
    healthBars[target].damage.currentDmg = dmg;
  });
}

async function updateDamage() {
  healthBars.forEach(bar => {
    const {
      damage: { currentDmg, dot },
    } = bar;
    bar.damage['totalDmg'] = currentDmg + dot;
    bar.damage['currentDmg'] = 0;
  });
}

function calculateHealthPerPixel() {
  const barSize = document.querySelectorAll('.health-bar')[0].offsetWidth;
  healthBars.forEach(healthbar => {
    const pixelPerhealth = barSize / healthbar.maxHealth;
    healthbar['pixelPerhealth'] = pixelPerhealth;
  });
}

function updateBossSpellsDivs(spellSliders, { spells }) {
  spellSliders.forEach((slide, index) => {
    slide.style.transform = `translateX(-${spells[index].currentPosition}px)`;
  });
}

function updateBossSpellsPosition({ spells }) {
  spells.forEach(async spell => {
    spell.currentPosition += spell.pixelPerFrame;
    if (spell.currentPosition > sliderBar.offsetWidth - 7) {
      await callForAction(spell);
      spell.currentPosition = 0;
    }
  });
}

function calculatePixelsPerFrame({ spells }) {
  const widthSize = sliderBar.offsetWidth;
  spells.forEach(slider => {
    const pixelSecond = widthSize / slider.duration;
    const pixelFrame = pixelSecond / 60;
    slider['pixelPerFrame'] = pixelFrame;
  });
}

async function callForAction(spell) {
  if (spell.spellId === 'fight-end') animationRun = false;
}

function createBossSpellSliders({ spells }) {
  spells.forEach(element => {
    const slide = document.createElement('div');
    slide.className = 'spell-slider';
    slide.id = element.spellId;
    slide.style.backgroundColor = element.spellColor;
    timeLine.appendChild(slide);
  });
}

function createBossSpellList({ spells }) {
  spells.forEach(element => {
    const newSpell = document.createElement('li');
    const spellIcon = document.createElement('div');
    const spellText = document.createElement('div');

    spellIcon.className = 'boss-spell-icon';
    spellText.className = 'boss-spell-text';

    spellIcon.style.backgroundColor = element.spellColor;
    spellText.innerHTML = element.spellName;

    newSpell.appendChild(spellIcon);
    newSpell.appendChild(spellText);

    newSpell.className = 'boss-spell';

    bossSpellList.appendChild(newSpell);
  });
}

function castingSpell() {
  if (mouseIsPressed) {
    console.log('CASTING');
  }
}

function handleDownOnHealth(healthBar) {
  mouseIsPressed = true;
  mouseTimer = globalTimer;
}

function handleUpOnHealth(healthBar) {
  mouseIsPressed = false;
  if (globalTimer - mouseTimer < 8) return console.log('CLICK RAPIDO');
  return console.log(`CASTOU POR ${globalTimer - mouseTimer} frames`);
}

function createHealthBars() {
  healthBars.forEach(bar => {
    const borderBar = document.createElement('div');
    const healthBar = document.createElement('div');

    borderBar.className = 'border-bar';
    healthBar.className = 'health-bar';
    healthBar.addEventListener('mousedown', () => {
      handleDownOnHealth(bar);
    });
    healthBar.addEventListener('mouseup', () => {
      handleUpOnHealth(bar);
    });

    if (Math.random() < 0.3) {
      if (Math.random() < 0.5) {
        borderBar.classList.add('aura-green');
      } else {
        borderBar.classList.add('aura-white');
      }
    }

    borderBar.appendChild(healthBar);
    healthBarsContainer.appendChild(borderBar);
  });
}
