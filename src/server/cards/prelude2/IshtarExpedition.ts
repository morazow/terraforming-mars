import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardRequirements} from '../requirements/CardRequirements';

export class IshtarExpedition extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.ISHTAR_EXPEDITION,
      cost: 6,
      type: CardType.EVENT,

      requirements: CardRequirements.builder((b) => b.venus(10)),

      behavior: {
        stock: {
          titanium: 3,
        },
        drawCard: {count: 2, tag: Tag.VENUS},
      },

      metadata: {
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.titanium(3).cards(2, {secondaryTag: Tag.VENUS});
        }),
        description: 'Requires Venus 10%. Gain 3 titanium and draw 2 Venus cards.',
      },
    });
  }
}
