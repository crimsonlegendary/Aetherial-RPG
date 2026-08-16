import { WEAPON_DATABASE } from './weapons.js';
import { BOSS_DATABASE } from './bosses.js';
import { Player } from './player.js';
import { AudioManager } from './audio.js';
import { CombatEngine } from './combat.js';

// Global Instances
const audio = new AudioManager();
const player = new Player(WEAPON_DATABASE[0]);

function log(msg) {
  const el = document.getElementById('log');
  el.innerHTML += `<div>> ${msg}</div>`;
  el.scrollTop = el.scrollHeight;
}

const combat = new CombatEngine(player, WEAPON_DATABASE, BOSS_DATABASE, audio, log);

// UI Rendering Engine
function updateUI() {
  document.getElementById('p-lvl').innerText = player.lvl;
  document.getElementById('p-xp').innerText = player.xp;
  document.getElementById('p-max-xp').innerText = player.maxXp;
  document.getElementById('p-hp').innerText = player.hp;
  document.getElementById('p-max-hp').innerText = player.maxHp;
  document.getElementById('hp-bar').style.width = Math.max(0, (player.hp / player.maxHp * 100)) + '%';
  
  document.getElementById('p-gold').innerText = player.gold;
  document.getElementById('p-ore').innerText = player.ore;
  document.getElementById('p-shard').innerText = player.shards;
  document.getElementById('p-kills').innerText = player.kills;
  document.getElementById('p-boss-kills').innerText = player.bossKills;

  document.getElementById('p-weapon').innerText = player.equipped.name;
  document.getElementById('p-mastery').innerText = Math.floor(player.equipped.mastery);
  document.getElementById('mastery-bar').style.width = player.equipped.mastery + '%';

  const e = combat.enemy;
  document.getElementById('e-name').innerText = e.name;
  document.getElementById('e-lvl').innerText = e.lvl;
  document.getElementById('e-hp').innerText = e.hp;
  document.getElementById('e-max-hp').innerText = e.maxHp;
  document.getElementById('e-hp-bar').style.width = Math.max(0, (e.hp / e.maxHp * 100)) + '%';

  const combatPanel = document.getElementById('combat-panel');
  if (e.isBoss) {
    combatPanel.classList.add('boss-warning');
  } else {
    combatPanel.classList.remove('boss-warning');
  }

  const skill4Btn = document.getElementById('btn-ability-4');
  if (player.equipped.mastery >= 100) {
    skill4Btn.disabled = false;
    skill4Btn.innerText = `[4] ${player.equipped.skill4}`;
  } else {
    skill4Btn.disabled = true;
    skill4Btn.innerText = `[4] Locked (${Math.floor(player.equipped.mastery)}%)`;
  }

  renderArsenal();
}

function renderArsenal() {
  const list = document.getElementById('weapon-list');
  list.innerHTML = '';

  WEAPON_DATABASE.forEach(w => {
    // Kill Requirement Check
    if (!w.unlocked && w.reqKills && player.kills >= w.reqKills) {
      w.unlocked = true;
      log(`ACHIEVEMENT UNLOCKED: Acquired ${w.name}!`);
      audio.play('levelup');
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <b>${w.name}</b><br>
      ATK: +${w.atk} | Mastery: ${Math.floor(w.mastery)}%<br>
      <small>${w.desc}</small><br>
    `;

    if (w.unlocked) {
      const equipBtn = document.createElement('button');
      equipBtn.innerText = player.equipped.id === w.id ? 'Equipped' : 'Equip';
      equipBtn.disabled = player.equipped.id === w.id;
      equipBtn.onclick = () => { player.equipped = w; updateUI(); };
      card.appendChild(equipBtn);
    } else {
      const buyBtn = document.createElement('button');
      buyBtn.innerText = 'Acquire / Craft';
      buyBtn.onclick = () => tryPurchaseWeapon(w);
      card.appendChild(buyBtn);
    }
    list.appendChild(card);
  });
}

function tryPurchaseWeapon(w) {
  let canAfford = true;

  if (w.costGold && player.gold < w.costGold) canAfford = false;
  if (w.costOre && player.ore < w.costOre) canAfford = false;
  if (w.costShard && player.shards < w.costShard) canAfford = false;
  if (w.bossDrop) { log(`${w.name} is a Boss Drop only!`); return; }

  if (canAfford) {
    if (w.costGold) player.gold -= w.costGold;
    if (w.costOre) player.ore -= w.costOre;
    if (w.costShard) player.shards -= w.costShard;

    w.unlocked = true;
    log(`Acquired ${w.name}!`);
    audio.play('heavy');
    updateUI();
  } else {
    log(`Insufficient materials for ${w.name}.`);
  }
}

// Event Listeners
document.getElementById('audio-btn').onclick = () => audio.toggleAudio(document.getElementById('audio-btn'));
document.getElementById('btn-ability-1').onclick = () => { combat.executeTurn(1); updateUI(); };
document.getElementById('btn-ability-2').onclick = () => { combat.executeTurn(2); updateUI(); };
document.getElementById('btn-ability-3').onclick = () => { combat.executeTurn(3); updateUI(); };
document.getElementById('btn-ability-4').onclick = () => { combat.executeTurn(4); updateUI(); };

// Initial Load
updateUI();
log("Modular Game Architecture Initialized.");
