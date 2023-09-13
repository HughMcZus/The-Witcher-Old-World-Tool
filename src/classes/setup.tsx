import { ReactElement, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { TerrainLocation, getTerrainLocations } from './terrains';
import { shuffle } from '../util/generic';

export function startingResources(numPlayers: number, t): ReactElement {
    let ret: Array<string> = [""];
    const p = t("player");
    const c = t("cards");
    const g = t("gold");
    if (numPlayers == 1) {
        ret = [`${p} 1: 5 ${c}, 3 ${g}`];
    } else if (numPlayers == 2) {
        ret = [
            `${p} 1: 3 ${c}, 2 ${g}`,
            `${p} 2: 5 ${c}, 4 ${g}`
        ];
    } else if (numPlayers == 3) {
        ret = [
            `${p} 1: 3 ${c}, 2 ${g}`,
            `${p} 2: 4 ${c}, 4 ${g}`,
            `${p} 3: 5 ${c}, 6 ${g}`
        ];
    } else if (numPlayers == 4) {
        ret = [
            `${p} 1: 2 ${c}, 4 ${g}`,
            `${p} 2: 3 ${c}, 5 ${g}`,
            `${p} 3: 4 ${c}, 6 ${g}`,
            `${p} 4: 5 ${c}, 7 ${g}`
        ];
    } else {
        ret = [
            `${p} 1: 2 ${c}, 5 ${g}`,
            `${p} 2: 3 ${c}, 5 ${g}`,
            `${p} 3: 4 ${c}, 5 ${g}`,
            `${p} 4: 4 ${c}, 7 ${g}`,
            `${p} 5: 5 ${c}, 7 ${g}`
        ];
    }
    return (
        <ul>
            {ret.map((text) => (
                <li>{text}</li>
            ))}
        </ul>
    );
}

export function wildHuntDifficulty(numPlayers: number, t): Array<string> {
    let ret: Array<string> = [""];
    const l = t('Level');
    const m = t('Monster');
    const s = t('Shield Tokens');

    if (numPlayers == 1) {
        ret = [
            `${l} I ${m}\n5 ${s}`,
            `${l} I ${m}\n7 ${s}`,
            `${l} II ${m}\n9 ${s}`,
            `${l} II ${m}\n11 ${s}`,
        ];
    } else if (numPlayers == 2) {
        ret = [
            `${l} II ${m}\n28 ${s}`,
            `${l} I ${m} + ${l} II ${m}\n31 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n34 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n37 ${s}`,
        ];
    } else if (numPlayers == 3) {
        ret = [
            `${l} II ${m}\n54 ${s}`,
            `${l} I ${m} + ${l} II ${m}\n58 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n62 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n66 ${s}`,
        ];
    } else if (numPlayers == 4) {
        ret = [
            `2 × ${l} I ${m}\n77 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n82 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n87 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n92 ${s}`,
        ];
    } else {
        ret = [
            `2 × ${l} I ${m}\n97 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n106 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n113 ${s}`,
            `${l} I ${m} + ${l} III ${m}\n120 ${s}`,
        ];
    }
    return ret;
}

const coastalLocations = getTerrainLocations({ coastal: true });

/**
 * Gets all coastal TerrainLocations, shuffles them, and returns 3. For boat
 * placement in Setup.
 * @returns Three random TerrainLocations that are valid locations for boats.
 */
function randomizeSkelligeBoatStartingLocations(allCoastalLocations: TerrainLocation[]): TerrainLocation[] {
    const locs = shuffle(allCoastalLocations).slice(0, 3);
    return locs.slice(0, 3);
}

function skelligeBoatStep(t) {
    const locations = randomizeSkelligeBoatStartingLocations(coastalLocations);
    // const updateLocations = () => {
    //     setLocations(randomizeSkelligeBoatStartingLocations());
    // };

    return (
        <>
            {t('setupHelper.skellige.playmat.0')}
            <ul>
                <li>{t('setupHelper.skellige.playmat.1')}</li>
                <li>{t('setupHelper.skellige.playmat.2')}
                    <ul>
                        {locations.map((loc) => (
                            <li>{t(loc.name)}, {loc.num}</li>
                        ))}
                    </ul>
                </li>
            </ul>

            {t('setupHelper.skellige.board.0')}
            <ul>
                <li>{t('setupHelper.skellige.board.1')}</li>
                <li>{t('setupHelper.skellige.board.2')}</li>
                <li>{t('setupHelper.skellige.board.3')}</li>
                <li>{t('setupHelper.skellige.board.4')}</li>
            </ul>
        </>
    );
}


// TODO: update this to a functional component
export function compileSteps(
    t,
    legendaryHunt = false,
    mages = false,
    monsterPack = false,
    monsterTrail = false,
    skellige = false,
    adventurePack = false,
    wildHunt = false,
    numPlayers = 1,
): Array<string> {
    if (numPlayers < 1 || numPlayers > 5) {
        throw new Error(t("setupHelper.error"));
    }

    const finalSteps: Array<any> = [];
    let tempElem = {}, tempStr = "", tempStr2 = "", tempArr: Array<any> = [];

    // step 1
    finalSteps.push(t('setupHelper.base.1'));

    // step
    if (legendaryHunt) finalSteps.push(t('setupHelper.legendaryHunt.1'));

    if (wildHunt) {
        // step
        finalSteps.push(
            <>
                {t("setupHelper.wildHunt.difficultyTitle")}
                <Table className='lh-base' style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <th>{t("setupHelper.wildHunt.easy")}</th>
                        <th>{t("setupHelper.wildHunt.medium")}</th>
                        <th>{t("setupHelper.wildHunt.hard")}</th>
                        <th>{t("setupHelper.wildHunt.veryHard")}</th>
                    </thead>
                    <tbody>
                        <tr>
                            {wildHuntDifficulty(numPlayers, t).map((text) => (
                                <td style={{ whiteSpace: 'pre-wrap', borderBottom: 'none' }}>{text}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </>
        );

        // step
        finalSteps.push(t('setupHelper.wildHunt.manage'));
    }

    // TODO: Automatically roll these three tokens and provide locations for the boats
    // step
    const locations = randomizeSkelligeBoatStartingLocations(coastalLocations);
    if (skellige) {
        finalSteps.push(
            <>
                {t("setupHelper.skellige.playmat.0") + ":"}
                <ul>
                    <li>{t("setupHelper.skellige.playmat.1")}</li>
                    <li>{t("setupHelper.skellige.playmat.2") + ":"}
                        <ul>
                            {locations.map((loc) => (
                                <li>{t(loc.name)}, {loc.num}</li>
                            ))}
                        </ul>
                    </li>
                </ul>

                {t("setupHelper.skellige.board.0") + ":"}
                <ul>
                    <li>{t("setupHelper.skellige.board.1")}</li>
                    <li>{t("setupHelper.skellige.board.2")}</li>
                    <li>{t("setupHelper.skellige.board.3")}</li>
                    <li>{t("setupHelper.skellige.board.4")}</li>
                </ul>
            </>
        );
    }

    // step
    finalSteps.push(t('setupHelper.base.actionCards'));

    // step
    if (mages) finalSteps.push(t('setupHelper.magesExp.actionCards'));

    // step
    finalSteps.push(t(`setupHelper.base.attrTrophies.${numPlayers}`));
    tempElem = '';

    // step
    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.mutagen'));

    // step
    finalSteps.push(t('setupHelper.base.potions'));

    // step
    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.bomb'));

    if (wildHunt) {
        finalSteps.push(t("setupHelper.wildHunt.createExplorationDeck", { num: numPlayers > 3 ? 3 : 4 }));
        finalSteps.push(t("setupHelper.wildHunt.decks"));
    } else {
        // step
        finalSteps.push(t("setupHelper.base.decks"));

        // step
        if (skellige) finalSteps.push(t("setupHelper.skellige.decks"));

        // step
        if (monsterTrail) tempStr = "and the large Dagon card ";
        if (skellige && !wildHunt) finalSteps.push(t("setupHelper.skellige.dagon", { val: tempStr }));
        tempStr = '';
        // step
        if (monsterPack && skellige) finalSteps.push(t("setupHelper.skellige.siren"));
        tempElem = '';
    }

    // step All
    if (adventurePack) tempStr = "Green Quest Tokens, ";
    if (wildHunt) tempStr = "Blue Quest Tokens, ";
    finalSteps.push(`Place Gold Tokens, ${tempStr}Poker Dice, and Closed Tavern token or mini near the game board.`);

    // step All
    finalSteps.push('Sort Location Tokens into 3 piles by terrain type. Shuffle each pile and place them (face down) near the game board. Draw 1 token from each pile and place them (face up) on their slots on the game board (to the right of the Monster slots).');

    // create array of string list items to generate ordered list
    tempArr = [];
    tempArr.push("Sort Monster Cards and Monster Tokens by level (I, II, and III). Place the cards near the game board (face up). Shuffle the tokens and place them near the game board (face down).");

    if (wildHunt) {
        tempArr.push('Draw a Monster Token of level based on the game difficulty. Draw a <em>Forest</em> Location Token. Place the monster token or miniature on the map there an place its Monster Card and the Location Token in the matching space on the game board.');
        tempArr.push('If the game difficulty indicates a second monster, repeat the above step but with a <em>Water</em> location.');
        if (monsterTrail) tempArr.push("Place the corresponding large Monster Cards near the board.");
    } else {
        if (numPlayers > 3) {
            tempArr.push(`Move ${numPlayers - 3} Level I tokens into a separate “additional monsters” stack. See p. 26 of core rules for how these are used.`);
        }
        tempStr = "Draw 3 Monster Tokens: ";

        if (numPlayers == 1) {
            tempStr += "One of each level.";
        } else if (numPlayers == 2) {
            tempStr += "2 × Level I and 1 × Level II.";
        } else {
            tempStr += "3 × Level I.";
        }
        tempArr.push(tempStr);
        tempStr = "";

        tempArr.push("Place the three Monster Tokens (randomly) in locations on the map matching the 3 face-up Location Tokens.");
        tempArr.push("Turn the 3 Monster Tokens face up and place their corresponding Monster Cards in the slots on the game board matching the corresponding Location Tokens. Replace the tokens with miniatures if you have them.");
        if (monsterTrail) tempArr.push("Place the 3 corresponding large Monster Cards near the board.");
    }

    tempElem = (
        <div>
            Set up Monsters:
            <ol type='a'>
                {tempArr.map((text, id) => (
                    <li key={id}>{text}</li>
                ))}
            </ol>
        </div>
    );
    finalSteps.push(tempElem);
    tempElem = "";
    tempArr = [];

    // step
    if (monsterTrail) finalSteps.push('Remove 8 Monster Fight cards from the deck. Put 4 back in the box and set 4 aside for later (when a Level III monster appears). Add the Special Attack cards to the Monster Fight deck.');

    // step
    finalSteps.push(`Shuffle the Monster Fight deck and place it (face down) near the game board.${wildHunt ? ' Place the Charge/Bite token near the deck.' : ''}`);

    // step
    if (legendaryHunt) finalSteps.push('Choose a Legendary Monster. Place its large card and the Special Fight cards (shuffled) near the game board. Place its miniature on the location shown on its card. Shuffle the Destruction Tokens and keep them (face-down) near the board.');

    // step wild hunt
    if (wildHunt) {
        finalSteps.push('Choose a member of the Wild Hunt to face this game. Place its card (Side A up) and its 4 Special Attack cards near the board.');
        finalSteps.push('Place Shield Tokens on the Wild Hunt member based on the difficulty.');
        finalSteps.push('Draw a <em>Mountain</em> Location Token, place the Wild Hunt miniature there, and shuffle that token back in.');
        finalSteps.push('Place the 6 Hound tokens or miniatures and the Hound card matching the player count nearby.');
    }

    // step
    finalSteps.push('Determine the starting player randomly, or it is whoever most recently read a Witcher book. Players choose Player Boards via any method they wish; see p. 7 of core rules for a fair drafting method.');

    // step
    if (mages) tempStr = "or Energy ";
    monsterTrail ? tempStr2 = "11" : tempStr2 = "10";

    tempArr.push(`Take a ${wildHunt ? 'Wild Hunt ' : ''}Help Card, player board, and matching miniature (with colored ring), cubes, Shield ${tempStr}marker, scoring token, and starting deck of ${tempStr2} cards. (Starting cards have a School icon in the top right corner.)`);
    tempStr = "", tempStr2 = "";
    tempArr.push(`Take ${numPlayers - 1} of their Witcher${mages ? "/Mage" : ""} Trophy Cards (equal to the other players).`);
    if (mages) tempArr.push("If a mage, place their School and Specialty tokens on the map, covering those of an unused Witcher School.");
    tempArr.push(`Place the 5 cubes and Shield ${mages ? "or Energy " : ""}marker on the lowest (“level 1”) spot of each player board track.`);
    if (numPlayers > 3) tempArr.push("Choose one Attribute to raise to level 2.");
    tempArr.push("Place the scoring token on the lowest spot of the Trophy Track.");
    tempArr.push("Shuffle their starting cards and set the deck to the left of their board.");
    tempArr.push("Place their miniature on their School location on the map.");

    if (wildHunt) {
        tempArr.push('Draw 5 cards and take 3 Gold.');
    } else {
        tempArr.push(<p>Draw the following cards and gold based on player position: {startingResources(numPlayers, t)}</p>);
    }
    tempElem = (
        <div>
            Each player must:
            <ol type='a'>
                {tempArr.map((text, id) => (
                    <li key={id}>{text}</li>
                ))}
            </ol>
        </div>
    );
    finalSteps.push(tempElem);
    tempElem = {}, tempArr = [];

    // step Wild Hunt
    if (numPlayers > 1 && wildHunt) finalSteps.push("Create a Wild Hunt Movement pool by combining every player's scoring token and the Closed Tavern token. Shuffle these face down.");
    if (monsterTrail) finalSteps.push('Draw 3 Location Tokens (1 of each terrain). If a Witcher is in that location, draw again. Place a random, face-down Monster Weakness token matching that terrain type at each location. Shuffle these location tokens back into their stacks.');
    if (legendaryHunt) finalSteps.push('The last player in turn order takes the Legendary Monster Movement deck (shuffled, face down).');
    if (adventurePack) finalSteps.push('Then they draw two Location Tokens (of any terrain), choose one to put the Lost Mount miniature at, and shuffle the tokens back in.');

    return finalSteps;
}