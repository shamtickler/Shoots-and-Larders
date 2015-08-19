#pragma strict
public var particle: GameObject;
function Update() {
	if (Input.GetButtonDown("Fire1")) {
	var hit: RaycastHit;
	var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, hit))
			var newPosition: Vector3;
			newPosition = hit.point;
			Instantiate(particle, newPosition, Quaternion.identity);
	}
}