import Category from '../models/categoryModel'
import _ from 'lodash';

export const listCategories = (req, res) => {
  Category.find()
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          error: "Categories not found!"
        });
      }
      return res.status(200).json({ data });
    })
}

export const createCategory = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data)=>{
    if (err) {
      return res.status(400).json({
        error: "Add category failed!",
      });
    }
    res.json({
      data,
      message: 'Create category successfully',
    });
  })
}

export const categoryId =(req, res, next, id)=>{
  Category.findById(id).exec((err, data)=>{
    if (err) {
      return res.status(404).json({ 
        error: "Category not found!" 
      });
    }
    req.category = data;
    next();
  })
}

export const readCategory = (req, res) =>{
  return res.json(req.category)
}

export const removeCategory = (req, res) => {
  let category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Delete category failed!',
      });
    }
    res.json({
      message: 'Delete category successfully',
      data
    });
  });
};

export const updateCategory = (req, res) => {
  let category = req.category;
  category = _.assignIn(category, req.body);
  category.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: "Update category failed!"
          });
      }
      res.json({
        message: "Update category successfully",
        data
      });
  })
}

export const listCategoriesRelated = (req, res) => {
  Category.find({
      _id: { $ne: req.category }
  }).exec((err, data) => {
      if (err) {
          res.status(400).json({
              error: "Categories not found!"
          })
      }
      res.json({data})
  })
}

