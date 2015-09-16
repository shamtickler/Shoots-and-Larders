#pragma strict
import UnityEngine.UI;

private var gold: float;
var goldNumber : Text;
private var Player : GameObject;

function Update () {
gold = Mathf.Round(PlayerPrefs.GetFloat("PlayerGold"));
goldNumber.text = gold.ToString();
}