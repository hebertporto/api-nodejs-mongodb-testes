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

    describe('GET /products', function() {
        it('should return a list of products', done => {
            request
                .get('/products')
                .end(function(err, res) {
                    expect(res.body.data[0].name).to.be.eql(defaultProduct.name);
                    done(err);
                });
        });
    });

    describe('GET /products/id', function () {
        it('should return a product', function (done) {
            request
                .get('/products/'+defaultProduct.id)
                .end(function(err, res){
                    expect(res.body.data.name).to.be.eql(defaultProduct.name);
                    done(err);
                });
        });
    });

    describe('PUT /products/id', function () {
        it('should update a product', function (done) {
            var updatedBook = {
                id: defaultProduct.id,
                name: "product 2"
            }
            request
                .put('/products/'+updatedBook.id)
                .send(updatedBook)
                .end(function(err, res){
                    expect(res.body.status).to.be.eql(true);
                    done(err);
                });
        });
    });

    describe('POST /products', function() {
        it('should create a product', function (done) {

            var product = {
                name: "Meu Produto"
            };

            request
                .post('/products')
                .send(product)
                .end(function(err, res) {
                    expect(res.body.data.name).to.be.eql(product.name);
                    done(err);
                });
        });
    });

    describe('DELETE /products', function  () {
        it('should delete a product', function (done){
            request
                .delete('/products/'+defaultProduct.id)
                .end(function  (err, res) {
                    expect(res.body.status).to.be.eql(true);
                    done(err);
                });
        });
    });


});
