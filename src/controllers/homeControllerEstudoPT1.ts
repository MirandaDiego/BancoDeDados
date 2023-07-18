import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op } from 'sequelize';


export const home = async (req: Request, res: Response)=>{
    let searchName: string = 'uri'
    let users = await User.findAll({    //pegar todo mundo do banco de dados(dentro do parentese coloca os dados que queremos)
        // O que eu não quero excluir: attributes:  { exclude: ['id']}          //  o que euquero: ['name', 'age']
        
       // where: {name: 'Diego', age: 12} //filtrar um nome e a idade (tem q ter os dois para aparecer)
    
       where:{
          /*  [Op.or]: [   //filtrar varias caracteristicas (um ou outro)
                { age: 30 },
                {name: 'Kuririn'}
            ]  */
            age: {
               // [Op.gt]: 40  // > 40
               // [Op.gte]: 40  // >= 40
               //[Op.lt]: 40  // < 40
               //[Op.lte]: 40 // <= 40
               //[Op.between]: [40, 100]   //entre 40 e 100
             // [Op.notbetween]: [40, 100] que nao estao entre 40 e 100
                [Op.gte]: 18 
             
            },
            name: {
                [Op.like]: `%${searchName}%`    //fazer uma busca com nomes"
            },
         //   order: ['name']   //deixar com ordem afabetica os nomes
            // order: ['name', 'DESC'] // decrescente do z ao a
            limit: 2    //limitar a 2
           // offset: 2 // pula dois
       }
       /*
           //inserir dados com sequelize:
    // build + save:
    const user = User.build({
        name: 'Fulano',
        age: 23
    });
    await user.save(); //salvar no banco de dados 


    // create:
    const user = await User.create({
        name:'Ciclano',
        age: 32
    })
     
       */
    });  
    




    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Diego',
        lastName: 'Miranda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users   //jogar para o mustache os dados do bancode dados
    });
};