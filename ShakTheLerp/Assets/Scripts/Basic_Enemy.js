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
var lootWeapon2 : GameObject;
var lootWeapon3 : GameObject;
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
var rndnum : float = Random.Range(100, 0);
	if (rndnum > 95){
	var droppedWeapon : GameObject;
	droppedWeapon = Instantiate(lootWeapon1, transform.position, Quaternion.identity);
	droppedWeapon.GetComponent(GunScript).randomizeStats(myLevel);
	}else if(rndnum>90 && rndnum<95){
	droppedWeapon = Instantiate(lootWeapon2, transform.position, Quaternion.identity);
	droppedWeapon.GetComponent(GunScript).randomizeStats(myLevel);
	}else if(rndnum>85 && rndnum<90){
	droppedWeapon = Instantiate(lootWeapon3, transform.position, Quaternion.identity);
	droppedWeapon.GetComponent(GunScript).randomizeStats(myLevel);
	}

player.GetComponent(PlayerCharacterController).getGold(goldValue);
Destroy(gameObject);
}
slider.value = health;
}

public function SetEnemyStats(multiplier : float){
health = 75 * multiplier;
damage = 5 * multiplier;
attackSpeed = 2 - Mathf.Clamp((multiplier/20), 0,1.5);
goldValue = 5*multiplier;
slider.maxValue = health;
myLevel = multiplier;
}