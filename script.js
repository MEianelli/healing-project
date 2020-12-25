import { data } from './data.js';
const { boss, healthBars, player } = data;

const bossSpellList = document.querySelector('.spell-list');
const healthBarsContainer = document.querySelector('.health-container');
const timeLine = document.querySelector('.timeline-container');
const sliderBar = document.querySelector('.slider');
const manaBarDiv = document.querySelector('#mana-bar');
const manaTextDiv = document.querySelector('.mana-bar-text');
const swipeButton = document.querySelector('#swipe-button');
const ultimateButton = document.querySelector('#ultimate-button');
manaTextDiv.innerHTML = `${player.manaBar['currentMana']}`;
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
let overhealing = 0;
let swipeCD = false;
let ultimateCD = false;

window.onload = function () {
  createBossSpellList(boss);
  createHealthBars();
  createBossSpellSliders(boss);
  addClickToHealButtons();
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

  updateDamage();
  applyDamage();
  updateHealthDivs();

  if (healTarget !== null) castingHeal(healTarget);
  if (activeHots.length !== 0) hotsCountDown();
  if (swipeCD) swipeCoolDown();
  if (ultimateCD) ultimateCoolDown();

  if (animationRun) {
    setTimeout(() => {
      startAnimation();
    }, 16.67);
  }
}

function swipeCoolDown() {
  let tempWidthPercent = player.skills.aoe.currentWidth;
  tempWidthPercent -= player.skills.aoe.percentFrame;
  if (tempWidthPercent < 0) {
    tempWidthPercent = 100;
    swipeCD = false;
  }
  swipeButton.style.width = `${tempWidthPercent}%`;
  player.skills.aoe['currentWidth'] = tempWidthPercent;
}

function ultimateCoolDown() {
  let tempWidthPercent = player.skills.ultimate.currentWidth;
  tempWidthPercent -= player.skills.ultimate.percentFrame;
  if (tempWidthPercent < 0) {
    tempWidthPercent = 100;
    ultimateCD = false;
  }
  ultimateButton.style.width = `${tempWidthPercent}%`;
  player.skills.ultimate['currentWidth'] = tempWidthPercent;
}

function swipeHeal() {
  healthBars.forEach((bar, index) => {
    applyHealOnTarget(index, 'aoe');
  });
  updateMana('aoe');
}

function ultimateHeal() {
  const currenthealth = healthBars.map(bar => bar.currentHealth);
  const lowest = currenthealth.indexOf(Math.min(...currenthealth));
  applyHealOnTarget(lowest, 'ultimate');
  updateMana('ultimate');
}

function addClickToHealButtons() {
  document.querySelector('.swipe-container').addEventListener('click', () => {
    if (!swipeCD && player.manaBar.currentMana >= player.skills.aoe.manaCost) {
      swipeHeal();
      swipeCD = true;
    }
  });
  document.querySelector('.ult-container').addEventListener('click', () => {
    if (!ultimateCD && player.manaBar.currentMana >= player.skills.ultimate.manaCost) {
      ultimateHeal();
      ultimateCD = true;
    }
  });
}

function applyHealOnTarget(index, type) {
  healthBars[index]['currentHealth'] += player.skills[type].amountToHeal;
  if (healthBars[index]['currentHealth'] > healthBars[index]['maxHealth']) {
    overhealing += healthBars[index]['currentHealth'] - healthBars[index]['maxHealth'];
    healthBars[index]['currentHealth'] = healthBars[index]['maxHealth'];
  }
}

function updateMana(type) {
  player.manaBar['currentMana'] -= player.skills[type].manaCost;
  let manaBarWidthPercentage = (player.manaBar.currentMana / player.manaBar.maxMana) * 100;
  if (manaBarWidthPercentage <= 0) {
    manaBarWidthPercentage = 0;
    player.manaBar['currentMana'] = 0;
  }
  manaBarDiv.style.width = `${manaBarWidthPercentage}%`;
  manaTextDiv.innerHTML = `${player.manaBar['currentMana']}`;
}

