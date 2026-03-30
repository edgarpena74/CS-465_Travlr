// Controller function for the home page
// Renders the index view with a title
const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

// Export controller so routes can use it
module.exports = {
  index
};