<template>
  <section id="app">
    <!-- 主要容器，three canvas 画布 -->
    <div id="container"></div>
    <!-- 指针标签 -->
    <template v-if="!showName">
      <sl-line
        :key="index"
        :name="planetName[item.name]"
        :planet="item"
        :showName="showName"
        v-for="(item, index) of planetList"
        @planetClick="showName = arguments[0]">
      </sl-line>
    </template>
    <!-- 二级页面 -->
    <v-info :show-name="showName" v-else @closeInfo="showName = ''"></v-info>
  </section>
</template>

<script>
import { load } from '@/assets/js/solar';
import vInfo from '@/components/Info.vue';
const EVENT_NAME = Symbol('planetClick');

export default {
  name: 'App',
  data () {
    return {
      list: [
        'sky',
        'path',
        'sun',
        'moon_T_moon_02',
        'moon_T_moon_03',
        'moon_T_moon_04',
        'moon_T_moon_05',
        'moon_T_moon_06',
        'moon_T_moon_07'
      ],
      planetList: [],
      planetName: {
        'moon_T_moon_02': '综合党委',
        'moon_T_moon_03': '事业党委党组织',
        'moon_T_moon_04': '园区党组织',
        'moon_T_moon_05': '街道党组织',
        'moon_T_moon_06': '政法党组织',
        'moon_T_moon_07': '廉政党组织'
      },
      showName: ''
    };
  },
  methods: {
    animate: (() => {
      let planet = []; // 行星
      let radius = []; // 半径
      let deg = []; // 角度
      let speed = []; // 角速度
      const rotation = (item, index) => {
        if (item.isMesh) {
          item.rotation.x += 0.001;
          item.rotation.y += 0.008;
          if (deg.length > 1) {
            deg[index] = (deg[index] + speed[index]) % (2 * Math.PI);
            item.position.x = radius[index] * Math.sin(deg[index]);
            item.position.z = -radius[index] * Math.cos(deg[index]);
          }
        }
      };
      return function () {
        if (!this.showName) {
          if (planet.length) {
            planet.forEach(rotation);
          } else {
            planet = $t.getMeshByName(/(moon)|(ring)/);
            this.planetList = planet.filter(item => /moon/.test(item.name));
            radius = planet.map(item => Math.sqrt(Math.pow(item.position.x, 2) + Math.pow(item.position.z, 2)));
            deg = planet.map(item => Math.atan(item.position.x / item.position.z) % (2 * Math.PI));
            speed = radius.map(item => 3000 / Math.pow(item, 2));
          }
        }
        requestAnimationFrame(this.animate);
      };
    })(),
    setMaterial () {
      const mesh = $t.getMeshByName(/(sun)|(path)/);
      for (const item of mesh) {
        const map = item.material.map;
        const material = new THREE.MeshBasicMaterial({ map });
        item.material = material;
      }
    }
  },
  mounted () {
    $t = new this.$three.ThreeInit({
      camera: { far: 50000 },
      controls: { maxDistance: 12315 }
    });
    $t.lookAt([0, 0, 0], [2656, 1352, 2896]);
    $t.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    $t.scene.add(new THREE.PointLight(0xffffff));

    this.$three.load({
      list: this.list,
      baseUrl: './static/fbx',
      load,
      success: (current, previous) => {
        $t.meshChange(current, previous);
        this.setMaterial();
        this.animate();
      }
    });

    $t.touchMesh.add(EVENT_NAME, intersects => {
      const name = intersects[0].object.name;
      if (/moon/i.test(name)) {
        this.showName = name;
      }
    });
  },
  beforeDestroy () {
    $t.touchMesh.remove(EVENT_NAME);
  },
  components: {
    vInfo
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
