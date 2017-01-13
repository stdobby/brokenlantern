import * as factory from '../../main/factories/survivor';
import test from 'tape';
import { omit } from 'lodash';

test('Survivor Factory', nest => {
  nest.test('...createAbilitiesAndImpairments', assert => {
    const expected = { abilities: [], impairments: [], skip_next_hunt: false };
    const actual = factory.createAbilitiesAndImpairments();

    assert.deepEqual(actual, expected, "should create abilities and impairments");
    assert.end();
  });

  nest.test('...createFightingArts', assert => {
    const expected = { arts: [], restricted: false };
    const actual = factory.createFightingArts();

    assert.deepEqual(actual, expected, "should create fighting arts");
    assert.end();
  });

  nest.test('...createUnderstanding', assert => {
    const expected = { xp: 0, analyze: false, explore: false, tinker: false };
    const actual = factory.createUnderstanding();

    assert.deepEqual(actual, expected, "should create understanding");
    assert.end();
  });

  nest.test('...createCourage', assert => {
    const expected = { xp: 0, stalwart: false, prepared: false, matchmaker: false };
    const actual = factory.createCourage();

    assert.deepEqual(actual, expected, "should create courage");
    assert.end();
  });

  nest.test('...createWeaponProficiency', assert => {
    const expected = { xp: 0, type: null, specialist: false, master: false };
    const actual = factory.createWeaponProficiency();

    assert.deepEqual(actual, expected, "should create courage");
    assert.end();
  });

  nest.test('...createHuntXp', assert => {
    const expected = { xp: 0, retired: false };
    const actual = factory.createHuntXp();

    assert.deepEqual(actual, expected, "should create hunt xp");
    assert.end();
  });

  nest.test('...createArmor', assert => {
    const expected = {
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
    const actual = factory.createArmor();

    assert.deepEqual(actual, expected, "should create armor");
    assert.end();
  });

  nest.test('...createBrain', assert => {
    const expected = { insanity: 0, insane: false };
    const actual = factory.createBrain();

    assert.deepEqual(actual, expected, "should create brain");
    assert.end();
  });

  nest.test('...createAttributes', assert => {
    const expected = { movement: 5, accuracy: 0, strength: 0, evasion: 0, luck: 0, speed: 0 };
    const actual = factory.createAttributes();

    assert.deepEqual(actual, expected, "should create attributes");
    assert.end();
  });

  nest.test('...createSurvival with name', assert => {
    const expected = {
      points: 1,
      restricted: false,
      abilities: {
        dodge: true,
        encourage: false,
        surge: false,
        dash: false
      }
    };
    const actual = factory.createSurvival("Allister");

    assert.deepEqual(actual, expected, "should create survival when a name is supplied");
    assert.end();
  });

  nest.test('...createSurvival without name', assert => {
    const expected = {
      points: 0,
      restricted: false,
      abilities: {
        dodge: true,
        encourage: false,
        surge: false,
        dash: false
      }
    };
    const actual = factory.createSurvival();

    assert.deepEqual(actual, expected, "should create survival when a name is omitted");
    assert.end();
  });

  nest.test('...male constant', assert => {
    const expected = "Male";
    const actual = factory.MALE;

    assert.equal(actual, expected, "constant should equal 'Male'");
    assert.end();
  });

  nest.test('...female constant', assert => {
    const expected = "Female";
    const actual = factory.FEMALE;

    assert.equal(actual, expected, "constant should equal 'Female'");
    assert.end();
  });

  nest.test('...isValidSex', assert => {
    assert.equal(factory.isValidSex(factory.MALE), true, "'Male' is a valid sex");
    assert.equal(factory.isValidSex(factory.FEMALE), true, "'Female' is a valid sex");
    assert.equal(factory.isValidSex("foo"), false, "'foo' is an invalid sex");
    assert.end();
  });

  nest.test('...createSurvivor with invalid gender', assert => {
    const expected = /Invalid sex: foo/;

    assert.throws(() => factory.createSurvivor("foo", "Allister"), expected, "should throw an error stating that an invalid sex was supplied");
    assert.end();
  });

  nest.test('...createSurvivor with a name', assert => {
    const expected = {
      name: "Allister",
      sex: factory.MALE,
      deceased: false,
      survival: {
        points: 1,
        restricted: false,
        abilities: {
          dodge: true,
          encourage: false,
          surge: false,
          dash: false
        }
      },
      attributes: {
        movement: 5,
        accuracy: 0,
        strength: 0,
        evasion: 0,
        luck: 0,
        speed: 0
      },
      brain: {
        insanity: 0,
        insane: false
      },
      armor: {
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
      },
      hunt_xp: {
        xp: 0,
        retired: false
      },
      weapon_proficiency: {
        xp: 0,
        type: null,
        specialist: false,
        master: false
      },
      courage: {
        xp: 0,
        stalwart: false,
        prepared: false,
        matchmaker: false
      },
      understanding: {
        xp: 0,
        analyze: false,
        explore: false,
        tinker: false
      },
      fighting_arts: {
        arts: [],
        restricted: false
      },
      disorders: [],
      abilities_and_impairments: {
        abilities: [],
        impairments: [],
        skip_next_hunt: false
      },
      notes: []
    };
    const actual = factory.createSurvivor(factory.MALE, "Allister");

    const idMatchesPattern = /[A-Za-z0-9_-]{7,14}/.test(actual.id);

    assert.deepEquals(omit(actual, 'id'), expected, "should be able to predict all fields except id");
    assert.ok(idMatchesPattern, "id should follow a pattern but be randomly generated");
    assert.end();
  });

  nest.test('...createSurvivor without a name', assert => {
    const expected = {
      name: null,
      sex: factory.MALE,
      deceased: false,
      survival: {
        points: 0,
        restricted: false,
        abilities: {
          dodge: true,
          encourage: false,
          surge: false,
          dash: false
        }
      },
      attributes: {
        movement: 5,
        accuracy: 0,
        strength: 0,
        evasion: 0,
        luck: 0,
        speed: 0
      },
      brain: {
        insanity: 0,
        insane: false
      },
      armor: {
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
      },
      hunt_xp: {
        xp: 0,
        retired: false
      },
      weapon_proficiency: {
        xp: 0,
        type: null,
        specialist: false,
        master: false
      },
      courage: {
        xp: 0,
        stalwart: false,
        prepared: false,
        matchmaker: false
      },
      understanding: {
        xp: 0,
        analyze: false,
        explore: false,
        tinker: false
      },
      fighting_arts: {
        arts: [],
        restricted: false
      },
      disorders: [],
      abilities_and_impairments: {
        abilities: [],
        impairments: [],
        skip_next_hunt: false
      },
      notes: []
    };
    const actual = factory.createSurvivor(factory.MALE);

    const idMatchesPattern = /[A-Za-z0-9_-]{7,14}/.test(actual.id);

    assert.deepEquals(omit(actual, 'id'), expected, "should be able to predict all fields except id");
    assert.ok(idMatchesPattern, "id should follow a pattern but be randomly generated");
    assert.end();
  });
});
