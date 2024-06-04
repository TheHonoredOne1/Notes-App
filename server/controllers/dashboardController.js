

exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Free Node.js notes app.'
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    })
}