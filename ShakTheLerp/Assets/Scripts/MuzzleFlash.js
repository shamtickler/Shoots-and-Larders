﻿#pragma strict
var timeAlive : float;
function Start () {

}

function Update () {
timeAlive += Time.deltaTime;
if (timeAlive >= 0.25){Destroy(gameObject);}
}