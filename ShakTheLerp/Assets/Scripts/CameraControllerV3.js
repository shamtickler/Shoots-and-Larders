 #pragma strict
 
 class CameraControllerV3 extends MonoBehaviour{
     public var rotationTarget: Transform;
     private var speed: float = 5.0f;
     //public var rotationTarget: GameObject;
     private var cameraOffset: float = 15.0f;
     //private var t:float = 0.0f;
     
     private function zoomOut():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") < 0) && (cameraOffset <= 20))
     		{
     		this.transform.Translate((Vector3.up * Mathf.Pow(this.speed,1.3f) * Time.deltaTime), Space.World);
     		cameraOffset = this.transform.position.y;
     		this.updateSpeed();
     		}
     }
     
     private function zoomIn():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") > 0) && (cameraOffset >= 10))
     		{
     		this.transform.Translate((Vector3.down * Mathf.Pow(this.speed,1.3f) * Time.deltaTime), Space.World);
     		cameraOffset = this.transform.position.y;
     		this.updateSpeed();
     		}
     }
     
     private function updateSpeed() :void{
     speed = (cameraOffset * 2);
     }
     
     public function Update(){
         this.zoomOut();
         this.zoomIn();
         if(Input.GetKeyDown(KeyCode.Escape)){
             Application.Quit();
         }
         transform.position = Vector3(rotationTarget.transform.position.x, transform.position.y, rotationTarget.transform.position.z - 6);
         var lookPos = rotationTarget.position;
         var lookRot = Quaternion.LookRotation(lookPos - transform.position, Vector3.up);
         transform.rotation = Quaternion.Lerp(transform.rotation, lookRot, 15*Time.deltaTime);
         
         
         
   		}
 }