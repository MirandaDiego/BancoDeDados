import { Model, DataTypes } from "sequelize";
import { sequelize} from '../instances/mysql';



//criar um type:

export interface UserInstance extends Model {
    id: number;
    name: string;
    age: number;
}

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        get (){
            return this.getDataValue('name')
        }
    
      
    },
    //CAMPO VIRTUAL (campo fake)
    /*
    firstLetterOfName:{
        type: DataTypes.VIRTUAL,
        get(){
            let name: string = this.getDataValue('name');
            return name.charAt(0)
        }
    }, */
    
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 18,
        set(value:number){
            if(value< 18){
                value = 18;
            }
            this.setDataValue('age', value)   //Toda vez q um usuario for criado com -18, coloca 18 automaticamente
        }
    }
  
},{
    tableName: 'users',
    timestamps: false //se nao colocar false, atabela ira assumir que tenham as colunas: createdAT e updateAT
})