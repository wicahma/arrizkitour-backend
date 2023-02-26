const getAllPacket = (req, res) => {
  res.send("Get All Packet");
};

const getOnePacket = (req, res) => {
  res.send("Get All Packet");
};

const createNewPacket = (req, res) => {
  res.send("Create New Packet");
};

const updateOnePacket = (req, res) => {
  res.send("Update Packet");
};

const deleteOnePacket = (req, res) => {
  res.send("Delete Packet");
};

module.exports = {
  getAllPacket,
  getOnePacket,
  createNewPacket,
  updateOnePacket,
  deleteOnePacket,
};
