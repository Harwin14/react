var express = require('express');
var router = express.Router();
var models = require('../models')
var { Response } = require('../helpers/util')
const { Op } = require('sequelize')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const { name, phone } = req.query

    if (name && phone) {
      const users = await models.User.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${name}%`
              }
            },
            {
              phone: {
                [Op.iLike]: `%${phone}%`
              }
            }
          ]
        },
        order: [
          ['name', 'ASC']
        ]
      })

      res.json(new Response(users))

    } else if (name) {
      const users = await models.User.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: `%${name}%`
              }
            }
          ]
        },
        order: [
          ['name', 'ASC']
        ]
      })

      res.json(new Response(users))
    } else if (phone) {
      const users = await models.User.findAll({
        where: {
          [Op.and]: [
            {
              phone: {
                [Op.iLike]: `%${phone}%`
              }
            }
          ]
        },
        order: [
          ['name', 'ASC']
        ]
      })

      res.json(new Response(users))

    } else {
      const users = await models.User.findAll({
        order: [
          ['name', 'ASC']
        ]
      })

      res.json(new Response(users))
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const user = await models.User.create(req.body)
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const user = await models.User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(user[1]))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
}); 

module.exports = router;
