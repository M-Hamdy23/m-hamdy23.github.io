(function () {
  'use strict';

  var React    = window.React;
  var ReactDOM = window.ReactDOM;
  if (!React || !ReactDOM) return;

  var h           = React.createElement;
  var useState    = React.useState;
  var useEffect   = React.useEffect;
  var useCallback = React.useCallback;

  var detailMap = {};

  /* ── Data normalizer ─────────────────────────────── */
  function normalize(base, detail) {
    base   = base   || {};
    detail = detail || {};

    var title        = detail.title        || base.name        || 'Project';
    var description  = detail.description  || base.desc        || '';
    var about        = detail.about        || description;
    var tags         = (detail.tags && detail.tags.length)
                       ? detail.tags : (base.platforms || []);
    var technologies = (detail.technologies && detail.technologies.length)
                       ? detail.technologies : (base.techs || []);
    var features     = Array.isArray(detail.features) ? detail.features
                       : (Array.isArray(base.features) ? base.features : []);
    var cta          = detail.cta || (base.link ? { label: 'View Project', url: base.link } : null);

    /* media */
    var detMedia = detail.media || {};
    var rawVids  = Array.isArray(detMedia.videos) ? detMedia.videos : [];
    var rawImgs  = Array.isArray(detMedia.images) ? detMedia.images : [];

    if (!rawVids.length && Array.isArray(base.videos)) {
      var labels = ['Trailer', 'Gameplay', 'Multiplayer', 'Tutorial'];
      rawVids = base.videos.map(function (url, i) {
        return { type: labels[i] || 'Video', url: url };
      });
    }
    if (!rawImgs.length && base.cover) rawImgs = [base.cover];

    /* my work fallback */
    var myWork = (Array.isArray(detail.myWork) && detail.myWork.length)
      ? detail.myWork
      : features.slice(0, 3).map(function (f, i) {
          return {
            title: ['Core System Design', 'Feature Implementation', 'Production & QA'][i] || f,
            description: f,
            images: rawImgs.slice(0, 1)
          };
        });

    return {
      title: title, description: description, about: about,
      tags: tags, cta: cta, technologies: technologies,
      features: features, media: { videos: rawVids, images: rawImgs },
      myWork: myWork
    };
  }

  /* ── Lightbox ────────────────────────────────────── */
  function Lightbox(props) {
    useEffect(function () {
      function onKey(ev) { if (ev.key === 'Escape') props.onClose(); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [props.onClose]);

    return h('div', { className: 'pdm-lightbox', onClick: props.onClose },
      h('button', { className: 'pdm-lb-close', onClick: props.onClose }, '✕'),
      h('img', { src: props.src, alt: props.alt,
                 onClick: function (e) { e.stopPropagation(); } }),
      props.alt ? h('div', { className: 'pdm-lb-caption' }, props.alt) : null
    );
  }

  /* ── Section header ──────────────────────────────── */
  function SecHdr(props) {
    return h('div', { className: 'pdm-sec-hdr' },
      h('span', { className: 'pdm-sec-num' },   props.num),
      h('h3',   { className: 'pdm-sec-title' }, props.label),
      h('div',  { className: 'pdm-sec-line' })
    );
  }

  /* ── About ───────────────────────────────────────── */
  function AboutSection(props) {
    return h('section', { id: 'pdm-about' },
      h(SecHdr, { num: '01', label: 'About' }),
      h('p', { className: 'pdm-about-text' }, props.about)
    );
  }

  /* ── Media ───────────────────────────────────────── */
  function MediaSection(props) {
    var media   = props.media   || {};
    var onImage = props.onImage;
    var videos  = media.videos  || [];
    var images  = media.images  || [];

    return h('section', { id: 'pdm-media' },
      h(SecHdr, { num: '02', label: 'Media' }),

      videos.length ? h('div', { className: 'pdm-video-grid' },
        videos.map(function (v, i) {
          var obj   = typeof v === 'string' ? { type: 'Video', url: v } : v;
          var label = (obj.type || 'Video').charAt(0).toUpperCase()
                    + (obj.type || 'Video').slice(1);
          return h('div', { className: 'pdm-video-card', key: obj.url || i },
            h('div', { className: 'pdm-video-lbl' }, '▶  ' + label),
            h('iframe', {
              src: obj.url, title: label, loading: 'lazy',
              allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowFullScreen: true
            })
          );
        })
      ) : null,

      images.length ? h('div', { className: 'pdm-gallery-wrap' },
        h('div', { className: 'pdm-gallery' },
          images.map(function (img, i) {
            var alt = 'Screenshot ' + (i + 1);
            return h('img', {
              key: img + i, src: img, alt: alt,
              className: 'pdm-gallery-img', loading: 'lazy',
              onClick: function () { onImage(img, alt); }
            });
          })
        )
      ) : null
    );
  }

  /* ── Single work entry ───────────────────────────── */
  function WorkEntry(props) {
    var entry   = props.entry;
    var num     = props.num;
    var onImage = props.onImage;
    var images  = Array.isArray(entry.images) ? entry.images : [];

    return h('article', { className: 'pdm-work-entry' },
      h('div', { className: 'pdm-work-num' }, num),
      h('div', { className: 'pdm-work-title' }, entry.title || ''),
      h('p',   { className: 'pdm-work-desc'  }, entry.description || ''),
      images.length
        ? h('div', { className: 'pdm-work-imgs' },
            images.map(function (img, i) {
              var alt = (entry.title || 'Work') + ' ' + (i + 1);
              return h('img', {
                key: img + i, src: img, alt: alt,
                className: 'pdm-work-img', loading: 'lazy',
                onClick: function () { onImage(img, alt); }
              });
            })
          )
        : null
    );
  }

  /* ── My Work section ─────────────────────────────── */
  function MyWorkSection(props) {
    var list    = props.myWork  || [];
    var onImage = props.onImage;

    return h('section', { id: 'pdm-work' },
      h(SecHdr, { num: '03', label: 'My Work on This Project' }),
      h('div', { className: 'pdm-work-list' },
        list.map(function (entry, i) {
          var n = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
          return h(WorkEntry, { key: (entry.title || '') + i,
                                entry: entry, num: n, onImage: onImage });
        })
      )
    );
  }

  /* ── Sidebar ─────────────────────────────────────── */
  function Sidebar(props) {
    var p        = props.project;
    var activeId = props.activeId;
    var onNav    = props.onNav;

    var sections = [
      { id: 'pdm-about', label: 'About'   },
      { id: 'pdm-media', label: 'Media'   },
      { id: 'pdm-work',  label: 'My Work' }
    ];

    return h('aside', { className: 'pdm-sidebar' },

      /* CTA */
      p.cta && p.cta.url
        ? h('div', { className: 'pdm-sb-block' },
            h('a', { className: 'pdm-cta', href: p.cta.url,
                     target: '_blank', rel: 'noopener noreferrer' },
              p.cta.label || 'View Project',
              h('span', { className: 'pdm-cta-arrow' }, '↗')
            )
          )
        : null,

      /* Technologies */
      p.technologies && p.technologies.length
        ? h('div', { className: 'pdm-sb-block' },
            h('span', { className: 'pdm-sb-label' }, 'Technologies'),
            h('div', { className: 'pdm-tech-wrap' },
              p.technologies.map(function (t) {
                return h('span', { key: t, className: 'pdm-tech' }, t);
              })
            )
          )
        : null,

      /* Key Features */
      p.features && p.features.length
        ? h('div', { className: 'pdm-sb-block' },
            h('span', { className: 'pdm-sb-label' }, 'Key Features'),
            h('ul', { className: 'pdm-feat-list' },
              p.features.map(function (f, i) {
                return h('li', { key: f + i }, f);
              })
            )
          )
        : null,

      /* Contents nav */
      h('div', { className: 'pdm-sb-block pdm-nav-wrap' },
        h('span', { className: 'pdm-sb-label' }, 'Contents Nav'),
        h('nav', { className: 'pdm-nav' },
          sections.map(function (s) {
            return h('button', {
              key: s.id,
              type: 'button',
              className: 'pdm-nav-link' + (activeId === s.id ? ' pdm-active' : ''),
              onClick: function (ev) { ev.preventDefault(); onNav(s.id); }
            },
              h('span', { className: 'pdm-nav-dot' }),
              s.label
            );
          })
        )
      )
    );
  }

  /* ── Modal header ────────────────────────────────── */
  function ModalHeader(props) {
    var p = props.project;
    return h('div', { className: 'pdm-hdr' },
      h('div', { className: 'pdm-hdr-row' },
        h('div', { style: { flex: 1, minWidth: 0 } },
          h('div', { className: 'pdm-tags' },
            (p.tags || []).map(function (t) {
              return h('span', { key: t, className: 'pdm-tag' }, t);
            })
          ),
          h('h2', { className: 'pdm-title'    }, p.title),
          h('p',  { className: 'pdm-subtitle' }, p.description)
        ),
        h('button', { className: 'pdm-close', onClick: props.onClose,
                      'aria-label': 'Close modal' }, '✕')
      )
    );
  }

  /* ── Root modal ──────────────────────────────────── */
  function ProjectModal(props) {
    var p       = props.project;
    var onClose = props.onClose;

    var lbS      = useState(null);
    var lightbox = lbS[0]; var setLb = lbS[1];

    var actS     = useState('pdm-about');
    var activeId = actS[0]; var setActive = actS[1];

    var openLb  = useCallback(function (src, alt) { setLb({ src: src, alt: alt || '' }); }, []);
    var closeLb = useCallback(function () { setLb(null); }, []);

    /* scroll-spy: watch sections within the overlay scroll container */
    useEffect(function () {
      var overlay = document.getElementById('modal-overlay');
      var ids     = ['pdm-about', 'pdm-media', 'pdm-work'];
      var obs     = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) setActive(en.target.id);
        });
      }, { threshold: 0.3, root: overlay });

      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) obs.observe(el);
      });
      return function () { obs.disconnect(); };
    }, [p]);

    function scrollTo(id) {
      var el      = document.getElementById(id);
      var overlay = document.getElementById('modal-overlay');
      if (!el || !overlay) return;
      var relTop = el.getBoundingClientRect().top
                 - overlay.getBoundingClientRect().top
                 + overlay.scrollTop - 12;
      overlay.scrollTo({ top: relTop, behavior: 'smooth' });
    }

    return h('div', { className: 'pdm-shell' },
      h(ModalHeader, { project: p, onClose: onClose }),
      h('div', { className: 'pdm-body' },
        h(Sidebar, { project: p, activeId: activeId, onNav: scrollTo }),
        h('main', { className: 'pdm-main' },
          h(AboutSection,  { about:  p.about  }),
          h(MediaSection,  { media:  p.media,  onImage: openLb }),
          h(MyWorkSection, { myWork: p.myWork, onImage: openLb })
        )
      ),
      lightbox ? h(Lightbox, { src: lightbox.src, alt: lightbox.alt, onClose: closeLb }) : null
    );
  }

  /* ── App (state owner) ───────────────────────────── */
  function App() {
    var ps = useState(null);
    var project = ps[0]; var setProject = ps[1];

    useEffect(function () {
      window.ProjectDetailsModal = {
        open:  function (base) {
          var detail = detailMap[String(base.id)] || {};
          setProject(normalize(base, detail));
        },
        close: function () { setProject(null); }
      };
    }, []);

    function handleClose() {
      if (typeof window.closeModal === 'function') window.closeModal();
      else setProject(null);
    }

    return project ? h(ProjectModal, { project: project, onClose: handleClose }) : null;
  }

  /* ── Bootstrap ───────────────────────────────────── */
  function mount() {
    var el = document.getElementById('project-modal-content');
    if (!el) return;
    ReactDOM.createRoot(el).render(h(App));
  }

  fetch('data/project-details.json')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (data) {
      (Array.isArray(data) ? data : [data]).forEach(function (item) {
        if (item && item.id != null) detailMap[String(item.id)] = item;
      });
    })
    .catch(function () {})
    .finally(mount);
})();
