import Position from '../models/positionModel';
import _ from 'lodash';

export const listPosition = (req, res) => {
  Position.find()
    .sort({
      updatedAt: -1,
    })
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ Error: err });
      }
      return res.status(200).json({ data });
    });
};

export const positionId = (req, res, next, id) => {
  Position.findById(id).exec((err, data) => {
    if (err) {
      return res.status(500).json({ Error: err });
    }
    req.position = data;
    next();
  });
};

export const readPosition = (req, res) => {
  return res.json(req.position);
};

export const removePositions = (req, res) => {
  let position = req.position;
  position.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: 'delete position failure',
      });
    }
    res.json({
      message: 'Delete position successfully',
    });
  });
};

export const createPosition = (req, res) => {
  const position = new Position(req.body);
  position.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Create position successfully',
    });
  });
};

export const updatePosition = (req, res) => {
  let position = req.position;
  position = _.assignIn(position, req.body);

  position.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: 'Update position successfully',
    });
  });
};

export const searchPosition = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : '';
  Position.find({
    position_name: {
      $regex: `${name}`,
      $options: '$i',
    },
  })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: 'Position not found',
        });
      }
      res.json({ data });
    });
};
