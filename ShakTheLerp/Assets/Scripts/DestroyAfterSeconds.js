#pragma strict
var seconds : float;
var audioAttatched : AudioClip;
private var x: float =0;
function Start () {
var audio: AudioSource = GetComponent.<AudioSource>(); //audio gunshot sounds
audio.clip = audioAttatched;
audio.Play();
}

function Update () {
x += Time.deltaTime;
if (x >= seconds){
	Destroy(gameObject);
	}
}