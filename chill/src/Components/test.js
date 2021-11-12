!(function (e) {
  function t(t) {
    for (
      var o, r, s = t[0], c = t[1], l = t[2], d = 0, u = [];
      d < s.length;
      d++
    )
      (r = s[d]),
        Object.prototype.hasOwnProperty.call(n, r) && n[r] && u.push(n[r][0]),
        (n[r] = 0);
    for (o in c) Object.prototype.hasOwnProperty.call(c, o) && (e[o] = c[o]);
    for (g && g(t); u.length; ) u.shift()();
    return i.push.apply(i, l || []), a();
  }
  function a() {
    for (var e, t = 0; t < i.length; t++) {
      for (var a = i[t], o = !0, s = 1; s < a.length; s++) {
        var c = a[s];
        0 !== n[c] && (o = !1);
      }
      o && (i.splice(t--, 1), (e = r((r.s = a[0]))));
    }
    return e;
  }
  var o = {},
    n = { 0: 0 },
    i = [];
  function r(t) {
    if (o[t]) return o[t].exports;
    var a = (o[t] = { i: t, l: !1, exports: {} });
    return e[t].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
  }
  (r.m = e),
    (r.c = o),
    (r.d = function (e, t, a) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (r.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            a,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return a;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = "");
  var s = (window.webpackJsonp = window.webpackJsonp || []),
    c = s.push.bind(s);
  (s.push = t), (s = s.slice());
  for (var l = 0; l < s.length; l++) t(s[l]);
  var g = c;
  i.push([1, 1]), a();
})([
  ,
  function (e, t, a) {
    "use strict";
    a.r(t);
    a(2);
    var o = a(3),
      n = a(4),
      i = a(5),
      r = a(6);
    a(7)(), o(), n(), i(), r();
  },
  function (e, t, a) {},
  function (e, t, a) {
    var o = a(0);
    e.exports = function () {
      var e = o(".js-btn-more"),
        t = o(".js-btn-close");
      e.on("click", function () {
        o(this).siblings(".remark").toggleClass("active");
      }),
        t.on("click", function () {
          o(this).parent(".remark").removeClass("active"), console.log("aaa");
        });
    };
  },
  function (e, t, a) {
    var o = a(0);
    e.exports = function () {
      var e = !0,
        t = o("#form-send"),
        a = o(".js-form-other"),
        n = o("#checkbox4");
      a.on("keyup", function () {
        o(this).val() && n.prop("checked", !0);
      }),
        t.on("click", function (t) {
          if (!e) return void t.preventDefault();
          var a = o(".js-val-email").val();
          if (!o(".js-val-name").val() || !a)
            return t.preventDefault(), void alert("姓名及 email 是必填欄位");
          if (
            ((n = a),
            -1 ===
              n.search(
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
              ))
          )
            return (
              t.preventDefault(), void alert("email 格式不正確，請再檢查一下")
            );
          var n;
          (e = !1),
            window.setTimeout(function () {
              o("#form")[0].reset(),
                (e = !0),
                alert("資料已送出，感謝你的回饋");
            }, 0);
        });
    };
  },
  function (e, t, a) {
    var o = a(0);
    e.exports = function () {
      var e = new ScrollMagic.Controller(),
        t = o(".section1").innerHeight(),
        a = o(".section3").innerHeight(),
        n = o(".section4").innerHeight(),
        i = o(".section5").innerHeight(),
        r =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 2,
          })
            .setClassToggle(".section-show1", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 4,
          })
            .setClassToggle(".tip-arrow", "hidden")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 55,
            offset: (t / 55) * 4,
          })
            .setClassToggle(".section-show2", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 6,
          })
            .setClassToggle(".section-show3", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 7,
            offset: (t / 55) * 10,
          })
            .setClassToggle(".section-show3-5", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 6,
            offset: (t / 55) * 17,
          })
            .setClassToggle(".section-show4", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 5,
            offset: (t / 55) * 18,
          })
            .setClassToggle(".section-show5", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 4,
            offset: (t / 55) * 19,
          })
            .setClassToggle(".section-show6", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 4,
            offset: (t / 55) * 20,
          })
            .setClassToggle(".section-show7", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 24,
          })
            .setClassToggle(".section-show8", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 27.5,
          })
            .setClassToggle(".section-show9", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 31,
          })
            .setClassToggle(".section-show10", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 34.5,
          })
            .setClassToggle(".section-show11", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 38,
          })
            .setClassToggle(".section-show12", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 42,
          })
            .setClassToggle(".section-show13", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 45.5,
          })
            .setClassToggle(".section-show14", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 3,
            offset: (t / 55) * 49,
          })
            .setClassToggle(".section-show15", "active")
            .addTo(e),
          new ScrollMagic.Scene({ triggerElement: ".section1" })
            .setClassToggle(".progress-1", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 6,
          })
            .setClassToggle(".progress-2", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 17,
          })
            .setClassToggle(".progress-3", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 27,
          })
            .setClassToggle(".progress-4", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 40,
          })
            .setClassToggle(".progress-5", "active")
            .addTo(e),
          new ScrollMagic.Scene({ triggerElement: ".section-end" })
            .setClassToggle(".progress-6", "active")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 10,
            offset: (t / 10) * -1,
          })
            .setClassToggle(".animate-1", "animate-show")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 19,
            offset: (t / 10) * -1,
          })
            .setClassToggle(".animate-2", "animate-show")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 30,
            offset: (t / 55) * 7,
          })
            .setClassToggle(".animate-3", "animate-show")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 17,
            offset: (t / 55) * 30,
          })
            .setClassToggle(".animate-4", "animate-show")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 55) * 15,
            offset: (t / 55) * 42,
          })
            .setClassToggle(".animate-5", "animate-show")
            .addTo(e),
          gsap.to(".animate-1_left", 100, { x: -180, y: 360 })),
        s = gsap.to(".animate-1_right", 100, { x: 180, y: 360 }),
        c =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
          })
            .setTween([r, s])
            .addTo(e),
          new ScrollMagic.Scene({ triggerElement: ".section1" })
            .setClassToggle(".man-animate,.tip-arrow", "run")
            .addTo(e),
          gsap.to(".animate-2_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        l = gsap.to(".animate-2_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        g =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
          })
            .setTween([c, l])
            .addTo(e),
          gsap.to(".animate-3_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        d =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 1.5,
          })
            .setTween(g)
            .addTo(e),
          gsap.to(".animate-4_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        u = gsap.to(".animate-4_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        f =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 3,
          })
            .setTween([d, u])
            .addTo(e),
          gsap.to(".animate-5_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        m =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 4.5,
          })
            .setTween(f)
            .addTo(e),
          gsap.to(".animate-6_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        y = gsap.to(".animate-6_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        p =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 6,
          })
            .setTween([m, y])
            .addTo(e),
          gsap.to(".animate-7_right", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: 180, y: 360 },
            ],
          })),
        w =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 7.5,
          })
            .setTween(p)
            .addTo(e),
          gsap.to(".animate-8_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -75, y: 160 },
            ],
          })),
        T = gsap.to(".animate-8_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 75, y: 160 },
          ],
        }),
        S =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 9.5,
          })
            .setTween([w, T])
            .addTo(e),
          gsap.to(".animate-9_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 20, x: -16, y: 36 },
            ],
          })),
        h = gsap.to(".animate-9_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 20, x: 16, y: 36 },
          ],
        }),
        v = gsap.to(".animate-crossing", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 20, y: 38, scale: 1.5 },
          ],
        }),
        x =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 10) * 1.1,
            offset: (t / 55) * 14,
          })
            .setTween([S, v, h])
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 50) * 3,
            offset: (t / 55) * 21,
          })
            .setClassToggle(".elves-hand", "sayhello")
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 50) * 8,
            offset: (t / 55) * 21,
          })
            .setClassToggle(".man-animate", "hello")
            .addTo(e),
          gsap.to(".animate-crossby_left", {
            duration: 2,
            x: "650%",
            rotation: 720,
          })),
        M = gsap.to(".animate-crossby_right", {
          duration: 3,
          x: "-670%",
          rotation: -360,
        }),
        _ =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 10) * 1.5,
            offset: (t / 55) * 24,
          })
            .setTween([x, M])
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 30,
          })
            .setClassToggle(".traffic-light", "isgreen")
            .addTo(e),
          gsap.to(".animate-15_left", 1, { x: -200, y: 420 })),
        E = gsap.to(".animate-15_right", 1, { x: 200, y: 420 }),
        k = gsap.to(".animate-15_left_other", 1, { x: 130, y: 420 }),
        C = gsap.to(".animate-15_right_other", 1, { x: -130, y: 420 }),
        b = gsap.to(".animate15_corssing", 1, { y: 420, scale: 5 }),
        j = gsap.to(".animate-15_5_left", 1, { x: -300, y: 630 }),
        O = gsap.to(".animate-15_5_right", 1, { x: 300, y: 630 }),
        P =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: (t / 10) * 1.5,
            offset: (t / 55) * 32,
          })
            .setTween([_, E, j, O, k, C, b])
            .addTo(e),
          gsap.to(".animate-16_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        A = gsap.to(".animate-16_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        H =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 33.5,
          })
            .setTween([P, A])
            .addTo(e),
          gsap.to(".animate-17_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        z = gsap.to(".animate-17_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        D =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 35.5,
          })
            .setTween([H, z])
            .addTo(e),
          gsap.to(".animate-18_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        Z = gsap.to(".animate-18_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        J =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 37.5,
          })
            .setTween([D, Z])
            .addTo(e),
          gsap.to(".animate-19_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        W = gsap.to(".animate-19_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        B = gsap.to(".animate19_corssing", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, y: 400, scale: 5 },
          ],
        }),
        I =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 39.5,
          })
            .setTween([J, W, B])
            .addTo(e),
          gsap.to(".dark-sky", { duration: 1, y: 0 })),
        R =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 41.5,
          })
            .setTween(I)
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section1",
            offset: (t / 55) * 42,
          })
            .setClassToggle(".rain", "active")
            .addTo(e),
          gsap.to(".animate-20_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        $ = gsap.to(".animate-20_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        q =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 42.5,
          })
            .setTween([R, $])
            .addTo(e),
          gsap.to(".animate-21_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        F = gsap.to(".animate-21_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        G =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 44.5,
          })
            .setTween([q, F])
            .addTo(e),
          gsap.to(".animate-22_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        K = gsap.to(".animate-22_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        L =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 46.5,
          })
            .setTween([G, K])
            .addTo(e),
          gsap.to(".animate-22-5_left", {
            keyframes: [
              { duration: 1, opacity: 1 },
              { duration: 8, x: -180, y: 360 },
            ],
          })),
        N = gsap.to(".animate-22-5_right", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 180, y: 360 },
          ],
        }),
        Q =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 10,
            offset: (t / 55) * 48.5,
          })
            .setTween([L, N])
            .addTo(e),
          gsap.to(".item-man", { duration: 10, scale: 0.8, y: -42 })),
        U = gsap.to(".cloud_animate1", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 6, x: "50%" },
          ],
        }),
        V = gsap.to(".cloud_animate2", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 8, x: 0 },
          ],
        }),
        X = gsap.to(".cloud_animate3", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 3, x: "50%" },
          ],
        }),
        Y = gsap.to(".cloud_animate4", {
          keyframes: [
            { duration: 1, opacity: 1 },
            { duration: 4, x: 0 },
          ],
        }),
        ee =
          (new ScrollMagic.Scene({
            triggerElement: ".section1",
            duration: t / 20,
            offset: (t / 55) * 52,
          })
            .setTween([Q, U, V, X, Y])
            .addTo(e),
          gsap.to(".bg_blue", { duration: 15, opacity: 1 })),
        te = gsap.to(".cloud_animate1", {
          keyframes: [
            { duration: 7, x: "100%" },
            { duration: 1, opacity: 0 },
          ],
        }),
        ae = gsap.to(".cloud_animate2", {
          keyframes: [
            { duration: 6, x: "-50%" },
            { duration: 1, opacity: 0 },
          ],
        }),
        oe = gsap.to(".cloud_animate3", {
          keyframes: [
            { duration: 7, x: "100%" },
            { duration: 1, opacity: 0 },
          ],
        }),
        ne = gsap.to(".cloud_animate4", {
          keyframes: [
            { duration: 6, x: "-50%" },
            { duration: 1, opacity: 0 },
          ],
        }),
        ie =
          (new ScrollMagic.Scene({
            triggerElement: ".section3",
            duration: a / 2,
          })
            .setTween([ee, te, ae, oe, ne])
            .addTo(e),
          new ScrollMagic.Scene({
            triggerElement: ".section3",
            offset: (a / 3) * 2,
          })
            .setClassToggle(".story-end", "active")
            .addTo(e),
          gsap.timeline());
      ie.to(".animate26", { duration: 2, opacity: 0 })
        .to(".animate27", { duration: 2, opacity: 0 })
        .to(".animate28", { duration: 2, opacity: 0 })
        .to(".animate29", { duration: 2, opacity: 0 });
      var re = gsap.to(".hand-animate", {
          keyframes: [
            { duration: 1, x: 20, y: 70, rotation: 0 },
            { duration: 1, x: 60, y: -30, rotation: 0 },
            { duration: 1, x: 100, y: 80, rotation: 0 },
            { duration: 1, x: 130, y: -40, rotation: 0 },
            { duration: 1, x: 160, y: 85, rotation: 0 },
            { duration: 1, x: 200, y: -35, rotation: 0 },
            { duration: 1, x: 230, y: 80, rotation: 0 },
          ],
        }),
        se =
          (new ScrollMagic.Scene({ triggerElement: ".section4", duration: n })
            .setTween([ie, re])
            .addTo(e),
          gsap.timeline());
      se.to(".animate-out", { duration: 1, opacity: 0 }).to(".end-text", {
        keyframes: [
          { duration: 1, opacity: 1 },
          { duration: 2, opacity: 1 },
          { duration: 1, opacity: 0 },
        ],
      });
      new ScrollMagic.Scene({ triggerElement: ".section5", duration: i })
        .setTween(se)
        .addTo(e);
    };
  },
  function (e, t, a) {
    var o = a(0);
    e.exports = function () {
      var e = o("#canvas")[0];
      if (
        ((e.width = window.innerWidth),
        (e.height = window.innerHeight),
        e.getContext)
      ) {
        var t = function () {
            for (var e = 0; e < c.length; e++) {
              var t = c[e];
              (t.x += t.xs),
                (t.y += t.ys),
                (t.x > n || t.y > i) &&
                  ((t.x = Math.random() * n), (t.y = -20));
            }
          },
          a = e.getContext("2d"),
          n = e.width,
          i = e.height;
        (a.strokeStyle = "#7B74AA"), (a.lineWidth = 1), (a.lineCap = "round");
        for (var r = [], s = 0; s < 300; s++)
          r.push({
            x: Math.random() * n,
            y: Math.random() * i,
            l: 1 * Math.random(),
            xs: 4 * Math.random() - 4 + 2,
            ys: 10 * Math.random() + 10,
          });
        for (var c = [], l = 0; l < 300; l++) c[l] = r[l];
        setInterval(function () {
          a.clearRect(0, 0, n, i);
          for (var e = 0; e < c.length; e++) {
            var o = c[e];
            a.beginPath(),
              a.moveTo(o.x, o.y),
              a.lineTo(o.x + o.l * o.xs, o.y + o.l * o.ys),
              a.stroke();
          }
          t();
        }, 36);
      }
    };
  },
  function (e, t, a) {
    var o = a(0);
    e.exports = function () {
      function e(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e);
      }
      var t = !1,
        a = 0,
        n = o("html"),
        i = o(".js-loading-text"),
        r = o(".js-loading-ride"),
        s = o(".js-loading-finish");
      n.addClass("start"),
        (function o() {
          var c = e(90, 100);
          setTimeout(function () {
            if ((a += e(3, 10)) > 99 && ((a = 99), t))
              return (
                r.addClass("active"),
                void setTimeout(function () {
                  s.addClass("active"),
                    setTimeout(function () {
                      n.removeClass("stop"), s.remove();
                    }, 3e3);
                }, 2400)
              );
            i.text(a), o();
          }, c);
        })(),
        (window.onpageshow = function () {
          t = !0;
        });
    };
  },
]);
