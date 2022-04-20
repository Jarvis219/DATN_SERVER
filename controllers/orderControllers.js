import Order from "../models/orderModel";

export const list = (req, res) => {
  Order.find()
    .sort({
      updatedAt: -1,
    })
    .populate("user", "_id name email")
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(data);
    });
};

export const orderByUser = (req, res) => {
  Order.find({ user: req.user._id }, (err, orders) => {
    if (err) {
      res.status(400).json({
        error: "Orders not found",
      });
    }
    res.json(orders);
  });
};

export const create = (req, res) => {
  const order = new Order(req.body);
  order.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Add order failed",
      });
    }
    res.json(data);
  });
};

export const orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      res.status(404).json({
        error: "Không tìm thấy đơn hàng!",
      });
    }
    req.order = order;
    next();
  });
};

export const read = (req, res) => {
  return res.json(req.order);
};

export const remove = (req, res) => {
  let order = req.order;
  order.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Không xoá được đơn hàng!",
      });
    }
    res.json({
      data,
      message: "Xoá đơn hàng thành công",
    });
  });
};

export const update = async (req, res) => {
  let order = req.order;
  order.status = req.body.status;

  try {
    const dataOrder = await order.save();
    const data = await dataOrder.populate("user", "_id name email");
    return res.status(200).json({
      message: "Update successfully!",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Update failed!",
    });
  }
};
