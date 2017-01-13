import {
  includes,
  isString,
  isEmpty
} from 'lodash';
import shortid from 'shortid';

export function createAbilitiesAndImpairments() {
  return { abilities: [], impairments: [], skip_next_hunt: false };
}

export function createFightingArts() {
  return { arts: [], restricted: false };
}

export function createUnderstanding() {
  return { xp: 0, analyze: false, explore: false, tinker: false };
}

export function createCourage() {
  return { xp: 0, stalwart: false, prepared: false, matchmaker: false };
}

export function createWeaponProficiency() {
  return { xp: 0, type: null, specialist: false, master: false };
}

export function createHuntXp() {
  return { xp: 0, retired: false };
}

export function createArmor() {
  return {
    head: {
      armor: 0,
      heavy_injury: false
    },
    arms: {
      armor: 0,
      light_injury: false,
      heavy_injury: false
    },
    body: {
      armor: 0,
      light_injury: false,
      heavy_injury: false
    },
    waist: {
      armor: 0,
      light_injury: false,
      heavy_injury: false
    },
    legs: {
      armor: 0,
      light_injury: false,
      heavy_injury: false
    }
  };
}

export function createBrain() {
  return { insanity: 0, insane: false };
}

export function createAttributes() {
  return { movement: 5, accuracy: 0, strength: 0, evasion: 0, luck: 0, speed: 0 };
}

export function createSurvival(name) {
  const hasName = isString(name) && !isEmpty(name);
  return {
    points: hasName ? 1 : 0,
    restricted: false,
    abilities: {
      dodge: true,
      encourage: false,
      surge: false,
      dash: false
    }
  };
}

export const MALE = "Male";
export const FEMALE = "Female";

export function isValidSex(sex) {
  return includes([MALE, FEMALE], sex);
}

export function createSurvivor(sex, name = null) {
  if (!isValidSex(sex)) { throw Error(`Invalid sex: ${sex}`); }
  return {
    id: shortid.generate(),
    name: name,
    sex: sex,
    deceased: false,
    survival: createSurvival(name),
    attributes: createAttributes(),
    brain: createBrain(),
    armor: createArmor(),
    hunt_xp: createHuntXp(),
    weapon_proficiency: createWeaponProficiency(),
    courage: createCourage(),
    understanding: createUnderstanding(),
    fighting_arts: createFightingArts(),
    disorders: [],
    abilities_and_impairments: createAbilitiesAndImpairments(),
    notes: []
  };
}
