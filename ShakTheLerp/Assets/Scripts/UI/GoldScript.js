#pragma strict
import UnityEngine.UI;

private var gold: int;
var goldNumber : Text;
private var Player : GameObject;

function Update () {
//Player = GameObject.FindGameObjectWithTag("Player");
//gold = Player.GetComponent(PlayerCharacterController).playerGold;
gold = PlayerPrefs.GetInt("PlayerGold");
goldNumber.text = gold.ToString();
}