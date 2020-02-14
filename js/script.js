
let width, height, canvas, renderer,scene,camera,light, geometry,material,mesh,ball,gui;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.querySelector("#canvas");  
  
    canvas.setAttribute("width", width);    // WIDTH AND HEIGHT
    canvas.setAttribute("height", height);  // WIDTH AND HEIGHT

    ball = {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        positionZ: 0,
        positionX: 0,
        positionY: 0,
    }

    gui = new dat.gui.GUI();
    gui.add(ball,"rotationY").min(-0.15).max(0.15).step(0.0001);
    gui.add(ball,"rotationX").min(-0.15).max(0.15).step(0.0001);
    gui.add(ball,"rotationZ").min(-0.15).max(0.15).step(0.0001);
    gui.add(ball,"positionY").min(-5).max(5).step(0.1);
    gui.add(ball,"positionX").min(-5).max(5).step(0.1);
    gui.add(ball,"positionZ").min(-5).max(5).step(0.1);


    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.set(0,0,1000);

    light = new THREE.AmbientLight(0xffffff);
    scene.add(light); // ДОБАВЛЕНИЕ СВЕТА НА СЦЕНУ

    geometry = new THREE.SphereGeometry(200,12,12);
    material = new THREE.MeshBasicMaterial({color: 0xff00ff, vertexColors: THREE.FaceColors});
    mesh = new THREE.Mesh(geometry, material);

    for (let i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
    }

    scene.add(mesh);

    function loop () {
        mesh.rotation.y += ball.rotationY;
        mesh.rotation.x += ball.rotationX;
        mesh.rotation.z += ball.rotationZ;
        mesh.position.y += ball.positionY;
        mesh.position.x += ball.positionX;
        mesh.position.z += ball.positionZ;

        renderer.render(scene,camera);
        requestAnimationFrame(function() {loop();})
    }

    loop();
}