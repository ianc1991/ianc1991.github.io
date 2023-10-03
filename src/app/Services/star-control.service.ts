import { BehaviorSubject } from 'rxjs';

export class StarControlService {
  private rotationSource = new BehaviorSubject({ x: 0.0002, y: 0.0002 });
  currentRotation = this.rotationSource.asObservable();

  changeRotation(deltaX: number, deltaY: number) {
    const current = this.rotationSource.getValue(); // get the current value
    this.rotationSource.next({ x: current.x + deltaX, y: current.y + deltaY }); // add the deltas to the current values
  }

  setRotation(x: number, y: number) {
    this.rotationSource.next({ x, y });
  }
}
