(function () {
  "use strict";

  var React = window.React;
  var ReactDOM = window.ReactDOM;

  if (!React || !ReactDOM) {
    return;
  }

  var e = React.createElement;
  var detailMap = {};

  function normalizeDetails(details, baseProject) {
    var merged = Object.assign({}, baseProject || {}, details || {});
    merged.title = merged.title || merged.name || "Project";
    merged.tags = Array.isArray(merged.tags) && merged.tags.length ? merged.tags : (baseProject && baseProject.platforms) || [];
    merged.description = merged.description || merged.desc || "";
    merged.about = merged.about || merged.description || "";

    if (!merged.cta && merged.link) {
      merged.cta = { label: "View Project", url: merged.link };
    }

    merged.technologies = Array.isArray(merged.technologies) && merged.technologies.length
      ? merged.technologies
      : (baseProject && baseProject.techs) || [];

    merged.features = Array.isArray(merged.features) ? merged.features : [];

    var media = merged.media || {};
    var baseVideos = Array.isArray(baseProject && baseProject.videos) ? baseProject.videos : [];
    var baseImages = [];
    if (baseProject && baseProject.cover) {
      baseImages.push(baseProject.cover);
    }

    var videos = Array.isArray(media.videos) ? media.videos.slice() : [];
    if (!videos.length && baseVideos.length) {
      videos = baseVideos.map(function (url) {
        return { type: "video", url: url };
      });
    }

    var images = Array.isArray(media.images) ? media.images.slice() : [];
    if (!images.length && baseImages.length) {
      images = baseImages;
    }

    merged.media = {
      videos: videos,
      images: images
    };

    if (!Array.isArray(merged.myWork) || !merged.myWork.length) {
      var firstFeature = merged.features[0] || "Core gameplay implementation and iteration.";
      var secondFeature = merged.features[1] || "Production support, optimization, and release prep.";
      var defaultImages = images.length ? images.slice(0, 2) : baseImages;
      merged.myWork = [
        {
          title: "System Design & Implementation",
          description: firstFeature,
          images: defaultImages
        },
        {
          title: "Gameplay Delivery",
          description: secondFeature,
          images: defaultImages
        }
      ];
    }

    return merged;
  }

  function chip(text, className) {
    return e("span", { className: className || "pd-chip", key: text }, text);
  }

  function SectionNav(props) {
    var sections = props.sections || [];
    return e(
      "nav",
      { className: "pd-section-nav", "aria-label": "Project sections" },
      sections.map(function (s) {
        return e("a", { key: s.id, href: "#" + s.id }, s.label);
      })
    );
  }

  function MediaBlock(props) {
    var media = props.media || { videos: [], images: [] };
    var videos = Array.isArray(media.videos) ? media.videos : [];
    var images = Array.isArray(media.images) ? media.images : [];

    return e(
      "section",
      { id: "pd-media", className: "pd-main-section" },
      e("h3", null, "Media"),
      videos.length
        ? e(
            "div",
            { className: "pd-video-grid" },
            videos.map(function (video, idx) {
              var v = typeof video === "string" ? { type: "video", url: video } : video;
              var title = (v.type || "video") + " " + (idx + 1);
              return e(
                "div",
                { className: "pd-video-card", key: v.url || idx },
                e("div", { className: "pd-video-label" }, title.toUpperCase()),
                e("iframe", {
                  src: v.url,
                  title: title,
                  loading: "lazy",
                  allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true
                })
              );
            })
          )
        : null,
      images.length
        ? e(
            "div",
            { className: "pd-image-grid" },
            images.map(function (img, idx) {
              return e("img", {
                key: img + idx,
                src: img,
                alt: "Project media " + (idx + 1),
                loading: "lazy"
              });
            })
          )
        : null
    );
  }

  function WorkEntry(props) {
    var entry = props.entry;
    var images = Array.isArray(entry.images) ? entry.images : [];

    return e(
      "article",
      { className: "pd-work-entry" },
      e("h4", null, entry.title || "Work Item"),
      e("p", null, entry.description || ""),
      images.length
        ? e(
            "div",
            { className: "pd-work-grid" },
            images.map(function (img, idx) {
              return e("img", {
                key: img + idx,
                src: img,
                alt: (entry.title || "Work") + " image " + (idx + 1),
                loading: "lazy"
              });
            })
          )
        : null
    );
  }

  function ProjectDetailsModal(props) {
    var project = props.project;
    if (!project) {
      return null;
    }

    var sections = [
      { id: "pd-about", label: "About" },
      { id: "pd-media", label: "Media" },
      { id: "pd-work", label: "My Work" }
    ];

    return e(
      React.Fragment,
      null,
      e(
        "header",
        { className: "pd-header" },
        e("div", { className: "pd-tags" }, (project.tags || []).map(function (tag) { return chip(tag, "pd-chip pd-chip-tag"); })),
        e("h2", { className: "pd-title" }, project.title),
        e("p", { className: "pd-subtitle" }, project.description || "")
      ),
      e(
        "div",
        { className: "pd-layout" },
        e(
          "aside",
          { className: "pd-sidebar" },
          project.cta && project.cta.url
            ? e(
                "a",
                {
                  className: "pd-cta",
                  href: project.cta.url,
                  target: "_blank",
                  rel: "noopener noreferrer"
                },
                project.cta.label || "Open"
              )
            : null,
          e("h5", null, "Technologies"),
          e("div", { className: "pd-chip-wrap" }, (project.technologies || []).map(function (tech) { return chip(tech); })),
          e("h5", null, "Key Features"),
          e(
            "ul",
            { className: "pd-list" },
            (project.features || []).map(function (f, idx) {
              return e("li", { key: f + idx }, f);
            })
          ),
          e("h5", null, "Sections"),
          e(SectionNav, { sections: sections })
        ),
        e(
          "main",
          { className: "pd-main" },
          e(
            "section",
            { id: "pd-about", className: "pd-main-section" },
            e("h3", null, "About"),
            e("p", null, project.about || "")
          ),
          e(MediaBlock, { media: project.media }),
          e(
            "section",
            { id: "pd-work", className: "pd-main-section" },
            e("h3", null, "My Work"),
            (project.myWork || []).map(function (entry, idx) {
              return e(WorkEntry, { key: (entry.title || "work") + idx, entry: entry });
            })
          )
        )
      )
    );
  }

  function mountProjectModal() {
    var modalBody = document.getElementById("project-modal-content");
    if (!modalBody) {
      return;
    }

    var modalRoot = ReactDOM.createRoot(modalBody);

    function App() {
      var state = React.useState(null);
      var currentProject = state[0];
      var setCurrentProject = state[1];

      React.useEffect(function () {
        window.ProjectDetailsModal = {
          open: function (baseProject) {
            var details = detailMap[String(baseProject.id)] || {};
            setCurrentProject(normalizeDetails(details, baseProject));
          },
          close: function () {
            setCurrentProject(null);
          }
        };
      }, []);

      return e(ProjectDetailsModal, { project: currentProject });
    }

    modalRoot.render(e(App));
  }

  function loadDetailsAndMount() {
    fetch("data/project-details.json")
      .then(function (res) {
        return res.ok ? res.json() : [];
      })
      .then(function (data) {
        var list = Array.isArray(data) ? data : [data];
        list.forEach(function (item) {
          if (item && item.id != null) {
            detailMap[String(item.id)] = item;
          }
        });
      })
      .catch(function () {
        detailMap = {};
      })
      .finally(function () {
        mountProjectModal();
      });
  }

  loadDetailsAndMount();
})();

