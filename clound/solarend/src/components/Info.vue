<template>
  <section class="info-page">
    <div class="canvas" id="infoContainer"></div>
    <sl-charts :showData="showData" @planetClick="showPlanets = true"></sl-charts>
    <!-- <sl-label></sl-label> -->
    <sl-label
      :key="index"
      :planet="item"
      :name="`第 ${index + 1} 街道`"
      v-for="(item, index) of planets">
    </sl-label>
    <div class="back-btn" @click="back"></div>
  </section>
</template>

<script>
import { load } from '@/assets/js/solar';

const genColor = (sphere) => {
  sphere.colorNum = (sphere.colorNum + 1) % 180;
  const num = Math.floor(120 * Math.sin(sphere.colorNum * Math.PI / 180) + 125) / 255;
  sphere.material.color.setRGB(num, num, num);
};
let radius = 0;
let position = {};
const imgNum = ['02', '03', '04', '05', '06', '07'];
const imgs = imgNum.map(item => new THREE.TextureLoader().load(`./static/fbx/moon_${item}.png`));

export default {
  name: 'info',
  props: {
    showName: {
      type: String
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      rafObj: null,
      planets: [],
      showPlanets: false,
      infoThree: {}
    };
  },
  methods: {
    back () {
      if (this.showPlanets) {
        this.showPlanets = false;
      } else {
        this.$emit('closeInfo');
      }
    },
    init () {
      three = new this.$three.ThreeInit({
        domId: 'infoContainer',
        camera: { far: 50000 },
        controls: {
          maxDistance: 12315,
          enablePan: false,
          changeCount: 0
        }
      });
      three.scene.add(new THREE.AmbientLight(0xffffff, 1));

      this.$three.load({
        namespace: 'info',
        list: ['sky', this.showName],
        baseUrl: './static/fbx',
        load,
        success: (current, previous) => {
          three.meshChange(current, previous);
          const planet = three.getMeshByName(this.showName);
          const axes = three.getAxesByName(this.showName);
          // 保存坐标和半径用于生成球体时作为参照
          position = planet.position;
          radius = axes.radius;
          Object.assign(three.controls, {
            minDistance: radius * 40,
            maxDistance: radius * 48,
            maxPolarAngle: 30 * Math.PI / 180
          });
          three.lookAt(
            position,
            [
              position.x,
              position.y + 40 * radius,
              position.z
            ]
          );
          this.animate(planet);
        }
      });
    },
    animate: (() => {
      let star = null;
      return function (planet) {
        if (planet.isMesh) {
          star = planet;
        }
        // 中心球体转啊转
        if (star) {
          star.rotation.x += 0.01;
          star.rotation.y += 0.01;
          star.rotation.z += 0.01;
        }
        // 周围小星星闪啊闪
        if (this.planets.length) {
          for (const item of this.planets) {
            genColor(item);
          }
        }
        this.rafObj = requestAnimationFrame(this.animate);
      };
    })(),
    genSphere (num = 10) {
      const ballNum = (/_(\d+)$/.exec(this.showName))[1];
      const list = imgNum.filter(item => item !== ballNum);
      for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * list.length);
        const geometry = new THREE.SphereGeometry(((Math.random() - 0.5) * 0.4 + 0.6) * radius, 20, 20);
        const material = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          map: imgs[imgNum.indexOf(list[random])]
        });
        const sphere = new THREE.Mesh(geometry, material);
        const deg = 2 / num * i * Math.PI;
        const length = (Math.random() * 10 + 5) * radius;
        sphere.position.set(
          position.x + Math.sin(deg) * length,
          position.y,
          position.z + Math.cos(deg) * length
        );
        sphere.colorNum = Math.floor(Math.random() * 180);
        this.planets.push(sphere);
      }
      for (const item of this.planets) {
        three.scene.add(item);
      }
    },
    removeSphere () {
      for (const item of this.planets) {
        three.scene.remove(item);
      }
      this.planets = [];
    }
  },
  computed: {
    showData () {
      return !this.planets.length;
    }
  },
  watch: {
    showPlanets (newval) {
      if (newval) {
        this.genSphere(20);
      } else {
        this.removeSphere();
      }
    }
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {
    cancelAnimationFrame(this.rafObj);
    this.removeSphere();
  }
};
</script>

<style lang="scss">
  .info-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fa6200;
    background: rgba(26, 26, 26, 0.8);
    .canvas {
      width: 100%;
      height: 100%;
    }
    .back-btn {
      position: absolute;
      top: 36px;
      left: 60px;
      width: 75px;
      height: 47px;
      background: url('../assets/img/back-btn.png') no-repeat center;
      background-size: 100%;
    }
  }
</style>
