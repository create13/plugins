<template>
  <section class="sl-line" :style="style">
    <transition name="fade">
      <div class="center line" v-show="!showName">{{name}}</div>
    </transition>

    <!-- 星球模型点击容易被标签遮挡，用这个标签辅助点击 -->
    <div class="dam-board" :style="{ width: `${diameter}px`, height: `${diameter}px` }" @click="damClick"></div>
  </section>
</template>

<script>
export default {
  name: 'sl-line',
  props: {
    name: {
      type: String,
      default: '行政部门'
    },
    planet: {
      type: Object,
      default: () => ({})
    },
    showName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      style: {},
      refObj: null,
      diameter: 20
    };
  },
  methods: {
    adjustPosition () {
      const dom = $t.renderer.domElement;
      const camera = $t.camera;
      const adjust = () => {
        if (this.planet && this.planet.position && !this.showName) {
          const position = this.planet.position;
          const vector = (new THREE.Vector3(position.x, -position.y, position.z)).project(camera);
          const left = (1 + vector.x) * dom.clientWidth / 2;
          const top = (1 - vector.y) * dom.clientHeight / 2;
          const style = {
            left: `${left}px`,
            top: `${top}px`
          };
          this.setDamRadius();
          this.style = style;
        }
      };
      adjust();
      this.adjustPosition = adjust;
    },
    requireAnimation () {
      this.adjustPosition();
      this.rafObj = requestAnimationFrame(this.requireAnimation);
    },
    setDamRadius () {
      const target = this.planet.position;
      const position = $t.camera.position;
      const distance = Math.sqrt(
        Math.pow(position.x - target.x, 2) +
        Math.pow(position.y - target.z, 2) +
        Math.pow(position.z + target.y, 2)
      );
      let planetRadius = 0;
      try {
        planetRadius = this.planet.geometry.boundingSphere.radius;
      } catch (error) {
        planetRadius = 0;
      }
      const percent = planetRadius / distance / Math.tan($t.camera.fov / 360 * Math.PI);
      this.diameter = $t.size.height * percent;
    },
    damClick () {
      if (this.planet.name) {
        this.$emit('planetClick', this.planet.name);
      }
    }
  },
  mounted () {
    this.requireAnimation();
  },
  beforeDestroy () {
    cancelAnimationFrame(this.refObj);
  }
};
</script>

<style lang="scss">
  .sl-line {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 166px;
    height: 81px;
    text-align: center;
    transform: translate(-50%, -50%);
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 5;
    }
    .line {
      width: 100%;
      height: 100%;
      padding-left: 20%;
      padding-bottom: 39.2%;
      font-size: 16px;
      color: #34c8f3;
      background: url('../assets/img/line.png') no-repeat;
      background-position: center bottom;
      background-size: 100%;
      transform: translateY(-100%);
    }
    .dam-board {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    .diffure-enter-active,
    .diffure-leave-active {
      transition: opacity 0.4s, transform 0.5s;
    }
    .diffure-enter,
    .diffure-leave-to {
      opacity: 0;
      transform: rotateX(60deg) scale(8.88);
    }
  }
</style>
