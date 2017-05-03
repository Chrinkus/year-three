/* Spatial Hash
 *
 * INTENT
 * I need a tool for broad phase collision detection. Even though my game is
 * not going to be *that* big, I'd like to be experimenting and ready for when
 * it does grow to the point that these considerations will have to be made.
 *
 * NEED
 *   divide up the map into a grid 
 *   store the grid in an array
 *     each index is an object with
 *       minX, minY, maxX, maxY, bucket
 *         the bucket is an array with references to local collisionables
 *   methods:
 *     getBuckets: will reset buckets every frame?
 *     addActor: adds an actor to the hash (projectile, npc spawn)
 *     removeActor: removes actor from the hash (projectile, npc death)
 *
 *   the hash will also contain an object with all of the active actors as keys
 *   and an array with all of their grid locations as the value
 * 
 * VISUALIZATION
 * Colour the ground of a bucket when the player steps into it. Should show
 * when the player crosses from one to another as both, or all four, will be
 * coloured at once.
 */


