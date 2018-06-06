/**
 * @description 主要函数定义
 */

import { execFunction } from './tool';

// 初始化，关于参数还十分不完善，后续有需求时请酌情添加
const init = (() => {
  let loaded = false;
  let config = {};

  const initFunc = {
    initScene () {
      const scene = new THREE.Scene();
      return scene;
    },
    initRenderer (options = {
      alpha: true,
      antialias: true
    }) {
      const container = document.getElementById(config.demoId);
      const renderer = new THREE.WebGLRenderer(options);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0xeeeeee);
      renderer.shadowMap.enabled = true;
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      return renderer;
    },
    initPerspectiveCamera ({
      near = 1,
      far = 200000
    }) {
      const container = document.getElementById(config.demoId);
      const camera = new THREE.PerspectiveCamera(
        config.fov,
        container.clientWidth / container.clientHeight,
        near,
        far
      );
      return camera;
    },
    initAmbientLight () {
      const ambient = new THREE.AmbientLight(0xffffff);
      return ambient;
    },
    initSpotLight () {
      const spot = new THREE.PointLight(0x0033ff,2);
      spot.pow = 2;
      spot.castShadow = true;
      spot.position.set(-1500, 1500, 900);
      return spot;
    },
    initControls (camera, renderer, options = {
      minDIstance: 1,
      maxDistance: 150,
      minPolarAngle: 0,
      maxPolarAngle: 80 * Math.PI / 180
    }) {
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      // 监听 change 事件设置变量，节约 landmark、tag 性能
      let count = 0;
      controls.addEventListener('change', (e) => {
        three.controlsCount = count++;
      });
      Object.assign(controls, {
        rotateSpeed: 0.3,
        zoomSpeed: 1,
        minDIstance: options.minDIstance,
        maxDistance: options.maxDistance,
        minPolarAngle: options.minPolarAngle,
        maxPolarAngle: options.maxPolarAngle
      });
      controls.target.set(0, 0, 0);
      controls.update();
      return controls;
    },
    initAxes (len = 20) {
      const axes = new THREE.AxesHelper(len);
      return axes;
    },
    render () {
      // const focal = three.camera.getFocalLength();
      // if (focal < config.fov - 0.1) {
      //   three.camera.setFocalLength(focal + (config.fov - focal) * 0.1);
      // }
      three.renderer.render(three.scene, three.camera);
      TWEEN.update();
      requestAnimationFrame(initFunc.render);
    }
  };
  return (options = {}) => {
    config = options.config || { demoId: 'container', fov: 45 };
    const renderer = initFunc.initRenderer(options.renderer);
    document.getElementById(config.demoId).appendChild(renderer.domElement);
    const scene = initFunc.initScene();
    const camera = initFunc.initPerspectiveCamera(options.camera || {});
    const ambient = initFunc.initAmbientLight();
    const spot = initFunc.initSpotLight();
    const controls = initFunc.initControls(camera, renderer, options.controls);
    three.renderer = renderer;
    three.scene = scene;
    three.camera = camera;
    three.controls = controls;
    // scene.add(three.ambient = ambient);
    scene.add(ambient);
    scene.add(spot);
    // scene.add(new THREE.PointLightHelper(spot, 3));
    if (options.axes) {
      scene.add(initFunc.initAxes(options.axes));
    }
    initFunc.render();
    if (!loaded) {
      loaded = true;
      id = config.demoId; // 设置 id
      window.addEventListener('resize', onWindowResize, false);
    }
  };
})();

let id = '';
// resize 方法
const onWindowResize = () => {
  const container = document.getElementById(id);
  let width = container.clientWidth;
  let height = container.clientHeight;
  three.camera.aspect = width / height;
  three.camera.updateProjectionMatrix();
  three.renderer.setSize(width, height);
  three.controlsCount++;
};
// 轨道控制的点击判断，在 OrbitControls.js 中触发
window.youzuOnMouseDown = (() => {
  // 定义射线，可检测穿过射线的模型
  const raycaster = new THREE.Raycaster();
  three.raycaster = raycaster;
  // 3d 点击事件对象，点击空处事件对象，双击空处事件对象
  const touchEvent = { list: [], map: {} };
  const touchEmptyEvent = { list: [], map: {} };
  const dblTouchEmptyEvent = { list: [], map: {} };
  // 事件注册，仅暴露两个 add、remove 方法供调用
  const eventInit = events => {
    const updateMap = obj => {
      obj.map = {};
      obj.list.forEach((item, index) => {
        obj.map[item.name] = index;
      });
    };
    return {
      add (eventName, eventFunc, preventDefault) {
        if (events.map[eventName]) {
          console.warn(`${eventName} 已经定义，不可重复添加`);
          return;
        } else if (typeof eventFunc !== 'function') {
          console.warn('同学，添加事件必须要有函数的');
          return;
        }
        events.list.push({
          name: eventName,
          func: eventFunc,
          preventDefault
        });
        updateMap(events);
      },
      remove (eventName) {
        const index = events.map[eventName];
        if (index > -1) {
          events.list.splice(index, 1);
        }
        updateMap(events);
      }
    };
  };
  // 事件执行，先按照 add 顺序执行非 default 事件，在没有 preventDefault 时执行 default 事件
  const eventRun = (events, intersects) => {
    let defaultItem = null;
    for (const item of events.list) {
      if (item.name !== 'default') {
        execFunction(item.func, intersects);
      } else {
        defaultItem = item;
      }
    }
    if (defaultItem && events.list.every(item => !item.preventDefault)) {
      execFunction(defaultItem.func, intersects);
    }
  };
  // 将暴露的接口植入全局对象 three 中
  three.touchEvent = eventInit(touchEvent);
  three.touchEmptyEvent = eventInit(touchEmptyEvent);
  three.dblTouchEmptyEvent = eventInit(dblTouchEmptyEvent);

  // 这个 。。。自己看吧 。。
  const fNum = num => (Math.round(num * 100) / 100).toFixed(2);
  let dblTime = 0; // 双击空白处的检测对比时间
  return event => {
    const dom = three.renderer.domElement;
    const mouse = {
      x: (event.clientX / dom.clientWidth) * 2 - 1,
      y: -(event.clientY / dom.clientHeight) * 2 + 1
    };
    raycaster.setFromCamera(mouse, three.camera);
    let intersects = raycaster.intersectObjects(three.scene.children, true);
    if (intersects.length) {
      // console 出来纯粹调试用的
      if (threeConfig.showMouseDownPoint) {
        let point = intersects[0].point;
        console.log(`point at: (${fNum(point.x)}, ${fNum(point.y)}, ${fNum(point.z)})`);
      }
      if (threeConfig.showMouseDownNames) {
        console.log(intersects.map(item => item.object.name));
      }
      // console 完执行事件
      eventRun(touchEvent, intersects);
    } else {
      const now = Date.now();
      if (now - dblTime < 300) {
        eventRun(dblTouchEmptyEvent);
      } else {
        eventRun(touchEmptyEvent);
      }
      dblTime = now;
    }
  };
})();

export default {
  init,
  onWindowResize
};
