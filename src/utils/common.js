export const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                return position
            },
            (err) => {
                return 'error'
            }
        );
    } else {
        return 'BrowserNotSupport'
    }
};