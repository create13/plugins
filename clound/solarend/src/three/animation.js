import { execFunction } from './tool';
import { loadModels } from './load';

/**
 * @description 相机位置
 * @param {object} target 目标焦点 three.controls.target
 * @param {object} position 相机位置 three.camera.position
 */
export const lookCamera = (target, offset, t = three) => {
  const tar = Array.isArray(target) ? (new THREE.Vector3(...target)) : target;
  const off = Array.isArray(offset) ? (new THREE.Vector3(...offset)) : offset;
  t.camera.position.set(off.x, off.y, off.z);
  t.camera.lookAt(tar);
  t.controls.reset({
    target: tar,
    object: t.camera
  });
};
/**
 * @description 格式化相机动画参数
 * @param {object | array} target 目标点
 * @param {object | array} position 定位点
 */
export const formatAnimateParam = (target, position) => {
  return {
    targetX: Array.isArray(target) ? target[0] : target.x,
    targetY: Array.isArray(target) ? target[1] : target.y,
    targetZ: Array.isArray(target) ? target[2] : target.z,
    positionX: Array.isArray(position) ? position[0] : position.x,
    positionY: Array.isArray(position) ? position[1] : position.y,
    positionZ: Array.isArray(position) ? position[2] : position.z
  };
};
/**
 * @description 相机移动动画
 * @param {object} param0 选项
 * @param {function} callback 回调函数
 */
export const cameraAnimate = ({
  start = formatAnimateParam(three.controls.target, three.camera.position), // 初始点
  end, // 结束点
  time = 1500, // 算了，不写了
  camera = three.camera,
  controls = three.controls,
  scene = three.scene
}, callback) => {
  if (Array.isArray(start)) {
    start = formatAnimateParam(...start);
  }
  if (Array.isArray(end)) {
    end = formatAnimateParam(...end);
  }

  const tween = new TWEEN.Tween(start);
  tween.to(end, time);
  tween.onUpdate(function () {
    lookCamera(
      new THREE.Vector3(this.targetX, this.targetY, this.targetZ),
      new THREE.Vector3(this.positionX, this.positionY, this.positionZ)
    );
  });
  tween.delay(10).start();
  tween.onComplete(() => {
    execFunction(callback);
  });
};
/**
 * @description 在载入模型前执行动画，一般用于点击楼层进入楼层内部信息时使用
 * @param {object} target 目标选项
 * @param {function} success 动画执行、加载完成后的回调，动画和加载是同时进行的，只有两个都完成了才会执行成功回调
 */
export const aniBeforeLoad = (target, success) => {
  let meshChangeFunc = null;

  // 完成动作的 generate 函数，用于保证动画和载入都完成时执行操作
  const step = (function* () {
    yield 'step1';
    execFunction(meshChangeFunc);
    execFunction(target.afterLoad);
    if (target.router && target.router.in) {
      vue.router.push(target.router.in);
    }
    if (target.cameraPosition) {
      lookCamera(...target.cameraPosition);
    }
    execFunction(success);
    execFunction(target.afterIn);
    execFunction(target.complete);
  })();

  execFunction(target.beforeIn);
  if (target.animate) {
    const ani = target.animate;
    const option = {
      end: formatAnimateParam(ani.target, ani.position)
    };
    Object.keys(ani).forEach(key => {
      if (!['target', 'position'].includes(key)) {
        option[key] = ani[key];
      }
    });
    execFunction(target.beforeAni);
    cameraAnimate(option, () => {
      execFunction(target.afterAni);
      step.next();
    });
  } else {
    step.next();
  }

  execFunction(target.beforeLoad);
  loadModels({
    list: target.meshList,
    success (models, meshChange) {
      meshChangeFunc = meshChange;
      step.next();
    }
  });
};
/**
 * @description 在载入模型后执行动画，一般用于楼层内部退回大场景时使用
 * @param {object} target 目标选项
 * @param {function} success 加载完成后的回调
 */
export const aniAfterLoad = (target, success) => {
  execFunction(target.beforeBack);
  loadModels({
    list: target.meshList,
    success (models, meshChange) {
      execFunction(meshChange);
      if (target.router && target.router.out) {
        vue.router.push(target.router.out);
      }
      execFunction(success);
      execFunction(target.afterBack);
      const ani = target.animate;
      if (ani) {
        lookCamera(ani.target, ani.position);
        const option = {
          end: formatAnimateParam(...target.cameraPosition)
        };
        Object.keys(ani).forEach(key => {
          if (!['target', 'position'].includes(key)) {
            option[key] = ani[key];
          }
        });
        cameraAnimate(option, () => {
          execFunction(target.complete);
        });
      } else {
        lookCamera(...target.cameraPosition);
        execFunction(target.complete);
      }
    }
  });
};

export default {
  lookCamera,
  formatAnimateParam,
  cameraAnimate,
  aniBeforeLoad,
  aniAfterLoad
};
