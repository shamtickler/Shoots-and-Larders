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
public var gunshot1 : AudioClip;
public var playerHealth : int = 500;
private var originalHeight : float;
private var hit : RaycastHit;
var linePrefab : GameObject; 
private var x : float =0;
private var lookTarget : Vector3;


function Start () {
originalHeight = transform.position.y;
}

public function ApplyDamage (damage : float) {
playerHealth = playerHealth - damage;
}

function Update () {
Debug.Log("Player Health = " + playerHealth);
  if(Input.GetKey(KeyCode.A)){
             this.transform.Translate(Vector3.left * movementSpeed * Time.deltaTime, Space.World);
  }
if(Input.GetKey(KeyCode.D)){
             this.transform.Translate(Vector3.right * movementSpeed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.W)){
             this.transform.Translate(Vector3.forward * movementSpeed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.S)){
             this.transform.Translate(Vector3.back * movementSpeed * Time.deltaTime, Space.World);
  }
  
  
  
  if (Input.GetKey(KeyCode.Space)){
  if (transform.position.y < originalHeight + .1){
  var rb : Rigidbody = GetComponent.<Rigidbody>();
  rb.velocity = (transform.up * jumpHeight);
  	}
  }
  
  
  var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
  
  if (Physics.Raycast (ray, hit, 90000,aimLayerMask)) { lookTarget = hit.point; } //find and look towards lookTarget
  lookTarget.y = originalHeight;
 transform.LookAt(lookTarget);
 var distanceToMouse = Vector3.Distance(transform.position, lookTarget);
 
   var lineRenderer : LineRenderer = GetComponent.<LineRenderer>();
  
  if (Input.GetButtonDown("Fire2")){

var grenadeObject = Instantiate(grenade, barrel.position, barrel.transform.rotation);
 var grenaderb = grenadeObject.GetComponent(Rigidbody);

 grenaderb.AddForce(grenadeObject.transform.forward * grenadeThrowPower * distanceToMouse);
 grenaderb.AddForce(grenadeObject.transform.up * 10);
 }
  
 if(Input.GetButton("Fire1"))
        {
          ShootWeapon();   
     }
       
  

if (x <= fireRate){x = (x + Time.deltaTime);}

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


