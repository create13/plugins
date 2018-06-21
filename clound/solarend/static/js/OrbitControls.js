THREE.OrbitControls = function (e, t) {
  function n() {
    return 2 * Math.PI / 60 / 60 * N.autoRotateSpeed
  }

  function o() {
    return Math.pow(.95, N.zoomSpeed)
  }

  function a(e) {
    Y.theta -= e
  }

  function r(e) {
    Y.phi -= e
  }

  function i(e) {
    N.object instanceof THREE.PerspectiveCamera ? F /= e : N.object instanceof THREE.OrthographicCamera ? (N.object.zoom = Math.max(N.minZoom, Math.min(N.maxZoom, N.object.zoom * e)), N.object.updateProjectionMatrix(), K = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), N.enableZoom = !1)
  }

  function s(e) {
    N.object instanceof THREE.PerspectiveCamera ? F *= e : N.object instanceof THREE.OrthographicCamera ? (N.object.zoom = Math.max(N.minZoom, Math.min(N.maxZoom, N.object.zoom / e)), N.object.updateProjectionMatrix(), K = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), N.enableZoom = !1)
  }

  function c(e) {
    B.set(e.clientX, e.clientY)
  }

  function u(e) {
    J.set(e.clientX, e.clientY)
  }

  function d(e) {
    _.set(e.clientX, e.clientY)
  }

  function m(e) {
    Z = !1, G.set(e.clientX, e.clientY), W.subVectors(G, B);
    var t = N.domElement === document ? N.domElement.body : N.domElement;
    a(2 * Math.PI * W.x / t.clientWidth * N.rotateSpeed), r(2 * Math.PI * W.y / t.clientHeight * N.rotateSpeed), B.copy(G), N.update()
  }

  function l(e) {
    ee.set(e.clientX, e.clientY), te.subVectors(ee, J), te.y > 0 ? i(o()) : te.y < 0 && s(o()), J.copy(ee), N.update()
  }

  function p(e) {
    q.set(e.clientX, e.clientY), Q.subVectors(q, _), ae(Q.x, Q.y), _.copy(q), N.update()
  }

  function E(e) {
    "function" == typeof youzuOnMouseDown && youzuOnMouseDown(e)
  }

  function h(e) {
    e.deltaY < 0 ? s(o()) : e.deltaY > 0 && i(o()), N.update()
  }

  function b(e) {
    switch (e.keyCode) {
      case N.keys.UP:
        ae(0, N.keyPanSpeed), N.update();
        break;
      case N.keys.BOTTOM:
        ae(0, -N.keyPanSpeed), N.update();
        break;
      case N.keys.LEFT:
        ae(N.keyPanSpeed, 0), N.update();
        break;
      case N.keys.RIGHT:
        ae(-N.keyPanSpeed, 0), N.update();
        break;
      case 107:
      case 187:
      case 87:
        s(o()), N.update();
        break;
      case 109:
      case 189:
      case 83:
        i(o()), N.update();
        break;
      case 65:
        a(n()), N.update();
        break;
      case 68:
        a(-n()), N.update();
        break;
      case 90:
        r(n()), N.update();
        break;
      case 88:
        r(-n()), N.update()
    }
  }

  function g(e) {
    B.set(e.touches[0].pageX, e.touches[0].pageY)
  }

  function f(e) {
    var t = e.touches[0].pageX - e.touches[1].pageX,
      n = e.touches[0].pageY - e.touches[1].pageY,
      o = Math.sqrt(t * t + n * n);
    J.set(0, o)
  }

  function y(e) {
    _.set(e.touches[0].pageX, e.touches[0].pageY)
  }

  function T(e) {
    G.set(e.touches[0].pageX, e.touches[0].pageY), W.subVectors(G, B);
    var t = N.domElement === document ? N.domElement.body : N.domElement;
    a(2 * Math.PI * W.x / t.clientWidth * N.rotateSpeed), r(2 * Math.PI * W.y / t.clientHeight * N.rotateSpeed), B.copy(G), N.update()
  }

  function R(e) {
    var t = e.touches[0].pageX - e.touches[1].pageX,
      n = e.touches[0].pageY - e.touches[1].pageY,
      a = Math.sqrt(t * t + n * n);
    ee.set(0, a), Math.abs(J.y - ee.y) <= 15 || (te.subVectors(ee, J), te.y > 0 ? s(o()) : te.y < 0 && i(o()), J.copy(ee), N.update())
  }

  function v(e) {
    q.set(e.touches[0].pageX, e.touches[0].pageY), Q.subVectors(q, _), ae(Q.x, Q.y), _.copy(q), N.update()
  }

  function O(e) {}

  function w(e) {
    if (window.MouseCalc = 0, e.target.removeAttribute("data-mouse-flag"), !1 !== N.enabled) {
      if (e.preventDefault(), e.button === N.mouseButtons.ORBIT) {
        if (!1 === N.enableRotate) return;
        c(e), V = S.ROTATE
      } else if (e.button === N.mouseButtons.ZOOM) {
        if (!1 === N.enableZoom) return;
        u(e), V = S.DOLLY
      } else if (e.button === N.mouseButtons.PAN) {
        if (!1 === N.enablePan) return;
        d(e), V = S.PAN
      }
      V !== S.NONE && (Z = !0, document.addEventListener("mousemove", H, !1), document.addEventListener("mouseup", j, !1), N.dispatchEvent(L))
    }
  }

  function H(e) {
    if (window.MouseCalc++, !1 !== N.enabled)
      if (e.preventDefault(), Z = !1, V === S.ROTATE) {
        if (!1 === N.enableRotate) return;
        m(e)
      } else if (V === S.DOLLY) {
      if (!1 === N.enableZoom) return;
      l(e)
    } else if (V === S.PAN) {
      if (!1 === N.enablePan) return;
      p(e)
    }
  }

  function j(e) {
    window.MouseCalc > 1 && e.target.setAttribute("data-mouse-flag", !0), !1 !== N.enabled && (Z && E(e), Z = !1, document.removeEventListener("mousemove", H, !1), document.removeEventListener("mouseup", j, !1), N.dispatchEvent(D), V = S.NONE)
  }

  function P(e) {
    !1 === N.enabled || !1 === N.enableZoom || V !== S.NONE && V !== S.ROTATE || (e.preventDefault(), e.stopPropagation(), h(e), N.dispatchEvent(L), N.dispatchEvent(D))
  }

  function x(e) {
    !1 !== N.enabled && !1 !== N.enableKeys && !1 !== N.enablePan && b(e)
  }

  function M(e) {
    if (!1 !== N.enabled) {
      switch (window.onTouchStartevent = e, e.touches.length) {
        case 1:
          if (!1 === N.enableRotate) return;
          g(e), V = S.TOUCH_ROTATE;
          break;
        case 2:
          !0 === N.enablePan && y(e), !0 === N.enableZoom && f(e);
          break;
        case 3:
        default:
          V = S.NONE
      }
      V !== S.NONE && N.dispatchEvent(L)
    }
  }

  function z(e) {
    if (!1 !== N.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
      case 1:
        if (!1 === N.enableRotate) return;
        if (V !== S.TOUCH_ROTATE) return;
        T(e);
        break;
      case 2:
        !0 === N.enablePan && v(e), !0 === N.enableZoom && R(e);
        break;
      case 3:
        break;
      default:
        V = S.NONE
    }
  }

  function C(e) {
    !1 !== N.enabled && (O(e), N.dispatchEvent(D), V = S.NONE, "function" == typeof youzuonTouchEnd && youzuonTouchEnd(e))
  }

  function A(e) {
    e.preventDefault()
  }
  this.isconsole = !1, this.object = e, this.domElement = void 0 !== t ? t : document, this.enabled = !0, this.target = new THREE.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
  }, this.mouseButtons = {
    ORBIT: THREE.MOUSE.LEFT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.RIGHT
  }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.scaling = 1, this.getPolarAngle = function () {
    return I.phi
  }, this.getAzimuthalAngle = function () {
    return I.theta
  }, this.saveState = function () {
    N.target0.copy(N.target), N.position0.copy(N.object.position), N.zoom0 = N.object.zoom
  }, this.reset = function (e) {
    N.target.copy(e.target ? e.target : N.target0), N.object.position.copy(e.object ? e.object.position : N.position0), N.object.zoom = e.object ? e.object.zoom : N.zoom0, N.object.updateProjectionMatrix(), N.dispatchEvent(k), N.update(), V = S.NONE
  }, this.update = function () {
    var t = new THREE.Vector3,
      o = (new THREE.Quaternion).setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0)),
      r = o.clone().inverse(),
      i = new THREE.Vector3,
      s = new THREE.Quaternion;
    return function () {
      var e = N.object.position;
      return t.copy(e).sub(N.target), t.applyQuaternion(o), I.setFromVector3(t), N.autoRotate && V === S.NONE && a(n()), I.theta += Y.theta, I.phi += Y.phi, I.theta = Math.max(N.minAzimuthAngle, Math.min(N.maxAzimuthAngle, I.theta)), I.phi = Math.max(N.minPolarAngle, Math.min(N.maxPolarAngle, I.phi)), I.makeSafe(), I.radius *= F, I.radius = Math.max(N.minDistance, Math.min(N.maxDistance, I.radius)), N.radius = I.radius, N.target.add(X), t.setFromSpherical(I), t.applyQuaternion(r), $(document).trigger("controls_update", [{
        offset: t,
        target: N.target
      }]), e.copy(N.target).add(t), N.object.lookAt(N.target), !0 === N.enableDamping ? (Y.theta *= 1 - N.dampingFactor, Y.phi *= 1 - N.dampingFactor) : Y.set(0, 0, 0), F = 1, X.set(0, 0, 0), !!(K || i.distanceToSquared(N.object.position) > U || 8 * (1 - s.dot(N.object.quaternion)) > U) && (N.dispatchEvent(k), i.copy(N.object.position), s.copy(N.object.quaternion), K = !1, !0)
    }
  }(), this.dispose = function () {
    N.domElement.removeEventListener("contextmenu", A, !1), N.domElement.removeEventListener("mousedown", w, !1), N.domElement.removeEventListener("wheel", P, !1), N.domElement.removeEventListener("touchstart", M, !1), N.domElement.removeEventListener("touchend", C, !1), N.domElement.removeEventListener("touchmove", z, !1), document.removeEventListener("mousemove", H, !1), document.removeEventListener("mouseup", j, !1), window.removeEventListener("keydown", x, !1)
  };
  var N = this,
    k = {
      type: "change"
    },
    L = {
      type: "start"
    },
    D = {
      type: "end"
    },
    S = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_DOLLY: 4,
      TOUCH_PAN: 5
    },
    V = S.NONE,
    U = 1e-6,
    Z = !0,
    I = new THREE.Spherical,
    Y = new THREE.Spherical,
    F = 1,
    X = new THREE.Vector3,
    K = !1,
    B = new THREE.Vector2,
    G = new THREE.Vector2,
    W = new THREE.Vector2,
    _ = new THREE.Vector2,
    q = new THREE.Vector2,
    Q = new THREE.Vector2,
    J = new THREE.Vector2,
    ee = new THREE.Vector2,
    te = new THREE.Vector2,
    ne = function () {
      var e = new THREE.Vector3;
      return function (t, n) {
        N.target.x > -1500 && N.target.x < 1500 && N.target.y > -1500 && N.target.y < 1500 && N.target.z > -1500 && N.target.z < 1500 ? (e.setFromMatrixColumn(n, 0), e.multiplyScalar(-t), X.add(e)) : (N.target.x <= -1500 ? N.target.x += 2 : N.target.x >= 1500 && (N.target.x -= 2), N.target.y <= -1500 ? N.target.y += 2 : N.target.y >= 1500 && (N.target.y -= 2), N.target.z <= -1500 ? N.target.z += 2 : N.target.z >= 1500 && (N.target.z -= 2))
      }
    }(),
    oe = function () {
      var e = new THREE.Vector3;
      return function (t, n) {
        N.target.x > -1500 && N.target.x < 1500 && N.target.y > -1500 && N.target.y < 1500 ? (e.setFromMatrixColumn(n, 1), e.multiplyScalar(t), X.add(e)) : (N.target.x <= -1500 ? N.target.x += 2 : N.target.x >= 1500 && (N.target.x -= 2), N.target.y <= -1500 ? N.target.y += 2 : N.target.y >= 1500 && (N.target.y -= 2), N.target.z <= -1500 ? N.target.z += 2 : N.target.z >= 1500 && (N.target.z -= 2))
      }
    }(),
    ae = function () {
      var e = new THREE.Vector3;
      return function (t, n) {
        var o = N.domElement === document ? N.domElement.body : N.domElement;
        if (N.object instanceof THREE.PerspectiveCamera) {
          var a = N.object.position;
          e.copy(a).sub(N.target);
          var r = e.length();
          r *= Math.tan(N.object.fov / 2 * Math.PI / 180), ne(2 * t * r / o.clientHeight, N.object.matrix), oe(2 * n * r / o.clientHeight, N.object.matrix)
        } else N.object instanceof THREE.OrthographicCamera ? (ne(t * (N.object.right - N.object.left) / N.object.zoom / o.clientWidth, N.object.matrix), oe(n * (N.object.top - N.object.bottom) / N.object.zoom / o.clientHeight, N.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), N.enablePan = !1)
      }
    }();
  N.domElement.addEventListener("contextmenu", A, !1), N.domElement.addEventListener("mousedown", w, !1), N.domElement.addEventListener("wheel", P, !1), N.domElement.addEventListener("touchstart", M, !1), N.domElement.addEventListener("touchend", C, !1), N.domElement.addEventListener("touchmove", z, !1), window.addEventListener("keydown", x, !1), this.update()
}, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, {
  center: {
    get: function () {
      return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target
    }
  },
  noZoom: {
    get: function () {
      return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !e
    }
  },
  noRotate: {
    get: function () {
      return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !e
    }
  },
  noPan: {
    get: function () {
      return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !e
    }
  },
  noKeys: {
    get: function () {
      return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !e
    }
  },
  staticMoving: {
    get: function () {
      return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !e
    }
  },
  dynamicDampingFactor: {
    get: function () {
      return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor
    },
    set: function (e) {
      console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = e
    }
  }
});
