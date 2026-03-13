import API from "./api";

export const getPlacements = (token) => {
  return API.get("/placements", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createPlacement = (data, token) => {
  return API.post("/placements/create", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const applyPlacement = (id, token) => {
  return API.post(`/placements/apply/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const shortlistStudent = (placementId, studentId, token) => {
  return API.post(
    `/placements/shortlist/${placementId}`,
    { studentId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
