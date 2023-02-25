import constants from '../helpers/constants';
import getRandomInt from '../helpers/getRandomInt';


export default class Coin {
  pos: { x: number; y: number };
  value: number;
  radius: number;
  id: number;
  
  constructor(id: number) {
    this.pos = {
      x: getRandomInt(constants.spawn.min, constants.spawn.max),
      y: getRandomInt(constants.spawn.min, constants.spawn.max)
    };
    this.value = getRandomInt(constants.coin.min_value, constants.coin.max_value);
    this.radius = this.value * 10;
    this.id = id;
  }
  
  getRangeRadius() {
    const base = (this.radius * 2);
    const radius = ((500 + (base * 1.5)) / 2);
    return this.radius * 3 + 500; // idk if this range is right
  }
  
  getRangeBounds() {
    const radius = this.getRangeRadius();
    
    return {
      x: this.pos.x - radius,
      y: this.pos.y - radius,
      width: radius * 2,
      height: radius * 2,
    };
  }
  
  isInRangeWith(player: any) {
    const radius = this.getRangeRadius();
    const otherRadius = player.getRangeRadius();
    
    const distance = Math.sqrt(
      (this.pos.x - player.pos.x) ** 2 + (this.pos.y - player.pos.y) ** 2,
    );
    
    return distance < radius + otherRadius;
  }
  
  hittingPlayer(player: any) {
    const distance = Math.sqrt(
      (this.pos.x - player.pos.x) ** 2 + (this.pos.y - player.pos.y) ** 2,
    );
    
    if (distance < this.radius + player.scale * constants.player_radius) {
      return true;
    }
  }
  
  getQuadTreeFormat() {
    return {
      x: this.pos.x,
      y: this.pos.y,
      width: this.radius * 2,
      height: this.radius * 2,
      id: this.id,
    };
  }
}