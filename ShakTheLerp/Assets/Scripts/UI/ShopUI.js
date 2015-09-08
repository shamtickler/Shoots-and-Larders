#pragma strict
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
}


