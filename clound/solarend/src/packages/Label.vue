<template>
  <section class="sl-label" :style="style">
    <transition name="fade">
      <div class="center label" :style="{ top: `${diameter / 2 + 40}px` }">{{name}}</div>
    </transition>

    <!-- 星球模型点击容易被标签遮挡，用这个标签辅助点击 -->
    <div class="dam-board" :style="{ width: `${diameter}px`, height: `${diameter}px` }" @click="damClick"></div>
  </section>
</template>

<script>
export default {
  name: 'sl-label',
  props: {
    name: {
      type: String,
      default: '行政部门'
    },
    planet: {
      type: Object,
      default: () => ({})
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
      const dom = three.renderer.domElement;
      let prevControlsCount = -1;
      let count = 0; // 加个计时，controls 停止变动后再来 5 次
      const adjust = () => {
        if ((three.controls.changeCount !== prevControlsCount || count < 5) && this.planet && this.planet.position) {
          if (three.controls.changeCount !== prevControlsCount) {
            prevControlsCount = three.controls.changeCount;
            count = 0;
          } else {
            count++;
          }
          const position = this.planet.position;
          const vector = (new THREE.Vector3(position.x, -position.y, position.z)).project(three.camera);
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
      const position = three.camera.position;
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
      const percent = planetRadius / distance / Math.tan(three.camera.fov / 360 * Math.PI);
      this.diameter = three.renderer.domElement.clientHeight * percent;
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
  .sl-label {
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
    .label {
      padding: 5px 20px;
      font-size: 16px;
      color: #34c8f3;
      text-shadow: 0 0 20px #34c8f3, 0 0 20px #34c8f3;
      white-space: nowrap;
      background: linear-gradient(
        right,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100
      );
      transform: translateX(-50%);
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
