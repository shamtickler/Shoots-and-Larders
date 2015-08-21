//Projectile Script
#pragma strict
 
var speed : float = 10f;
var range : float = 10f;
var damage : float = 10f;
var rb: Rigidbody;
private var distance : float;
 
function Start()
{
rb = GetComponent.<Rigidbody>();
rb.velocity = transform.forward * speed;
}


function Update ()
{

    //transform.Translate(Vector3.forward * Time.deltaTime * speed);
    
    
    
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
 