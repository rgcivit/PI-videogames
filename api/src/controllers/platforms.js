const axios = require("axios");
const { Platform } = require("../db");
const { API_KEY } = process.env;

const getPlatforms = async (req, res) => {
  try {
    const platformsApi = await axios.get(
      `https://api.rawg.io/api/platforms?key=a64a7e278a3d4682952127f9def98439`
    );
     console.log(platformsApi, 'plataformsssss')
    const platforms = platformsApi.data.results;
    platforms.forEach(async (p) => {
      await Platform.findOrCreate({
        where: {
          name: p.name,
        },
      });
    });
    const platformsDb = await Platform.findAll();
    console.log(platformsDb, 'dbbbbb')
    res.status(200).json(platformsDb);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPlatforms,
};
