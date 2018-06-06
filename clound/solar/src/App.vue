<template>
  <section id="app">
    <!-- 主要容器，three canvas 画布 -->
    <div id="container"></div>

    <!-- <router-view @appClassChange="appClassChange" v-if="inited"></router-view> -->
  </section>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      list: [
        'sky',
        'sun',
        'planet'
      ]
    };
  },
  methods: {
    animate: (() => {
      let planet = []; // 行星
      let radius = []; // 半径
      let deg = []; // 角度
      let speed = []; // 角速度
      return function () {
        if (planet.length) {
          planet[0].children.forEach((item, index) => {
            if (item.isMesh) {
              item.rotation.x += 0.001;
              item.rotation.z += 0.008;
              deg[index] = (deg[index] + speed[index]) % (2 * Math.PI);
              item.position.x = radius[index] * Math.sin(deg[index]);
              item.position.y = radius[index] * Math.cos(deg[index]);
            }
          });
        } else {
          planet = this.$three.getMeshByName('plantGroup');
          radius = planet[0].children.map(item => Math.sqrt(Math.pow(item.position.x, 2) + Math.pow(item.position.y, 2)));
          deg = planet[0].children.map(item => Math.atan(item.position.x / item.position.y) % (2 * Math.PI));
          speed = radius.map(item => 1000 / Math.pow(item, 2));
        }
        requestAnimationFrame(this.animate);
      };
    })(),
    sphere () {
      const geometry = new THREE.SphereGeometry(80, 20, 20);
      const material = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(1000 * Math.random() * (Math.random() > 0.5 ? 1 : -1), 1000 * Math.random() * (Math.random() > 0.5 ? 1 : -1), 2);
      sphere.castShadow = true;
      return sphere;
    },
    spot () {
      const spot = new THREE.PointLight(0x00ff00, 10, 200000);
      spot.position.set(0, 0, 0);
      spot.castShadow = true;
      return spot;
    }
  },
  mounted () {
    this.$three.init({
      axes: 500
    });
    three.controls.maxDistance = 6666;
    this.inited = true;
    this.$three.lookCamera([0, 0, 0], [2400, 2400, 2400]);
    this.$three.loadFbx({
      list: this.list,
      modelUrl: './static/fbx',
      success: () => {
        this.animate();
        three.scene.add(this.spot());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
        // three.scene.add(this.sphere());
      }
    });
  }
};
</script>

<style lang="scss">
  #app {
    overflow: hidden;
    width: 100%;
    height: 100%;
    // background: #004600;
    // background-size: 100% 100%;
    .round {
      position: absolute;
      top: 1rem;
      left: 0.5rem;
    }
    .renting {
      position: absolute;
      top: 1rem;
      right: 0.5rem;
    }
  }
  #container {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .halfCanvas #container {
    width: 65%;
  }
</style>
