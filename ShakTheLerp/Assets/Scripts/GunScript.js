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
private var isEquipped : boolean = false;
var linePrefab : GameObject;
var statCanvas : Canvas;
var layerMask : LayerMask;
var panelBackground : Image;
private var deathTimer : float = 30;

var dmgTxt : Text;
var frTxt : Text;
var accTxt : Text;
var projTxt : Text;

public function randomizeStats (multiplier : float){
range = Random.Range(20.0+(50.0*multiplier),30.0+(80.0*multiplier));
fireRate = Random.Range(1.0,.05);
damage = Random.Range(300.0*multiplier,500.0*multiplier);
projectiles = Random.Range(1*multiplier,30*multiplier);
spreadFactor = Random.Range(30.0,0);
if (projectiles < 1){projectiles = 1;}
}

function Start(){
player = GameObject.FindGameObjectWithTag("Player");
}

function OnMouseOver(){
	if (isEquipped == false){
	statCanvas.enabled = true;
	dmgTxt.text = damage.ToString();
	frTxt.text = fireRate.ToString();
	accTxt.text = spreadFactor.ToString();
	projTxt.text = projectiles.ToString();
	var equippedWeapon : GameObject = player.GetComponent(PlayerCharacterController).weapon1;
	var dmg : float = equippedWeapon.GetComponent(GunScript).damage;
	var fr : float = equippedWeapon.GetComponent(GunScript).fireRate;
	var proj : int = equippedWeapon.GetComponent(GunScript).projectiles;
	if (((damage*projectiles)/fireRate)>((dmg*proj)/fr)){
	//var img : Image = panelBackground.GetComponent<Image>();
		panelBackground.color = new Color(95.0/255.0,245.0/255.0,160.0/255.0, 100.0/255.0);
	 }
	}
}

function OnMouseExit(){
	statCanvas.enabled = false;
}

public function equip () {
isEquipped = true;
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


}