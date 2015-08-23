#pragma strict
var radius:float = 10;
var power: float = 200;
var fuse: float = 5.0f;
var particles : GameObject;
private var timePassed: float = 0;

function Start () {

}

function Update () {
timePassed += Time.deltaTime;
if (timePassed >= fuse){
Instantiate(particles, transform.position, transform.rotation);
	var explosionPos: Vector3 = transform.position;
	var colliders: Collider[] = Physics.OverlapSphere(explosionPos, radius);
	for (var hit: Collider in colliders) {
		var rb: Rigidbody = hit.GetComponent.<Rigidbody>();
		if (rb != null){
			rb.AddExplosionForce(power, explosionPos, radius, 3.0F);
			}
		if (hit.gameObject.tag == "Enemy"){
			var enemyObject : GameObject = hit.gameObject;
			enemyObject.GetComponent(Basic_Enemy).ApplyDamage(power / (Vector3.Distance(transform.position, enemyObject.transform.position)*2));
			}
		}
	Destroy(gameObject);
	}
}