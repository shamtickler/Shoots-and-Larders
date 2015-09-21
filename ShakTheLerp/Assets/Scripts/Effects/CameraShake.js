#pragma strict

var currentCamera : Camera; // set this via inspector
var shakeAmount : float = 0.5;
 
function Update() {
  if (PlayerPrefs.GetFloat("CameraShakeTime") > 0) {
    currentCamera.transform.position = Random.insideUnitSphere * shakeAmount + currentCamera.transform.position;
    PlayerPrefs.SetFloat("CameraShakeTime",(PlayerPrefs.GetFloat("CameraShakeTime") - Time.deltaTime));
 
  } else {
    PlayerPrefs.SetFloat("CameraShakeTime",0.0);
  }
}