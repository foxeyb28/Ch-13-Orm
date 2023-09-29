const router = require('express').Router();
const { Category, Product } = require('../../models');
// do all of these 9/9/23
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({});
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const body = {
    post: req.body.post,
    created: new Category(),
  };
  Category.create(req.body)
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.status(200).json(newCategory);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await categoryData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200), json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  Category.destroy({
    where: {
      category_id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
