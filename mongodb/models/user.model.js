/**
 * ============================================================
 * MONGOOSE CONCEPTS DEMONSTRATED IN THIS FILE:
 *  1. Schema          - Defining the shape of documents
 *  2. SchemaTypes     - String, Number, Date, Boolean, Array, ObjectId
 *  3. Validators      - required, min, max, enum, match, custom
 *  4. Defaults        - Default values for fields
 *  5. Virtual Fields  - Computed properties not stored in DB
 *  6. Instance Methods - Functions on document instances
 *  7. Static Methods  - Functions on the Model itself
 *  8. Middleware (Hooks) - pre/post save, find, etc.
 *  9. Indexes         - Unique, compound indexes
 * 10. Model           - Compiling schema into a usable model
 * ============================================================
 */

const mongoose = require("mongoose");

// ─────────────────────────────────────────────
// 1. ADDRESS SUB-SCHEMA (Nested / Embedded Doc)
// ─────────────────────────────────────────────
// Sub-schemas are nested schemas used inside a parent schema.
// They are EMBEDDED (not referenced) — stored in the same document.
const addressSchema = new mongoose.Schema({
  street: { type: String, trim: true },
  city:   { type: String, trim: true },
  state:  { type: String, trim: true },
  pincode: { type: String, match: [/^\d{6}$/, "Pincode must be 6 digits"] },
});

// ─────────────────────────────────────────────
// 2. MAIN USER SCHEMA
// ─────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    // ── String with validation ──
    name: {
      type: String,
      required: [true, "Name is required"],   // Custom error message
      trim: true,                              // Auto trims whitespace
      minlength: [2, "Name too short"],
      maxlength: [50, "Name too long"],
    },

    // ── Email with regex validation ──
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,           // Creates a unique index in MongoDB
      lowercase: true,        // Auto-converts to lowercase before saving
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    // ── Number with range ──
    age: {
      type: Number,
      min: [1, "Age must be at least 1"],
      max: [120, "Age must be at most 120"],
    },

    // ── Enum (restricted values) ──
    role: {
      type: String,
      enum: {
        values: ["student", "teacher", "admin"],
        message: "Role must be student, teacher, or admin",
      },
      default: "student",  // Default value
    },

    // ── Boolean with default ──
    isActive: {
      type: Boolean,
      default: true,
    },

    // ── Array of Strings ──
    skills: [String],

    // ── Nested Sub-Document ──
    address: addressSchema,

    // ── Number with custom validator ──
    score: {
      type: Number,
      default: 0,
      validate: {
        validator: (v) => v >= 0 && v <= 100,
        message: (props) => `${props.value} is not a valid score (0-100)`,
      },
    },

    // ── Date with default to now ──
    joinedAt: {
      type: Date,
      default: Date.now,
    },

    // ── Reference to another document (Population) ──
    // mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    // ── Schema Options ──
    timestamps: true,       // Auto adds createdAt and updatedAt fields
    versionKey: false,      // Removes __v field from documents
  }
);

// ─────────────────────────────────────────────
// 3. INDEXES
// ─────────────────────────────────────────────
// Indexes speed up query performance. Compound index on name + role.
userSchema.index({ name: 1, role: 1 });

// ─────────────────────────────────────────────
// 4. VIRTUAL FIELDS
// ─────────────────────────────────────────────
// Virtuals are computed properties that are NOT stored in MongoDB.
// They are derived from other fields on the fly.
userSchema.virtual("profile").get(function () {
  return `${this.name} (${this.role}) — Score: ${this.score}`;
});

// ─────────────────────────────────────────────
// 5. INSTANCE METHODS
// ─────────────────────────────────────────────
// Instance methods are available on every document (instance of Model).
// Use regular functions (not arrows) to access `this` (the document).

userSchema.methods.greet = function () {
  return `Hello, I am ${this.name} and I am a ${this.role}!`;
};

userSchema.methods.addSkill = async function (skill) {
  if (!this.skills.includes(skill)) {
    this.skills.push(skill);
    await this.save();
  }
  return this;
};

// ─────────────────────────────────────────────
// 6. STATIC METHODS
// ─────────────────────────────────────────────
// Static methods are called on the MODEL itself, not on instances.
// Useful for custom query helpers.

userSchema.statics.findByRole = function (role) {
  return this.find({ role });
};

userSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

userSchema.statics.getTopScorers = function (limit = 5) {
  return this.find().sort({ score: -1 }).limit(limit);
};

// ─────────────────────────────────────────────
// 7. MIDDLEWARE (HOOKS)
// ─────────────────────────────────────────────
// Middleware (also called hooks) intercept lifecycle events.
// 'pre' runs BEFORE the operation, 'post' runs AFTER.

// pre-save: runs before a document is saved
userSchema.pre("save", function (next) {
  console.log(`📝 [PRE-SAVE] Saving user: ${this.name}`);
  // Example: You could hash passwords here
  next(); // Must call next() to proceed
});

// post-save: runs after a document is saved
userSchema.post("save", function (doc) {
  console.log(`✅ [POST-SAVE] User saved with ID: ${doc._id}`);
});

// pre-find: runs before any find query
userSchema.pre(/^find/, function (next) {
  // `this` refers to the query object
  this._startTime = Date.now();
  next();
});

// post-find: runs after any find query
userSchema.post(/^find/, function (docs, next) {
  console.log(`🔍 [POST-FIND] Query took ${Date.now() - this._startTime}ms`);
  next();
});

// pre-deleteOne (document middleware)
userSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  console.log(`🗑️  [PRE-DELETE] Deleting user: ${this.name}`);
  next();
});

// ─────────────────────────────────────────────
// 8. MODEL COMPILATION
// ─────────────────────────────────────────────
// mongoose.model(ModelName, schema) compiles the schema into a Model.
// The Model is a class that lets you create/read/update/delete documents.
// Collection name is auto-pluralized: "User" → "users"
const User = mongoose.model("User", userSchema);

module.exports = User;
