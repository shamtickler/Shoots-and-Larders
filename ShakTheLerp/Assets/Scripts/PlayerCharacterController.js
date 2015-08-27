#pragma strict
import UnityEngine.UI;

var movementSpeed : float = 20;
var barrel: Transform;
private var range : float = 60;
private var projectiles : int;
private var fireRate : float = 1;
private var damage : float = 20;
var aimLayerMask : LayerMask;
var hoverLayerMask : LayerMask;
var force : float = 100;
private var spreadFactor : float = 0.2;
var jumpHeight : float = 10;
var grenade : GameObject;
var grenadeThrowPower : float = 6;
var linePrefab : GameObject; 
var weapon1 : GameObject;
public var playerLevel : int = 1;
public var playerGold : int = 10;
public var gunshot1 : AudioClip;
public var playerHealth : int = 500;
private var originalHeight : float;
private var hit : RaycastHit;
private var instanceOfWeapon1 : GameObject;
private var lookTarget : Vector3;
public var item1equipped : boolean = false;
private var groundLoot : GameObject;
var canvas : Canvas;


function Start () {
originalHeight = transform.position.y;
item1equipped = true;
instanceOfWeapon1 = Instantiate(weapon1, barrel.position, barrel.rotation);
instanceOfWeapon1.transform.parent = barrel.transform;
weapon1 = instanceOfWeapon1;
weapon1.GetComponent(GunScript).equip();
}

public function equip1(whatToEquip : GameObject){
item1equipped = true;
whatToEquip.transform.position = barrel.position;
whatToEquip.transform.rotation = barrel.rotation;
whatToEquip.transform.parent = barrel.transform;
whatToEquip.GetComponent(GunScript).equip();
weapon1 = whatToEquip;
canvas.GetComponent(ItemSlot).exit(1);
}
public function unequip1(){
item1equipped = false;

canvas.GetComponent(ItemSlot).NoItem();
}

public function GetEquippedBool() : boolean{
return item1equipped;
}

public function ApplyDamage (damage : float) {
playerHealth = playerHealth - damage;
}

public function getGold (gold : int){
playerGold += gold;
}


function Update () {
aimCharacter(); 	//Aims the character in the direction of the mouse



 if(Input.GetKeyDown(KeyCode.Q)){
 item1equipped = false;
 	weapon1.GetComponent(GunScript).unequip();
 	
 }

  if(Input.GetKey(KeyCode.A)){
             transform.Translate(Vector3.left * movementSpeed * Time.deltaTime, Space.World);
  }
if(Input.GetKey(KeyCode.D)){
             transform.Translate(Vector3.right * movementSpeed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.W)){
             transform.Translate(Vector3.forward * movementSpeed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.S)){
             transform.Translate(Vector3.back * movementSpeed * Time.deltaTime, Space.World);
  }
  
  if(Input.GetKey(KeyCode.R)){
             instanceOfWeapon1.GetComponent(GunScript).randomizeStats(1);
  }
  
  

  
if (Input.GetButtonDown("Fire2")){
	throwGrenade();
}

if (item1equipped == false && Input.GetButtonDown("Fire1")){
var ray2 = Camera.main.ScreenPointToRay (Input.mousePosition);
if (Physics.Raycast (ray2, hit)){
	if (hit.collider.gameObject.tag == "Items"){
		if (Vector3.Distance(hit.collider.gameObject.transform.position, transform.position) < 2){
			equip1(hit.collider.gameObject);
	}		
  }
 } 
}


}



function aimCharacter(){
var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 					//creats a ray pointing from the mouse position in screen space
if (Physics.Raycast (ray, hit, 1000,aimLayerMask)) {lookTarget = hit.point;} 



lookTarget.y += originalHeight;
barrel.transform.LookAt(lookTarget);
lookTarget.y = transform.position.y;
transform.LookAt(lookTarget);
}

function throwGrenade(){
var grenadeObject = Instantiate(grenade, barrel.position, barrel.transform.rotation);		//Spawns the grenade prefab
var grenaderb = grenadeObject.GetComponent(Rigidbody);										//Gets the required variables to add force
var distanceToMouse = Vector3.Distance(transform.position, lookTarget);						//and calculate said force

grenaderb.AddForce(grenadeObject.transform.forward * grenadeThrowPower * distanceToMouse); 	//Adds force to grenade forwards in relation to the 
grenaderb.AddForce(grenadeObject.transform.up * 10);										//position of the mouse
}





