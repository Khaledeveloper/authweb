const Review = require('../../models/Review')
const User = require('../../models/Product')
const Product = require('../../models/Product')



const getRating = (productReviews) => {


    let revsCount = productReviews.length
    let rating = 0
    if (revsCount != 0) {
        let rev5 = productReviews.filter((rev) => rev.rate == 5).length
        let rev4 = productReviews.filter((rev) => rev.rate == 4).length * 0.8
        let rev3 = productReviews.filter((rev) => rev.rate == 3).length * 0.6
        let rev2 = productReviews.filter((rev) => rev.rate == 2).length * 0.4
        let rev1 = productReviews.filter((rev) => rev.rate == 1).length * 0.2


        let ratingCount = (rev5 + rev4 + rev3 + rev2 + rev1)
        rating = (ratingCount / revsCount) * 5


    }

    return rating
}


const productsWithRate = async () => {


    let products = await Product.find({})

    let productsWithRate = await Promise.all(products.map(async (product) => {
        const productReviews = await Review.find({ $and: [{ productID: product._id }, { active: true }] })
        const productRate = getRating(productReviews)

        return { ...product.toObject(), rate: productRate }
    }))

    return productsWithRate
}


const finalPrice = (product) => {



    let finalPrice = product.price
    let inPercentage = product.inPercentage
    let discountValue = product.discountValue
    const defaultDiscountValue = product.defaultDiscountValue


    let dateForm = new Date(product.discountStartsAt)
    let dateuntil = new Date(product.discountExpAt)

    let DateNow = new Date()

    let discountInPercentage = (defaultDiscountValue / finalPrice) * 100

    if (dateuntil.getTime() < DateNow.getTime() || DateNow.getTime() < dateForm.getTime()) {
        finalPrice = finalPrice - defaultDiscountValue

        return { finalPrice, discountInPercentage, discountValue: defaultDiscountValue }
    }



    if (!inPercentage) {
        finalPrice = finalPrice - discountValue
        discountInPercentage = (discountValue / finalPrice) * 100
        return { finalPrice, discountInPercentage, discountValue }
    } else {
        finalPrice = finalPrice - (discountValue / 100 * finalPrice)
        discountInPercentage = discountValue
        return { finalPrice, discountInPercentage, discountValue }
    }
    return { finalPrice, discountInPercentage, discountValue: defaultDiscountValue }

}

module.exports = {
    getRating,
    finalPrice,
    productsWithRate
};
