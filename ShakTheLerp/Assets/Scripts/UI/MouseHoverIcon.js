#pragma strict
import UnityEngine.UI;
var mouseHover : Texture;
var mouseOut : Texture;
var imageHolder : RawImage;
var infoTextCanvas : Canvas;
var infoText : String;
var isUpgrade : boolean;
var upgradePref : String;
var upgradeStatValue : Text;
private var displaystring : String;
var upgradeIncreaseAmmount : float;
var upgradeCostMultiplier : float;
private var infoUpdate : boolean = false;


function Update(){

if (isUpgrade == true){upgradeStatValue.text = PlayerPrefs.GetFloat(upgradePref).ToString();}

if (infoUpdate == true){
	displaystring = infoText + (PlayerPrefs.GetFloat(upgradePref)*upgradeCostMultiplier).ToString();
	infoTextCanvas.gameObject.GetComponent(ShopUI).ShowInfo();

	if (isUpgrade == true){
	infoTextCanvas.gameObject.GetComponent(ShopUI).infoCanvasTextFunction(displaystring);
	}else{
	infoTextCanvas.gameObject.GetComponent(ShopUI).infoCanvasTextFunction(infoText);
	}
}

}

public function Enter () {
infoUpdate = true;
imageHolder.texture = mouseHover;
}

public function Exit () {
infoUpdate = false;
imageHolder.texture = mouseOut;
infoTextCanvas.gameObject.GetComponent(ShopUI).HideInfo();
}

public function PurchaseUpgrade () {
var gold : int = PlayerPrefs.GetFloat("PlayerGold");
var Cost : float = (PlayerPrefs.GetFloat(upgradePref)*upgradeCostMultiplier);
if (PlayerPrefs.GetFloat("PlayerGold") >= Cost){
		var currentMulti : float = PlayerPrefs.GetFloat(upgradePref);
		PlayerPrefs.SetFloat(upgradePref,(currentMulti + upgradeIncreaseAmmount));
		PlayerPrefs.SetFloat("PlayerGold", (gold - Cost));
}
}