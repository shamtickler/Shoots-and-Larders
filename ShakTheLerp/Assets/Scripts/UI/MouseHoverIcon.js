#pragma strict
import UnityEngine.UI;
var mouseHover : Texture;
var mouseOut : Texture;
var imageHolder : RawImage;
var infoTextCanvas : Canvas;
var infoText : String;



public function Enter () {
imageHolder.texture = mouseHover;
infoTextCanvas.gameObject.GetComponent(ShopUI).ShowInfo();
infoTextCanvas.gameObject.GetComponent(ShopUI).infoCanvasTextFunction(infoText);
}

public function Exit () {
imageHolder.texture = mouseOut;
infoTextCanvas.gameObject.GetComponent(ShopUI).HideInfo();
}