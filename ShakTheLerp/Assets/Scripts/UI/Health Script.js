#pragma strict
import UnityEngine.UI;

var health: int;
var healthNumber : Text;
var healthSlider : Slider;

function Start () {
var Player : GameObject;
Player = GameObject.FindGameObjectWithTag("Player");
health = Player.GetComponent(PlayerCharacterController).playerHealth;
healthSlider.maxValue = health;
}

function Update () {
var Player : GameObject;
Player = GameObject.FindGameObjectWithTag("Player");
health = Player.GetComponent(PlayerCharacterController).playerHealth;
healthNumber.text = health.ToString();
healthSlider.value = health;
}