! function(n, e) { var t, i = n.document,
        a = i.documentElement,
        r = i.querySelector('meta[name="viewport"]'),
        o = i.querySelector('meta[name="flexible"]'),
        l = 0,
        s = 0,
        d = e.flexible || (e.flexible = {}); if (o) { var m = o.getAttribute("content"); if (m) { var p = m.match(/initial\-dpr=([\d\.]+)/),
                f = m.match(/maximum\-dpr=([\d\.]+)/);
            p && (l = parseFloat(p[1]), s = parseFloat((1 / l).toFixed(2))), f && (l = parseFloat(f[1]), s = parseFloat((1 / l).toFixed(2))) } } if (!l && !s) { n.navigator.appVersion.match(/android/gi), n.navigator.appVersion.match(/iphone/gi); var c = n.devicePixelRatio;
        s = 1 / (l = 3 <= c && (!l || 3 <= l) ? 3 : 2 <= c && (!l || 2 <= l) ? 2 : 1) } if (a.setAttribute("data-dpr", l), (r = i.createElement("meta")).setAttribute("name", "viewport"), r.setAttribute("content", "width=device-width, initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no"), a.firstElementChild) a.firstElementChild.appendChild(r);
    else { var u = i.createElement("div");
        u.appendChild(r), i.write(u.innerHTML) }

    function h() { var e = a.getBoundingClientRect().width;
        540 < e / l && (e = 540 * l); var t = e / 10;
        a.style.fontSize = t + "px", d.rem = n.rem = t; var i = parseFloat(a.style.fontSize),
            r = parseFloat(window.getComputedStyle(a).getPropertyValue("font-size"));
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", i, r), i !== r && (a.style.fontSize = i * (i / r) + "px", console.log("flexible.refreshRem.fixed: fontSize  => ", a.style.fontSize)) }
    n.addEventListener("resize", function() { clearTimeout(t), t = setTimeout(h, 300) }, !1), n.addEventListener("pageshow", function(e) { e.persisted && (clearTimeout(t), t = setTimeout(h, 300)) }, !1), "complete" === i.readyState ? i.body.style.fontSize = 12 * l + "px" : i.addEventListener("DOMContentLoaded", function(e) { i.body.style.fontSize = 12 * l + "px" }, !1), h(), d.dpr = n.dpr = l, d.refreshRem = h, d.rem2px = function(e) { var t = parseFloat(e) * this.rem; return "string" == typeof e && e.match(/rem$/) && (t += "px"), t }, d.px2rem = function(e) { var t = parseFloat(e) / this.rem; return "string" == typeof e && e.match(/px$/) && (t += "rem"), t } }(window, window.lib || (window.lib = {}));