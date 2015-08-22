#pragma strict
var time : float= 1;
function Start () {

}

function Update () {
time = time - Time.deltaTime;
GetComponent.<Renderer>().material.color.a = time;
if (time <= 0){
Destroy(gameObject);
}
}