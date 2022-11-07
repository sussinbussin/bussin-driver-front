import { TRACK_API_ROUTE } from "@env";
import ky from "ky";

const useTrackApi = () => {
  //login
  const api = ky.create({
    prefixUrl: TRACK_API_ROUTE,
  });

  const createTrack = async (form) => {
    let data = null;
    try {
      const res = await api.post("api/collections/track/records", {
        json: form,
      });
      data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  };

  const updateTrack = async (form, id) => {
    let data = null;
    try {
      const res = await api.patch(`api/collections/track/records/${id}`, {
        json: form,
      });
      data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  };

  const getTrack = async (id) => {
    let data = null;
    try {
      const res = await api.get(`api/collections/track/records/${id}`);
      data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  };
  const deleteTrack = async (id) => {
    let data = null;
    try {
      const res = await api.delete(`api/collections/track/records/${id}`);
      return res
    } catch (error) {
      console.error(error);
      return data;
    }
  };
  return { createTrack, updateTrack, getTrack, deleteTrack };
};

export { useTrackApi };
