#pragma strict
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
public var equipped : boolean;
var linePrefab : GameObject;


public function randomizeStats (){
range = Random.Range(40,100);
fireRate = Random.Range(1,0.1);
damage = Random.Range(10,101);
projectiles = Random.Range(1,5);
spreadFactor = Random.Range(30,1);

}

public function equip () {
equipped = true;
var rb : Rigidbody = GameObject.GetComponent.<Rigidbody>();
//rb.Sleep = true;
}

function Update () {
if(Input.GetButton("Fire1")){
	ShootWeapon();   
}
x += Time.deltaTime;




}

function ShootWeapon(){
player = GameObject.FindGameObjectWithTag("Player");
barrel = player.GetComponent(PlayerCharacterController).barrel;

   
if (x>=fireRate){
	x = 0.0f;
	 		
	var audio: AudioSource = GetComponent.<AudioSource>(); //audio gunshot sounds
	audio.clip = gunshot1;
	audio.Play();      
       
       for(var i : int =0 ; i < projectiles; i++)
       {
		  
       
	       var newLineObject = Instantiate(linePrefab, barrel.position, barrel.transform.rotation);
	       var newLine = newLineObject.GetComponent(LineRenderer);
       
	       var direction : Vector3 = barrel.transform.forward;
	       direction.x += Random.Range(-spreadFactor/100, spreadFactor/100);
	       direction.z += Random.Range(-spreadFactor/100, spreadFactor/100);
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


}