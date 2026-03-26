/**
 * ============================================================
 * MONGOOSE CONCEPT: Separating Routes from Controllers
 * ============================================================
 * Express Router groups related endpoints.
 * Each route delegates logic to a controller function.
 */

const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addSkill,
  getTopScorers,
  bulkCreate,
  getStats,
} = require("../controllers/user.controller");

// ── Special routes BEFORE :id routes to avoid conflicts ──
router.get("/stats", getStats);
router.get("/top-scorers", getTopScorers);
router.post("/bulk", bulkCreate);

// ── CRUD Routes ──
router.route("/")
  .get(getAllUsers)     // GET    /api/users         → Read all
  .post(createUser);   // POST   /api/users         → Create one

router.route("/:id")
  .get(getUserById)    // GET    /api/users/:id     → Read one
  .put(updateUser)     // PUT    /api/users/:id     → Update one
  .delete(deleteUser); // DELETE /api/users/:id     → Delete one

// ── Nested action route ──
router.patch("/:id/skills", addSkill); // PATCH /api/users/:id/skills → Add skill

module.exports = router;
