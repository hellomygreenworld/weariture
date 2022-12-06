const express = require("express");
const Review = require("../models/review");
const router = express.Router();

router.get("/", async (req, res) => {
	const review = await Review.findAll({});
	res.render("review", { review });
});

router.get("/write", async(req, res) => {
	const review = await Review.findAll({});
	res.render("review_write", { review });
})

router.post("/write", async(req, res) => {
	let review = await Review;
	review.create({
		pro_name: req.body.pro_name,
		tit: req.body.review_content,
		cate: req.body.cate,
		cus_name: req.body.cus_name,
		re_date: 'test',
		view: 0,
		rec: 0,
		rate: req.body.rate
	})
	.then(function(createReviewRecord) {
		// TODO review 페이지 다시 렌더링
		review = Review.findAll({});
		console.log(review);
		res.render('review', { review });
	});

})

module.exports = router;