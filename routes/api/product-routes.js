const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
// focus on the get 1 and get all and the delete one (9/9/23)
// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
  const productData = await Product.findAll({
    
  });
  res.status(200).json(productData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  // const body = {
  //   post: req.body.post,
  //   created: new Product()};
  Product.create(req.body) 
    // {
    //   product_name: "Basketball",
    //   price: 200.00,
    //   stock: 3,
    //   tagIds: [1, 2, 3, 4]
    // },
  
  .then((product) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagArr);
    }
    // if no product tags, just respond
    res.status(200).json(product);
  })
  .then((ProductTagIds) => res.status(200).json(ProductTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  },
),

  // update product
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
                  // run both actions
                  // run both actions
                  // const productTagsToRemove = productTags
                  // .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                  // .map(({ id }) => id);
          return Promise.all([
           // ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const ProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!ProductData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
