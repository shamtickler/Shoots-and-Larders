#pragma strict
var detonationEffect : GameObject;
var projectileSpeed : float;
var damage : float;

public function SetDamage (dmg : float) {
damage = dmg;
}

function Update () {
transform.Translate(Vector3.forward * Time.deltaTime * projectileSpeed, Space.Self);
}

function OnCollisionEnter(col:Collision){
Instantiate(detonationEffect, transform.position, Quaternion.identity);
Debug.Log(col);
	var explosionPos: Vector3 = transform.position;
	var colliders: Collider[] = Physics.OverlapSphere(explosionPos, 5.0);
	for (var hit: Collider in colliders) {
		var rb: Rigidbody = hit.GetComponent.<Rigidbody>();
		if (rb != null){
			rb.AddExplosionForce(400, explosionPos, 5.0, 3.0F);
			}
		if (hit.gameObject.tag == "Enemy"){
			var enemyObject : GameObject = hit.gameObject;
			enemyObject.GetComponent(Basic_Enemy).ApplyDamage(damage / (Vector3.Distance(transform.position, enemyObject.transform.position)*2));
			}
		}
Destroy(gameObject);

}