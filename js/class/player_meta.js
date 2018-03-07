//
// Cette classe s'instantie dans le lobby
// Gère les entrées du joueur dans le lobby

class PlayerMeta {	
	
	constructor(id, name, tint) {
        this.id = id;        
        this.name = name;
        this.tint = tint;
        
        this.score = 0;
        this.enable = false;
    }
}