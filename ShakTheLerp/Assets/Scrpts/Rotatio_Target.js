#pragma strict
var userCamera:Transform;

function Update () {
transform.position = Vector3(userCamera.position.x, transform.position.y, userCamera.position.z + 5);
}