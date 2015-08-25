#pragma strict
var movementSpeed : float = 20;
var range : float = 60;
var barrel: Transform;
var fireRate : float = 1;
var damage : float = 20;
var aimLayerMask : LayerMask;
var force : float = 100;
var spreadFactor : float = 0.2;
var jumpHeight : float = 10;
var grenade : GameObject;
var grenadeThrowPower : float = 6;
var linePrefab : GameObject; 
public var playerLevel : int = 1;
public var playerGold : int = 10;
public var gunshot1 : AudioClip;
public var playerHealth : int = 500;
private var originalHeight : float;
private var hit : RaycastHit;

private var x : float =0;
private var lookTarget : Vector3;



function Start () {
originalHeight = transform.position.y;
}

public function ApplyDamage (damage : float) {
playerHealth = playerHealth - damage;
}

public function getGold (gold : int){
playerGold += gold;
}

function grounded (){
var groundRay = new Ray(transform.position, -Vector3.up);
  if (Physics.Raycast(groundRay, hit, 1)){
  	if (Input.GetKey(KeyCode.Space)){
  			
  		}
  	}
}

function Update () {
aimCharacter(); 	//Aims the character in the direction of the mouse

 

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
  
  
  
  if (Input.GetKey(KeyCode.Space)){
  var jumpRay = new Ray(transform.position, -Vector3.up);
  if (Physics.Raycast(jumpRay, hit, 1)){
  var rb : Rigidbody = GetComponent.<Rigidbody>();
  rb.velocity = (transform.up * jumpHeight);
  	}
  }
  
  
  
 
 
 
  
if (Input.GetButtonDown("Fire2")){
	throwGrenade();
}
  
if(Input.GetButton("Fire1")){
	ShootWeapon();   
}
       
  

x += Time.deltaTime;

}

function ShootWeapon(){
   
if (x>=fireRate){
	x = 0.0f;
 		
 		var audio: AudioSource = GetComponent.<AudioSource>(); //audio gunshot sounds
 		audio.clip = gunshot1;
 		audio.Play();
 		
       var newLineObject = Instantiate(linePrefab, barrel.position, barrel.transform.rotation);
       var newLine = newLineObject.GetComponent(LineRenderer);
       
       var direction : Vector3 = barrel.transform.forward;
       direction.x += Random.Range(-spreadFactor, spreadFactor);
       direction.z += Random.Range(-spreadFactor, spreadFactor);
       
        var shootRay = new Ray(barrel.transform.position, direction);
        if(Physics.Raycast(shootRay, hit, range)){
        	
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

function aimCharacter(){
var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 					//creats a ray pointing from the mouse position in screen space
if (Physics.Raycast (ray, hit, 1000,aimLayerMask)) { lookTarget = hit.point; } //find and look towards the hit point of said ray
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



