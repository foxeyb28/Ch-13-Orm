const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// do all of these 9/9/23
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
  const TagData = await Tag.findAll({
    
  });
  res.status(200).json(TagData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log(req.body);
  try {
    const TagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!TagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
