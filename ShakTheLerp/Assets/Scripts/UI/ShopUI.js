#pragma strict
public var dmgMultiCost : int;
private var gold : int;
var goldText : Text;
var infoCanvasLeft : Canvas;
var infoCanvasRight : Canvas;
var infoCanvasTextLeft : Text;
var infoCanvasTextRight : Text;

function Update () {
gold = PlayerPrefs.GetFloat("PlayerGold");
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
PlayerPrefs.SetFloat("PlayerGold",100000000);
PlayerPrefs.SetFloat("PlayerGoldMultiplier",1);
PlayerPrefs.SetFloat("PlayerMaxHealth",300);

}


