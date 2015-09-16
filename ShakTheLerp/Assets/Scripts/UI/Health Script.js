#pragma strict
import UnityEngine.UI;

private var health: int;
var healthNumber : Text;
var healthSlider : Slider;

function Start () {
healthSlider.maxValue = PlayerPrefs.GetFloat("PlayerMaxHealth");
}

function Update () {
healthNumber.text = PlayerPrefs.GetFloat("PlayerHealth").ToString();
healthSlider.value = PlayerPrefs.GetFloat("PlayerHealth");
}