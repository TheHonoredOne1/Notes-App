
exports.homepage = async (req, res) => {
    const locals = {
        title: 'NodeJs Notes',
        description: 'Free NodeJs Notes app.'
    }
    res.render('index', {
        locals, 
        layout: '../views/layouts/front-page'
    })
}

exports.about = async (req, res) => {
    const locals = {
        title: 'About Page',
        description: 'Info About Page',
    }
    res.render('about', locals)
}
