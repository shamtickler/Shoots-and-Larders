#pragma strict
var enemy : GameObject;
var spawnFrequency : float = 0.5;
var maxEnemies : int = 25;
public var enemyLevel : float =0.025;
private var spawnTimer : float =0;
private var gos : GameObject[];
private var xEnemies : float = 500;

function Start () {

}

function Update () {
gos = GameObject.FindGameObjectsWithTag("Enemy");
if (spawnFrequency <= spawnTimer && gos.Length < maxEnemies){
var position: Vector3 = Vector3(Random.Range(-25.0, 25.0), 1, Random.Range(-25.0, 25.0));
var spawnedEnemy : GameObject;
spawnedEnemy = Instantiate(enemy, position, Quaternion.identity);
spawnTimer = 0.0f;
enemyLevel += 0.001;
spawnedEnemy.GetComponent(Basic_Enemy).SetEnemyStats(enemyLevel);
Debug.Log(enemyLevel);
maxEnemies = xEnemies * enemyLevel;
}

spawnTimer += Time.deltaTime;
}

public function GetEnemyLevel() : float{
return enemyLevel;
}