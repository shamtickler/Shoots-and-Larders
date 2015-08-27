#pragma strict
import UnityEngine.UI;

public var health: float = 100f;
public var damage: float = 5f;
private var player : GameObject;
private var distanceToPlayer : float;
private var timeSinceLastAttack : float;
public var attackSpeed : float = 2;
public var goldValue : int = 150;
var lootWeapon1 : GameObject;
var slider : Slider;
var canvas : Canvas;
private var myLevel : float;

public function ApplyDamage (damage : float) {
health = health - damage;
if (canvas.enabled == false){canvas.enabled = true;}
}

function Start(){
slider.maxValue = health;
}

function Update () {
timeSinceLastAttack += Time.deltaTime;


player = GameObject.FindGameObjectWithTag("Player"); //find the player
distanceToPlayer = Vector3.Distance(transform.position, player.transform.position);
if (distanceToPlayer < 2.0 && timeSinceLastAttack >= attackSpeed){
    player.GetComponent(PlayerCharacterController).ApplyDamage(damage); //Applies damage to the player
    timeSinceLastAttack = 0; 		
}




if (health <= 0){
	if (Random.Range(100, 0) > 95){
	var droppedWeapon : GameObject;
	droppedWeapon = Instantiate(lootWeapon1, transform.position, Quaternion.identity);
	droppedWeapon.GetComponent(GunScript).randomizeStats(myLevel);
	}

player.GetComponent(PlayerCharacterController).getGold(goldValue);
Destroy(gameObject);
}
slider.value = health;
}

public function SetEnemyStats(multiplier : float){
health = 1500 * multiplier;
damage = 200 * multiplier;
attackSpeed = 2 - Mathf.Clamp(multiplier, 0,1.5);
goldValue = 350*multiplier;
slider.maxValue = health;
myLevel = multiplier;
}