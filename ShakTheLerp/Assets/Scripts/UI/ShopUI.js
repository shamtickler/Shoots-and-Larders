#pragma strict
private var gold : int;
var goldText : Text;

function Update () {
gold = PlayerPrefs.GetInt("PlayerGold");
goldText.text = gold.ToString();

}


public function loadLevel(level : String){
Application.LoadLevel(level);
}