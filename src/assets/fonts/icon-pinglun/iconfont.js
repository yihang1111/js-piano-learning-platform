(window._iconfont_svg_string_ =
  '<svg><symbol id="icon-pinglun" viewBox="0 0 1024 1024"><path d="M947.2 128a25.6 25.6 0 0 1 25.6 25.6v640a25.6 25.6 0 0 1-25.6 25.6H484.0448l-186.624 146.6624A25.6 25.6 0 0 1 256 945.7408V819.2H76.8a25.6 25.6 0 0 1-25.6-25.6V153.6a25.6 25.6 0 0 1 25.6-25.6h870.4z m-51.2 76.8H128v537.6h204.8v97.9712L457.472 742.4H896V204.8zM563.2 537.6v76.8H256v-76.8h307.2z m204.8-204.8v76.8H256v-76.8h512z"  ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg');
    if (!t) {
      var o,
        i,
        d,
        c,
        a,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement('div');
        (e.innerHTML = n._iconfont_svg_string_),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e));
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener('DOMContentLoaded', i, !1), o();
              }),
              document.addEventListener('DOMContentLoaded', i, !1))
          : document.attachEvent &&
            ((d = o),
            (c = n.document),
            (a = !1),
            r(),
            (c.onreadystatechange = function () {
              'complete' == c.readyState && ((c.onreadystatechange = null), l());
            }));
    }
    function l() {
      a || ((a = !0), d());
    }
    function r() {
      try {
        c.documentElement.doScroll('left');
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
