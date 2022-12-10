import Blog from "../models/blogModel";
import _ from "lodash";

export const listBlogs = (req, res) => {
	Blog.find()
		.sort({
			updatedAt: -1,
		})
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: "Blog not found!",
				});
			}
			res.status(200).json({ data });
		});
};

export const createBlog = (req, res) => {
	const blog = new Blog(req.body);
	blog.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Add Blog failed!",
			});
		}
		res.json({
			data,
			message: "Create Blog successfully",
		});
	});
};

export const blogId = (req, res, next, id) => {
	Blog.findById(id).exec((err, data) => {
		if (err) {
			return res.status(404).json({
				error: "Blog not found!",
			});
		}
		req.blog = data;
		next();
	});
};

export const readBlog = (req, res) => {
	return res.json(req.blog);
};

export const removeBlog = (req, res) => {
	let blog = req.blog;
	blog.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Delete Blog failed!",
			});
		}
		res.json({
			message: "Delete Blog successfully",
			data,
		});
	});
};

export const updateBlog = (req, res) => {
	let blog = req.blog;
	blog = _.assignIn(blog, req.body);
	blog.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Update Blog failed!",
			});
		}
		res.json({
			message: "Update Blog successfully",
			data,
		});
	});
};
