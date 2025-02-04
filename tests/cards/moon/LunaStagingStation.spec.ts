import {Game} from '../../../src/server/Game';
import {TestPlayer} from '../../TestPlayer';
import {LunaStagingStation} from '../../../src/server/cards/moon/LunaStagingStation';
import {expect} from 'chai';
import {MoonExpansion} from '../../../src/server/moon/MoonExpansion';
import {MoonData} from '../../../src/server/moon/MoonData';

describe('LunaStagingStation', () => {
  let player: TestPlayer;
  let card: LunaStagingStation;
  let moonData: MoonData;

  beforeEach(() => {
    player = TestPlayer.BLUE.newPlayer();
    const game = Game.newInstance('gameid', [player], player, {moonExpansion: true});
    card = new LunaStagingStation();
    moonData = MoonExpansion.moonData(game);
  });

  it('can play', () => {
    player.cardsInHand = [card];
    player.megaCredits = card.cost;

    player.titanium = 1;
    moonData.logisticRate = 2;
    expect(player.getPlayableCardsForTest()).does.include(card);

    player.titanium = 0;
    moonData.logisticRate = 2;
    expect(player.getPlayableCardsForTest()).does.not.include(card);

    player.titanium = 1;
    moonData.logisticRate = 1;
    expect(player.getPlayableCardsForTest()).does.not.include(card);
  });

  it('play', () => {
    player.titanium = 1;
    moonData.logisticRate = 2;
    expect(player.getTerraformRating()).eq(14);

    card.play(player);

    expect(player.titanium).eq(0);
    expect(moonData.logisticRate).eq(4);
    expect(player.getTerraformRating()).eq(16);
  });
});

