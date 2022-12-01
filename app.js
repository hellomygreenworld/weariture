const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const morgan= require('morgan');
const passport = require('passport');

dotenv.config();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const cookieParser = require("cookie-parser");

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	secret: process.env.COOKIE_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false,
	}
}));

// passport 미들웨어 등록
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('404.html');
})

app.listen(app.get('port'), (err) => {
	console.log(`The app is listening on port ${app.get('port')}`);
});