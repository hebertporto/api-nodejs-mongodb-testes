describe('Routes Products |', () => {

    var defaultProduct = {
      name: "product"
    }

    beforeEach(function (done) {
        Product
            .remove({})
            .then(function () {
                Product
                    .create(defaultProduct)
                    .then(function (result) {
                        defaultProduct.id = result._id;
                        return done();
                    })
                    .catch(function (err) {
                        console.log("Error Create Product", err);
                    });
            })
            .catch(function (err) {
                console.log("Error ao Limpar o banco", err);
            });
    });

    describe('GET /products', () => {
        it('should return a list of products', done => {
            request
                .get('/products')
                .end((err, res) => {
                    //console.log('res', res);
                    //expect(res.statusCode).to.be.eql(200);
                    expect(res.body.data[0].name).to.be.eql(defaultProduct.name);
                    done(err);
                });
        });
    });

    describe('GET /products/id', () => {
        it('should return a product', done => {
            request
                .get('/products/'+defaultProduct.id)
                .end((err, res) => {
                    //expect(res.statusCode).to.be.eql(200);
                    expect(res.body.data.name).to.be.eql(defaultProduct.name);
                    done(err);
                });
        });
    });


});
