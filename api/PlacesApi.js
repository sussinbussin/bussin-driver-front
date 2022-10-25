import { GOOGLE_API_KEY } from "@env";

const usePlacesAPI = (query) => {
  // Console log fix
  console.log()
  const findPlaces = async () => {
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    const res = await fetch(
      url +
        new URLSearchParams({
          input: query,
          key: GOOGLE_API_KEY,
          locationbias: "ipbias",
        })
    );
    const result = await res.json(); //todo: error checking
    return result;
  };

  const getGeometry = async () => {
    const url = "https://maps.googleapis.com/maps/api/place/details/json?";
    const res = await fetch(
      url +
        new URLSearchParams({
          place_id: query,
          key: GOOGLE_API_KEY,
          fields: "geometry",
        })
    );

    const result = await res.json();
    console.log("Get Geometry: " + JSON.stringify(result))
    return result.result.geometry.location;
  };
  return { findPlaces, getGeometry };
};

export { usePlacesAPI };
