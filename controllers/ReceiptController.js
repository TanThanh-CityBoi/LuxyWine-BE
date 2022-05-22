class ReceiptController{
    getList = async (req, res) =>{
        res.send("get product list")
    }


    getOne = async (req, res) =>{
        res.send(`get one ${req.params}`)
    }


    create = async (req, res) =>{
        res.send(`create product ${JSON.stringify(req.body)}`)
    }


    update = async (req, res) =>{
        res.send(`update product ${req.params } , ${req.body }`)
    }


    _delete = async (req, res) =>{
        res.send(`Delete product ${req.params}`)
    }
}

module.exports = new ReceiptController()
