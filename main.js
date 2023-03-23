import {Square} from './src/Square.js'
const input = Square.Input;

const nave = new Image(); nave.src = './img/nave.png';
const bala = new Image(); bala.src = './img/bala.png';
const asteroide = new Image(); asteroide.src = './img/asteroide.png';

const Game = new class extends Square.Game {
	constructor(){
		super({width:640,height:480})
		this.init();
	}

	create(){
		this.player = new this.Object(nave,40,240,16,16);

		this.scene.elements.push(this.player)
	}
}