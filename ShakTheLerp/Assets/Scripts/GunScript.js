﻿#pragma strict

private var deathTimer : float = 60;
public var cameraShakeIntensity : float;
public var cameraShakeTime : float;
public var range : float = 60;
public var fireRate : float = 1;
public var damage : float = 20;
public var spreadFactor : float = 0.2;
public var projectiles : int = 1;
public var force : float = 100;
private var barrel : Transform;
private var player : GameObject;
private var x : float =0;
public var gunshot1 : AudioClip;
private var hit : RaycastHit;
private var isEquipped : boolean = false;
var linePrefab : GameObject;
var statCanvas : Canvas;
var layerMask : LayerMask;
var panelBackground : Image;
var ispistol : boolean;
var ismachinegun : boolean;
var isshotgun : boolean;
var isRocketLauncher : boolean;

var rocketProjectile : GameObject;

var dmgTxt : Text;
var frTxt : Text;
var accTxt : Text;
var projTxt : Text;

public function randomizeStats (multiplier : float){
//multiplier = multiplier * PlayerPrefs.GetFloat("DamageMultiplier");

if (ispistol == true){
range = Random.Range(40,60);
fireRate = Random.Range(0.4,0.3);
damage = Random.Range(40.0*multiplier,60.0*multiplier);
projectiles = 1.0;
spreadFactor = Random.Range(5.0,0);
cameraShakeIntensity = 0.0;
cameraShakeTime = 0.0;

}else if (ismachinegun == true){
range = Random.Range(40,60);
fireRate = Random.Range(0.3,0.08);
damage = Random.Range(32.0*multiplier,42.0*multiplier);
projectiles = 1.0;
spreadFactor = Random.Range(16.0,0);
cameraShakeIntensity = 0.0;
cameraShakeTime = 0.0;

}else if (isshotgun == true){
range = Random.Range(30,40);
fireRate = Random.Range(0.9,0.6);
damage = Random.Range(9.0*multiplier,12.0*multiplier);
projectiles = Random.Range(8,12);
spreadFactor = Random.Range(40,20);
cameraShakeIntensity = 0.1;
cameraShakeTime = 0.1;

 }else if (isRocketLauncher == true){
 range = Random.Range(60,90);
fireRate = Random.Range(1.2,0.8);
damage = Random.Range(90*multiplier,140*multiplier);
projectiles = 1;
spreadFactor = Random.Range(8,0);
cameraShakeIntensity = 0.3;
cameraShakeTime = 0.2;
 }
damage = damage * PlayerPrefs.GetFloat("DamageMultiplier");
}
function Start(){
player = GameObject.FindGameObjectWithTag("Player");
panelBackground.color = new Color(245.0/255.0,75.0/255.0,95.0/255.0, 75.0/255.0);
}

function OnMouseOver(){
	if (isEquipped == false){
	statCanvas.enabled = true;
	var displayATKSpeed : float;
	displayATKSpeed = (1.0/fireRate);
	dmgTxt.text = damage.ToString();
	frTxt.text = displayATKSpeed.ToString();
	accTxt.text = spreadFactor.ToString();
	projTxt.text = projectiles.ToString();
	
	if (player.GetComponent(PlayerCharacterController).item1equipped == true){
		var equippedWeapon : GameObject = player.GetComponent(PlayerCharacterController).weapon1;
		var dmg : float = equippedWeapon.GetComponent(GunScript).damage;
		var fr : float = equippedWeapon.GetComponent(GunScript).fireRate;
		var proj : int = equippedWeapon.GetComponent(GunScript).projectiles;
		if (((damage*projectiles)/fireRate)>((dmg*proj)/fr)){
		panelBackground.color = new Color(95.0/255.0,245.0/255.0,160.0/255.0, 100.0/255.0);
		 }else{panelBackground.color = new Color(245.0/255.0,75.0/255.0,95.0/255.0, 75.0/255.0);}
	 }
	}
}

function OnMouseExit(){
	statCanvas.enabled = false;
}

public function equip () {
isEquipped = true;
var thisCol : Collider = gameObject.GetComponent.<Collider>();
thisCol.enabled = false;
}

public function unequip(){
isEquipped = false;
Destroy(gameObject);
player = GameObject.FindGameObjectWithTag("Player");
player.GetComponent(PlayerCharacterController).unequip1();

}

function Update () {
if(Input.GetButton("Fire1")){
	if (isEquipped == true){
	ShootWeapon();   
	}
}


x += Time.deltaTime;


if (isEquipped==false){
deathTimer -= Time.deltaTime;
	if (deathTimer < 0){Destroy(gameObject);}
}
}

function ShootWeapon(){

player = GameObject.FindGameObjectWithTag("Player");
barrel = player.GetComponent(PlayerCharacterController).barrel;

   
if (x>=fireRate){
	x = 0.0f;
	 		
	var audio: AudioSource = GetComponent.<AudioSource>(); //audio gunshot sounds
	audio.clip = gunshot1;
	audio.Play();   
	
	PlayerPrefs.SetFloat("CameraShakeTime", cameraShakeTime);
	PlayerPrefs.SetFloat("CameraShakeAmmount",cameraShakeIntensity);
       
    if (isshotgun == true || ismachinegun == true || ispistol == true){
    FireBullets();
    }else if (isRocketLauncher == true){
    FireRockets();
    }
       

        	
     }


}

function FireBullets(){
       for(var i : int =0 ; i < projectiles; i++)
       {
		  
       
	       var newLineObject = Instantiate(linePrefab, barrel.position, barrel.transform.rotation);
	       var newLine = newLineObject.GetComponent(LineRenderer);
       
	       var direction : Vector3 = barrel.transform.forward;
	       direction.x += Random.Range(-spreadFactor/100, spreadFactor/100);
	       direction.z += Random.Range(-spreadFactor/100, spreadFactor/100);
	        var shootRay = new Ray(barrel.transform.position, direction);
	        if(Physics.Raycast(shootRay, hit, range, layerMask)){
	        	
	        	if(hit.collider.gameObject.tag == "Enemy"){
	        		var hitRigidBody : Rigidbody = hit.collider.gameObject.GetComponent.<Rigidbody>();
	        		hitRigidBody.AddForceAtPosition(force*shootRay.direction, hit.point);
	        		var EnemyScript : GameObject;
	       			EnemyScript = hit.collider.gameObject;
	        		EnemyScript.GetComponent(Basic_Enemy).ApplyDamage(damage); //Applies damage to the enemy
	        		
	              		
	        	
	        		newLine.SetPosition(0, barrel.transform.position); //Creates the line renderer to visualize the bullet
	        		newLine.SetPosition(1, hit.point);
	        		}else{
	        		newLine.SetPosition(0, barrel.transform.position); //Creates the line renderer to visualize the bullet
	        		newLine.SetPosition(1, hit.point);
	        		}
	        		       		
	        	}else{
	        	newLine.SetPosition(0, barrel.transform.position);
	        	newLine.SetPosition(1, (barrel.transform.position + direction * range));
	        	}
        	}
}

function FireRockets(){
var projectile : GameObject = Instantiate(rocketProjectile, barrel.position, barrel.transform.rotation);
projectile.GetComponent(ProjectileController).SetDamage(damage);
}





