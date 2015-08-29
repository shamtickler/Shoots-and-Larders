#pragma strict
import UnityEngine.UI;

var waveText : Text;
var enemySpawnerObject : GameObject;
private var waveNumber : int;

function Update () {
waveNumber = enemySpawnerObject.GetComponent(EnemySpawner).enemyWave;
waveText.text = waveNumber.ToString();

}