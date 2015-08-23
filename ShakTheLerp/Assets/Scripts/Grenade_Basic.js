#pragma strict
var radius:float = 10;
var power: float = 200;
var fuse: float = 5.0f;
private var timePassed: float = 0;

function Start () {

}

function Update () {
timePassed += Time.deltaTime;
if (timePassed >= fuse){
	var explosionPos: Vector3 = transform.position;
	var colliders: Collider[] = Physics.OverlapSphere(explosionPos, radius);
	for (var hit: Collider in colliders) {
		var rb: Rigidbody = hit.GetComponent.<Rigidbody>();
		if (rb != null)
			rb.AddExplosionForce(power, explosionPos, radius, 3.0F);
		}
	Destroy(gameObject);
	}
}