﻿#pragma strict

public var mouseEnter : Texture;
public var mouseExit : Texture;
public var emptySlot : Texture;
private var showStats : boolean = true;
private var EquippedWeapon : GameObject;

var damage : Text;
var fireRate : Text;
var accuracy : Text;
var projectiles : Text;

var itemSlot1 : RawImage;
var player : GameObject;
var statPanel : Canvas;


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

public function currentStats(){
if (showStats == true){
showStats = false;
statPanel.enabled = false;

}else if (showStats == false){
showStats = true;
statPanel.enabled = true;
 }
}

function Update(){
if (showStats == true){
EquippedWeapon = player.GetComponent(PlayerCharacterController).weapon1;
damage.text = EquippedWeapon.GetComponent(GunScript).damage.ToString();
fireRate.text = EquippedWeapon.GetComponent(GunScript).fireRate.ToString();
accuracy.text = EquippedWeapon.GetComponent(GunScript).spreadFactor.ToString();
projectiles.text = EquippedWeapon.GetComponent(GunScript).projectiles.ToString();
 }
}






