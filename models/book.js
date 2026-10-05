const mongoose = require("mongoose");
const { readConn, writeConn } = require("../config/db");

const bookSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true },
    priceAfterTax: { type: Number, required: true },
  },
  { timestamps: true, autoIndex: false, autoCreate: false },
);

module.exports = {
  BookRead: readConn.model("Book", bookSchema, "books"), // READ account only
  BookWrite: writeConn.model("Book", bookSchema, "books"), // WRITE account only
};
