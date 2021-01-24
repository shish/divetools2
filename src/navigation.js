// pre-published version of @hyperapp/navigation
// https://github.com/jorgebucaran/hyperapp/blob/main/packages/navigation/index.js
const fx = (argsToProps, fx) => (...args) => [fx, argsToProps(args)]

export const pushUrl = fx(
  ([url]) => ({ url }),
  (_, { url }) => {
    history.pushState({}, "", url)
    dispatchEvent(new CustomEvent("hyperapp-pushstate"))
  }
)

export const onUrlChange = fx(
  ([action]) => ({ action }),
  (dispatch, { action }) => {
    const popstate = (_) => dispatch(action, location)

    addEventListener("popstate", popstate)
    addEventListener("hyperapp-pushstate", popstate)

    return () =>
      ["popstate", "hyperapp-pushstate"].map((e) =>
        removeEventListener(e, popstate)
      )
  }
)

export const onUrlRequest = fx(
  ([action]) => ({ action }),
  (dispatch, { action }) => {
    const clicks = (event) => {
      let target = event.target;
      while (target && !target.matches("a")) target = target.parentElement;
      if (
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        target
      ) {
        const href = target.getAttribute("href")
        if (!href.match(/^(http:|https:|mailto:|\/\/)/)) {
          event.preventDefault()
          dispatch(action, { pathname: href })  
        }
      }
    }
    addEventListener("click", clicks)
    return () => removeEventListener("click", clicks)
  }
)
