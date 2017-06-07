import fetch from 'isomorphic-fetch';

// action types
export const FETCH_USER_LOCATION = 'FETCH_USER_LOCATION';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR';

// action creators
export function fetchLocationSuccess(location) {
	return {
		type: FETCH_LOCATION_SUCCESS,
		location: {
			latitude: location.latitude,
			longitude: location.longitude
		}
	}
}

export function fetchLocationError(error) {
	return {
		type: FETCH_LOCATION_ERROR,
		error: error
	}
}

export function fetchUserLocation(repo) {
	return (dispatch) => {
		var options = {
			enableHighAccuracy: false,
			timeout: 15000,
			maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition((pos) => {
				var crd = pos.coords;
				console.log('Your current position is:');
				console.log(`Latitude : ${crd.latitude}`);
				console.log(`Longitude: ${crd.longitude}`);
				console.log(`More or less ${crd.accuracy} meters.`);
				dispatch(fetchLocationSuccess(crd));
			}, (err) => {
				// alert(`ERROR(${err.code}): ${err.message}`);
				dispatch(fetchLocationError(err.message));
			}, options
		);
	}
}

// Google Geolocation API Key: AIzaSyAAhPjB4nv3GV-alzYp6NlGN2dpnjSxHWI
