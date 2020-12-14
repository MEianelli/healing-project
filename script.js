/// <reference path="./p5.global-mode.d.ts" />;
import { data } from './data.js';
const { boss, healthBars, player } = data;

const bossSpellList = document.querySelector('.spell-list');
const bossSpellsColors = ['teal', 'sandybrown', 'slateblue', 'paleturquoise', 'rgb(133, 37, 2)'];

window.onload = function () {
  createBossSpellList(boss);
};

function createBossSpellList({ spells }) {
  spells.forEach(element => {
    const newSpell = document.createElement('li');
    const spellIcon = document.createElement('div');
    const spellText = document.createElement('div');

    spellIcon.className = 'boss-spell-icon';
    spellText.className = 'boss-spell-text';

    spellIcon.style.backgroundColor = bossSpellsColors.shift();
    spellText.innerHTML = element;

    newSpell.appendChild(spellIcon);
    newSpell.appendChild(spellText);

    newSpell.className = 'boss-spell';

    bossSpellList.appendChild(newSpell);
  });
}
