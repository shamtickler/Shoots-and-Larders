#pragma strict

public var health: float = 100f;
public var damage: float = 5f;
private var player : GameObject;
private var distanceToPlayer : float;
private var timeSinceLastAttack : float;
public var attackSpeed : float = 2;


public function ApplyDamage (damage : float) {
health = health - damage;


}

function Update () {
timeSinceLastAttack += Time.deltaTime;


player = GameObject.FindGameObjectWithTag("Player"); //find the player
distanceToPlayer = Vector3.Distance(transform.position, player.transform.position);
if (distanceToPlayer < 2.5 && timeSinceLastAttack >= attackSpeed){
    player.GetComponent(PlayerCharacterController).ApplyDamage(damage); //Applies damage to the player
    timeSinceLastAttack = 0; 		
}




if (health <= 0)
{
Destroy(gameObject);
}

}