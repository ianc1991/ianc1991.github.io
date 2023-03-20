import { AfterViewInit, Component, HostListener } from '@angular/core'
import * as THREE from 'three'
import { Points } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

@Component({
  selector: 'app-star-background',
  templateUrl: './star-background.component.html',
  styleUrls: ['./star-background.component.scss']
})
export class StarBackgroundComponent implements AfterViewInit {
  scene = new THREE.Scene()
  particlesGeometry = new THREE.BufferGeometry()
  camera = new THREE.PerspectiveCamera(
    75, // FOV - Field of view
    window.innerHeight / window.innerHeight, // Aspect Ratio
    10, // Near
    1000 // Far
  )
  renderer = new THREE.WebGLRenderer()
  textureLoader = new THREE.TextureLoader()
  vertices : any[] = []
  ambientlight = new THREE.AmbientLight("#002ae3", 5)
  pointLight = new THREE.PointLight(0xffffff, 2)
  container!: HTMLElement
  stars!: Points
  gltfLoader = new GLTFLoader()
  color = new THREE.Color()
  colors: any[] = []


  constructor() { }

  async ngAfterViewInit(): Promise<void> {
    this.container = document.getElementById('starElm') as HTMLElement
    this.container.appendChild(this.renderer.domElement)
    this.ambientlight.position.set(0, 0, 3)
    this.pointLight.position.set(0, 0, 3)
    this.scene.add(this.ambientlight)
    this.scene.add(this.pointLight)
		this.camera.position.z = 0
    this.scene.add(this.camera)

    const particlesCount = 15000 // number of particles to be created
    const vertices = new Float32Array(particlesCount) // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)
    for (let i = 0; i < particlesCount; i++) {
      vertices[i] = (Math.random() - 0.5) * 100 // -0.5 to get the range from -0.5 to 0.5 than * 100 to get a range from -50 to 50
      this.color.setHSL(Math.random(), 1.0, 0.5)
      this.colors.push(this.color.r, this.color.g, this.color.b)
    }
    this.particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
    )
    const particleTexture = this.textureLoader.load('../../assets/star3.webp'); // Add a texture to the particles
    const particlesMaterial = new THREE.PointsMaterial({
      map: particleTexture, // Texture
      size: 0.5, // Size of the particles
      sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
      vertexColors: false,
      transparent: true
    })

    this.stars = new THREE.Points(this.particlesGeometry, particlesMaterial)
    this.scene.add(this.stars)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // to avoid pixelation on high resolution screens

    document.body.style.touchAction = 'none'
    this.animate()
  }

  ngOnDestroy() {
    this.renderer.dispose()
    this.scene.remove(this.stars)
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    this.stars.rotation.y += .0005
    this.stars.rotation.x += .0005
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }
}
