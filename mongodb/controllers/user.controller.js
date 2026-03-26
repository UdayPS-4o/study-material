/**
 * ============================================================
 * MONGOOSE CONCEPTS DEMONSTRATED IN THIS FILE:
 *  1. Model.create()          - Create a single document
 *  2. Model.find()            - Read all / with filters
 *  3. Model.findById()        - Read by ID
 *  4. Model.findByIdAndUpdate()- Update by ID (returns new doc)
 *  5. Model.findByIdAndDelete()- Delete by ID
 *  6. Query Modifiers         - .select(), .sort(), .limit(), .skip()
 *  7. Counting                - Model.countDocuments()
 *  8. Static Methods Usage    - findByRole, getTopScorers
 *  9. Instance Methods Usage  - greet, addSkill
 * 10. Virtuals                - accessing computed fields
 * ============================================================
 */

const User = require("../models/user.model");

// ─────────────────────────────────────────────
// CREATE — POST /api/users
// ─────────────────────────────────────────────
// mongoose.model.create(data) is shorthand for:
//   const doc = new User(data); await doc.save();
const createUser = async (req, res) => {
  try {
    // CONCEPT: new Model(data) + save() OR Model.create(data)
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
      // Show virtual field
      virtualProfile: user.profile,
      // Show instance method
      greeting: user.greet(),
    });
  } catch (err) {
    // Mongoose ValidationError has a structured `errors` object
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    // Duplicate key error (unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// READ ALL — GET /api/users
// ─────────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const { role, isActive, sort = "-createdAt", limit = 20, skip = 0, search } = req.query;

    // CONCEPT: Building a query filter object dynamically
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) filter.name = { $regex: search, $options: "i" }; // $regex: case-insensitive search

    // CONCEPT: Chaining query modifiers
    // .find(filter)  → returns a Query object
    // .select(fields) → include/exclude fields (prefix - to exclude)
    // .sort(field)   → 1 = asc, -1 = desc (prefix - for desc)
    // .skip(n)       → skip n documents (for pagination)
    // .limit(n)      → max n documents returned
    const users = await User.find(filter)
      .select("-__v")               // Exclude __v field
      .sort(sort)                   // Sort by field
      .skip(Number(skip))
      .limit(Number(limit));

    // CONCEPT: countDocuments() for total count (pagination)
    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      total,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// READ ONE — GET /api/users/:id
// ─────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    // CONCEPT: findById(id) is shorthand for findOne({ _id: id })
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
      virtualProfile: user.profile,   // Virtual field
      greeting: user.greet(),          // Instance method
    });
  } catch (err) {
    // Invalid ObjectId format throws CastError
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// UPDATE — PUT /api/users/:id
// ─────────────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    // CONCEPT: findByIdAndUpdate(id, update, options)
    // { new: true }            → return the UPDATED document (not the old one)
    // { runValidators: true }  → run schema validators on update
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated", data: user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// ADD SKILL — PATCH /api/users/:id/skills
// ─────────────────────────────────────────────
// Demonstrates instance method usage
const addSkill = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // CONCEPT: Calling an instance method on a document
    await user.addSkill(req.body.skill);

    res.json({ success: true, message: "Skill added", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// DELETE — DELETE /api/users/:id
// ─────────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    // CONCEPT: findByIdAndDelete removes the document and returns it
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted", data: user });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// STATIC METHODS — GET /api/users/top-scorers
// ─────────────────────────────────────────────
const getTopScorers = async (req, res) => {
  try {
    // CONCEPT: Calling a static method on the Model
    const users = await User.getTopScorers(Number(req.query.limit) || 5);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// BULK CREATE — POST /api/users/bulk
// ─────────────────────────────────────────────
const bulkCreate = async (req, res) => {
  try {
    // CONCEPT: Model.insertMany() for bulk insert
    // ordered: false → continues even if some fail
    const users = await User.insertMany(req.body, { ordered: false });
    res.status(201).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// STATS — GET /api/users/stats
// ─────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    // CONCEPT: MongoDB Aggregation Pipeline via Mongoose
    // $group, $avg, $sum, $max, $min are MongoDB aggregation operators
    const stats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          avgScore: { $avg: "$score" },
          maxScore: { $max: "$score" },
          avgAge: { $avg: "$age" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const total = await User.countDocuments();
    const active = await User.countDocuments({ isActive: true });

    res.json({ success: true, total, active, byRole: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addSkill,
  getTopScorers,
  bulkCreate,
  getStats,
};
