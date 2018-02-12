var Menu = {

    init: function () {
        
    },

    create: function () {
        
        game.stage.backgroundColor = '#182d3b';
        game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
    
    },
};

function actionOnClick () {

    game.state.add('Game', Game);
    game.state.start('Game');

}