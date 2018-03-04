//
// Cette classe s'instantie dans le lobby
// Gère les entrées du joueur dans le lobby

class PlayerMeta {	
	
	constructor(id, name, tint) {
        this.id = id;        
        this.score = 0;
        this.tint = tint;
        
        this.enable = false;
    }
}