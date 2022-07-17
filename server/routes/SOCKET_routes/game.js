var Game = function(){
    this.playerlen = {};
}

Game.prototype.Player(id) {
    this.players[id] = { 'id' : id };
    this.jointime = new Date();
    this.color = Math.floor(Math.random()*16777215).toString(16);
    this.HP = function(){
        this.max = 100;
        this.current = 100;
    }
    this.vel = function(){
        this.max = 100;
        this.current = 0;
    }
    this.pos = function(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}