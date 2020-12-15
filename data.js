export const data = {
  boss: {
    mainAttack: 'normal-melee',
    fightDuration: 90,
    spells: [
      {
        spellName: 'fight end',
        spellId: 'fight-end',
        duration: 90,
        spellColor: 'white',
      },
      {
        spellName: 'aoe fire',
        spellId: 'aoe-fire',
        duration: 5,
        spellColor: '#0099ff',
      },
      {
        spellName: 'cleave',
        spellId: 'cleave',
        duration: 10,
        spellColor: '#fe0000',
      },
      {
        spellName: 'burst',
        spellId: 'burst',
        duration: 20,
        spellColor: '#4412f4',
      },
      {
        spellName: 'heal',
        spellId: 'heal',
        duration: 5,
        spellColor: '#feea22',
      },
      {
        spellName: 'ultimate',
        spellId: 'ultimate',
        duration: 40,
        spellColor: '#00d88f',
      },
    ],
  },
  healthBars: [
    {
      type: 'tank',
      maxHealth: 10000,
      currentHealth: 10000,
      currentAura: 'none',
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      currentAura: 'none',
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      currentAura: 'none',
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      currentAura: 'none',
    },
  ],
  player: {
    manaBar: {
      currentManaPots: 0,
      maxMana: 10000,
      currentMana: 10000,
    },
    skills: {
      tap: 'renew',
      cast: 'flash',
      aoe: 'circle',
      ultimate: 'allrenew',
    },
  },
};
