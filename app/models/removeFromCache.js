export function removeFromCache (game,map,index) {

    // this.game = game;
    const objectsData = game.cache.getTilemapData(map).data.layers[4].objects; // objects layer is 4. Returns array
    //make target index object empty
    objectsData[index] = {};
    game.cache.getTilemapData(map).data.layers[4].objects = objectsData;
    // now sort through all enemies, npcs, triggers on map to reduce their data.index property by 1

}