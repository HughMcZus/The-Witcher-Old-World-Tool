import { ReactElement, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { TerrainLocation, getTerrainLocations } from './terrains';
import { shuffle } from '../util/generic';

export function startingResources(numPlayers: number, t): ReactElement {
    let ret: Array<string> = [""];
    const p = t('player');
    const c = t('cards');
    const g = t('gold');
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
            {ret.map((text, index) => (
                <li key={numPlayers + "-" + index}>{text}</li>
            ))}
        </ul>
    );
}

export function wildHuntDifficulty(numPlayers: number, t): string[] {
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
            <ol>
                <li key={'1'}>{t('setupHelper.skellige.playmat.1')}</li>
                <li key={'2'}>{t('setupHelper.skellige.playmat.2')}
                    <ul>
                        {locations.map((loc, index) => (
                            <li key={index}>{t(loc.name)}, {loc.num}</li>
                        ))}
                    </ul>
                </li>
            </ol>

            {t('setupHelper.skellige.board.0')}
            <ol>
                {[1, 2, 3, 4].map((val, index) => (
                    <li key={index}>
                        {t(`setupHelper.skellige.board.${val}`)}
                    </li>

                ))}
                {/* <li>{t('setupHelper.skellige.board.2')}</li>
                <li>{t('setupHelper.skellige.board.3')}</li>
                <li>{t('setupHelper.skellige.board.4')}</li> */}
            </ol>
        </>
    );
}


/**
 * Generates a string composed of the expansion names in order to access the translation key in
 * locales/**\/Translation.json
 * @param w Wild Hunt expansion boolean
 * @param m Mages expansion boolean
 * @param mT Monster Trail expansion boolean
 * @returns Constructed string composed of the expansions used for translation key
 */
