//Projectile Script
#pragma strict
 
var speed : float = 10f;
var range : float = 10f;
var damage : float = 10f;
var faceDirectionOfMovement : boolean = true;
private var distance : float;
 

function Update ()
{

    transform.Translate(Vector3.forward * Time.deltaTime * speed);
    
    
    
    distance += Time.deltaTime;
    if (distance >= range)
    {
        Destroy(gameObject);
    }
}
 
function OnTriggerEnter (other : Collider)
{
    if (other.tag == "Enemy")
    {
       var EnemyScript : GameObject;
       EnemyScript = other.gameObject;
       
       EnemyScript.GetComponent(Basic_Enemy).ApplyDamage(damage);
       
       
        Destroy(gameObject);
    }
}
 