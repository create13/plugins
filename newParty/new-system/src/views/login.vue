<template>
  <div>
    <div class="out-wrap">
      <Row>
        <Col span="12">
          <i-input v-model="value" size="large" placeholder="large size"></i-input>
        </Col>
        <i-col span="12"></i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      value: ''
    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
};

</script>
<style scoped>
  .out-wrap {
    width: 100%;
  }
</style>
