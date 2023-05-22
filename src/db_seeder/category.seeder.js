const { ObjectId } = require('bson');

function getBaseCategory() {
  return [
    {
      _id: new ObjectId(),
      name: 'Dance',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778876/development/categoryImages/fgfvpkjxu1uvuxyhcdru.gif',
      imagePublicId: 'development/categoryImages/fgfvpkjxu1uvuxyhcdru'
    },
    {
      _id: new ObjectId(),
      name: 'OMG',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778805/development/categoryImages/w4ziqizilk5keywg4put.gif',
      imagePublicId: 'development/categoryImages/w4ziqizilk5keywg4put'
    },
    {
      _id: new ObjectId(),
      name: 'Crazy',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778940/development/categoryImages/jddosibpozxincabc0hs.gif',
      imagePublicId: 'development/categoryImages/jddosibpozxincabc0hs'
    },
    {
      _id: new ObjectId(),
      name: 'Love',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779023/development/categoryImages/tmnb1g6cryibynw00hw1.gif',
      imagePublicId: 'development/categoryImages/tmnb1g6cryibynw00hw1'
    },
    {
      _id: new ObjectId(),
      name: 'Angry',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779318/development/categoryImages/rkfdnbmorktxl3vb2whc.gif',
      imagePublicId: 'development/categoryImages/rkfdnbmorktxl3vb2whc'
    },
    {
      _id: new ObjectId(),
      name: 'Why',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779375/development/categoryImages/va3u4s6iyzgpvykrnbni.gif',
      imagePublicId: 'development/categoryImages/va3u4s6iyzgpvykrnbni'
    },
    {
      _id: new ObjectId(),
      name: 'Wow',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779111/development/categoryImages/rrpsjnzbipsjpqm9f7xo.gif',
      imagePublicId: 'development/categoryImages/rrpsjnzbipsjpqm9f7xo'
    },
    {
      _id: new ObjectId(),
      name: 'Stressed',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779256/development/categoryImages/xtvznbpeijpiyozvxwlc.gif',
      imagePublicId: 'development/categoryImages/xtvznbpeijpiyozvxwlc'
    },
    {
      _id: new ObjectId(),
      name: 'Others',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779433/development/categoryImages/dbqi5c7j8dx6sy3enh1a.gif',
      imagePublicId: 'development/categoryImages/dbqi5c7j8dx6sy3enh1a'
    }
  ]
}

module.exports = {
  getBaseCategory
}