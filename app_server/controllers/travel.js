// Controller function for the travel page
// Renders the travel view with a title
const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways' });
};

// Export controller for route usage
module.exports = {
  travel
};