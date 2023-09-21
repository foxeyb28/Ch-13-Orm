const router = require('express').Router();
const { Category, Product } = require('../../models');
// do all of these 9/9/23
// The `/api/categories` endpoint

router.get('/:id', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{seeds: Product}],
  });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const catergoryData = await catergoryData.findByPk(req.params.id, {
    include: [{ model : Product}],
  });
  if (catergoryData) {
    res.status(404).json({ message: 'no product found with that id!'});
    return;
  }
  res.status(200).json(catergoryData);
}catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const socksData = await catergoryData.create({
      product_id: Product.body.product_id,
    });
    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(400),json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
