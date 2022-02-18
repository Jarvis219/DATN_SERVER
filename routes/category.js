import express from 'express';
import {
  listCategories,
  createCategory,
  categoryId,
  readCategory,
  removeCategory,
  updateCategory,
  listCategoriesRelated
} from '../controllers/categoryControllers';

const router = express.Router();

//Danh sách danh mục
router.get('/categories', listCategories);

//Chi tiết danh mục
router.get('/categories/:id', readCategory);

//Thêm mới danh mục
router.post('/categories', createCategory);

//Cập nhật danh mục
router.put('/categories/:id', updateCategory);

//Xoá danh mục
router.delete('/categories/:id', removeCategory);

//List Danh mục( ngoại trừ Danh mục hiện tại)
router.get('/categories/related/:id', listCategoriesRelated);

//Lấy param
router.param('id', categoryId);

module.exports = router;
