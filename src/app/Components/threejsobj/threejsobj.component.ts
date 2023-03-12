import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import * as THREE from 'three'
import { LoadingManager, Scene } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

@Component({
  selector: 'app-threejsobj',
  templateUrl: './threejsobj.component.html',
  styleUrls: ['./threejsobj.component.scss']
})
export class ThreejsobjComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef!: ElementRef

  // Object properties
  @Input() public rotationSpeedX: number = 0.05
  @Input() public rotationSpeedY: number = 0.01
  @Input() public size: number = 200
  //@Input() public texture: string = '/assets/texture.jpg'

  // Stage properties
  @Input() public cameraZ: number = 500
  @Input() public fieldOfView: number = 60
  @Input('nearClipping') public nearClippingPlane: number = 1
  @Input('farClipping') public farClippingPlane: number = 1000

  // Helper Properties
  private camera!: THREE.PerspectiveCamera

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }

  objLoader = new OBJLoader();
  mtlLoader = new MTLLoader();

  private loader = new THREE.TextureLoader()
  private geometry = new THREE.BoxGeometry(1, 1, 1)
  //private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) })

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry,
    //this.material
  )

  private renderer!: THREE.WebGLRenderer

  private scene!: THREE.Scene

  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)

    // Light
    const pointLight = new THREE.PointLight(0xffffff)
    const pointLight2 = new THREE.PointLight(0xffffff)
    const ambientLight = new THREE.AmbientLight(0xffffff)
    pointLight.position.set(0, 0, 20)
    pointLight2.position.set(0, 180, 40)
    this.scene.add(pointLight, pointLight2)
    // Light Helper
    const lightHelper = new THREE.PointLightHelper(pointLight2);
    // const gridHelper = new THREE.GridHelper(200, 50);
    //this.scene.add(lightHelper);

    // Load object and material
    this.mtlLoader.load(
      '../../assets/ThreeJS/Project Name.mtl',
      (materials) => {
        materials.preload();
        this.objLoader.setMaterials(materials)
        this.objLoader.load(
          '../../assets/ThreeJS/Project Name.obj',
          (object) => {

            this.scene.add(object)
          }
        )
      }
    )


    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight
  }

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX
    this.cube.rotation.y += this.rotationSpeedY
  }

  private startRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas })
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

    let component: ThreejsobjComponent = this;
    (function render() {
      requestAnimationFrame(render)
      component.animateCube()
      component.renderer.render(component.scene, component.camera)
    }())
  }

  constructor() {}

  ngAfterViewInit() {
    this.createScene()
    this.startRenderingLoop()
  }

  ngOnInit(): void {
  }

}
