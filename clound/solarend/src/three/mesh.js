import { cameraAnimate } from './animation.js';

/**
 * @description 根据 mesh.name 获取 mesh
 * @param {string | RegExp | undefined} str 字符串获取单个，正则获取匹配项，undefined 获取全部
 */
export const getMeshByName = (str, scene = three.scene) => {
  const getMesh = info => {
    if (info.isMesh) {
      return info;
    }
    return [].concat(...info.children.map(item => getMesh(item)));
  };
  let list = getMesh(scene);
  return list.filter(item => {
    if (str === undefined) {
      return true;
    }
    if (str instanceof RegExp) {
      return str.test(item.name);
    }
    return item.name.includes(str);
  });
};

/**
 * @description 获取 mesh 的坐标点
 * @param {array | string | RegExp | undefined} meshList mesh 数组或者能够被 getMeshByName 解析的参数
 * @return {object} 返回包含所有 mesh 信息的对象，其中还有一个 global 是所有 mesh 的集合体
 */
export const getMeshAxes = (meshList, scene = three.scene) => {
  if (!Array.isArray(meshList)) {
    meshList = getMeshByName(meshList, scene);
  }
  const axes = {};
  const points = [];
  meshList.forEach(item => {
    points.push(item.geometry.boundingBox.min);
    points.push(item.geometry.boundingBox.max);
    axes[item.name] = {
      min: item.geometry.boundingBox.min,
      max: item.geometry.boundingBox.max,
      center: item.geometry.boundingSphere.center,
      radius: item.geometry.boundingSphere.radius
    };
  });

  axes.global = {
    minX: Math.min(...points.map(item => item.x)),
    maxX: Math.max(...points.map(item => item.x)),
    minY: Math.min(...points.map(item => item.y)),
    maxY: Math.max(...points.map(item => item.y)),
    minZ: Math.min(...points.map(item => item.z)),
    maxZ: Math.max(...points.map(item => item.z))
  };
  axes.global.center = {
    x: (axes.global.minX + axes.global.maxX) / 2,
    y: (axes.global.minY + axes.global.maxY) / 2,
    z: (axes.global.minZ + axes.global.maxZ) / 2
  };
  axes.global.radius = Math.max(
    axes.global.maxX - axes.global.minX,
    axes.global.maxY - axes.global.minY,
    axes.global.maxZ - axes.global.minZ
  ) / 2;
  return JSON.parse(JSON.stringify(axes));
};

/**
 * @description mesh 焦点
 * @param {array} meshList mesh 数组，一般是 getMeshByName 函数的返回值
 */
export const focusMeshs = meshList => {
  const geometryCenter = getMeshAxes(meshList).global.center;
  const position = three.camera.position;
  const target = three.controls.target;
  const geometryPosition = {
    x: position.x - target.x + geometryCenter.x,
    y: position.y - target.y + geometryCenter.y,
    z: position.z - target.z + geometryCenter.z
  };
  // // 动画，动起来
  cameraAnimate({
    end: [geometryCenter, geometryPosition],
    time: 366
  });
};

/**
 * @description 修改 mesh
 * @param {object} options 对象 { reg：可被 getMeshByName 解析的参数, method: 方法 } 或由对象组成的数组
 */
export const modifyMesh = (() => {
  const modify = option => {
    const list = getMeshByName(option.reg);
    list.forEach(option.method);
    if (option.focus) {
      focusMeshs(list);
    }
  };
  return options => {
    if (Array.isArray(options)) {
      options.forEach(item => {
        modify(item);
      });
    } else {
      modify(options);
    }
  };
})();

export default {
  getMeshByName,
  getMeshAxes,
  focusMeshs,
  modifyMesh
};
