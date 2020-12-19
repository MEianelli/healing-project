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
        currentPosition: 0,
      },
      {
        spellName: 'aoe fire',
        spellId: 'aoe-fire',
        duration: 8,
        spellColor: '#0099ff',
        currentPosition: 0,
        spellDamage: {
          type: 'direct',
          amount: 500,
          targets: 'all',
        },
      },
      {
        spellName: 'cleave',
        spellId: 'cleave',
        duration: 12,
        spellColor: '#fe0000',
        currentPosition: 0,
        spellDamage: {
          type: 'direct',
          amount: 1000,
          targets: 'melee',
        },
      },
      {
        spellName: 'burst',
        spellId: 'burst',
        duration: 6,
        spellColor: '#4412f4',
        currentPosition: 0,
        spellDamage: {
          type: 'dot',
          amount: 1000,
          targets: 1,
        },
      },
      {
        spellName: 'Dmg over time',
        spellId: 'dot',
        duration: 3,
        spellColor: '#feea22',
        currentPosition: 0,
        spellDamage: {
          type: 'direct',
          amount: 200,
          targets: 'all',
        },
      },
      {
        spellName: 'ultimate',
        spellId: 'ultimate',
        duration: 40,
        spellColor: '#00d88f',
        currentPosition: 0,
        spellDamage: {
          type: 'direct',
          amount: 3000,
          targets: 3,
        },
      },
    ],
  },
  healthBars: [
    {
      type: 'tank',
      maxHealth: 10000,
      currentHealth: 10000,
      auras: {
        hasAggro: true,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'melee',
      maxHealth: 7000,
      currentHealth: 7000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
    {
      type: 'range',
      maxHealth: 4000,
      currentHealth: 4000,
      auras: {
        hasAggro: false,
        healOverTime: {
          active: false,
          currentWidth: 86,
        },
      },
      damage: {
        totalDmg: 0,
        currentDmg: 0,
        dot: 0,
        dotDuration: 0,
      },
    },
  ],
  player: {
    manaBar: {
      currentManaPots: 0,
      maxMana: 10000,
      currentMana: 10000,
    },
    skills: {
      hot: {
        name: 'renew',
        manaCost: 550,
        amountToHeal: 200,
        duration: 5,
      },
      hold: {
        name: 'renew',
        manaCost: 400,
        amountToHeal: 500,
        castTime: 5,
      },
      aoe: {
        name: 'renew',
        manaCost: 400,
        amountToHeal: 200,
      },
      ultimate: {
        name: 'renew',
        manaCost: 1000,
        amountToHeal: 200,
      },
    },
  },
};
