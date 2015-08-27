#pragma strict

public var mouseEnter : Texture;
public var mouseExit : Texture;
public var emptySlot : Texture;
var itemSlot1 : RawImage;
var player : GameObject;


public function enter(slotindex : int){
if (slotindex == 1 && player.GetComponent(PlayerCharacterController).item1equipped == true){
	itemSlot1.texture = mouseEnter;
}
}

public function exit(slotindex : int){
if (slotindex == 1&& player.GetComponent(PlayerCharacterController).item1equipped == true){
	itemSlot1.texture = mouseExit;
}
}

function NoItem(){
itemSlot1.texture = emptySlot;
}