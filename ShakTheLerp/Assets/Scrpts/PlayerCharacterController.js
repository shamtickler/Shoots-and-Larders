#pragma strict
var speed : float = 20;
//var bullet : GameObject;
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
  var hit : RaycastHit; 
  if (Physics.Raycast (ray, hit)) { lookTarget = hit.point; }
 transform.LookAt(lookTarget);
  
  
  
 if(Input.GetButtonUp("Fire1"))
        {
         
       }



}