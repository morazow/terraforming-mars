import {IColony} from './Colony';
import {Europa} from './Europa';
import {Ganymede} from './Ganymede';
import {Titan} from './Titan';
import {Callisto} from './Callisto';
import {Triton} from './Triton';
import {Ceres} from './Ceres';
import {Luna} from './Luna';
import {Io} from './Io';
import {Miranda} from './Miranda';
import {Pluto} from './Pluto';
import {Enceladus} from './Enceladus';
import {Iapetus} from '../cards/community/Iapetus';
import {Mercury} from '../cards/community/Mercury';
import {ColonyName} from './ColonyName';
import {Hygiea} from '../cards/community/Hygiea';
import {Titania} from '../cards/community/Titania';
import {Venus} from '../cards/community/Venus';
import {Leavitt} from '../cards/community/Leavitt';

export interface IColonyFactory<T> {
    colonyName: ColonyName;
    Factory: new () => T
}

// ALL COLONIES TILES is now a const not and attribute of Colony Dealer
export const ALL_COLONIES_TILES: Array<IColonyFactory<IColony>> = [
  {colonyName: ColonyName.CERES, Factory: Ceres},
  {colonyName: ColonyName.ENCELADUS, Factory: Enceladus},
  {colonyName: ColonyName.EUROPA, Factory: Europa},
  {colonyName: ColonyName.GANYMEDE, Factory: Ganymede},
  {colonyName: ColonyName.IO, Factory: Io},
  {colonyName: ColonyName.LUNA, Factory: Luna},
  {colonyName: ColonyName.MIRANDA, Factory: Miranda},
  {colonyName: ColonyName.TITAN, Factory: Titan},
  {colonyName: ColonyName.CALLISTO, Factory: Callisto},
  {colonyName: ColonyName.PLUTO, Factory: Pluto},
  {colonyName: ColonyName.TRITON, Factory: Triton},
];

export const COMMUNITY_COLONIES_TILES: Array<IColonyFactory<IColony>> = [
  {colonyName: ColonyName.IAPETUS, Factory: Iapetus},
  {colonyName: ColonyName.MERCURY, Factory: Mercury},
  {colonyName: ColonyName.HYGIEA, Factory: Hygiea},
  {colonyName: ColonyName.TITANIA, Factory: Titania},
  {colonyName: ColonyName.VENUS, Factory: Venus},
  {colonyName: ColonyName.LEAVITT, Factory: Leavitt},
];

// Function to return a card object by its name
export function getColonyByName(colonyName: string): IColony | undefined {
  const colonyTiles = ALL_COLONIES_TILES.concat(COMMUNITY_COLONIES_TILES);
  const colonyFactory = colonyTiles.find((colonyFactory) => colonyFactory.colonyName === colonyName);
  if (colonyFactory !== undefined) {
    return new colonyFactory.Factory();
  }
  return undefined;
}

export class ColonyDealer {
    public coloniesDeck: Array<IColony> = [];
    public discardedColonies: Array<IColony> = [];

    public shuffle(cards: Array<IColony>): Array<IColony> {
      const deck: Array<IColony> = [];
      const copy = cards.slice();
      while (copy.length) {
        deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
      }
      return deck;
    }
    public discard(card: IColony): void {
      this.discardedColonies.push(card);
    }
    public drawColonies(players: number, allowList: Array<ColonyName> = [], venusNextExtension: boolean, addCommunityColonies: boolean = false): Array<IColony> {
      let count: number = players + 2;
      let colonyTiles = ALL_COLONIES_TILES;
      if (addCommunityColonies) colonyTiles = colonyTiles.concat(COMMUNITY_COLONIES_TILES);
      if (!venusNextExtension) colonyTiles = colonyTiles.filter((c) => c.colonyName !== ColonyName.VENUS);

      if (allowList.length === 0) {
        colonyTiles.forEach((e) => allowList.push(e.colonyName));
      }
      if (players === 1) {
        count = 4;
      } else if (players === 2) {
        count = 5;
      }

      const tempDeck = this.shuffle(
          colonyTiles.filter(
              (el) => allowList.includes(el.colonyName),
          ).map(
              (cf) => new cf.Factory(),
          ),
      );
      for (let i = 0; i < count; i++) {
        this.coloniesDeck.push(tempDeck.pop()!);
      }
      this.discardedColonies.push(...tempDeck);
      this.discardedColonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.coloniesDeck.sort((a, b) => (a.name > b.name) ? 1 : -1);

      return this.coloniesDeck;
    }
}
