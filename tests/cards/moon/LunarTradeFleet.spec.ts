import {expect} from 'chai';
import {Game} from '../../../src/server/Game';
import {LunarTradeFleet} from '../../../src/server/cards/moon/LunarTradeFleet';
import {MoonData} from '../../../src/server/moon/MoonData';
import {MoonExpansion} from '../../../src/server/moon/MoonExpansion';
import {TestPlayer} from '../../TestPlayer';

describe('LunarTradeFleet', () => {
  let player: TestPlayer;
  let card: LunarTradeFleet;
  let moonData: MoonData;

  beforeEach(() => {
    player = TestPlayer.BLUE.newPlayer();
    const game = Game.newInstance('gameid', [player], player, {moonExpansion: true});
    card = new LunarTradeFleet();
    moonData = MoonExpansion.moonData(game);
  });

  it('can play', () => {
    player.cardsInHand = [card];
    player.megaCredits = card.cost;

    player.production.override({titanium: 2});
    expect(player.getPlayableCardsForTest()).does.include(card);

    player.production.override({titanium: 1});
    expect(player.getPlayableCardsForTest()).does.not.include(card);
  });

  it('play', () => {
    player.production.override({megacredits: 0});
    expect(player.getTerraformRating()).eq(14);
    moonData.logisticRate = 0;

    card.play(player);

    player.production.override({megacredits: 2});
    expect(moonData.logisticRate).eq(1);
    expect(player.getTerraformRating()).eq(15);
  });
});

