#pragma strict
var enemy : GameObject;
var spawnFrequency : float = 0.5;
var maxEnemies : int = 6;
private var spawnTimer : float =0;
private var gos : GameObject[];
private var enemiesAlive : int;
private var xEnemies : int = 5;
private var alreadySpawnedEnemies : int;
public var enemyWave : int = 1;
private var waveSpawnEnabled : boolean = true;
public var zoneWidth : float;
public var zoneHeight : float;

function Start () {

}

function Update () {
gos = GameObject.FindGameObjectsWithTag("Enemy");
enemiesAlive = gos.Length;
waveControl();

if ((gos.Length == 0.0) && (waveSpawnEnabled == false)){
enemyWave += 1;
xEnemies += 2;
alreadySpawnedEnemies = 0;
waveSpawnEnabled = true;
}

spawnTimer += Time.deltaTime;
}



function waveControl(){
if ((spawnFrequency <= spawnTimer) && (maxEnemies > enemiesAlive)){
	if (waveSpawnEnabled == true){
	var position: Vector3 = Vector3(Random.Range(-zoneWidth, zoneWidth), 1, Random.Range(-zoneHeight, zoneHeight));
	var spawnedEnemy : GameObject;
	spawnedEnemy = Instantiate(enemy, position, Quaternion.identity);
	spawnTimer = 0.0f;
	spawnedEnemy.GetComponent(Basic_Enemy).SetEnemyStats(enemyWave);
	alreadySpawnedEnemies += 1;
	if (alreadySpawnedEnemies >= xEnemies){waveSpawnEnabled = false;}
  }
 }
}


public function GetEnemyLevel() : float{
return enemyWave;
}