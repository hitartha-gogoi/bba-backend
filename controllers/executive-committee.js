import { ExecutiveCommittee } from "../models/executive-committe.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await ExecutiveCommittee.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const updated = await ExecutiveCommittee.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updatePhoto = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required." });
  }

  const imageUrl = req.file.path;

  try {
    const updated = await ExecutiveCommittee.findByIdAndUpdate(
      id,
      { link: imageUrl },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};