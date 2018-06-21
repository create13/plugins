// 客户端判断，是否是 PC 端
const isPc = () => {
  const userAgent = navigator.userAgent;
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !mobileAgents.some(item => userAgent.includes(item));
};

// 横屏判断
const isLandscape = () => {
  if (window.orientation) {
    return (window.orientation % 180) !== 0;
  }
  return true;
};

const machineClass = () => {
  const classList = document.body.classList;
  const machine = ['pc', 'mobile'];
  const screenState = ['landscape', 'portrait'];
  classList.remove(machine[0], machine[1], screenState[0], screenState[1]);
  classList.add(machine[isPc() ? 0 : 1]);
  classList.add(screenState[isLandscape() ? 0 : 1]);
};
machineClass();

// resize 添加设备、屏幕状态判断
window.addEventListener('resize', machineClass, false);

// 定义一个全局的 three 变量保存 THREE 实例，方便多处调用
let three = {};
let $t = {};
// 定义一个全局的 vue 对象保存 vue 示例，用于与 three.js 代码协作
const vue = {
  vue: null,
  router: null,
  store: null
};
// 定义一个全局的控制器，开发环境使用，生产环境用不到，显示点击的点坐标或 mesh 名称等
const threeConfig = {
  showMouseDownPoint: false,
  showMouseDownNames: false
};

/**
 * @description 主要用于控制台调用输出 camera 当前的状态
 * @param {boolean} integer 是否输出整数，没有太大用处
 */
const getTargetAndOffset = (integer) => {
  try {
    let target = three.controls.target;
    let position = three.camera.position;
    const fNum = num => integer ? Math.floor(num) : (Math.round(num * 100) / 100).toFixed(2);
    console.log(
      'target:',
      fNum(target.x) + ', ' +
      fNum(target.y) + ', ' +
      fNum(target.z)
    );
    console.log(
      'offset:',
      fNum(position.x - target.x) + ', ' +
      fNum(position.y - target.y) + ', ' +
      fNum(position.z - target.z)
    );
    console.log(
      'position:',
      fNum(position.x) + ', ' +
      fNum(position.y) + ', ' +
      fNum(position.z)
    );
  } catch (error) {
    console.warn('three.js 初始化之后再调用吧！');
  }
};
