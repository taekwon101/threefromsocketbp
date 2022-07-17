const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

// var z = 0;

// function addZ(z){ 
//     var z = clientcount - 1;
// }
// socket.on('/root/update_socket_count', { clientCount });

// cube.position.set(0,0,z)
scene.add( cube );

camera.position.z = 5;

// random color disabled until doesn't break (cube disappears)
// const random_hex_color_code = () => {
//     let n = (Math.random() * 0xfffff * 1000000).toString(16);
//     return '#' + n.slice(0, 6);
//   };

// replaced in client's index.js
// document.addEventListener("click", clickmove);

function clickmove() {
    cube.rotation.x += 0.1;
    // cube.material.color.setHex(random_hex_color_code);
    socket.emit('userclick', socket.id);
};

function animate() {
    requestAnimationFrame( animate );

    socket.on('serverclick', () => {
        cube.rotation.x += 0.1;
    });
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;

    renderer.render( scene, camera );
};

animate();