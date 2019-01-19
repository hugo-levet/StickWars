/**
 * Enregistre la progression globale du joueur comme le score, id.
 * Et aussi, si le joueur à été activé dans le lobby.
 * @class
 */
class PlayerMeta {	
    
    /**
     * @constructor
     * @param {PlayerMetaEnum} id - L'ID du joueur.
     * @param {string} name - Le nom du joueur tel que "blue", "red", etc.
     * @param {int} tint - La couleur du joueur.
     */

	constructor(id, name, tint) {
        this.id = id;        
        this.name = name;
        this.tint = tint;
        
        this.score = 0;
        this.enable = false; // si le joueur a rejoint le lobby
    }
}