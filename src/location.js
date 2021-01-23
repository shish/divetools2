const locationWatcher = (dispatch, props) => {
  function onLocationChanged() {
    dispatch.bind(null, props.action)(window.location.pathname);
  }

  const push = window.history.pushState;
  const replace = window.history.replaceState;
  window.history.pushState = function(data, title, url) {
    push.call(this, data, title, url);
    onLocationChanged();
  };
  window.history.replaceState = function(data, title, url) {
    replace.call(this, data, title, url);
    onLocationChanged();
  };
  window.addEventListener("popstate", onLocationChanged);

  return () => {
    window.history.pushState = push;
    window.history.replaceState = replace;
    window.removeEventListener("popstate", onLocationChanged);
  };
};

export function WatchLocation(props) {
  return [locationWatcher, props];
}

export function PushLocation(dispatch, href) {
  window.history.pushState(null, "", href);
}

export function AnchorHandler(state, event) {
  event.preventDefault();
  return [{...state}, [PushLocation, event.currentTarget.getAttribute("href")]];
}
