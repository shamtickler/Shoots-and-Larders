#pragma strict
var speed : float = 20;
var range : float = 60;
var bullet : GameObject;
var barrel: Transform;
var fireRate : float = 1;
var damage : float = 20;
private var hit : RaycastHit;
var linePrefab : GameObject; 
private var x : float =0;
private var lookTarget : Vector3;
function Start () {

}

function Update () {
  if(Input.GetKey(KeyCode.A)){
             this.transform.Translate(Vector3.left * speed * Time.deltaTime, Space.World);
  }
if(Input.GetKey(KeyCode.D)){
             this.transform.Translate(Vector3.right * speed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.W)){
             this.transform.Translate(Vector3.forward * speed * Time.deltaTime, Space.World);
  }
  if(Input.GetKey(KeyCode.S)){
             this.transform.Translate(Vector3.back * speed * Time.deltaTime, Space.World);
  }
  
  
  var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
  
  if (Physics.Raycast (ray, hit)) { lookTarget = hit.point; }
 transform.LookAt(lookTarget);
  var lineRenderer : LineRenderer = GetComponent.<LineRenderer>();
  
  
 if(Input.GetButton("Fire1"))
        {
        if (x>=fireRate){
        x = 0.0f;
       var newLineObject = Instantiate(linePrefab, barrel.position, barrel.transform.rotation);
       var newLine = newLineObject.GetComponent(LineRenderer);
       
        var shootRay = new Ray(barrel.transform.position, transform.forward);
        if(Physics.Raycast(shootRay, hit, range)){
        	if(hit.collider.gameObject.tag == "Enemy"){
        		var EnemyScript : GameObject;
       			EnemyScript = hit.collider.gameObject;
        		EnemyScript.GetComponent(Basic_Enemy).ApplyDamage(damage);
        		newLine.SetPosition(0, barrel.transform.position);
        		newLine.SetPosition(1, hit.point);
        		}
        		       		
        	}else{
        	newLine.SetPosition(0, barrel.transform.position);
        	newLine.SetPosition(1, (barrel.transform.position + barrel.transform.forward * range));
        	}
        }        
     }
       
  

if (x <= fireRate){x = (x + Time.deltaTime);}

}