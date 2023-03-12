import { Component, OnInit } from '@angular/core'
import * as THREE from 'three'
import { BufferGeometry, Mesh, MeshBasicMaterial, PointsMaterial, SphereGeometry } from 'three';

@Component({
  selector: 'app-star-background',
  templateUrl: './star-background.component.html',
  styleUrls: ['./star-background.component.scss']
})
export class StarBackgroundComponent implements OnInit {
  scene!: THREE.Scene
  camera!: THREE.Camera
  renderer!: THREE.WebGLRenderer
  geometry!: BufferGeometry
  material!: MeshBasicMaterial
  stars!: any[]
  sphere!: THREE.Mesh
  light!: THREE.DirectionalLight
  time = 0

  constructor() { }

  ngOnInit(): void {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 650;
    this.light = new THREE.DirectionalLight(0xffffff, 1000);
    this.light.position.set(0, 0, 500);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    const container = document.getElementById('starElm')
    container!.appendChild(this.renderer.domElement)
    this.addSphere()
    this.animate()
  }

  ngOnDestroy() {
    this.renderer.dispose()
    this.scene.remove(this.sphere)
    this.material.dispose()
    this.geometry.dispose()
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    this.animateStars()

    this.renderer.render(this.scene, this.camera)
  }

  animateStars() {
    // loop through each star
    for(var i=0; i< this.stars.length; i++) {
      let lightness = 0
      let star = this.stars[i]
      lightness > 100 ? lightness = 0 : lightness++;
    }
  }

  addSphere() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for ( var z= -5000; z < 5000; z+=20 ) {
      this.stars = [];
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("../../assets/star.jpg");
      // Make a sphere
      let geometry = new THREE.PlaneGeometry(0.5, 0.5)
      let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      let sphere = new THREE.Mesh(geometry, material)

      // we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;

      //add the sphere to the scene
      this.scene.add( sphere );

      // push it to the stars array
      this.stars.push(sphere);
    }
  }
}
