#pragma strict
var enemy : GameObject;
var spawnFrequency : float = 1;
var maxEnemies : int = 100;
private var spawnTimer : float =0;
private var gos : GameObject[];
function Start () {

}

function Update () {
gos = GameObject.FindGameObjectsWithTag("Enemy");
if (spawnFrequency <= spawnTimer && gos.Length < maxEnemies){
var position: Vector3 = Vector3(Random.Range(-50.0, 50.0), 1, Random.Range(-50.0, 50.0));
Instantiate(enemy, position, Quaternion.identity);
spawnTimer = 0.0f;
}
spawnTimer += Time.deltaTime;
Debug.Log("gos length = " + gos.Length);
}