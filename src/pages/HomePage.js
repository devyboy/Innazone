import React from 'react';
import Menu from '../components/menu';
import '../css/App.css';

function HomePage() {
  return (
    <div className='App' style={{ height: '100%', paddingBottom: '2em' }}>
      <Menu />
      <div
        id='challenge'
        style={{
          color: '#fff',
          width: '60%',
          textAlign: 'left',
          margin: 'auto',
          paddingTop: '3em'
        }}
      >
        <h1 id='innazone'>Innazone</h1>
        <p>
          You are now a stalker and must explore the Zone! Find an abandoned
          structure or area (errata – things like abandoned mines, trains, or
          ruined buildings/foundations count) and camp in or near it. Take some
          photos and post them while regaling /k/ with your adventures.
          <br />
          You must do the challenge in or around a totally abandoned structure
          or site.
          <br />
          Pick a faction and a difficulty level. Follow their specific rules.
          <br />
          You must carry a gun.
          <br />
          You must explore.
        </p>
        <h2 id='documents'>Documents</h2>
        <p>
          Documents are letters, notepads, invoices, etc. that contain
          information that was important to someone at some time. To count
          towards your score, they must be carried out of the Zone or each page
          must be photographed in a legible manner.
        </p>
        <h2 id='artifacts'>Artifacts</h2>
        <p>
          Artifacts are items left in abandoned structures or areas. These could
          be anything from an old doll to a coin. Not just any piece of scrap
          metal or trash counts; they should have been worth something to
          someone in the past. They must be relatively unique. Animal remains
          such as bones do not count. Artifacts must be carried out of the Zone
          to count towards your score.
        </p>
        <h2 id='scoring'>Scoring</h2>
        <p>
          Scoring is added up at the end of the challenge, and can be used for
          bragging rights on /k/. It depends on your difficulty, faction, and
          the various things you did or that happened during the challenge. The
          website inna.zone has an automated scoring system and will let you
          submit trip reports, photos, and the location of the Zone you
          explored. It will always have the current ruleset.
        </p>
        <h2 id='difficulty'>Difficulty</h2>
        <p>
          Difficulty determines the basics of your trip into the Zone – how long
          you stay, and what you bring. Faction rules will override difficulty
          (errata – for example, Bandits are restricted to pistols, shotguns,
          and bolt-action rifles, so you can bring nothing but a shotgun on
          Veteran and Master difficulty, ignoring the requirement of a military
          service rifle)
        </p>
        <h3 id='novice-0-points'>Novice (+0 points)</h3>
        <ul>
          <li>
            Weapon of your choice - this will override faction requirement.
            Knives, bows, etc are acceptable
          </li>
          <li>You must visit an abandoned structure for at least an hour</li>
          <li>You may bring any gear you want</li>
        </ul>
        <h3 id='stalker-5-points'>Stalker (+5 points)</h3>
        <ul>
          <li>
            Firearm of your choice - this will override faction requirement
          </li>
          <li>As much or as little ammo as you want</li>
          <li>You must camp in or near an abandoned building overnight</li>
          <li>Must bring alcohol, vodka preferred</li>
        </ul>
        <h3 id='veteran--10-points'>Veteran (+10 points)</h3>
        <ul>
          <li>
            Bring a primary firearm and a sidearm - this will NOT override
            faction requirement
          </li>
          <li>
            Bring at least half a full combat ammo load (for a 30-round
            intermediate rifle, 3 mags + 1 loaded)
          </li>
          <li>
            Wear some sort of S.T.A.L.K.E.R. themed protection gear (errata -
            e.g. gas mask)
          </li>
          <li>Must camp INSIDE abandoned structure</li>
          <li>Remain in the Zone for 24 hours</li>
          <li>Bring a bottle of the cheapest vodka available</li>
        </ul>
        <h3 id='master-20-points'>Master (+20 points)</h3>
        <ul>
          <li>
            Bring one military service rifle (unless your faction isn’t allowed
            to use rifles) and a sidearm
          </li>
          <li>Bring full combat load of ammo</li>
          <li>
            Wear some sort of S.T.A.L.K.E.R. themed protection gear (errata -
            e.g. gas mask)
          </li>
          <li>
            Must camp INSIDE abandoned industrial complex, military base, or
            similarly large facility
          </li>
          <li>Remain in the Zone for 48 hours</li>
          <li>
            Bring a bottle of the cheapest vodka available and finish it by the
            end of the trip
          </li>
          <li>Can only eat bread, sausage, canned food, and MREs</li>
        </ul>
        <h2 id='factions'>Factions</h2>
        <h3 id='loner-5-points'>Loner (+5 points)</h3>
        <p>
          <b>Weapons:</b> Any
          <br />
          <b>Clothing:</b> Any
          <br />
          <b>Failure condition:</b> You die IRL
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for building a campfire and playing an instrument around
            it
          </li>
          <li>+5 points for bringing a pistol carbine or 9x18 pistol</li>
          <li>+Double points for finding artifacts</li>
          <li>+1 bonus point per document found</li>
        </ul>
        <h3 id='bandit-10-points'>Bandit (+10 points)</h3>
        <p>
          <b>Weapons:</b> Shotgun, pistol, or bolt-action rifle
          <br />
          <b>Clothing:</b> Must wear at least two pieces of Adidas clothing
          <br />
          <b>Failure condition:</b> Your campsite is found by non-stalkers
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for bringing a speaker playing slav music for an hour.
            Dancing is encouraged
          </li>
          <li>+5 points for wearing nothing but Adidas clothing</li>
          <li>
            +15 points if you sneak up behind a non-stalker, shout “CHEEKI
            BREEKI IV DAMKE”, and run away without spilling spaghetti, getting
            shot, or them following you to your campsite
          </li>
        </ul>
        <h3 id='clear-sky-10-points'>Clear Sky (+10 points)</h3>
        <p>
          <b>Weapons:</b> Any firearm
          <br />
          <b>Clothing:</b> Light blue highlights under camo of your choice
          <br />
          <b>Failure condition:</b> Anyone but a Clear Sky member is the first
          to make it to the center of the Zone - including non-stalkers
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>+10 points for camping in a swamp</li>
          <li>
            +5 points for setting up a base with fortifications and/or camo
            netting
          </li>
          <li>
            +10 points for setting up an additional fortified or camouflaged
            base and sleeping in one of them
          </li>
        </ul>
        <h3 id='military-15-points'>Military (+15 points)</h3>
        <p>
          <b>Weapons:</b> Eastern Bloc rifle that has been used in military
          service at least once since the fall of the USSR
          <br />
          <b>Clothing:</b> BDUs and body armor; can only take armor off when
          sleeping
          <br />
          <b>Failure condition:</b> You eat anything but MREs
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>+10 points if your body armor is also Eastern Bloc</li>
          <li>+10 points for exploring an underground area or tunnel</li>
          <li>
            +15 points if you do the challenge with an Ecologist and serve as
            bodyguard and escort
          </li>
        </ul>
        <h3 id='mercenary-15-points'>Mercenary (+15 points)</h3>
        <p>
          <b>Weapons:</b> Must carry a service rifle from a country that was
          neither in NATO nor the Warsaw Pact
          <br />
          <b>Clothing:</b> Urban-pattern camo, or entirely black and blue
          clothing
          <br />
          <b>Failure condition:</b> You fail if you’re spotted by any
          non-stalker
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for setting up an elevated position for sniping and
            spending at least half an hour watching for threats
          </li>
          <li>
            +10 points for designating a Mercenary member as Commander, who
            issues arbitrary orders over radio
          </li>
          <li>+5 points for having a magnified optic on your rifle</li>
        </ul>
        <h3 id='freedom-15-points'>Freedom (+15 points)</h3>
        <p>
          <b>Weapons:</b> Must carry a service weapon used by a Warsaw Pact or
          NATO country
          <br />
          <b>Clothing:</b> Green camo pattern
          <br />
          <b>Failure condition:</b> Must leave no trace. You fail if you leave
          behind garbage, a visible fire pit, dead animals, graffiti, or
          disturbed scenery
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>+10 points for smoking something every day during the trip</li>
          <li>+5 for wearing all Flecktarn camo</li>
          <li>
            +15 points if you set up a barricade at a chokepoint and man it for
            half an hour, looking for mutants and Monolith coming from Red
            Forest
          </li>
        </ul>
        <h3 id='duty-20-points'>Duty (+20 points)</h3>
        <p>
          <b>Weapons:</b> Must carry a service weapon used by a Warsaw Pact
          country
          <br />
          <b>Clothing:</b> Black and red as primary colors
          <br />
          <b>Failure condition:</b> You fail if you drink, smoke, or consume
          drugs while in the Zone. No fun allowed!
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for establishing a patrol route at least a quarter mile
            long and patrolling it once every two hours while awake
          </li>
          <li>+5 points if you kill a mutant (any wild animal)</li>
          <li>+5 points for writing up your field report while in the field</li>
        </ul>
        <h3 id='ecologist-20-points'>Ecologist (+20 points)</h3>
        <p>
          <b>Weapons:</b> Pistols only (AK pistols and SMG-type “pistols” are
          fine)
          <br />
          <b>Clothing:</b> Gas mask mandatory. Lab coats recommended. No body
          armor rated higher than NIJ IIIa
          <br />
          <b>Failure condition:</b> You must log ambient radiation levels every
          hour while awake, otherwise you fail the challenge and probably die of
          radiation poisoning
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for setting up a clean station indoors where you can
            perform experiments, then taking a soil, water, or plant sample (or
            a suitable artifact) and chemically testing it or looking at it
            under a microscope
          </li>
          <li>
            +10 points for wearing full-body chemical, NBC, or CBRN protection
            whenever outside of your camp or laboratory
          </li>
          <li>+Double points for every artifact found</li>
        </ul>
        <h3 id='monolith-20-points'>Monolith (+20 points)</h3>
        <p>
          <b>Weapons:</b> A service rifle used by a NATO or Warsaw Pact country
          <br />
          <b>Clothing:</b> Urban or Snow pattern camo
          <br />
          <b>Failure condition:</b> You must build something resembling a
          Monolith. You fail if your Monolith is found by anyone not in your
          faction (including non-stalkers).
          <br />
          <b>Bonuses:</b>
        </p>
        <ul>
          <li>
            +10 points for chanting or praying to your Monolith every 4 hours
          </li>
          <li>+10 points for wearing a gas mask at all times while outside</li>
          <li>+5 points for using antirads during your trip</li>
        </ul>
        <h2 id='scoring-1'>Scoring</h2>
        <p>
          So, you made it out alive.
          <br />
          Make a thread on /k/ and post results, or a link to your{' '}
          <em>inna.zone</em> report.
          <br />
          Add everything up, check below of miscellaneous bonuses.
        </p>
        <h3 id='scavenging'>Scavenging:</h3>
        <ul>
          <li>+1 point for every artifact found and brought back</li>
          <li>+2 points for every document found (up to a maximum of 5)</li>
          <li>+3 points for bringing back a usable tool</li>
          <li>
            +4 points for finding something usable in the field and integrating
            it into your equipment
          </li>
        </ul>
        <h3 id='environmental'>Environmental</h3>
        <ul>
          <li>+5 points for bringing and playing a harmonica or guitar</li>
          <li>+5 points for bringing and reading a copy of Roadside Picnic</li>
          <li>+5 points if it rains or snows</li>
          <li>+5 additional points if it rains or snows the entire time</li>
          <li>
            +5 points for lighting a campfire in an old container and squatting
            around it
          </li>
        </ul>
        <h3 id='social'>Social</h3>
        <ul>
          <li>+5 points for going with a friend</li>
          <li>+5 points additional for going with more than one friend</li>
          <li>+5 points if your entire party is all in the same faction</li>
          <li>
            +10 points if your friends have never been to this Zone before and
            you serve as their guide
          </li>
          <li>
            +10 points for leaving a stash behind with ammo/food/patches/etc and
            posting it on <em>inna.zone</em> or /k/
          </li>
          <li>+10 points for finding another stalker’s stash</li>
        </ul>
        <h3 id='european-extreme-mode'>European Extreme Mode:</h3>
        <ul>
          <li>
            +20 points for doing this in a real-life Exclusion Zone such as
            Hanford, WA or Centralia, PA
          </li>
          <li>
            +20 points if your Zone is actually irradiated above normal ambient
            levels
          </li>
          <li>+30 points if you kill a cryptid or skinwalker and post proof</li>
          <li>
            +40 points if you somehow manage to do this in the real Chernobyl
            Exclusion Zone
          </li>
        </ul>
        <h4 id='errata'>Errata:</h4>
        <p>
          What matters with NATO vs Warsaw weapons is country of design origin,
          or where the gun was actively used. You can use a PSA AK and it’ll
          still count as a Warsaw firearm.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
