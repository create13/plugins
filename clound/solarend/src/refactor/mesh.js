// 获取 Mesh 模型
const getMesh = option => {
  if (option.isMesh) {
    return option;
  }
  return [].concat(...option.children.map(item => getMesh(item)));
};

// 获取 Mesh 坐标数据
const getAxes = mesh => {
  if (!mesh.geometry.boundingBox) {
    mesh.geometry.computeBoundingBox();
  }
  if (!mesh.geometry.boundingSphere) {
    mesh.geometry.computeBoundingSphere();
  }
  return {
    min: mesh.geometry.boundingBox.min,
    max: mesh.geometry.boundingBox.max,
    center: mesh.geometry.boundingSphere.center,
    radius: mesh.geometry.boundingSphere.radius
  };
};

export {
  getMesh,
  getAxes
};
