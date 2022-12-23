var express = require('express');
var router = express.Router();
var models = require('../models')
var { Response } = require('../helpers/util')
const { Op } = require('sequelize')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const { page, name, phone } = req.query
    const limit = 6
    const offset = (page - 1) * limit
    const total = await models.User.count()
    const pages = Math.ceil(total / limit)


    if (name && phone) {
      const users = await models.User.findAll({
        limit,
        offset,
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
          ['id', 'ASC']
        ]
      })

      res.json(new Response({
        users,
        page: Number(page),
        pages
      }))

    } else if (name) {
      const users = await models.User.findAll({
        limit,
        offset,
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
          ['id', 'ASC']
        ]
      })

     
      res.json(new Response({
        users,
        page: Number(page),
        pages
      }))
    } else if (phone) {
      const users = await models.User.findAll({
        limit,
        offset,
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
          ['id', 'ASC']
        ]
      })

      res.json(new Response({
        users,
        page: Number(page),
        pages
      }))

    } else {
      const users = await models.User.findAll({
        limit,
        offset,
        order: [
          ['id', 'ASC']
        ]
      })

  
      res.json(new Response({
        users,
        page: Number(page),
        pages
      }))
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
