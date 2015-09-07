#pragma strict
import UnityEngine.UI;
var mouseHover : Texture;
var mouseOut : Texture;
var imageHolder : RawImage;



public function Enter () {
imageHolder.texture = mouseHover;
}

public function Exit () {
imageHolder.texture = mouseOut;
}