 #pragma strict
 
 class CameraControllerV3 extends MonoBehaviour{
     public var rotationTarget: Transform;
     public var speed: float = 5.0f;
     public var terrain: GameObject;
     public var playerFollow: GameObject;
     private var cameraOffset: float = 15.0f;
     private var terrainHeight:float;
     private var t:float = 0.0f;
     private var mouseClickPosition:Vector2;
     
     private function moveRight():void{
         if(Input.mousePosition.x > Screen.width * 0.95f || Input.GetKey(KeyCode.RightArrow)){
             this.transform.Translate(Vector3.right * this.speed * Time.deltaTime);
             this.getTerrainHeight();
         }
     }
     
     private function moveLeft():void{
         if(Input.mousePosition.x < Screen.width * 0.05f || Input.GetKey(KeyCode.LeftArrow)){
             this.transform.Translate(-Vector3.right * this.speed * Time.deltaTime);
             this.getTerrainHeight();
         }
     }
     
     private function moveForward():void{
         if(Input.mousePosition.y < Screen.height * 0.05f || Input.GetKey(KeyCode.DownArrow)){
             this.transform.Translate(-Vector3.forward * this.speed * Time.deltaTime);
             this.getTerrainHeight();
         }
     }
     
     private function moveBackward():void{
         if(Input.mousePosition.y > Screen.height * 0.95f || Input.GetKey(KeyCode.UpArrow)){
             this.transform.Translate(Vector3.forward * this.speed*Time.deltaTime);
             this.getTerrainHeight();
         }
     }
     
     private function zoomOut():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") < 0) && (cameraOffset <= 30))
     		{
     		this.transform.Translate((Vector3.up * Mathf.Pow(this.speed,1.2f) * Time.deltaTime), Space.World);
     		cameraOffset = this.transform.position.y;
     		this.updateSpeed();
     		}
     }
     
     private function zoomIn():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") > 0) && (cameraOffset >= 5))
     		{
     		this.transform.Translate((Vector3.down * Mathf.Pow(this.speed,1.2f) * Time.deltaTime), Space.World);
     		cameraOffset = this.transform.position.y;
     		this.updateSpeed();
     		}
     }
     
     private function updateSpeed() :void{
     speed = (cameraOffset * 2);
     }
     
     private function getTerrainHeight(){
         var hit: RaycastHit;
         this.terrain.layer = 0;
         // Get terrain y value at current position.
         if(Physics.Raycast(Vector3(this.transform.position.x, 300, this.transform.position.z), -Vector3.up, hit, 500)){
             this.terrainHeight = hit.point.y;
         }
         this.terrain.layer = 2;
     }
     
     private function adjustToTerrainHeight(){
         if(this.transform.position.y != this.terrainHeight){
             this.transform.position.y = Mathf.Lerp(this.transform.position.y, (this.terrainHeight + cameraOffset), this.t);
             //this.transform.position.y = this.terrainHeight;
             Debug.Log("y " + this.terrainHeight);
             t += Time.deltaTime;
         }
         else{
             this.t = 0;
         }
     }
     
     private function rotateCamera():void{
         /*if(Input.GetMouseButtonDown(1)){
                 this.mouseClickPosition = Input.mousePosition;
         }
         if(Input.GetMouseButton(1)){
             var delta = this.mouseClickPosition - Input.mousePosition;
             this.mouseClickPosition = Input.mousePosition;
             this.transform.Rotate(Vector3.up * -this.speed * delta.x * Time.deltaTime);
             this.transform.Rotate(Vector3.right * this.speed * delta.y * Time.deltaTime);
             this.transform.rotation.eulerAngles.x = ClampAngle(this.transform.rotation.eulerAngles.x, 0.0f, 40.0f);
         }
         */
     }
     
     private function ClampAngle(angle: float, min: float, max: float): float {
         if (angle<90 || angle>270){       // if angle in the critic region...
             if (angle>180) angle -= 360;  // convert all angles to -180..+180
             if (max>180) max -= 360;
             if (min>180) min -= 360;
         }   
         angle = Mathf.Clamp(angle, min, max);
         if (angle<0) angle += 360;  // if angle negative, convert to 0..360
         return angle;
     }
     
     public function Update(){
         if(!Input.GetMouseButton(1)){
             //this.moveRight();
             //this.moveLeft();
             //this.moveForward();
            // this.moveBackward();
             this.zoomOut();
             this.zoomIn();
         }
         if(Input.GetKeyDown(KeyCode.Escape)){
             Application.Quit();
         }
         
         var lookPos = rotationTarget.position;
         //lookPos.y = lookPos.y - rotationTarget.position.y;
        // Debug.Log(lookPos.);
         var lookRot = Quaternion.LookRotation(lookPos - transform.position, Vector3.up);
         transform.rotation = Quaternion.Lerp(transform.rotation, lookRot, 15*Time.deltaTime);
         transform.position = Vector3(playerFollow.transform.position.x, transform.position.y, playerFollow.transform.position.z - 5);
         
         
   		}
     
     public function LateUpdate(){
         this.adjustToTerrainHeight();
         this.rotateCamera();
     }
 }