import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BufferGeometry, Color, Group, Mesh, MeshBasicMaterial, Points, PointsMaterial, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

@Component({
  selector: 'app-star-background',
  templateUrl: './star-background.component.html',
  styleUrls: ['./star-background.component.scss']
})
export class StarBackgroundComponent implements AfterViewInit {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75, // FOV - Field of view
    window.innerHeight / window.innerHeight, // Aspect Ratio
    0.1, // Near
    1000 // Far
  )
  renderer = new THREE.WebGLRenderer()
  geometry = new THREE.BufferGeometry()
  textureLoader = new THREE.TextureLoader()
  sprite = new THREE.TextureLoader().load( '../../assets/star2.webp' )
  material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
  })
  vertices : any[] = []
  ambientlight = new THREE.AmbientLight(0xffffff, 2)
  pointLight = new THREE.PointLight(0xffffff, 2)
  time = 0
  windowHalfX = 0
  windowHalfY = 0
  mouseX = 0
  mouseY = 0
  particles!: any
  controls!: OrbitControls
  container!: HTMLElement
  stars!: Points
  gltfLoader = new GLTFLoader()
  mainStar!: Group
  color = new THREE.Color()
  colors: any[] = []


  constructor() { }

  async ngAfterViewInit(): Promise<void> {
    this.container = document.getElementById('starElm') as HTMLElement
    this.container.appendChild(this.renderer.domElement)
    this.ambientlight.position.set(0, 0, 0)
    this.pointLight.position.set(0, 0, 0)
    this.scene.add(this.ambientlight)
    this.scene.add(this.pointLight)
		this.camera.position.z = 3
    this.scene.add(this.camera)

    // Controls
    //this.controls = new OrbitControls(this.camera, this.container);
    //this.controls.enableDamping = true // Set to true is used to give a sense of weight to the controls
    // Particles
    const particlesGeometry = new THREE.BufferGeometry() // Geometry for the stars
    const particlesCount = 15000 // number of particles to be created
    const vertices = new Float32Array(particlesCount) // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)
    for (let i = 0; i < particlesCount; i++) {
      vertices[i] = (Math.random() - 0.5) * 100 // -0.5 to get the range from -0.5 to 0.5 than * 100 to get a range from -50 to 50
      this.color.setHSL(Math.random(), 1.0, 0.5)
      this.colors.push(this.color.r, this.color.g, this.color.b)
    }
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
    )
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3))
    // Texture
    const particleTexture = this.textureLoader.load('../../assets/star.png'); // Add a texture to the particles
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      map: particleTexture, // Texture
      size: 0.5, // Size of the particles
      sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
      vertexColors: false,
    })

    this.stars = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.stars)

    await this.addMainStar()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // to avoid pixelation on high resolution screens


    document.body.style.touchAction = 'none'
    //this.addSphere()
    this.animate()
  }

  ngOnDestroy() {
    this.renderer.dispose()
    this.scene.remove(this.stars)
    this.material.dispose()
    this.geometry.dispose()
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.stars.rotation.y += .0005
    if (this.mainStar) this.mainStar.rotation.y += .0005
    this.render()
  }

  render() {
    //this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    // this.windowHalfX = window.innerWidth / 2
		// this.windowHalfY = window.innerHeight / 2
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  // @HostListener('document:mousemove', ['$event'])
  // onPointerMove( event: PointerEvent ) {

  // }

  async addMainStar() {
    this.gltfLoader.load('../../assets/main-star.gltf', (gltf) => {
      console.log('hello')
      this.mainStar = gltf.scene
      this.mainStar.scale.set(0.0014, 0.0014, 0.0014)
      this.mainStar.position.set(0, 0, -8)
      this.scene.add(this.mainStar)
    })
  }
}
