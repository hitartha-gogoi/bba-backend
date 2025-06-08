import { ExecutiveCommittee } from "../models/executive-committe.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await ExecutiveCommittee.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;

  if (!link) {
    return res.status(400).json({ error: "Link is required." });
  }

  try {
    const updated = await ExecutiveCommittee.findByIdAndUpdate(
      id,
      { $set: { name: name || "", link } }, // name optional, defaults to empty string if not provided
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};