function hotsCountDown() {
  activeHots.forEach(([barobj, index]) => {
    let tempVarForWidth = barobj.auras.healOverTime.currentWidth;
    tempVarForWidth -= barobj.auras.healOverTime.percentFrame;

    if (tempVarForWidth % 16 < 0.3 && tempVarForWidth > 5) {
      applyHealOnTarget(index, 'hot');
    }
    hotsDiv[index].style.width = `${tempVarForWidth}%`;
    if (barobj.auras.healOverTime.currentWidth <= 0) {
      activeHots.shift();
      tempVarForWidth = 86;
      barobj.auras.healOverTime.active = false;
    }
    barobj.auras.healOverTime['currentWidth'] = tempVarForWidth;
  });
}

function resetCasting(index) {
  if (index === null) return;
  castingTimer = 0;
  castingDiv[index].style.width = `0%`;
  healTarget = null;
  castingDiv[index].style.display = 'none';
}

function dontAllowHeal(type, index) {
  if (player.manaBar['currentMana'] < player.skills[type].manaCost) {
    resetCasting(index);
    return true;
  }
  if (healthBars[index]['currentHealth'] <= 0) {
    resetCasting(index);
    return true;
  }
  return false;
}

function castingHeal(index) {
  if (dontAllowHeal('hold', index)) return;
  castingDiv[index].style.width = `${castingTimer}%`;
  castingTimer += 1;
  if (castingTimer > 86) {
    resetCasting(index);
    applyHealOnTarget(index, 'hold');
    updateMana('hold');
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
    let delta = healthBars[index].maxHealth - healthBars[index].currentHealth;
    const percentHealth = delta / healthBars[index].maxHealth;
    let percent = (1 - percentHealth) * 94;
    if (percent <= 0) percent = 0;
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

function calculateDamage(arrayOfDamage) {
  arrayOfDamage.forEach((dmg, index) => {
    healthBars[index].damage.currentDmg = dmg;
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
    let percentperFrame = 86 / (player.skills.hot.duration * 60);
    percentperFrame = Math.floor(percentperFrame * 100) / 100;
    bar.auras.healOverTime['percentFrame'] = percentperFrame;
  });
  let percentperFrame = 100 / (player.skills.aoe.cooldownTimer * 60);
  percentperFrame = Math.floor(percentperFrame * 100) / 100;
  player.skills.aoe['percentFrame'] = percentperFrame;

  percentperFrame = 100 / (player.skills.ultimate.cooldownTimer * 60);
  percentperFrame = Math.floor(percentperFrame * 100) / 100;
  player.skills.ultimate['percentFrame'] = percentperFrame;
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

function buildArrayOfDamage({ type, amount, targets }) {
  const arraySize = healthBarsDivs.length;
  let targetsIndex = [];
  if (typeof targets === 'number') {
    while (targetsIndex.length < targets) {
      const randomTarget = Math.floor(Math.random() * arraySize);
      targetsIndex.push(randomTarget);
    }
  } else if (targets === 'all') {
    targetsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  } else if (targets === 'melee') {
    targetsIndex = [1, 2, 3];
  }
  const arrayOfDamage = [];
  for (let i = 0; i < arraySize; i++) {
    targetsIndex.includes(i) ? arrayOfDamage.push(amount) : arrayOfDamage.push(0);
  }
  return arrayOfDamage;
}

async function callForAction(spell) {
  const { spellId, spellDamage } = spell;
  if (spellId === 'fight-end') {
    animationRun = false;
    return;
  }
  const arrayOfDamage = buildArrayOfDamage(spellDamage);
  calculateDamage(arrayOfDamage);
  return;
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
    if (!healthBar.auras.healOverTime.active) {
      if (dontAllowHeal('hot', index)) return;
      displayHotBar(index);
      activeHots.push([healthBar, index]);
      healthBar.auras.healOverTime.active = true;
      updateMana('hot');
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
