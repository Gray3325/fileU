const express = require('express');
const router = express.Router();
const pool = require("../utils/db");
const { checkLogin } = require('../middlewares/authMiddleware');

// GET /api/members
router.get('/', checkLogin, (req, res, next) => {
  // 能夠通過 checkLogin 中間件，表示一定一定有 req.session.member -> 一定是登入後
  res.json(req.session.member);
});
// GET /api/members/orders 使用者的訂單
router.get('/orders', checkLogin, async(req, res, next) => {
  // 能夠通過 checkLogin 中間件，表示一定一定有 req.session.member -> 一定是登入後
  // 安心地使用 req.session.member.id 去資料庫拿這個 id 的訂單
  let [data] = await pool.query("SELECT * FROM user_order WHERE users_id=?",[req.session.member.id]);
  res.json(data);
});

module.exports = router;
