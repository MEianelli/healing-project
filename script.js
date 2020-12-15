/// <reference path="./p5.global-mode.d.ts" />;
import { data } from './data.js';
const { boss, healthBars, player } = data;

const bossSpellList = document.querySelector('.spell-list');
const healthBarsContainer = document.querySelector('.health-container');
const timeLine = document.querySelector('.timeline-container');
const sliderBar = document.querySelector('.slider');

window.onload = function () {
  createBossSpellList(boss);
  createHealthBars(healthBars);
  createBossSpellSliders(boss);
  startSlidersAnimation();
};

function startSlidersAnimation() {
  let x = 0;
  const widthSize = sliderBar.offsetWidth;
  const spellSliders = document.querySelectorAll('.spell-slider');
  spellSliders.forEach(slider => {
    const percSecond = widthSize / slider.getAttribute('data-timer');
    const percFrame = percSecond / 60;
    moveFightslider(x, slider, percFrame);
  });
}

function stopAllSliders() {}

function callForAction(slide) {
  if (slide.id === 'fight-end') stopAllSliders();
}

function moveFightslider(x, slide, timer) {
  slide.style.transform = `translateX(-${x}px)`;
  x += timer;
  if (x > sliderBar.offsetWidth - 7) {
    callForAction(slide);
    x = 0;
  }
  setTimeout(() => {
    moveFightslider(x, slide, timer);
  }, 16.67);
}

function createBossSpellSliders({ spells }) {
  spells.forEach(element => {
    const slide = document.createElement('div');
    slide.className = 'spell-slider';
    slide.setAttribute('data-timer', element.duration);
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

function createHealthBars(healthBars) {
  healthBars.forEach(bar => {
    const borderBar = document.createElement('div');
    const healthBar = document.createElement('div');

    borderBar.className = 'border-bar';
    healthBar.className = 'health-bar';

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
