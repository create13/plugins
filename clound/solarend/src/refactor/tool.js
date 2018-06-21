const execFunction = (func, ...args) => {
  if (typeof func === 'function') {
    func(...args);
  }
};

// 事件注册，暴露三个 add、remove、run 方法供调用
const eventInit = () => {
  const events = { list: [], map: {} };
  const updateMap = obj => {
    obj.map = {};
    obj.list.forEach((item, index) => {
      obj.map[item.name] = index;
    });
  };
  return {
    add (name, func, preventDefault) {
      if (events.map[name]) {
        console.warn(`${name} 已经定义，不可重复添加`);
        return;
      } else if (typeof func !== 'function') {
        console.warn('同学，添加事件必须要有回调函数的');
        return;
      }
      events.list.push({ name, func, preventDefault });
      updateMap(events);
    },
    remove (name) {
      const index = events.map[name];
      if (index > -1) {
        events.list.splice(index, 1);
      }
      updateMap(events);
    },
    run (intersects) {
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
    }
  };
};

const getSize = dom => ({
  width: dom[dom === window ? 'innerWidth' : 'clientWidth'],
  height: dom[dom === window ? 'innerHeight' : 'clientHeight']
});

/**
 * @description 点击射线穿透监听，用 mousedown mouseup 模拟
 * @param {Element} dom 事件监听 dom，一般都是 renderer.domElement
 * @param {Function} fn 点击回调
 */
const bindRaycaster = (dom, fn) => {
  let axis = { x: 0, y: 0 };
  const down = (e) => {
    if (e.targetTouches) {
      if (e.targetTouches.length !== 1) {
        return;
      }
      const ele = e.targetTouches[0];
      axis = { x: ele.pageX, y: ele.pageY };
    } else {
      axis = { x: e.clientX, y: e.clientY };
    }
  };
  const up = (e) => {
    let axes = {};
    if (e.changedTouches) {
      const ele = e.changedTouches[0];
      axes = { x: ele.pageX, y: ele.pageY };
    } else {
      axes = { x: e.clientX, y: e.clientY };
    }
    if (
      Math.abs(axes.x - axis.x) < 20 &&
      Math.abs(axes.y - axis.y) < 20
    ) {
      fn(axes);
    }
  };
  dom.addEventListener('mousedown', down, false);
  dom.addEventListener('touchstart', down, false);
  dom.addEventListener('mouseup', up, false);
  dom.addEventListener('touchend', up, false);
  return { up, down };
};

export {
  execFunction,
  eventInit,
  getSize,
  bindRaycaster
};