function playerSetup(w: boolean, m: boolean, mT: boolean) {
    let name = "base";
    if (w) name = "wildHunt";
    if (m) name += "Mages";
    if (mT) name += "MonsterTrail";
    return "setupHelper.base.playerSetup." + name;
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
): string[] {
    if (numPlayers < 1 || numPlayers > 5) {
        throw new Error(t('setupHelper.error'));
    }

    const finalSteps: any[] = [];
    let tempElem = {}, tempArr: any[] = [];

    finalSteps.push(t('setupHelper.base.1'));
    if (legendaryHunt) finalSteps.push(t('setupHelper.legendaryHunt.1'));

    if (wildHunt) {
        finalSteps.push(
            <>
                {t('setupHelper.wildHunt.difficultyTitle')}
                <Table className='lh-base' style={{ tableLayout: 'fixed' }}>
                    <thead style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <tr>
                            <th>{t('setupHelper.wildHunt.easy')}</th>
                            <th>{t('setupHelper.wildHunt.medium')}</th>
                            <th>{t('setupHelper.wildHunt.hard')}</th>
                            <th>{t('setupHelper.wildHunt.veryHard')}</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <tr>
                            {wildHuntDifficulty(numPlayers, t).map((text, index) => (
                                <td key={index} style={{
                                    whiteSpace: 'pre-wrap', borderBottom: 'none'
                                }}>
                                    {text}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </>
        );

        finalSteps.push(t('setupHelper.wildHunt.manage'));
    }

    const locations = randomizeSkelligeBoatStartingLocations(coastalLocations);
    if (skellige) {
        finalSteps.push(
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

                {t('setupHelper.skellige.board.0') + ":"}
                <ul>
                    <li>{t('setupHelper.skellige.board.1')}</li>
                    <li>{t('setupHelper.skellige.board.2')}</li>
                    <li>{t('setupHelper.skellige.board.3')}</li>
                    <li>{t('setupHelper.skellige.board.4')}</li>
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
    tempElem = {};

    // step
    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.mutagen'));

    // step
    finalSteps.push(t('setupHelper.base.potions'));

    // step
    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.bomb'));

    if (wildHunt) {
        finalSteps.push(t('setupHelper.wildHunt.createExplorationDeck', { num: numPlayers > 3 ? 3 : 4 }));
        finalSteps.push(t('setupHelper.wildHunt.decks'));
    } else {
        finalSteps.push(t('setupHelper.base.decks'));
        if (skellige) finalSteps.push(t('setupHelper.skellige.decks'));
        if (skellige && !wildHunt) finalSteps.push(t(`setupHelper.skellige.${monsterTrail ? 'dagonMT' : 'dagon'}`));
        if (monsterPack && skellige) finalSteps.push(t('setupHelper.skellige.siren'));
        tempElem = {};
    }

    // Adventure Pack and Wild Hunt are mutually exclusive
    let expansion = "base";
    if (adventurePack) expansion = "adventurePack";
    if (wildHunt) expansion = "wildHunt";
    finalSteps.push(t(`setupHelper.${expansion}.tokens`));
    finalSteps.push(t('setupHelper.base.locationTokens'));

    // create array of string list items to generate ordered list
    tempArr = [];
    tempArr.push(t('setupHelper.base.monsterSetup.0'));

    if (wildHunt) {
        tempArr.push(t('setupHelper.wildHunt.monsterSetup.0'));
        tempArr.push(t('setupHelper.wildHunt.monsterSetup.1'));
    } else {
        if (numPlayers > 3)
            tempArr.push(t('setupHelper.base.monsterSetup.1', { numTokens: numPlayers > 3 ? numPlayers - 3 : 3 }));
        tempArr.push(t(`setupHelper.base.monsterSetup.2.${numPlayers}`));
        tempArr.push(t('setupHelper.base.monsterSetup.3'));
        tempArr.push(t('setupHelper.base.monsterSetup.4'));
    }
    if (monsterTrail) tempArr.push(t('setupHelper.monsterTrail.lgCards'));

    tempElem = (
        <div>
            {t('setupHelper.base.monsterSetup.5')}
            <ol type='a'>
                {tempArr.map((text, id) => (
                    <li key={id}>{text}</li>
                ))}
            </ol>
        </div>
    );
    finalSteps.push(tempElem);
    tempElem = {}, tempArr = [];

    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.spFightCards'));

    wildHunt ? expansion = "wildHunt" : expansion = "base";
    finalSteps.push(t(`setupHelper.${expansion}.monsterFightDeck`));

    if (legendaryHunt) finalSteps.push(t('setupHelper.legendaryHunt.2'));
    if (wildHunt) finalSteps.push(...t('setupHelper.wildHunt.enemies'));

    finalSteps.push(t('setupHelper.base.startingPlayer'));

    tempArr.push(t(playerSetup(wildHunt, mages, monsterTrail)));
    if (numPlayers > 1) tempArr.push(t(`setupHelper.base.playerSetup.${mages ? "trophyCardsMages" : "trophyCards"}`, { num: numPlayers - 1 }));
    if (mages) tempArr.push(t('setupHelper.base.playerSetup.ifMage'));
    tempArr.push(t(`setupHelper.base.playerSetup.${mages ? 'markersMages' : 'markers'}`));
    if (numPlayers > 3) tempArr.push(t('setupHelper.base.playerSetup.raiseAttr'));
    tempArr.push(t('setupHelper.base.playerSetup.token'));
    tempArr.push(t('setupHelper.base.playerSetup.cards'));
    tempArr.push(t('setupHelper.base.playerSetup.miniature'));

    if (wildHunt) {
        tempArr.push(t('setupHelper.base.playerSetup.drawWildHunt'));
    } else {
        tempArr.push(<>{t('setupHelper.base.playerSetup.drawBase')} {startingResources(numPlayers, t)}</>);
    }
    tempElem = (
        <div>
            {t('setupHelper.base.playerSetup.title')}
            <ol type='a'>
                {tempArr.map((text, id) => (
                    <li key={id}>{text}</li>
                ))}
            </ol>
        </div>
    );
    finalSteps.push(tempElem);
    tempElem = {}, tempArr = [];

    if (numPlayers > 1 && wildHunt) finalSteps.push(t('setupHelper.wildHunt.movementPool'));
    if (monsterTrail) finalSteps.push(t('setupHelper.monsterTrail.weaknessTokens'));
    if (legendaryHunt) finalSteps.push(t('setupHelper.legendaryHunt.movementDeck'));
    if (adventurePack) finalSteps.push(t('setupHelper.adventurePack.lostMount'));

    return finalSteps;
}