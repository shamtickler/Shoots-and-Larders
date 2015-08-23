#pragma strict
var seconds : float;
private var x: float =0;
function Start () {

}

function Update () {
x += Time.deltaTime;
if (x >= seconds){
	Destroy(gameObject);
	}
}