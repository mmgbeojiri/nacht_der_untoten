class Player{
  constructor(selector, name, initialPos){
    this.name = name;
	//console.log(this.name)
    this.obj = document.querySelector(selector);
    this.moveStrength = 1;
    this.jumpStrength = 10;
    this.moving = false;
    this.jumping = false;
	this.grounded = false;
    this.restore = false;
	this.initialPos = initialPos;
  this.cameraHeight = 1;
  this.targetCameraHeight = 1;
  this.deaccelerationFactor = 0.5; // Number between 0 and 1, 1 is no friction and 0 is all friction

  this.dx = 0;
  this.dy = 0;
  this.dz = 0;
	
    // this.dx = 0; this.dy = 0; this.dz = 0;
    this.pressed = [];

    this.driver = document.createElement("a-sphere");
    this.driver.setAttribute("color","yellow");
    this.driver.setAttribute("dynamic-body",{mass:5, angularDamping: 0.9});
    this.driver.setAttribute("radius",0.5);
	this.driver.setAttribute("position", initialPos);
	
    this.driver.object3D.position.x = this.obj.object3D.position.x;
    this.driver.object3D.position.y = this.obj.object3D.position.y;
    this.driver.object3D.position.z = this.obj.object3D.position.z;
    scene.append(this.driver);
    this.physicsReady = false;
    this.driver.addEventListener("body-loaded", ()=>{
      this.physicsReady = true;
    })
    window.addEventListener("keyup",(e)=>{
		if(activeCamera == this.name){
			delete this.pressed[e.key];
			  if(e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowDown" ||
				 e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d"){
				this.moving = false;
			  }
		}
    });
    window.addEventListener("keydown",(e)=>{
		if(activeCamera == this.name){
			this.pressed[e.key] = true; 
		}
      //console.log(this.pressed)
    })
	
	
		this.health = 100;
	}


  
  update(){
	  //console.log(this.driver.object3D.position.y)
	if(this.driver.object3D.position.y <= -10 || this.health <= 0){
		this.restore = true;
		this.resetPosition(this.initialPos);
		this.health = 100;
	}else{
    if (!this.physicsReady){return}
		this.processImpulses();

		this.obj.object3D.position.x = this.driver.object3D.position.x;
		this.obj.object3D.position.y = this.driver.object3D.position.y + this.cameraHeight;
		this.obj.object3D.position.z = this.driver.object3D.position.z;
		
    this.updateCameraHeight();
		
		if(!this.moving){
		  if(Math.abs(this.driver.body.velocity.x) > 0.01){

        this.driver.body.velocity.x = 0;
      } 
      if( Math.abs(this.driver.body.velocity.z) > 0.01 ){
			this.driver.body.velocity.z = 0;
		  }
		}
	}
	
	

  
  }

  updateCameraHeight() {
    if (this.pressed["Control"]) {
      this.targetCameraHeight = 0.5; // Crouching height
    } else {
      this.targetCameraHeight = 1; // Standing height
    }
    this.cameraHeight += (this.targetCameraHeight - this.cameraHeight) / 3;
  }

  processImpulses(){
    let impulse = null, theta = 0;
    
    
    if(this.pressed[" "] && this.isGrounded()){
      //console.log("jumping")
    //if(this.pressed[" "]){
      impulse = new CANNON.Vec3(0, this.jumpStrength, 0);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.jumping = true;
	  this.grounded = false;
    }
	
  let dKey, aKey, wKey, sKey = 0;
  this.theta = this.obj.object3D.rotation.y;
  this.pressed["d"] ? dKey = 1 : dKey = 0;
  this.pressed["a"] ? aKey = 1 : aKey = 0;
  this.pressed["w"] ? wKey = 1 : wKey = 0;
  this.pressed["s"] ? sKey = 1 : sKey = 0;
  let strafe = (dKey - aKey) * this.moveStrength;
  let forward = (sKey - wKey) * this.moveStrength;
  if (!this.dx == 0 || !this.dz == 0) {
    this.moving = true;
  }
  
  this.dx += strafe;
  this.dz += forward;
  impulse = new CANNON.Vec3((this.dx * Math.cos(this.theta)) + (this.dz * Math.sin(this.theta)), 0, (this.dz * Math.cos(this.theta)) - (this.dx * Math.sin(this.theta)));

  //this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0)); // this line is commented out because it provides its own friction value

  this.driver.body.velocity.x += impulse.x;
  this.driver.body.velocity.z += impulse.z;


  console.log(`dx: ${this.dx.toFixed(2)}, dz: ${this.dz.toFixed(2)}, strafe: ${strafe}, forward: ${forward}, x_vel: ${this.dx * Math.cos(this.theta).toFixed(2)}`);
  
  this.dx *= this.deaccelerationFactor;
  this.dz *= this.deaccelerationFactor;


    if (Math.abs(this.driver.body.velocity.y) < 0.0001) {
      this.jumping = false;
	  //console.log("landed");
    }
	if (Math.abs(this.driver.body.velocity.y) > 0.01) {
		this.grounded = false;
    }else{
		this.grounded = true;
	}

	
  }
  
  resetPosition(position){	  
	if(this.restore){
		//console.log("help");
		this.driver.body.velocity.x = 0;
		this.driver.body.velocity.y = 0;
        this.driver.body.velocity.z = 0;
		//this.driver.object3D.position.x = 0;
		//this.driver.object3D.position.y = 3;
		//this.driver.object3D.position.z = 0;
		this.driver.removeAttribute("dynamic-body");
		this.driver.setAttribute("position",position);
		this.driver.setAttribute("dynamic-body",{mass:5});
		this.restore = false;
	}
  }
  
  setPosition(x, y, z){
		this.driver.body.velocity.x = 0;
		this.driver.body.velocity.y = 0;
        this.driver.body.velocity.z = 0;
		this.driver.removeAttribute("dynamic-body");
		this.driver.setAttribute("position",{x:x, y:y, z:z});
		this.driver.setAttribute("dynamic-body",{mass:5});
  }

  getPosition(){
    return {x: this.driver.object3D.position.x, y: this.driver.object3D.position.y + this.cameraHeight, z: this.driver.object3D.position.z};
  }
  getVelocity(){
      if (this.driver.body && this.driver.body.velocity) {
        return this.driver.body.velocity;
      } else {
        return {x: 0, y: 0, z: 0};
      }
  }
  
  isGrounded() {
		let raycaster = new THREE.Raycaster();
		let origin = this.driver.object3D.position.clone();
		let direction = new THREE.Vector3(0, -1, 0);
		raycaster.set(origin, direction);

		let intersects = raycaster.intersectObject(scene.object3D, true);

		if (intersects.length > 0) {
			let distance = intersects[0].distance;
      //console.log("Distance to ground:", distance);
			return distance <= 0.7;
		}
		return false;
	}

	


}