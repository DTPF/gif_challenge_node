const { ObjectId } = require('bson');

function getBaseCategory() {
  return [
    {
      _id: new ObjectId(),
      name: 'Dance',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778876/dagif/categoryImages/fgfvpkjxu1uvuxyhcdru.gif',
      imagePublicId: 'development/categoryImages/fgfvpkjxu1uvuxyhcdru'
    },
    {
      _id: new ObjectId(),
      name: 'OMG',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778805/dagif/categoryImages/w4ziqizilk5keywg4put.gif',
      imagePublicId: 'development/categoryImages/w4ziqizilk5keywg4put'
    },
    {
      _id: new ObjectId(),
      name: 'Crazy',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684778940/dagif/categoryImages/jddosibpozxincabc0hs.gif',
      imagePublicId: 'development/categoryImages/jddosibpozxincabc0hs'
    },
    {
      _id: new ObjectId(),
      name: 'Love',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779023/dagif/categoryImages/tmnb1g6cryibynw00hw1.gif',
      imagePublicId: 'development/categoryImages/tmnb1g6cryibynw00hw1'
    },
    {
      _id: new ObjectId(),
      name: 'Angry',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779318/dagif/categoryImages/rkfdnbmorktxl3vb2whc.gif',
      imagePublicId: 'development/categoryImages/rkfdnbmorktxl3vb2whc'
    },
    {
      _id: new ObjectId(),
      name: 'Why',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779375/dagif/categoryImages/va3u4s6iyzgpvykrnbni.gif',
      imagePublicId: 'development/categoryImages/va3u4s6iyzgpvykrnbni'
    },
    {
      _id: new ObjectId(),
      name: 'Wow',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779111/dagif/categoryImages/rrpsjnzbipsjpqm9f7xo.gif',
      imagePublicId: 'development/categoryImages/rrpsjnzbipsjpqm9f7xo'
    },
    {
      _id: new ObjectId(),
      name: 'Stressed',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779256/dagif/categoryImages/xtvznbpeijpiyozvxwlc.gif',
      imagePublicId: 'development/categoryImages/xtvznbpeijpiyozvxwlc'
    },
    {
      _id: new ObjectId(),
      name: 'Annoyed',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684940380/dagif/categoryImages/zkzmtncs7k3zyhwn6yn9.gif',
      imagePublicId: 'development/categoryImages/zkzmtncs7k3zyhwn6yn9'
    },
    {
      _id: new ObjectId(),
      name: 'Smile',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684940484/dagif/categoryImages/qszb9d5flzej6aikjw1h.gif',
      imagePublicId: 'development/categoryImages/qszb9d5flzej6aikjw1h'
    },
    {
      _id: new ObjectId(),
      name: 'Ew',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684941244/dagif/categoryImages/f3iavxhsxgabyj7pkovm.gif',
      imagePublicId: 'development/categoryImages/f3iavxhsxgabyj7pkovm'
    },
    {
      _id: new ObjectId(),
      name: 'Surprised',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684941310/dagif/categoryImages/khzexwf13ojfiudzp6m1.gif',
      imagePublicId: 'development/categoryImages/khzexwf13ojfiudzp6m1'
    },
    {
      _id: new ObjectId(),
      name: 'Oops',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684941373/dagif/categoryImages/ocmp61zdtnu4hnzgtf83.gif',
      imagePublicId: 'development/categoryImages/ocmp61zdtnu4hnzgtf83'
    },
    {
      _id: new ObjectId(),
      name: 'Clapping',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684941421/dagif/categoryImages/k8mb7zw61vomr8xuosqy.gif',
      imagePublicId: 'development/categoryImages/k8mb7zw61vomr8xuosqy'
    },
    {
      _id: new ObjectId(),
      name: 'Embarassed',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684942366/dagif/categoryImages/vyv9wmwwzaxnzvw7ka8f.gif',
      imagePublicId: 'development/categoryImages/vyv9wmwwzaxnzvw7ka8f'
    },
    {
      _id: new ObjectId(),
      name: 'Others',
      imageUrl: 'https://res.cloudinary.com/da0fcwrip/image/upload/v1684779433/dagif/categoryImages/dbqi5c7j8dx6sy3enh1a.gif',
      imagePublicId: 'development/categoryImages/dbqi5c7j8dx6sy3enh1a'
    }
  ]
}

module.exports = {
  getBaseCategory
}