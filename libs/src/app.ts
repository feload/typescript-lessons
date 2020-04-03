import { plainToClass } from 'class-transformer';
import { Product } from './product.model';
import { validate } from 'class-validator';

const products = [
    {
        title: 'Book',
        price: 22.31
    },
    {
        title: 'Revista',
        price: 12.50
    }
];

const newProd = new Product('', -21);
validate(newProd).then(errors => {
    if(errors.length > 0) {
        console.log(errors);
    }
});
console.log(newProd.getInformation());

for (let p of plainToClass(Product, products)){
    console.log(p.getInformation());
}