const planetsAPI = async (URL) => {
  const request = await fetch(URL);
  const data = await request.json();
  const response = data.results.map((e) => {
    const obj = { ...e,
      rotationPeriod: e.rotation_period,
      orbitalPeriod: e.orbital_period,
      surfaceWater: e.surface_water };
    delete obj.residents;
    return response;
  });
};

export default planetsAPI;
