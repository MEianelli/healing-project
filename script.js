/// <reference path="./p5.global-mode.d.ts" />;
import { data } from './data.js';
const { boss, healthBars, player } = data;

const bossSpellList = document.querySelector('.spell-list');
const healthBarsContainer = document.querySelector('.health-container');
const timeLine = document.querySelector('.timeline-container');
const sliderBar = document.querySelector('.slider');
let spellSliders;
let healthBarsDivs;
let borderDiv;
let castingDiv;
let hotsDiv;
let activeHots = [];
let healTarget = null;
let animationRun = true;
let castingTimer = 0;
let globalTimer = 0;
let mouseTimer = 0;

window.onload = function () {
  createBossSpellList(boss);
  createHealthBars();
  createBossSpellSliders(boss);
  calculatePixelsPerFrame(boss);
  calculateHealthPerPixel();
  calculatehotsPercentPerFrame();
  spellSliders = document.querySelectorAll('.spell-slider');
  healthBarsDivs = document.querySelectorAll('.health-bar');
  borderDiv = document.querySelectorAll('.border-bar');
  castingDiv = document.querySelectorAll('.top-border');
  hotsDiv = document.querySelectorAll('.bottom-border');

  startAnimation();
};

function startAnimation() {
  globalTimer += 1;

  updateBossSpellsPosition(boss);
  updateBossSpellsDivs(spellSliders, boss);

  calculateDamage();
  updateDamage();
  applyDamage();
  updateHealthDivs();

  if (healTarget !== null) castingHeal(healTarget);
  if (activeHots.length !== 0) hotsCountDown();

  if (animationRun) {
    setTimeout(() => {
      startAnimation();
    }, 16.67);
  }
}

function hotsCountDown() {
  activeHots.forEach(([barobj, index]) => {
    barobj.auras.healOverTime['currentWidth'] -= barobj.auras.healOverTime.percentFrame;
    hotsDiv[index].style.width = `${barobj.auras.healOverTime.currentWidth}%`;
    if (barobj.auras.healOverTime.currentWidth <= 0) {
      activeHots.shift();
      barobj.auras.healOverTime.currentWidth = 86;
      barobj.auras.healOverTime.active = false;
    }
  });
}

function resetCasting(index) {
  castingTimer = 0;
  castingDiv[index].style.width = `0%`;
  healTarget = null;
  castingDiv[index].style.display = 'none';
}

function castingHeal(index) {
  castingDiv[index].style.width = `${castingTimer}%`;
  castingTimer += 1;
  if (castingTimer > 86) {
    resetCasting(index);
  }
}

function updateDivColor(div) {
  const percent = div.style.width;
  const percentToint = +percent.slice(0, percent.length - 1);
  if (percentToint < 33) div.style.backgroundColor = 'rgb(254, 0, 0)';
  else if (percentToint < 66) div.style.backgroundColor = 'rgb(254, 196, 0)';
  else div.style.backgroundColor = 'rgb(0, 216, 143)';
}

function updateHealthDivs() {
  healthBarsDivs.forEach((div, index) => {
    const delta = healthBars[index].maxHealth - healthBars[index].currentHealth;
    const percentHealth = delta / healthBars[index].maxHealth;
    const percent = (1 - percentHealth) * 94;
    div.style.width = `${percent}%`;
    updateDivColor(div);
  });
}

function applyDamage() {
  healthBars.forEach(bar => {
    const {
      damage: { totalDmg },
    } = bar;
    bar['currentHealth'] -= totalDmg;
  });
}

function calculateDamage() {
  const arrayTargets = [];
  const target1 = Math.floor(Math.random() * healthBars.length);
  const target2 = Math.floor(Math.random() * healthBars.length);
  const target3 = Math.floor(Math.random() * healthBars.length);
  arrayTargets.push(target1, target2, target3);
  arrayTargets.forEach(target => {
    const dmg = Math.floor(Math.random() * 10);
    healthBars[target].damage.currentDmg = dmg;
  });
}

function updateDamage() {
  healthBars.forEach(bar => {
    const {
      damage: { currentDmg, dot },
    } = bar;
    bar.damage['totalDmg'] = currentDmg + dot;
    bar.damage['currentDmg'] = 0;
  });
}

function calculatehotsPercentPerFrame() {
  healthBars.forEach(bar => {
    const percentperFrame = 86 / (bar.auras.healOverTime.duration * 60);
    bar.auras.healOverTime['percentFrame'] = percentperFrame;
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
function displayCastingBar(index) {
  castingDiv[index].style.display = 'block';
}

function displayHotBar(index) {
  hotsDiv[index].style.display = 'block';
}

function handleDownOnHealth(healthBar, index) {
  mouseTimer = globalTimer;
  displayCastingBar(index);
  healTarget = index;
}

function handleUpOnHealth(healthBar, index) {
  if (globalTimer - mouseTimer < 8) {
    displayHotBar(index);
    if (!healthBar.auras.healOverTime.active) {
      activeHots.push([healthBar, index]);
      healthBar.auras.healOverTime.active = true;
    }
    resetCasting(healTarget);
    return;
  }
  resetCasting(healTarget);
}

function createHealthBars() {
  healthBars.forEach((bar, index) => {
    const healthWraper = document.createElement('div');
    const borderBar = document.createElement('div');
    const healthBar = document.createElement('div');
    const topBorder = document.createElement('div');
    const topBorderStatic = document.createElement('div');
    const bottomBorder = document.createElement('div');
    const bottomBorderStatic = document.createElement('div');
    const healthBackground = document.createElement('div');

    healthBackground.className = 'health-background';
    healthWraper.className = 'health-wraper';
    topBorder.className = 'top-border';
    topBorderStatic.className = 'top-border-static';
    bottomBorder.className = 'bottom-border';
    bottomBorderStatic.className = 'bottom-border-static';
    borderBar.className = 'border-bar';
    healthBar.className = 'health-bar';
    borderBar.addEventListener('mousedown', () => {
      handleDownOnHealth(bar, index);
    });
    borderBar.addEventListener('mouseup', () => {
      handleUpOnHealth(bar, index);
    });

    borderBar.appendChild(healthBackground);
    borderBar.appendChild(healthBar);
    healthWraper.appendChild(borderBar);
    healthWraper.appendChild(topBorder);
    healthWraper.appendChild(topBorderStatic);
    healthWraper.appendChild(bottomBorder);
    healthWraper.appendChild(bottomBorderStatic);
    healthBarsContainer.appendChild(healthWraper);
  });
}
