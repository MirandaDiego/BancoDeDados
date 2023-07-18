import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User, UserInstance } from '../models/User';
import { Op } from 'sequelize';


export const home = async (req: Request, res: Response)=>{

    await User.update({age: 18},{     //colocar todos usuarios com -18 para 18 
        where: {
            age: {
                [Op.lt]: 18
            }
        }
   })
   await User.update({name: 'Seu Chico', age: 56}, {   //alterar o id 5
    where:{
        id: 5
    }
   })
    let users = await User.findAll();
    //segunda forma de atualizar:
    let results = await User.findAll({ where: { id: 7} } )
    if(results.length > 0){
        let usuario: UserInstance = results[0];

        usuario.age = 45;
        await usuario.save();
    }
    //DELETAR DADOS:
    await User.destroy({
        where: {
            age: {
                [Op.lte]: 18
            }
        }
    })
    let resultado = await User.findAll({ where: {name: 'Ciclano'}});
    if(results.length > 0){
        let usuario = results[0];

        await usuario.destroy()
    }




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
        users
      
    });
};

export const novoUsuario = async (req: Request, res: Response)=>{
    let {name, age} = req.body;

    if(name){
        const newUser = User.build({name});
        if(age){
            newUser.age = parseInt(age);
        }
        await newUser.save();
    }
    res.redirect('/')
}