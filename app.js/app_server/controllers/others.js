
/* Get 'home' page*/

module.exports.about = function(res, req){
	res.render('index', {title: 'Express'})
};