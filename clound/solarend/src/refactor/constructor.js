import { execFunction, eventInit, getSize, bindRaycaster } from './tool';
import { getMesh, getAxes } from './mesh';
import { initScene, initRenderer, initCamera, initControls, initAxes, initRaycaster } from './init';

const fNum = num => (Math.round(num * 100) / 100).toFixed(2);

/**
 * @description three 构造函数，默认包含 scene renderer camera OrbitControls，axes 辅助线可选
 * @param {String} domId canvas 的父级 Id，默认 'container' ，否则父级为 window
 * @param {Boolean} render 是否开启循环 render 渲染
 * @param {Boolean} append 是否将 renderer.domElement append 进父容器
 * @param {Object} scene scene 参数
 * @param {Object} renderer renderer 参数
 * @param {Object} controls controls 参数
 * @param {Object} camera camera 参数
 * @param {Number} axes 画辅助线
 */
class Init {
  constructor ({
    domId = 'container',
    render = true,
    append = true,
    scene = {},
    renderer = {},
    controls = {},
    camera = {},
    axes
  } = {}) {
    this.container = window;
    if (typeof domId === 'string') {
      this.container = document.getElementById(domId);
    }
    this.size = getSize(this.container);
    this.scene = initScene(scene);
    this.renderer = initRenderer(renderer, this.size);
    this.camera = initCamera(Object.assign({ aspect: this.size.width / this.size.height }, camera));
    this.raycaster = initRaycaster();
    const dom = this.renderer.domElement;

    if (THREE.OrbitControls) {
      this.controls = initControls(this.camera, dom, controls);
    }
    if (axes) {
      this.scene.add(initAxes(axes));
    }
    if (render) {
      this.render();
    }
    if (append) {
      this.container.appendChild(dom);
    }

    // 事件
    const resize = () => {
      this.size = getSize(this.container);
      const { width, height } = this.size;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      if (this.controls.changeCount !== undefined) {
        this.controls.changeCount++;
      }
    };
    // 让这些属性变得不可枚举，总感觉这样好看一些
    Object.defineProperties(this, {
      touchMesh: {
        value: eventInit({ list: [], map: {} }),
        writable: false
      },
      touchEmpty: {
        value: eventInit({ list: [], map: {} }),
        writable: false
      },
      resize: {
        value: resize,
        writable: false
      },
      raycasterEvent: { // three 没有原生 click 支持，自定义 click 的实现，如有 bug 请联系 SuperFuhq@163.com
        value: bindRaycaster(dom, e => {
          this.click(e);
        })
      }
    });
    window.addEventListener('resize', this.resize, false);
  }
  render () {
    this.renderer.render(this.scene, this.camera);
    if (this.tween && TWEEN) {
      TWEEN.update();
    }
    const renderRaf = requestAnimationFrame(() => {
      this.render();
    });
    Reflect.defineProperty(this, 'renderRaf', { value: renderRaf });
  }
  getMeshByName (name) {
    const meshList = getMesh(this.scene);
    if (name instanceof RegExp) {
      return meshList.filter(item => name.test(item.name));
    }
    return meshList.find(item => item.name === name);
  }
  getAxesByName (name) {
    const meshList = this.getMeshByName(name);
    if (name instanceof RegExp) {
      const axesList = meshList.map(item => getAxes(item));
      const axesData = { length: meshList.length };
      meshList.forEach((item, index) => {
        axesData[item.name] = axesList[index];
      });
      axesData.global = { center: {}, radius: 0 };
      ['x', 'y', 'z'].forEach(key => {
        const data = {
          min: Math.min(...axesList.map(item => item.min[key])),
          max: Math.max(...axesList.map(item => item.max[key]))
        };
        axesData.global[key] = data;
        axesData.global.center[key] = (data.min + data.max) / 2;
        axesData.global.radius = Math.max(axesData.global.radius, (data.max - data.min) / 2);
      });
      return axesData;
    }
    return getAxes(meshList);
  }
  getDistance () {
    const position = this.camera.position;
    const target = this.controls.target;
    const distance = {};
    ['x', 'y', 'z'].forEach(key => {
      distance[key] = position[key] - target[key];
    });
    distance.distance = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.x, 2) + Math.pow(distance.x, 2));
    return distance;
  }
  getTargetAndPosition () {
    let target = this.controls.target;
    let position = this.camera.position;
    console.log(`target: ${fNum(target.x)}, ${fNum(target.y)}, ${fNum(target.z)}`);
    console.log(`position: ${fNum(position.x)}, ${fNum(position.y)}, ${fNum(position.z)}`);
    return { target, position };
  }
  modifyMesh (options) {
    const modify = option => {
      const list = [].concat(this.getMeshByName(option.name));
      list.forEach(option.method);
    };
    if (Array.isArray(options)) {
      for (const item of options) {
        modify(item);
      }
    } else {
      modify(options);
    }
  }
  lookAt (target, position) {
    const tar = Array.isArray(target) ? (new THREE.Vector3(...target)) : target;
    const pos = Array.isArray(position) ? (new THREE.Vector3(...position)) : position;
    this.camera.lookAt(tar);
    this.camera.position.set(pos.x, pos.y, pos.z);
    this.controls.target0 = tar;
    this.controls.position0 = pos;
    this.controls.zoom0 = this.camera.zoom;
    this.controls.reset();
  }
  meshChange (currentModels = [], previousModels = []) {
    for (const item of previousModels) {
      this.scene.remove(item);
    }
    for (const item of currentModels) {
      this.scene.add(item);
    }
  }
  animate ({
    start,
    end,
    time = 1500,
    ...fns
  }) {
    start = start || [this.controls.target, this.camera.position];
    end = end || [this.controls.target, this.camera.position];
    if (typeof fns.format === 'function') {
      start = fns.format(start);
      end = fns.format(end);
    }
    if (!TWEEN) {
      console.warn('动画需要引入 TWEEN 库');
      return;
    }
    const tween = new TWEEN.Tween(start);
    tween.to(end, time);
    tween.onUpdate(fns.update);
    tween.delay(10).start();
    tween.onComplete((...args) => {
      execFunction(fns.complete, ...args);
    });
  }
  click (e) {
    const mouse = {
      x: (e.x / this.size.width) * 2 - 1,
      y: -(e.y / this.size.height) * 2 + 1
    };
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length) {
      if (threeConfig.show) {
        const point = intersects[0].point;
        console.log(`point at: (${fNum(point.x)}, ${fNum(point.y)}, ${fNum(point.z)})`);
        console.log(`intersects name: ${intersects.map(item => item.object.name).join('\n')}`);
      }
      this.touchMesh.run(intersects);
    } else {
      this.touchEmpty.run();
    }
  }
  destroy () {
    cancelAnimationFrame(this.renderRaf);
    window.removeEventListener('resize', this.resize);
    this.resize = null;

    const dom = this.renderer.domElement;
    dom.removeEventListener('mousedown', this.raycasterEvent.down);
    dom.removeEventListener('touchstart', this.raycasterEvent.down);
    dom.removeEventListener('mouseup', this.raycasterEvent.up);
    dom.removeEventListener('touchend', this.raycasterEvent.up);
    this.raycasterEvent = null;
  }
};

export default Init;
