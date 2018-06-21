/**
 * @file 加载方法
 */
import Vue from 'vue';
import { execFunction } from './tool';
import { aniBeforeLoad, aniAfterLoad } from './animation';
const vueInstance = new Vue();

/**
 * @description 加载模型
 */
export const loadModels = (() => {
  const loadData = {}; // 模型数据，保存已加载的模型
  let currentModels = []; // 当前模型数组
  let previousModels = []; // 上一期模型数组
  let isLoading = false; // 加载中
  let unLoadedCount = 0; // 未加载模型计数器
  let successCb = null; // 模型全部加载完成回调
  let sortObj = {}; // alpha sort，控制 render 渲染顺序
  let baseUrl = '';

  const meshChange = (scene = three.scene) => { // 清除上一期的 Mesh，添加当前期 Mesh
    previousModels.forEach((item, index) => {
      scene.remove(item);
    });
    currentModels.forEach((item, index) => {
      scene.add(item);
    });
    previousModels = currentModels;
  };
  const allLoadedCb = () => { // 模型全部加载完成
    isLoading = false;
    execFunction(successCb, currentModels, meshChange);
  };

  /**
   * @description 加载模型回调
   * @param {object | obj} obj 模型信息
   * @param {object} loadInfo 加载信息
   */
  const loadedCb = (obj, loadInfo) => { // 模型加载完成
    obj.traverse(item => {
      if (item instanceof THREE.Mesh) {
        const material = item.material;
        if (loadInfo.img) {
          material.map = loadData[`${loadInfo.img}_img`];
          if (loadInfo.img.includes('.png')) {
            material.side = THREE.DoubleSide;
          }
          item.renderOrder = sortObj[loadInfo.name];
        } else {
          material.color.setRGB(0.84, 0.84, 0.84);
        }
        material.transparent = true;
        material.shininess = 10;
        material.flatShading = true;
        // item.position.set(0, 0, 0);
        if (item.geometry) {
          item.geometry.computeBoundingBox();
        }
      }
    });
    currentModels.push(obj);
    unLoadedCount--;
    if (!unLoadedCount) {
      allLoadedCb();
    }
  };

  /**
   * @description 加载 obj 文件模型
   * @param {object} loadInfo 加载信息
   */
  const load = {
    obj (loadInfo) {
      const loadMesh = () => {
        const name = loadInfo.name;
        if (loadData[name]) {
          loadedCb(loadData[name], loadInfo);
        } else {
          const objLoader = new THREE.OBJLoader();
          objLoader.load(
            `${baseUrl}/${name}.obj`,
            object => {
              loadData[name] = object;
              loadedCb(object, loadInfo);
            },
            () => {},
            error => {
              console.warn('obj load error', error);
            }
          );
        }
      };
      const loadImg = () => {
        const imgAlias = `${loadInfo.img}_img`;
        if (loadData[imgAlias]) {
          loadMesh();
        } else {
          const loader = new THREE.TextureLoader();
          loader.load(
            `${baseUrl}/img/${loadInfo.img}`,
            image => {
              loadData[imgAlias] = image;
              loadMesh();
            },
            () => {},
            error => {
              console.warn('image load error', error);
            }
          );
        }
      };
      loadInfo.img ? loadImg() : loadMesh();
    },
    fbx (loadInfo, index) {
      const loader = new THREE.FBXLoader();
      loader.load(
        `${baseUrl}/${loadInfo}.fbx`,
        mesh => {
          mesh.traverse(child => {
            if (child.isMesh) {
              if (Array.isArray(child.material)) {
                for (const item of child.material) {
                  item.side = THREE.DoubleSide;
                }
              } else {
                child.material.side = THREE.DoubleSide;
              }
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.geometry) {
                child.geometry.computeBoundingBox();
              }
            }
            if (index && /light/i.test(child.type)) {
              mesh.remove(child);
            }
          });
          currentModels.push(mesh);
          unLoadedCount--;
          if (!unLoadedCount) {
            allLoadedCb();
          }
        },
        () => {},
        error => {
          console.warn('error', error);
        }
      );
    }
  };

  return ({
    list,
    modelUrl,
    modelType = 'fbx',
    camera = three.camera,
    controls = three.controls,
    success
  }) => {
    if (isLoading) {
      return;
    }
    // 初始化变量
    baseUrl = modelUrl || baseUrl;
    isLoading = true;
    unLoadedCount = list.length;
    currentModels = [];
    successCb = success;
    sortObj = {};
    // 循环加载
    list.forEach((item, index) => {
      sortObj[item.name] = index;
      load[modelType](item, index);
    });
  };
})();

// ------ touchEvent start ------
let sceneClickOpen = true;
// 模型点击执行方法
export const intersectClick = intersects => {
  if (!sceneClickOpen) {
    return;
  }
  const done = () => {
    sceneClickOpen = true;
  };
  let target = intersects;
  if (Array.isArray(intersects)) {
    let model = intersects[0].object.name;
    Object.values(vueInstance.$threeConfig.linkMap).forEach(item => {
      if (item && item.meshList && item.model === model) {
        target = item;
      }
    });
  }
  sceneClickOpen = false;
  if (!Array.isArray(target)) {
    vueInstance.$threeConfig.linkMap.current = target;
    aniBeforeLoad(target, done);
  } else {
    done();
  }
};
// 场景回退
export const sceneBack = callback => {
  if (!sceneClickOpen) {
    return;
  }
  const { current } = vueInstance.$threeConfig.linkMap;
  const done = () => {
    sceneClickOpen = true;
    execFunction(callback);
  };
  sceneClickOpen = false;
  if (current.back) {
    let target = vueInstance.$threeConfig.linkMap[current.back];
    let option = Object.assign({}, target, {
      beforeBack: current.beforeBack,
      afterBack: current.afterBack,
      router: current.router,
      animate: current.animate
    });
    vueInstance.$threeConfig.linkMap.current = target;
    aniAfterLoad(option, done);
  } else {
    done();
  }
};
// 异步添加默认 three 点击处理事件，同步的话和 init 中的初始化有点冲突，异步添加不影响使用
// setTimeout(() => {
//   three.touchEvent.add('default', intersectClick);
//   three.dblTouchEmptyEvent.add('default', sceneBack);
// }, 0);
// ------ touchEvent end ------

export default {
  loadModels,
  intersectClick,
  sceneBack
};
