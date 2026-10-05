const router = require("express").Router();
const { BookRead, BookWrite } = require("../models/book");

const MSSV = "23IT011";
const CODE_PREFIX = MSSV.slice(-3); // "011"
const VAT = Number(MSSV.slice(-1)) + 5; // 1 + 5 = 6 (%)

router.get("/", async (req, res, next) => {
  try {
    req.session.views = (req.session.views || 0) + 1; // session demo counter
    const books = await BookRead.find().sort({ createdAt: -1 }).lean(); // READ account
    res.render("books", {
      books,
      views: req.session.views,
      sid: req.sessionID,
      error: req.query.error,
      prefix: CODE_PREFIX,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/books", async (req, res, next) => {
  try {
    const code = (req.body.code || "").trim();
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price);

    // Personalized filter: reject if the code does not start with the last 3 digits of MSSV
    if (!code.startsWith(CODE_PREFIX)) {
      return res.redirect(
        "/?error=" +
          encodeURIComponent(
            `Rejected: product code must start with ${CODE_PREFIX}`,
          ),
      );
    }
    if (!name || Number.isNaN(price) || price < 0) {
      return res.redirect(
        "/?error=" + encodeURIComponent("Invalid name or price"),
      );
    }

    // Dynamic VAT calculation before saving
    const priceAfterTax = Math.round(price * (1 + VAT / 100) * 100) / 100;

    await BookWrite.create({ code, name, price, vat: VAT, priceAfterTax }); // WRITE account
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
