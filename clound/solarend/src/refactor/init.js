const initScene = (...args) => (new THREE.Scene(...args));

const initRenderer = ({
  alpha = true,
  antialias = true,
  ...args
}, size) => {
  const renderer = new THREE.WebGLRenderer({ alpha, antialias, ...args });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);
  renderer.setClearColor(0xffffff, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
};

const initCamera = ({
  fov = 45,
  aspect = 1,
  near = 1,
  far = 1000
}) => (new THREE.PerspectiveCamera(fov, aspect, near, far));

const initControls = (camera, dom, {
  rotateSpeed = 0.3,
  zoomSpeed = 1,
  minDIstance = 1,
  maxDistance = 150,
  minPolarAngle = 0,
  maxPolarAngle = 80 * Math.PI / 180,
  change,
  ...args
}) => {
  const controls = new THREE.OrbitControls(camera, dom);
  if (args.changeCount !== undefined) {
    controls.addEventListener('change', () => {
      controls.changeCount++;
    });
  }
  if (typeof change === 'function') {
    controls.addEventListener('change', change);
  }
  Object.assign(controls, {
    rotateSpeed,
    zoomSpeed,
    minDIstance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle
  });
  Object.keys(args).forEach(key => {
    controls[key] = args[key];
  });
  controls.target.set(0, 0, 0);
  controls.update();
  return controls;
};

const initAxes = len => (new THREE.AxesHelper(len));

const initRaycaster = () => (new THREE.Raycaster());

export {
  initScene,
  initRenderer,
  initCamera,
  initControls,
  initAxes,
  initRaycaster
};
