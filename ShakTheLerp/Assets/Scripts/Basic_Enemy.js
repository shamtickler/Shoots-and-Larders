#pragma strict

public var health: float = 100f;
public var damge: float = 5f;
public function ApplyDamage (damage : float) {
health = health - damage;


}

function Update () {
if (health <= 0)
{
Destroy(gameObject);
}
}