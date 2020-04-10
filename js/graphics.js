class Graphics {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        // Renderer Properties
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);
        renderer.antialias = true;
        renderer.domElement.style.border = "solid";
        document.body.appendChild(renderer.domElement);

        // Resize Event Listener
        window.addEventListener("resize", windowResize);

        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        this.lines = new THREE.Line(geometry, material);
        this.scene.add(lines);
    }

    windowResize() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // render/animation loop
    render() {
        this.camera.position.z = 5;
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.cube.rotation.z += 0.01;
        this.lines.rotation.x += 0.01;
        this.lines.rotation.y += 0.01;
        this.lines.rotation.z += 0.01;

        this.renderer.render(scene, camera);
    }
}
