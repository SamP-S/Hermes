class Graphics {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        // Renderer Properties
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff);
        this.renderer.antialias = true;
        this.renderer.domElement.style.border = "solid";
        document.body.appendChild(this.renderer.domElement);

        // Resize Event Listener <-- ADD LATER
        //window.addEventListener("resize", this.windowResize);

        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        this.lines = new THREE.Line(this.geometry, this.material);
        this.scene.add(this.lines);
    }

    /*
    windowResize() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    */

    // render/animation loop
    render() {
        this.camera.position.z = 5;
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.cube.rotation.z += 0.01;
        this.lines.rotation.x += 0.01;
        this.lines.rotation.y += 0.01;
        this.lines.rotation.z += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}
