export const load = mesh => {
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
    }
  });
};
