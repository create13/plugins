import { execFunction } from './tool';
/**
 * @description 加载模型
 */
export const loadModels = (() => {
  const dataMap = {};
  let loadData = {}; // 模型数据，保存已加载的模型
  let modelBaseUrl = '';
  let currentModels = []; // 当前模型数组
  let space = '';
  let previous = {};
  let previousModels = []; // 上一期模型数组
  let isLoading = false; // 加载中
  let unLoadedCount = 0; // 未加载模型计数器
  let fns = {}; // 方法
  let sortObj = {}; // alpha sort，控制 render 渲染顺序

  const allLoadedCb = () => { // 模型全部加载完成
    isLoading = false;
    execFunction(fns.success, currentModels, previousModels);
    previous[space] = currentModels;
  };

  /**
   * @description 加载模型回调
   * @param {object | obj} obj 模型信息
   * @param {object} loadInfo 加载信息
   */
  const loadedCb = (obj, loadInfo) => { // 模型加载完成
    execFunction(fns.load, obj, loadInfo, loadData);
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
    obj: (() => {
      const loadMesh = loadInfo => {
        const alias = `${loadInfo.name}_obj`;
        if (loadData[alias]) {
          loadedCb(loadData[alias], loadInfo);
        } else {
          const objLoader = new THREE.OBJLoader();
          objLoader.load(
            `${modelBaseUrl}/${loadInfo.name}.obj`,
            object => {
              loadData[alias] = object;
              loadedCb(object, loadInfo);
            },
            () => {},
            error => {
              console.warn(`${alias} load error`, error);
            }
          );
        }
      };
      const loadImg = loadInfo => {
        const alias = `${loadInfo.img}_img`;
        if (loadData[alias]) {
          loadMesh(loadInfo);
        } else {
          const loader = new THREE.TextureLoader();
          loader.load(
            `${modelBaseUrl}/img/${loadInfo.img}`,
            image => {
              loadData[alias] = image;
              loadMesh(loadInfo);
            },
            () => {},
            error => {
              console.warn(`${alias} load error`, error);
            }
          );
        }
      };
      return loadInfo => {
        loadInfo.img ? loadImg(loadInfo) : loadMesh(loadInfo);
      };
    })(),
    fbx (loadInfo) {
      const alias = `${loadInfo}_fbx`;
      if (loadData[alias]) {
        loadedCb(loadData[alias], loadInfo);
      } else {
        const loader = new THREE.FBXLoader();
        loader.load(
          `${modelBaseUrl}/${loadInfo}.fbx`,
          object => {
            loadData[alias] = object;
            loadedCb(object, loadInfo);
          },
          () => {},
          error => {
            console.warn('error', error);
          }
        );
      }
    }
  };

  return ({
    list,
    baseUrl,
    modelType = 'fbx',
    namespace = 'default',
    ...cbs
  }) => {
    if (isLoading) {
      return;
    }
    // 不同命名空间的已加载模型不共享
    if (!dataMap[namespace]) {
      dataMap[namespace] = {};
    }
    loadData = dataMap[namespace];
    // 不同命名空间的上一期模型不共享
    space = namespace;
    previousModels = previous[namespace] || [];
    isLoading = true;
    // 初始化变量
    modelBaseUrl = baseUrl || modelBaseUrl;
    unLoadedCount = list.length;
    currentModels = [];
    fns = cbs;
    sortObj = {};
    // 循环加载
    list.forEach((item, index) => {
      sortObj[item.name] = index;
      load[modelType](item, index);
    });
  };
})();

export default loadModels;
