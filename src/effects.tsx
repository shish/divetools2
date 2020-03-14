function watchPositionEffect(dispatch, props) {
    console.log("Adding watch")
    var cancelId = navigator.geolocation.watchPosition(
        (result) => dispatch(props.success, result),
        (result) => dispatch(props.error, result),
        props.options
    );

    return function() {
        navigator.geolocation.clearWatch(cancelId);
    }
}

export function WatchPosition(props) {
    return [watchPositionEffect, props]
}