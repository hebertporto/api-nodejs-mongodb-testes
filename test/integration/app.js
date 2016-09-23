// Teste para verificar as rotas da API Books
describe('Routes Products |', () => {
    var defaultProduct = {
      name: "product"
    }

    describe('GET /products', () => {
        it('should return a list of products', done => {
            request
                .get('/products')
                .end((err, res) => {
                    expect(res.statusCode).to.be.eql(200);
                    // expect(res.body[0].name).to.be.eql(defaultProduct.name);
                    done(err);
                });
        });
    });
});
