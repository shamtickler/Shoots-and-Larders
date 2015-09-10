#pragma strict
public var dmgMultiCost : int;
private var gold : int;
var goldText : Text;
var infoCanvasLeft : Canvas;
var infoCanvasRight : Canvas;
var infoCanvasTextLeft : Text;
var infoCanvasTextRight : Text;

function Update () {
gold = PlayerPrefs.GetInt("PlayerGold");
goldText.text = gold.ToString();
infoCanvasLeft.transform.position = Input.mousePosition;
infoCanvasRight.transform.position = Input.mousePosition;




}


public function loadLevel(level : String){
Application.LoadLevel(level);
}

public function infoCanvasTextFunction(info : String){
infoCanvasTextLeft.text = info;
infoCanvasTextRight.text = info;
}

public function HideInfo(){
infoCanvasLeft.enabled = false;
infoCanvasRight.enabled = false;
}

public function ShowInfo(){
if (Input.mousePosition.x > (Screen.width / 2)){
infoCanvasRight.enabled = true;
}else{
infoCanvasLeft.enabled = true;
}
}
public function ResetSaveFile(){
PlayerPrefs.DeleteAll();
PlayerPrefs.SetFloat("DamageMultiplier" , 1.0);
PlayerPrefs.SetInt("PlayerGold",5000);
}

public function BuyDamageMultiplier(){
dmgMultiCost = (PlayerPrefs.GetFloat("DamageMultiplier")*100);
if (gold >= dmgMultiCost){

var currentdmgMulti : float = PlayerPrefs.GetFloat("DamageMultiplier");
PlayerPrefs.SetFloat("DamageMultiplier",(currentdmgMulti + 0.1));
PlayerPrefs.SetInt("PlayerGold", (gold - dmgMultiCost));
}
}
