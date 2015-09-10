#pragma strict
import UnityEngine.UI;
var mouseHover : Texture;
var mouseOut : Texture;
var imageHolder : RawImage;
var infoTextCanvas : Canvas;
var infoText : String;
var isUpgrade : boolean;
var upgradePrefCost : String;
private var displaystring : String;


function Update(){



}

public function Enter () {

displaystring = infoText + (PlayerPrefs.GetFloat(upgradePrefCost)*100).ToString();
imageHolder.texture = mouseHover;
infoTextCanvas.gameObject.GetComponent(ShopUI).ShowInfo();

if (isUpgrade == true){
infoTextCanvas.gameObject.GetComponent(ShopUI).infoCanvasTextFunction(displaystring);
}else{
infoTextCanvas.gameObject.GetComponent(ShopUI).infoCanvasTextFunction(infoText);
}

}

public function Exit () {
imageHolder.texture = mouseOut;
infoTextCanvas.gameObject.GetComponent(ShopUI).HideInfo();
}