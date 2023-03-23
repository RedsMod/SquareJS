const Square = {};
let ctx, Game;

Square.Game = class {

	constructor(config){

		this.Object = class {
		
			constructor(img,x,y,w,h){
				this.transform(x,y,w,h);
				this.vel(0,0);
				this.angle = 0;
				this.image = img||undefined;
			}

			_update(){
				this._paint();
				this._move();
			}

			_paint(){
				if (this.image!=undefined) {
						ctx.translate(this.x-(this.w/2),this.y-(this.h/2));
						ctx.rotate((Math.PI * 180) * this.angle);
						ctx.drawImage(this.image, 0-(this.w/2), 0-(this.h/2), this.w, this.h);
						ctx.rotate(-((Math.PI * 180) * this.angle));
						ctx.translate(-(this.x-(this.w/2)),-(this.y-(this.h/2)));
				}
			} 

			_move(){
				this.x += this.velx;
				this.y += this.vely;
			}

			transform(x,y,w,h){
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
			}

			vel(x,y){
				this.velx = x;
				this.vely = y;
			}

			instance(){
				Game.scene.elements.push(this);
			}
		}

		this.Scene = class {
			constructor(){
				this.elements = [];
			}

			_update(){
				for (var i=0; i<this.elements.length; i++) {
					if (this.elements[i]) {
						this.elements[i]._update();
					}
				}
			}
		}

		this.width = config.width;
		this.height = config.height;
		this.scene = new this.Scene();
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		
		ctx = this.canvas.getContext('2d');
		Game = this;

		this.loop = ()=>{
			ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.scene._update();
			this.update();
			requestAnimationFrame(this.loop);
		}
	}

	create(){}
	update(){}

	init(){
		document.body.appendChild(this.canvas);
		this.create();
		this.loop();
	}
}


Square.Input = {};

Square.Input.Keyboard = {
	'ArrowLeft': {isdown:false,isup:false,ispress:false},
	'ArrowRight': {isdown:false,isup:false,ispress:false},
	'ArrowUp': {isdown:false,isup:false,ispress:false},
	'ArrowDown': {isdown:false,isup:false,ispress:false},
	'KeyA': {isdown:false,isup:false,ispress:false},
	'KeyB': {isdown:false,isup:false,ispress:false},
	'KeyC': {isdown:false,isup:false,ispress:false},
	'KeyD': {isdown:false,isup:false,ispress:false},
	'KeyE': {isdown:false,isup:false,ispress:false},
	'KeyF': {isdown:false,isup:false,ispress:false},
	'KeyG': {isdown:false,isup:false,ispress:false},
	'KeyH': {isdown:false,isup:false,ispress:false},
	'KeyI': {isdown:false,isup:false,ispress:false},
	'KeyJ': {isdown:false,isup:false,ispress:false},
	'KeyK': {isdown:false,isup:false,ispress:false},
	'KeyL': {isdown:false,isup:false,ispress:false},
	'KeyM': {isdown:false,isup:false,ispress:false},
	'KeyN': {isdown:false,isup:false,ispress:false},
	'KeyO': {isdown:false,isup:false,ispress:false},
	'KeyP': {isdown:false,isup:false,ispress:false},
	'KeyQ': {isdown:false,isup:false,ispress:false},
	'KeyR': {isdown:false,isup:false,ispress:false},
	'KeyS': {isdown:false,isup:false,ispress:false},
	'KeyT': {isdown:false,isup:false,ispress:false},
	'KeyU': {isdown:false,isup:false,ispress:false},
	'KeyV': {isdown:false,isup:false,ispress:false},
	'KeyW': {isdown:false,isup:false,ispress:false},
	'KeyX': {isdown:false,isup:false,ispress:false},
	'KeyY': {isdown:false,isup:false,ispress:false},
	'KeyZ': {isdown:false,isup:false,ispress:false},
	'Space': {isdown:false,isup:false,ispress:false},
}

Square.Input.isup = function(keycode){
	if (Square.Input.Keyboard[keycode]) {
		return (Square.Input.Keyboard[keycode].isup);
	}	
}

Square.Input.isdown = function(keycode){
	if (Square.Input.Keyboard[keycode]) {
		return (Square.Input.Keyboard[keycode].isdown);
	}	
}

Square.Input.ispress = function(keycode){
	if (Square.Input.Keyboard[keycode]) {
		return (Square.Input.Keyboard[keycode].ispress);
	}	
}

window.addEventListener('keyup',(e)=>{
	if (Square.Input.Keyboard[e.code]) {
		Square.Input.Keyboard[e.code].isup = true;
		Square.Input.Keyboard[e.code].isdown = false;
		requestAnimationFrame(()=>{Square.Input.Keyboard[e.code].isup = false});
	}
})

window.addEventListener('keypress',(e)=>{
	if (Square.Input.Keyboard[e.code]) {
		Square.Input.Keyboard[e.code].ispress = true;
		requestAnimationFrame(()=>{Square.Input.Keyboard[e.code].ispress = false});
	}
})

window.addEventListener('keydown',(e)=>{
	if (Square.Input.Keyboard[e.code]) {
		Square.Input.Keyboard[e.code].isdown = true;
	}
})

export {Square}