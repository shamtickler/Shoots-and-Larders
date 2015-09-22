 #pragma strict
 

     public var rotationTarget: Transform;
     private var speed: float = 5.0f;
     //public var rotationTarget: GameObject;
     private var cameraOffset: float = 15.0f;
     //private var t:float = 0.0f;
     var lookRot : Quaternion;
     
     private function zoomOut():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") < 0) && (cameraOffset <= 20))
     		{
     		this.transform.Translate((Vector3.up * Mathf.Pow(this.speed,1.3f) * Time.deltaTime), Space.World);
     		cameraOffset = this.transform.position.y;
     		this.updateSpeed();
     		}
     }
     
     private function zoomIn():void{
     	if ((Input.GetAxis("Mouse ScrollWheel") > 0) && (cameraOffset >= 5))
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
         //var endPosition : Transform;
         //endPosition = (rotationTarget.transform.position.x, transform.position.y, rotationTarget.transform.position.z - 6)
         transform.position = Vector3.Lerp(Vector3(rotationTarget.transform.position.x, transform.position.y, rotationTarget.transform.position.z - 6),transform.position, 0.9);
         var lookPos = rotationTarget.position;
         lookPos.x = transform.position.x;
         lookRot = Quaternion.LookRotation(lookPos - transform.position, Vector3.up);
         transform.rotation = Quaternion.Lerp(transform.rotation, lookRot, 0.1);
       
         
         
         
   		}
 